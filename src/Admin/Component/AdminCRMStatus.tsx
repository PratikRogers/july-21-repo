/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";

import {
  slickStateAction,
  submitUIConfigAction,
  setToggleStateAction,
  sendAdminAudienceTraitEditAction,
  sendAdminAudienceTraitPaginationAction,
} from "../../Actions";
import { NavBarConstants } from "../../ConstConfig";
// import { FormattedNumber } from "react-intl";
import ConfirmDialog from "../../CommonComponent/ConfirmDialog";
import {
  
  formatBytes,
} from "../utils/dashboardValidation";

import { UserOps } from "../../ConstConfig/UserOps";
// import "../../CSS/Audiences.css";
import { List } from "immutable";
import Pagination from "../../CommonComponent/Pagination/Pagination";
import { PageModel } from "../../CommonModels/PageModel";
import TableComponent from "../../CommonComponent/Table/TableComponent";
import MessageBox from "../../CommonComponent/MessageBox";
import Logger from "../../rogersframework/Logger/Logger";

class AdminCRMStatus extends React.Component<IAdminCRMStatus, {}> {
   searchText: any;
   tableProps: any;
   pageObject: any;
   sortedColumn: any;
   selectedRole: any;
   static MAX_ROWSIZE = 25;
   timer: any;
   tableRef: any;
   dropDownRef: any;
   rtBtstrpTableRef: any;

  constructor(props: any) {
    super(props);
    this.getActionControls = this.getActionControls.bind(this);
    this.getColViewPerBreakpoint = this.getColViewPerBreakpoint.bind(this);
    this.renderPaginationPanel = this.renderPaginationPanel.bind(this);
    this.searchTextInTable = this.searchTextInTable.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.customSortStyle = this.customSortStyle.bind(this);
    this.getSortedStyle = this.getSortedStyle.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.showPanel = this.showPanel.bind(this);
    this.isUserHavingAdminRoles = this.isUserHavingAdminRoles.bind(this);
    this.initTabSwitch = this.initTabSwitch.bind(this);
    this.getUserSelecctedRolePanel = this.getUserSelecctedRolePanel.bind(this);
    this.updatePageModel = this.updatePageModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSegmentId = this.getSegmentId.bind(this);
    this.loadDropDownRefs = this.loadDropDownRefs.bind(this);
    this.loadPagniationPreset = this.loadPagniationPreset.bind(this);
    this.getAllColView = this.getAllColView.bind(this);
    this.getBootStrapTableRef = this.getBootStrapTableRef.bind(this);
    this.getFormattedFileSize = this.getFormattedFileSize.bind(this);
    this.tableRef = [];
    this.dropDownRef = [];
    this.timer = null;
    this.searchText = null;
    this.sortedColumn = "uploadedOn";
    this.selectedRole = null;
    this.pageObject = new PageModel(null);
  }

  public focusTable(ref: any) {
    this.tableRef = ref;
  }
  public getBootStrapTableRef(ref: any) {
    this.rtBtstrpTableRef = ref;
  }

  public loadDropDownRefs(ref: any) {
    this.dropDownRef.push(ref);
  }

  public onContentChange(e: any) {
    // this.searchText = e.target.value;
    this.tableProps.search(this.searchText);
  }
  UNSAFE_componentWillMount() {
    console.log(" populateCRMListTable called componentWillMount");
}
  searchTextInTable() {
    if (this.searchText && this.searchText != "")
      this.tableProps.search(this.searchText);
  }

  /*
        Search Panel
    */
   
  getUserSelecctedRolePanel() {
    let roleTag = "All ";
    let roleTxt = " CATEGORY";
    if (this.selectedRole !== null) {
      roleTag = " ";
      roleTxt = this.selectedRole === "" ? "All Categories" : this.selectedRole;
    }
    const userSelectedRole = roleTxt.charAt(0).toUpperCase() + roleTxt.slice(1);
    return (
      <a
        className="pl-1-sm dropdownToggle ddWidth"
        href="javascript:void(0);"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="">{roleTag}</span> {userSelectedRole}
        <i className="dropdownToggleIcon float-right" />
      </a>
    );
  }

  customSerachPanel = (props: any) => {
    this.tableProps = props;
    const contxt = this;

    function search(e: any) {
      contxt.searchText = e.target.value;
      contxt.props.lastUserOps.searchCat = e.target.value;
      props.search(e.target.value);
      const paginationPayload = { PaginationProps: contxt.props.lastUserOps };
      contxt.props.submitLastPagination(paginationPayload);
    }
    function searchByKey(key: any, e: any) {
      const evnt = { target: { value: key } };
      search(evnt);
    }
    return (
      <div className="row-flex">
        <div className="col-md-6 pl-0 spaceTopTraits spaceTopTraitsmd  spaceTopTraitssmall spaceTopTraitsmob spaceBottom mb-3 order-mb-last">
          <div className="col-xl-4 col-md-8 col-sm-12 col-12 pl-0 pr-0 searchPanel order-mb-1">
            <input
              type="text"
              placeholder="Search by advertiser"
              name="search"
              onChange={search}
              ref={this.loadDropDownRefs}
            />
            <button
              className=""
              type="submit"
              onClick={this.searchTextInTable}
              ref={this.loadDropDownRefs}
            >
              <i className="searchBtnInactive float-right" />
            </button>
            <input
              type="button"
              className="hid"
              onClick={searchByKey.bind(
                this,
                contxt.props.lastUserOps.searchCat
              )}
              ref={this.loadDropDownRefs}
            />
          </div>
        </div>
      </div>
    );
  };

  /*
        Sorting icons
    */
  changeCaret(order: any, column: any) {
    if (order && order === "desc") {
      return <i className="descSort float-right" />;
    } else if (order && order === "asc") {
      return <i className="ascSort float-right" />;
    }
    return <i className="sortInactive float-right" />;
  }

  getColViewPerBreakpoint(cell: any, row: any, enumObject: any) {
    return <span className="visible-lg">{cell.toString()}</span>;
  }

  getFormattedFileSize(cell: any, row: any, formatExtraData: any, index: any) {
    const style =
      formatExtraData === this.sortedColumn
        ? " boldText wrapWords"
        : " wrapWords";

    const val = cell ? cell.toString() : "";
    return <span className={style}>{formatBytes(val)}</span>;
  }

  getAllColView(cell: any, row: any, enumObject: any, index: any) {
    function getFileStatus(cell: any) {
      const formattedFileStatus = {
        FILE_UPLOADED: { value: "Uploaded" },
        FILE_PROCESSING: { value: "Processing" },
        FILE_PROCESSED: { value: "Processed" },
        FILE_FAILED: { value: "Failed" },
      };

      if (cell) {
        cell = formattedFileStatus[cell].value;
      }
      return cell;
    }

    return (
      <div className="listA">
        <div className="row-flex">
          <div className="col-md-4 pl-0 pr-0">
            <span>ID: </span>
            <span> {row.logId} </span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Advertiser Name: </span>
            <span className="wrapWords"> {row.advertiserName}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Uploaded On: </span>
            <span className="wrapWords"> {row.uplodedOn}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Processed On: </span>
            <span className="wrapWords"> {row.processedDate}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>File Name: </span>
            <span className="wrapWords"> {row.origFileName}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>File Size: </span>
            <span> {formatBytes(row.fileSize)}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Hash Count: </span>
            <span> {row.hashCount}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Status: </span>
            <span> {getFileStatus(row.fileStatus)}</span>
          </div>
        </div>
      </div>
    );
  }

 
  formatNumber(cell: any, row: any, formatExtraData: any, index: any) {
    const style = formatExtraData === this.sortedColumn ? " boldText " : "";
    if (cell && cell !== "") {
      return (
        <span className={style}>
          {cell.toString()}
          {/* <FormattedNumber
            value={cell.toString()}
            style="decimal"
            minimumFractionDigits={0}
            maximumFractionDigits={0}
          /> */}
        </span>
      );
    }
    return null;
  }

  getSortedStyle(cell: any, row: any, formatExtraData: any, index: any) {
    const style =
      formatExtraData === this.sortedColumn
        ? " boldText wrapWords"
        : " wrapWords";
    if (formatExtraData === "fileStatus") {
      const formattedFileStatus = {
        FILE_UPLOADED: { value: "Uploaded" },
        FILE_PROCESSING: { value: "Processing" },
        FILE_PROCESSED: { value: "Processed" },
        FILE_FAILED: { value: "Failed" },
      };
      if (cell) {
        cell = formattedFileStatus[cell].value;
      }
    }
    const val = cell ? cell.toString() : "";
    return (
      <span title={val} className={style}>
        {val}
      </span>
    );
  }
 

  initTabSwitch() {
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: NavBarConstants.ADMINCRMSTATUSSLICK,
      slickIdx: NavBarConstants.ADMINCRMSTATUSSLICK,
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.history.push("/AdminCRMStatus");
  }

  public getSegmentId(index: any) {
    if (this.tableRef.length >= index) {
      return this.tableRef[index].segmentId;
    }
    return "";
  }

  public handleSubmit(rowContent: any, action: any, index: any, evt: any) {}

  /*
    Last column view/launch
    */

  getActionControls(cell: any, row: any, formatExtraData: any, index: any) {
    const rIndex = this.tableRef.findIndex(
      (obj: any) => obj.segmentId === row.segmentId
    );

    if (rIndex < 0) {
      this.tableRef.push(row);
    }
    return <span />;
  }

  public createCustomToolBar = (props: any) => {
    return (
      <div className="col-12 pl-15 pr-15">{props.components.searchPanel}</div>
    );
  };

  public customSortStyle(order: any, dataField: any) {
    if ((order && order === "desc") || order === "asc") {
      this.sortedColumn = dataField;
      return "boldText";
    }
    return "";
  }

  public showPanel() {
    if (this.searchText && this.searchText.trim().length > 0) {
      return true;
    }
    return false;
  }

  public isUserHavingAdminRoles() {
    if (
      this.props.UserRole &&
      this.props.UserRole.hasOwnProperty("roles") &&
      this.props.UserRole.roles
    ) {
      const index = this.props.UserRole.roles.findIndex(
        (obj: any) => obj == UserOps.ADMIN
      );
      if (index >= 0) {
        Logger.getInstance().printDebugLogs(this.rtBtstrpTableRef);
        return true;
      }
    }
    return false;
  }

  /*pagination Starts */
  updatePageModel(payload: any) {
    this.pageObject = payload;
    payload["searchCat"] = this.props.lastUserOps.searchCat;
    const paginationPayload = { PaginationProps: payload };
    this.props.submitLastPagination(paginationPayload);
    // console.log("Pagination of adminaudience");
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

  loadPagniationPreset() {
    const contxt = this;
    this.timer = setTimeout(function() {
      if (
        contxt.props.lastUserOps.searchCat &&
        contxt.props.lastUserOps.searchCat !== ""
      ) {
        contxt.tableProps.search(contxt.props.lastUserOps.searchCat);
        if (contxt.props.lastUserOps.searchCat === "") {
        } else if (contxt.props.lastUserOps.searchCat !== "") {
          contxt.searchText = contxt.props.lastUserOps.searchCat;
          const comp = contxt.dropDownRef[0];
          comp.value = contxt.props.lastUserOps.searchCat;
          const compBtn = contxt.dropDownRef[2];
          compBtn.click();
        }
      }
      clearTimeout(contxt.timer);
    }, 600);
  }

  public render() {
    if (!this.isUserHavingAdminRoles()) {
      this.props.history.push("/");
    }
    const tableInput = {
      tableContent: this.props.crmItemList,
      tableContents: [
        {
          dataField: "logId",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "logId",
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: "ID",
          hidden: false,
          isKey: true,
        },
        {
          dataField: "advertiserName",
          dataSort: true,
          
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "advertiserName",
          customSortStyle: this.customSortStyle,
          searchable: true,
          Title: "Advertiser Name",
          hidden: false,
          isKey: false,
        },
        {
          dataField: "uploadedOn",
          dataSort: true,
          // sortFunc: this.sortDates,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "uploadedOn",
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: { border: "1px solid #414042!" },
          Title: "Uploaded ON",
          hidden: false,
          isKey: false,
        },
        {
          dataField: "processedDate",
          dataSort: true,
          // sortFunc: this.sortDates,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "processedDate",
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: "Processed On",
          isKey: false,
        },
        {
          dataField: "origFileName",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "origFileName",
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: "File Name",
          isKey: false,
        },
        {
          dataField: "fileSize",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getFormattedFileSize,
          formatExtraData: "fileSize",
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: "File Size",
          isKey: false,
        },
        {
          dataField: "hashCount",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.formatNumber,
          formatExtraData: "hashCount",
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: "Hash Count",
          isKey: false,
        },
        {
          dataField: "fileStatus",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "fileStatus",
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: "Status",
          isKey: false,
        },
      ],
      pagination: true,
      search: true,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: AdminCRMStatus.MAX_ROWSIZE, // which size per page you want to locate as default
        defaultSortName: "uploadedOn",
        defaultSortOrder: "desc",
        searchPosition: "left",
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar,
      },
      bordered: false,
      multiColumnSearch: false,
    };
    const tableInputSmall = {
      tableContent: this.props.crmItemList,
      tableContents: [
        {
          dataField: "logId",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "logId",
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: "ID",
          hidden: true,
          isKey: true,
        },
        {
          dataField: "uploadedOn",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: "uploadedOn",
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: "uploadedOn",
          hidden: true,
          isKey: false,
        },
        {
          dataField: "advertiserName",
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getAllColView,
          formatExtraData: "advertiserName",
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: "CRM Upload details",
          hidden: false,
          isKey: false,
        },
      ],
      pagination: true,
      search: true,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: AdminCRMStatus.MAX_ROWSIZE, // which size per page you want to locate as default
        defaultSortName: "uploadedOn",
        defaultSortOrder: "desc",
        searchPosition: "left",
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar,
      },
      bordered: false,
      multiColumnSearch: false,
    };
    {
      this.loadPagniationPreset();
    }
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <h3>CRM Uploads</h3>
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
        <ConfirmDialog />
        <MessageBox />
      </main>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    crmItemList: state.CRMSListState.hasOwnProperty("CRMSList")
      ? state.CRMSListState.CRMSList
      : List([]),
    UserRole:
      state.AdminUserControlState.hasOwnProperty("UserProfile") &&
      state.AdminUserControlState.UserProfile
        ? state.AdminUserControlState.UserProfile
        : {
            email: "",
            company: null,
            userId: null,
            firstName: "",
            lastName: "",
            roles: ["user"],
          },
    lastUserOps: state.AdminUserTraitListPaginationControlState.hasOwnProperty(
      "PaginationProps"
    )
      ? state.AdminUserTraitListPaginationControlState.PaginationProps
      : { currPage: 1, maxPageSize: 6, pageStartIndex: 1, searchCat: "" },
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => {
    console.log("Admin CRMUploads => Inside export default connect");
    return {
      handleSubmit: (dummyUserObj: any) => {
        dispatch(slickStateAction(dummyUserObj));
      },
      handleAudienceSortAction: (
        editAudience: boolean,
        rowContent: any,
        histry: any
      ) => {
        dispatch(sendAdminAudienceTraitEditAction(rowContent));
      },
      submitToggleSwitchAction: (payload: any) => {
        dispatch(setToggleStateAction(payload));
      },
      showMethdology(messageBoxObj: any) {
        dispatch(submitUIConfigAction(messageBoxObj));
      },
      submitLastPagination(payload: any) {
        dispatch(sendAdminAudienceTraitPaginationAction(payload));
      },
    };
  }
)(AdminCRMStatus);

interface IAdminCRMStatus extends React.FC<any> {
  handleSubmit: any;
  handleChange: any;
  loggingIn: any;
  crmItemList: any;
  UserRole: any;
  errorMessage: any;

  handleAudienceSortAction?: any;
  lastUserOps?: any;
  submitLastPagination?: any;
  history: any;
}
