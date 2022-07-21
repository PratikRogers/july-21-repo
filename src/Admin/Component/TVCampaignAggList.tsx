/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

import {  Configs } from '../../ConstConfig';
import { ConstAction } from '../../ConstConfig/ConstAction';
import ConfirmDialog from '../../CommonComponent/ConfirmDialog';
import Logger from '../../rogersframework/Logger/Logger';

import '../../CSS/Audiences.css';
import { List } from 'immutable';
import Pagination from '../../CommonComponent/Pagination/Pagination';
import { PageModel } from '../../CommonModels/PageModel';
import TableComponent from '../../CommonComponent/Table/TableComponent';
import MessageBox from '../../CommonComponent/MessageBox';
import { getAllTVOrders, deleteTVOrders, editTVOrdersAction, submitUIConfigAction } from 'src/Actions';

class TVCampaignAggList extends React.Component<ITVCampaignAggList, {}> {
  private searchText: any;
  private tableProps: any;
  private pageObject: any;
  private sortedColumn: any;
  private static MAX_ROWSIZE = 25;
  // private tableRef: any;
  private configs:any;

  constructor(props: any) {
    super(props);
    this.getActionControls = this.getActionControls.bind(this);
    this.createNewOrder = this.createNewOrder.bind(this);
    this.renderPaginationPanel = this.renderPaginationPanel.bind(this);
    this.customSortStyle = this.customSortStyle.bind(this);
    this.getSortedStyle = this.getSortedStyle.bind(this);
    this.showPanel = this.showPanel.bind(this);
    this.initTabSwitch = this.initTabSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePageModel = this.updatePageModel.bind(this);
    this.getAllColView = this.getAllColView.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.customSerachPanel = this.customSerachPanel.bind(this);
    this.configs = new Configs();
    this.searchText = null;
    this.sortedColumn = 'campaignName';
    this.pageObject = new PageModel(null);
  }

  componentDidMount() {
    this.props.handleSubmit({data:{url:this.configs.getTVOrderCampaignList()}})
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
        <div className="col-md-6 pl-0 spaceTopTraits spaceTopTraitsmd  spaceTopTraitssmall spaceTopTraitsmob spaceBottom mb-3 order-mb-last">
          <div className="col-xl-4 col-md-8 col-sm-12 col-12 pl-0 pr-0 searchPanel order-mb-1">
            <input
              type="text"
              placeholder="Search"
              name="search"
              onChange={search}
             />
            <button
              className=""
              type="submit"
              onClick={search}
             >
              <i className="searchBtnInactive float-right" />
            </button>
            <input
              type="button"
              className="hid"
              onClick={search}
             />
          </div>
        </div>
        <div className="col-md-6 pr-0 pl-0 spaceTop spaceBottom spacerBottom0 order-mb-0">
        <a className="btn btnPrimary float-xl-right float-md-right"
              href="javascript:void(0);"
              role="button"
              onClick={this.createNewOrder} >
              Create New
            </a>
        </div>
      </div>
    );
  };

  changeCaret(order: any, column: any) {}
 
  getColViewPerBreakpoint(cell: any, row: any, enumObject: any) {
    return <span className="visible-lg">{cell.toString()}</span>;
  }

  getAllColView(cell: any, row: any, enumObject: any, index: any) {
    const emitMethod =  ConstAction.DELETE; //
    return (
      <div className="listA">
        <div className="row-flex">
          <div className="col-md-4 pl-0 pr-0">
            <span>Campaign Name: </span>
            <span> {row.campaignName} </span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Contract IDs: </span>
            <span> {row.contractIds}</span>
          </div>
          <div className="col-md-12 mt-4 pl-0 pr-0 smallBtnPanel">
           
            <a
              className="btn btnSmall-secondary mr-lg-2"
              href="javascript:void(0);"
              role="button"
              onClick={this.handleSubmit.bind(this, row, ConstAction.EDIT, 0)}
            >
              EDIT
            </a>
            <a
              className="btn btnSmall-primary"
              href="javascript:void(0);"
              role="button"
              data-toggle="modal"
              data-target="#deleteAudienceModal"
              data-backdrop="static"
              onClick={this.handleSubmit.bind(this, row, emitMethod)}
            >
              {' '}
              DELETE
            </a>
          </div>
        </div>
      </div>
    );
  }

  getSortedStyle(cell: any, row: any, formatExtraData: any, index: any) {
    const style = formatExtraData === this.sortedColumn ? ' boldText ' : '';
    const val = cell ? cell.toString() : '';
    return <span className={style}>{val}</span>;
  }

  initTabSwitch() {
    this.props.history.push('/TVCampaignAggregationOps');
  }

  createNewOrder() {
    this.props.editTVOrder({data:null});
    this.initTabSwitch();
  }

 
  public handleSubmit(rowContent: any, action: any, index: any, evt: any) {
    const url = this.configs.getTVOrderCampaignList() + "/" + rowContent.id;
    switch (action) {
      case ConstAction.DELETE:
        rowContent['deleteInvokedBy'] = 'TVCAMPAIN';
        this.props.handleDialogSubmitAction (true, {data:{url:url,allSegsUrl:this.configs.getTVOrderCampaignList()}},rowContent.campaignName);
        // this.props.handleDelete();
        break;
      case ConstAction.EDIT:
        this.props.editTVOrder(
          {data:rowContent}
        );
        this.initTabSwitch();
        break;
 
      default:
        break;
    }

    Logger.getInstance().printDebugLogs('Handle');
  }

   getActionControls(cell: any, row: any, formatExtraData: any, index: any) {
    return (
      <span>
        <a
          className="btn btnSmall-secondary mr-lg-2"
          href="javascript:void(0);"
          role="button"
          onClick={this.handleSubmit.bind(this, row, ConstAction.EDIT, 0)}
        >
          EDIT
        </a>
        <a
          className="btn btnSmall-primary"
          href="javascript:void(0);"
          role="button"
          data-toggle="modal"
          data-target="#deleteAudienceModal"
          data-backdrop="static"
          onClick={this.handleSubmit.bind(this, row,  ConstAction.DELETE)}
        >
          {' '}
          DELETE
        </a>
      </span>
    );
  }

  public createCustomToolBar = (props: any) => {
    return (
      <div className="col-12 pl-15 pr-15">{props.components.searchPanel}</div>
    );
  };
  public customSortStyle(order: any, dataField: any) {
    if ((order && order === 'desc') || order === 'asc') {
      this.sortedColumn = dataField;
      return 'boldText';
    }
    return '';
  }

  public showPanel() {
    if (this.searchText && this.searchText.trim().length > 0) {
      return true;
    }
    return false;
  }
  /*pagination Starts */
  updatePageModel(payload: any) {
    this.pageObject = payload;
    // console.log("Pagination of adminaudience");
  }

  handleDelete(payload:any) {
    this.props.handleDelete(payload);
  }

  renderPaginationPanel = (props: any) => {
    return (
      <Pagination
        paginationProps={props}
        pageObject={this.pageObject}
        updatePaginationModel={this.updatePageModel}
        userOps={this.props.lastUserOps}
        tableProps={this.tableProps}
      />
    );
  };
  /*Pagination Ends */


  public render() {
    const tableInput = {
      tableContent: this.props.TVCampaigOrders,
      tableContents: [
        {
          dataField: 'campaignName',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'campaignName',
          customSortStyle: this.customSortStyle,
          searchable: true,
          Title: 'Campaign Name',
          hidden: false,
          isKey: true
        },
        {
          dataField: 'contractIds',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'contractIds',
          customSortStyle: this.customSortStyle,
          searchable: true,
          Title: 'Contract IDs',
          hidden: false,
          isKey: false
        },
         
        {
          dataField: '',
          dataSort: false,
          changeCaret: false,
          dataFormatMethod: this.getActionControls,
          formatExtraData: '',
          customSortStyle: false,
          className: false,
          columnClassName: false,
          searchable: false,
          tdStyle: {},
          Title: 'Actions',
          hidden: false,
          isKey: false
        }
      ],
      pagination: true,
      search: true,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: TVCampaignAggList.MAX_ROWSIZE, // which size per page you want to locate as default
        defaultSortName: 'campaignName',
        defaultSortOrder: 'asc',
        searchPosition: 'left',
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar

            },
      bordered: false,
      multiColumnSearch: false,
    };
    const tableInputSmall = {
      tableContent: this.props.TVCampaigOrders,
      tableContents: [
        {
          dataField: 'campaignName',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getAllColView,
          formatExtraData: 'segmentId',
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: 'Segment',
          hidden: false,
          isKey: true
        } 
      ],
      pagination: true,
      search: true,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: TVCampaignAggList.MAX_ROWSIZE, // which size per page you want to locate as default
        defaultSortName: 'campaignName',
        defaultSortOrder: 'asc',
        searchPosition: 'left',
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar

      },
      bordered: false,
      multiColumnSearch: false,
    };
    
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <h3>TV Campaign Aggregation
          </h3>
            <div className="d-desk-block d-ipad-none d-mb-none table-responsive-xl tableRedui">
              <TableComponent tableInput={tableInput} />
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
          </div>
        </div>
        <ConfirmDialog handleUserAction={this.handleDelete}/>
        <MessageBox />
      </main>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    TVCampaigOrders: state.AdminTVOrdersListState.hasOwnProperty('data')
      ? state.AdminTVOrdersListState.data
      : List([])  
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      handleSubmit: (dummyUserObj: any) => {
        dispatch(getAllTVOrders(dummyUserObj));
      },
      handleDelete: (dummyUserObj: any) => {
        dispatch(deleteTVOrders(dummyUserObj));
      },
      handleDialogSubmitAction: (show: boolean, rowContent: any,campaignName:any) => {
        const payload = {
          Dialog: {
            isVisible: show,
            content: rowContent,
            Message: 'Are you sure you want to delete this '+ campaignName +' TV Campaign?'
          }
        };
        dispatch(submitUIConfigAction(payload));
      },
      editTVOrder(payload:any) {
        dispatch(editTVOrdersAction(payload))
      }

    };
  }
)(TVCampaignAggList);

interface ITVCampaignAggList extends React.FC<any> {
  handleSubmit: any;
  handleChange: any;
  lastUserOps?: any;
  TVCampaigOrders?: any;
  handleDialogSubmitAction?: any;
  handleDelete?:any;
  editTVOrder?:any;
  history: any;
}
