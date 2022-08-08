/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import MessageBox from './MessageBox';
import TableComponent from './Table/TableComponent';
import { FormattedNumber } from 'react-intl';
import PageModel from 'src/CommonModels/PageModel';
import Pagination from './Pagination/Pagination';
import { convertToDate } from 'src/Utility/reportingValidation';

class TablePageComponent extends React.Component<ITablePageComponent, {}> {
    public state: any;
    private refArr: any;

    private sortedColumn: any;
    private tableProps: any;
    private searchText: any;
    public pageObject: any;

    constructor(props: any) {
        super(props);
        this.refArr = [];
        this.getDateSortedFormat = this.getDateSortedFormat.bind(this)
        this.getSortedStyle = this.getSortedStyle.bind(this)
        this.customSortStyle = this.customSortStyle.bind(this)
        this.getAllColView = this.getAllColView.bind(this)
        this.searchTextInTable = this.searchTextInTable.bind(this);
        this.renderPaginationPanel = this.renderPaginationPanel.bind(this);
        this.getSmallDeviceProps = this.getSmallDeviceProps.bind(this);
        this.getDesktopProps = this.getDesktopProps.bind(this);
        this.updatePageModel = this.updatePageModel.bind(this);
        this.sortedColumn = "";
        this.state = { uploadBtnDisabled: " disabled ", browseBtnDisabled: " ", fileName: "" }
        this.pageObject = new PageModel(null);

    }


    updatePageModel(payload: any) {
        this.pageObject = payload;

    }

    renderPaginationPanel = (props: any) => {
        return (
            <Pagination
                paginationProps={props}
                pageObject={this.pageObject}
                updatePaginationModel={this.updatePageModel}
                tableProps={this.tableProps}
            />
        );
    };

    changeCaret(order: any, column: any) {

        if (order && order === "desc") {
            return <i className="descSort float-right" />
        }
        else if (order && order === "asc") {
            return <i className="ascSort float-right" />
        }
        return <i className="sortInactive float-right" />
    }

    public customSortStyle(order: any, dataField: any) {
        if ((order && order === 'desc') || order === 'asc') {
            this.sortedColumn = dataField;
            return 'boldText';
        }
        return '';
    }
    public focusText(ref: any, grpButton?: any, itemName?: any) {
        this.refArr.push(ref);
    }

    searchTextInTable() {
        if (this.searchText && this.searchText != '')
            this.tableProps.search(this.searchText);
    }

    customSerachPanel = (props: any) => {
        this.tableProps = props;
        const contxt = this;
        function search(e: any) {
            contxt.searchText = e.target.value;
            props.search(e.target.value);
        }

        return (
            <div className="row-flex">
                <div className="col-md-12 pl-0 spaceTopTraits spaceTopTraitsmd  spaceTopTraitssmall spaceTopTraitsmob spaceBottom mb-3 order-mb-last">
                    <div className="col-xl-6 col-md-12 col-sm-12 col-12 pl-0 pl-custom pr-0 searchPanel order-mb-1">
                        <input type="text"
                            placeholder={this.props.tableDataInput.searchTitle}
                            name="search"
                            onChange={search}
                        />
                        <button className="" type="submit" onClick={this.searchTextInTable} >
                            <i className="searchBtnInactive float-right" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    getSortedStyle(cell: any, row: any, formatExtraData: any, index: any) {
        const style = formatExtraData === this.sortedColumn ? ' boldText wrapWords' : 'wrapWords';
        const val = cell ? cell.toString() : '';
        return <span className={style}>{val}</span>;
    }

    getFormattedNumber(cell: any, row: any, formatExtraData: any, index: any) {
        if (cell && cell !== "") {
            return <span >
                <FormattedNumber value={cell.toString()}
                    style="decimal" minimumFractionDigits={0}
                    maximumFractionDigits={0} /> </span>
        }
        return null;
    }

    getDateSortedFormat(cell: any, row: any, formatExtraData: any, index: any) {
        const val = cell ? cell.toString() : '';
        const respDate = convertToDate(val,true);
        return <span>{respDate}</span>;
    }

    getAllColView(cell: any, row: any, enumObject: any) {
        const contxt = this;
        return (
            <div className="listA">
                <div className="row-flex">
                    {Object.keys(row).map((key: any) => {
                        if(contxt.props.tableDataInputSmall.dispNames[key]) {
                            return (<div key={"div" + row[key]} className="col-md-4 pl-0 pr-0">
                            <span key={"disp" + row[key]}>{contxt.props.tableDataInputSmall.dispNames[key]}</span>
                            <span key={"key" + row[key]} className="wrapWords">{row[key]}</span>
                           
                        </div>)
                        }
                       else return null;
                    })}
                     {contxt.props.tableDataInputSmall.actionMethod(cell,row,"hide")}
                </div>
            </div>)
    }

    getDesktopProps() {
        let newProps = {
            tableContent: this.props.tableDataInput.tableContent,
            pagination: this.props.tableDataInput.showPagination,
            search: this.props.tableDataInput.showSearch,
            tableOptions: {
                hidePageListOnlyOnePage: true,
                hideSizePerPage: true,
                sizePerPage: this.props.tableDataInput.maxRowSize,
                defaultSortName: this.props.tableDataInput.sortedCol,
                defaultSortOrder: this.props.tableDataInput.sortedOrder,
                searchPosition: 'left',
                renderPaginationPanel: this.renderPaginationPanel,
                customSerachPanel: this.customSerachPanel,
            },

            bordered: false,
            multiColumnSearch: false,
        };
        newProps["tableContents"] = [],

            this.props.tableDataInput.tableFields.map((allRow: any, i: any) => {
                let methodName = this.getSortedStyle;
                let sortIconMethod = this.changeCaret;
                if ((allRow.field === '') && allRow.hasOwnProperty("actionMethod")) {
                    methodName = allRow.actionMethod
                    sortIconMethod = null;
                }
                if(allRow.hasOwnProperty("isDate") && allRow.isDate) {
                    methodName = this.getDateSortedFormat;
                }
                newProps["tableContents"].push({
                    dataField: allRow.field,
                    dataSort: true,
                    changeCaret: sortIconMethod,
                    dataFormatMethod: methodName,
                    formatExtraData: allRow.field,
                    customSortStyle: this.customSortStyle,
                    searchable: allRow.searchable,
                    Title: allRow.displayName,
                    hidden: allRow.isHidden,
                    isKey: allRow.isKey,
                    clsName: allRow.clsName,
                    colClsName: allRow.colClsName,
                    customTitle:allRow.customTitle
                })

            })
        return newProps;
    }

    getSmallDeviceProps() {
        let newProps = {
            tableContent: this.props.tableDataInputSmall.tableContent,
            pagination: this.props.tableDataInputSmall.showPagination,
            search: this.props.tableDataInputSmall.showSearch,
            tableOptions: {
                hidePageListOnlyOnePage: true,
                hideSizePerPage: true,
                sizePerPage: this.props.tableDataInputSmall.maxRowSize,
                defaultSortName: this.props.tableDataInputSmall.sortedCol,
                defaultSortOrder: this.props.tableDataInputSmall.sortedOrder,
                searchPosition: 'left',
                renderPaginationPanel: this.renderPaginationPanel,
                customSerachPanel: this.customSerachPanel,
            },
            bordered: false,
            multiColumnSearch: false,
        };
        newProps["tableContents"] = [],
            newProps["tableContents"].push({
                dataField: this.props.tableDataInputSmall.tableFields[0].field,
                dataSort: true,
                changeCaret: this.changeCaret,
                dataFormatMethod: this.getAllColView,
                formatExtraData: this.props.tableDataInputSmall.tableFields[0].field,
                customSortStyle: this.customSortStyle,
                searchable: this.props.tableDataInputSmall.tableFields[0].searchable,
                Title: this.props.tableDataInputSmall.tableFields[0].displayName,
                hidden: this.props.tableDataInputSmall.tableFields[0].isHidden,
                isKey: this.props.tableDataInputSmall.tableFields[0].isKey
            })

        return newProps;
    }

    public render() {
        let tableInput = this.getDesktopProps();
        let tableInputSmall = this.getSmallDeviceProps();
        return (
            <div>

                <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                    <h3 >{this.props.tableDataInput.TableTitle}</h3>
                </div>
                <div className="spacerLeft d-desk-block d-ipad-none d-mb-none table-responsive-xl tableRedui">
                    <TableComponent tableInput={tableInput} />
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                </div>
                <div className="d-desk-none d-ipad-block d-mb-block iPadLandscape-block">
                    <TableComponent tableInput={tableInputSmall} />
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                    <div className="hSpacer20" />
                </div>
                <MessageBox />

            </div>

        );
    }
}

function mapStateToProps(state: any) {
    return {
        UIDialogstats: state.configState.hasOwnProperty("Dialog") && state.configState.Dialog.hasOwnProperty("MessageBox") ? state.configState.Dialog.MessageBox : { MessageBox: { isVisible: false, UserMessage: "", saveFailed: false } },
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {

    }
})(TablePageComponent);

interface ITablePageComponent extends React.FC<any> {
    errorMessage?: any;
    tableDataInput?: any;
    tableDataInputSmall?: any;
    UIDialogstats?: any;
    history?: any;
}
