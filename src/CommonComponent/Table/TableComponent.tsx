/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class TableComponent extends React.Component<ITableComponent, {}> {
     tableOption:any;
    constructor(props: any) {
        super(props);
    }

     render() {
        this.tableOption = {
            hidePageListOnlyOnePage: true,
            hideSizePerPage: true,
            sizePerPage: this.props.tableInput.tableOptions.sizePerPage,  // which size per page you want to locate as default
            defaultSortName: this.props.tableInput.tableOptions.defaultSortName,
            defaultSortOrder: this.props.tableInput.tableOptions.defaultSortOrder,
            searchPosition: 'left',
            paginationPanel: this.props.tableInput.tableOptions.renderPaginationPanel,
            searchPanel: this.props.tableInput.tableOptions.customSerachPanel,
            toolBar: this.props.tableInput.tableOptions.createCustomToolBar
        }
        return (
            <BootstrapTable 
            data={this.props.tableInput.tableContent.toArray()} 
            version='4' 
            striped={true} 
            hover={true} 
            condensed={false}
            options={this.tableOption}
            pagination={this.props.tableInput.pagination} 
            trClassName="table-borderless table" 
            search={this.props.tableInput.search} 
            bordered={this.props.tableInput.border} 
            multiColumnSearch={this.props.tableInput.multiColumnSearch}>
            {this.props.tableInput.tableContents.map((cell: any, i: any) => {
                return (
                <TableHeaderColumn 
                key={cell.dataField}
                dataField={cell.dataField} 
                dataSort={cell.dataSort} 
                caretRender={cell.changeCaret} 
                dataFormat={cell.dataFormatMethod} 
                formatExtraData={cell.formatExtraData} 
                sortHeaderColumnClassName={cell.customSortStyle}
                searchable={cell.searchable} 
                tdStyle={cell.tdStyle}
                hidden={cell.hidden}
                isKey={cell.isKey}>
               {cell.Title}
                </TableHeaderColumn> )
            })}
            </BootstrapTable>
        );
    }
}

function mapStateToProps(state: any) {
    return {

    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {

    }

})(TableComponent);

interface ITableComponent extends React.FC<any> {
    tableInput?:any;
    focusTable?:any;
    history?: any;
}
