/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

import {
  slickStateAction,
  submitUIConfigAction,
  setToggleStateAction,
  sendAdminUserEditAction,
  sendAdminAudienceTraitPaginationAction
} from '../../Actions';
import { NavBarConstants } from '../../ConstConfig';
import { FormattedNumber } from 'react-intl';
import { ConstAction } from '../../ConstConfig/ConstAction';
import ConfirmDialog from '../../CommonComponent/ConfirmDialog';
import Logger from '../../rogersframework/Logger/Logger';
import { getAudienceCreationDate } from '../utils/dashboardValidation';

import { UserOps } from '../../ConstConfig/UserOps';
// import '../../CSS/Audiences.css';
import { List } from 'immutable';
import Pagination from '../../CommonComponent/Pagination/Pagination';
import { PageModel } from '../../CommonModels/PageModel';
import TableComponent from '../../CommonComponent/Table/TableComponent';

class AdminUserList extends React.Component<IAdminUserList, {}> {
  private searchText: any;
  private tableProps: any;
  private pageObject: any;
  private sortedColumn: any;
  private selectedRole: any;
  private timer: any;
  private dropDownRef: any;
  private tableRefernce:any;
  private tableRefernceSM:any;
  // private tableRef:any;

  private static MAX_ROWSIZE = 25;
  private static EMAILTEXTCODE = 11;
  
  constructor(props: any) {
    super(props);
    this.getActionControls = this.getActionControls.bind(this);
    this.getAllColView = this.getAllColView.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.getColViewPerBreakpoint = this.getColViewPerBreakpoint.bind(this);
    this.renderPaginationPanel = this.renderPaginationPanel.bind(this);
    this.pageObject = new PageModel(null);
    this.customSortStyle = this.customSortStyle.bind(this);
    this.getSortedStyle = this.getSortedStyle.bind(this);
    this.getDateSortedFormat = this.getDateSortedFormat.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.showPanel = this.showPanel.bind(this);
    this.isUserHavingAdminRoles = this.isUserHavingAdminRoles.bind(this);
    this.initTabSwitch = this.initTabSwitch.bind(this);
    this.getUserSelecctedRolePanel = this.getUserSelecctedRolePanel.bind(this);
    this.getDeleteButton = this.getDeleteButton.bind(this);
    this.updatePageModel = this.updatePageModel.bind(this);
    this.loadPagniationPreset = this.loadPagniationPreset.bind(this);
    this.loadDropDownRefs = this.loadDropDownRefs.bind(this);
    this.getDrpDnClass = this.getDrpDnClass.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.loadTableRefs = this.loadTableRefs.bind(this);
    this.loadTableRefSMDevices = this.loadTableRefSMDevices.bind(this);
    this.dropDownRef = [];
    this.timer = null;
    this.selectedRole = null;
    this.sortedColumn = 'firstName';
    this.searchText = null;
  }

  public loadDropDownRefs(ref: any) {
    this.dropDownRef.push(ref);
  }

  /*
        Search Panel
    */
  getUserSelecctedRolePanel() {
    let roleTag = 'ALL ROLES';
    let roleTxt = ' ';
    if (this.selectedRole !== null) {
      roleTag = ' ';
      roleTxt = this.selectedRole === '' ? 'All Roles' : this.selectedRole;
    }
    const userSelectedRole = roleTxt.charAt(0).toUpperCase() + roleTxt.slice(1);
    return (
      <a className="pl-1-sm dropdownToggle"
        href="javascript:void(0);"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false" >
        <span className="">{roleTag}</span> {userSelectedRole.toUpperCase()}
        <i className="dropdownToggleIcon float-right" />
      </a>
    );
  }

  getDrpDnClass(roleDpLevel: any) {
    if (this.props.lastUserOps.searchCat === roleDpLevel) {
      return 'currentSelectedDrpDn dropdown-item ';
    } else {
      return 'dropdown-item';
    }
  }
  public loadTableRefs(ref: any) {
    this.tableRefernce = ref;
  }
  public loadTableRefSMDevices(ref: any) {
    this.tableRefernceSM = ref;
  }

 
  customSerachPanel = (props: any) => {
    this.tableProps = props;
    const contxt = this;
    function searchByText(e:any) {
      const role = contxt.selectedRole? contxt.selectedRole :contxt.props.lastUserOps.selectedRole;
      contxt.searchText = e.target.value;
      contxt.tableRefernce.handleFilterData({'roles':role,'email':contxt.searchText});
      contxt.props.lastUserOps.searchEmail = e.target.value;
      // contxt.props.lastUserOps.searchCat = contxt.props.lastUserOps.searchCat;
      contxt.props.lastUserOps.searchRole =  role;
      contxt.props.lastUserOps.sortedCol = contxt.props.lastUserOps.sortedCol ;
      contxt.props.lastUserOps.sortedOrder = contxt.props.lastUserOps.sortedOrder ;
      props.search(e.target.value);
      const paginationPayload = { PaginationProps: contxt.props.lastUserOps };
      contxt.props.submitLastPagination(paginationPayload);
    }
    function search(role: any, roleDPLevel: any, e: any) {
      contxt.selectedRole = role;
      props.search(role);
      const searchEmail = contxt.searchText? contxt.searchText :contxt.props.lastUserOps.searchEmail;
      // const role = contxt.selectedRole? contxt.selectedRole :contxt.props.lastUserOps.selectedRole;
      if(contxt.searchText && contxt.searchText!= "") {
        contxt.tableRefernce.handleFilterData({'roles':role,'email':searchEmail});
        contxt.tableRefernceSM.handleFilterData({'roles':role,'email':searchEmail});
      }
      else{
        contxt.tableRefernce.handleFilterData({'roles':role});
        contxt.tableRefernceSM.handleFilterData({'roles':role});
      }
      contxt.props.lastUserOps.searchCat = roleDPLevel;
      contxt.props.lastUserOps.searchRole = role;
      contxt.props.lastUserOps.searchEmail = searchEmail;
      contxt.props.lastUserOps.sortedCol = contxt.props.lastUserOps.sortedCol ;
      contxt.props.lastUserOps.sortedOrder = contxt.props.lastUserOps.sortedOrder ;
      const paginationPayload = { PaginationProps: contxt.props.lastUserOps };
      contxt.props.submitLastPagination(paginationPayload);
    }

    return (
      <div className="row-flex">
        <div className="col-xl-12 pl-0 pr-0 order-mb-first">
          <h3>User List</h3>
        </div>
        <div className="col-md-6 pl-0 spaceTop spacerBottom48 order-mb-last">
          <div className="selectedTraits position-relative top15 spaceBottom">
            <h3 className="border-bottom-0 float-left mr-2 ">
              Filter by Role:
            </h3>
            <div className="dropdown customDropdown show float-left">
              {this.getUserSelecctedRolePanel()}
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className={this.getDrpDnClass(0)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'admin', 0)}
                  ref={this.loadDropDownRefs} >
                  <span>ADMIN</span>
                </a>
                <a className={this.getDrpDnClass(1)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'Audience Builder', 1)}
                  ref={this.loadDropDownRefs} >
                  <span>AUDIENCE BUILDER</span>
                </a>
                <a className={this.getDrpDnClass(2)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'ad ops', 2)}
                  ref={this.loadDropDownRefs} >
                  <span>AD OPS</span>
                </a>
                
                <a className={this.getDrpDnClass(3)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'beta tester', 3)}
                  ref={this.loadDropDownRefs} >
                  <span>BETA TESTER</span>
                </a>
                <a className={this.getDrpDnClass(4)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'Campaign Request', 4)}
                  ref={this.loadDropDownRefs} >
                  <span>CAMPAIGN REQUEST</span>
                </a>
                <a className={this.getDrpDnClass(5)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'CRM Uploader', 5)}
                  ref={this.loadDropDownRefs} >
                  <span>CRM UPLOADER</span>
                </a>
                <a className={this.getDrpDnClass(6)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'Domo User', 6)}
                  ref={this.loadDropDownRefs} >
                  <span>DOMO USER</span>
                </a>
                <a className={this.getDrpDnClass(7)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'Reporting', 7)}
                  ref={this.loadDropDownRefs} >
                  <span>REPORTING</span>
                </a>
                <a className={this.getDrpDnClass(8)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'Requester', 8)}
                  ref={this.loadDropDownRefs} >
                  <span>REQUESTER</span>
                </a>
                <a className={this.getDrpDnClass(9)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, 'Request Manager', 9)}
                  ref={this.loadDropDownRefs} >
                  <span>REQUEST MANAGER</span>
                </a>
                <a className={this.getDrpDnClass(10)}
                  href="javascript:void(0);"
                  onClick={search.bind(this, '', 10)}
                  ref={this.loadDropDownRefs}>
                  <span>ALL ROLES</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-8 col-sm-12 col-12 pl-0 pr-0 top15 searchPanel order-mb-1 ">
            <input
              type="text"
              placeholder="Search user by email"
              name="search"
              onChange={searchByText}
              ref={this.loadDropDownRefs} 
            />
             <i className="searchBtnInactive float-right" />
           
          </div>
        </div>
        <div className="col-md-6 pr-0 pl-0 spaceTop spaceBottom  order-mb-0">
          <a className="btn btnPrimary float-xl-right float-md-right"
            href="javascript:void(0);"
            role="button"
            onClick={this.createNewUser} >
            Create New User
          </a>
        </div>
      </div>
    );
  };

  /*
        Sorting icons
    */
  changeCaret(order: any, column: any) {

    if (order && order === 'desc') {
      return <i className="descSort float-right" />;
    } else if (order && order === 'asc') {
      return <i className="ascSort float-right" />;
    }
    return <i className="sortInactive float-right" />;
  }

  getColViewPerBreakpoint(cell: any, row: any, enumObject: any) {
    return (
      <span>
        <span className="d-desk-none d-ipad-block d-mb-block">
          {this.getAllColView(cell, row, enumObject)}
        </span>
        <span className="visible-lg">{cell.toString()}</span>
      </span>
    );
  }

  getAllColView(cell: any, row: any, enumObject: any) {
    return (
      <div className="listA">
        <div className="row-flex">
          <div className="col-md-4 pl-0 pr-0">
            <span>First Name: </span>
            <span> {row.firstName} </span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Last Name: </span>
            <span> {row.lastName}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Last Active: </span>
            <span> {row.lastActiveTs}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Email: </span>
            <span> {row.email}</span>
          </div>
          <div className="col-md-12 mt-4 pl-0 pr-0 smallBtnPanel">
            <a
              className="btn btnSmall-secondary mr-lg-2"
              href="javascript:void(0);"
              role="button"
              onClick={this.handleSubmit.bind(this, row, ConstAction.EDIT)}
            >
              EDIT
            </a>
            {this.getDeleteButton(row)}
          </div>
        </div>
      </div>
    );
  }

  formatNumber(cell: any, row: any, formatExtraData: any, index: any) {
    const style = formatExtraData === this.sortedColumn ? ' boldText ' : '';

    return (
      <span className={style}>
        <FormattedNumber
          value={cell.toString()}
          style="decimal"
          minimumFractionDigits={0}
          maximumFractionDigits={0}
        />
      </span>
    );
  }

  getSortedStyle(cell: any, row: any, formatExtraData: any, index: any) {
    const style = formatExtraData === this.sortedColumn ? ' boldText ' : '';

    const val = cell ? cell.toString() : '';
    return <span className={style}>{val}</span>;
  }

  getDateSortedFormat(cell: any, row: any, formatExtraData: any, index: any) {
    const style = formatExtraData === this.sortedColumn ? ' boldText ' : '';
    const respDate = getAudienceCreationDate(cell.toString());
    return <span className={style}>{respDate}</span>;
  }

  initTabSwitch() {
    const dummyUserObj = {
      UserAction: 'SlickPosition',
      selectedTab: NavBarConstants.ADMINADDUSER,
      slickIdx: NavBarConstants.ADMINADDUSER
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.history.push('/AddUser');
  }

  createNewUser() {
    this.props.handleEditAudienceAction(false, null, this.props.history);
    this.initTabSwitch();
  }

  public handleSubmit(rowContent: any, action: any, evt: any) {
    if (action === ConstAction.DELETE) {
      Logger.getInstance().printDebugLogs(rowContent);
      rowContent['deleteInvokedBy'] = 'AdminUser';
      this.props.handleDialogSubmitAction(true, rowContent);
    } else if (action === ConstAction.EDIT) {
      this.props.handleEditAudienceAction(true, rowContent, this.props.history);
      this.initTabSwitch();
      // this.props.history.push("/AudienceSizer");
    }
    Logger.getInstance().printDebugLogs('Handle');
  }

  getDeleteButton(row: any) {
    if (
      this.props.UserRole.hasOwnProperty('loggedInUserEmail') &&
      this.props.UserRole.loggedInUserEmail.toUpperCase() ===
        row.email.toUpperCase()
    ) {
      return (
        <a
          className="btn btnSmall-primary disabled"
          href="javascript:void(0);"
          role="button"
          aria-disabled="true"
        >
          DELETE
        </a>
      );
    } else {
      return (
        <a
          className="btn btnSmall-primary"
          href="javascript:void(0);"
          role="button"
          data-toggle="modal"
          data-target="#deleteAudienceModal"
          data-backdrop="static"
          onClick={this.handleSubmit.bind(this, row, ConstAction.DELETE)}
        >
          DELETE
        </a>
      );
    }
  }

  /*
    Last column view/launch
    */
  getActionControls(cell: any, row: any, formatExtraData: any) {
    return (
      <span>
        <a
          className="btn btnSmall-secondary mr-lg-2"
          href="javascript:void(0);"
          role="button"
          onClick={this.handleSubmit.bind(this, row, ConstAction.EDIT)}
        >
          EDIT
        </a>
        {this.getDeleteButton(row)}
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

  public isUserHavingAdminRoles() {
    if (
      this.props.UserRole &&
      this.props.UserRole.hasOwnProperty('roles') &&
      this.props.UserRole.roles
    ) {
      const index = this.props.UserRole.roles.findIndex(
        (obj: any) => obj == UserOps.ADMIN
      );
      if (index >= 0) {
        return true;
      }
    }
    return false;
  }

  onSortChange(sortName:any, sortOrder:any) {
    this.sortedColumn = sortName;
    this.props.lastUserOps.sortedCol = sortName;
    this.props.lastUserOps.sortedOrder = sortOrder;
    const paginationPayload = { PaginationProps: this.props.lastUserOps };
    this.props.submitLastPagination(paginationPayload);

  }

  /*pagination Starts */
  updatePageModel(payload: any) {
    this.pageObject = payload;
    payload['searchCat'] = this.props.lastUserOps.searchCat;
    payload['sortedCol'] = this.props.lastUserOps.sortedCol;
    payload['sortedOrder'] = this.props.lastUserOps.sortedOrder;
    payload['searchRole'] = this.props.lastUserOps.selectedRole;
    payload['searchEmail']=   this.props.lastUserOps.searchEmail;
    const paginationPayload = { PaginationProps: payload };
    // console.log("updatePageModel Userlist Payload ",paginationPayload.PaginationProps)
    this.props.submitLastPagination(paginationPayload);
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

  loadPagniationPreset() {
    const contxt = this;

    this.timer = setTimeout(function() {
      if (
        contxt.props.lastUserOps.searchCat &&
        contxt.props.lastUserOps.searchCat !== ''
      ) {
        const comp = contxt.dropDownRef[contxt.props.lastUserOps.searchCat];
        if(comp)
          comp.click();
      }
      if (
        contxt.props.lastUserOps.searchEmail &&
        contxt.props.lastUserOps.searchEmail !== ''
      ) {
        const userSearch = contxt.dropDownRef[AdminUserList.EMAILTEXTCODE];
        if(userSearch) {
          const valueSetter = Object.getOwnPropertyDescriptor(userSearch, "value").set;
          const prototype = Object.getPrototypeOf(userSearch);
          const prototypeValueSetter = Object.getOwnPropertyDescriptor(
            prototype,
            "value"
          ).set;

          if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(userSearch,  contxt.props.lastUserOps.searchEmail);
          } else {
            valueSetter.call(userSearch, contxt.props.lastUserOps.searchEmail);
          }

          let event = new Event('input', { 'bubbles': true, 'cancelable': true });
          
          userSearch.dispatchEvent(event); 
        }
         

      }
      clearTimeout(contxt.timer);
    }, 500);
  }

  /*Pagination Ends */

  public render() {
    if (!this.isUserHavingAdminRoles()) {
      this.props.history.push('/');
    }
    const tableInput = {
      tableContent: this.props.usersList,
      tableContents: [
        {
          dataField: 'firstName',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'firstName',
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: 'First Name',
          hidden: false,
          isKey: false
          // filter:{ type: 'TextFilter', placeholder: 'Please enter a value' }
        },
        {
          dataField: 'lastName',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'lastName',
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: { border: '1px solid #414042!' },
          Title: 'Last Name',
          hidden: false,
          isKey: false
          // filter:{ type: 'TextFilter', placeholder: 'Please enter a value' }
          
        },
        {
          dataField: 'lastActiveTs',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'lastActiveTs',
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: 'Last Active',
          isKey: false
        },
        {
          dataField: 'email',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'email',
          customSortStyle: this.customSortStyle,
          searchable: true,
          tdStyle: {},
          Title: 'Email',
          hidden: false,
          isKey: true
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
        },
        {
          dataField: 'roles',
          dataSort: true,
          caretRender: false,
          dataFormat: false,
          formatExtraData: '',
          sortHeaderColumnClassName: false,
          className: false,
          columnClassName: false,
          searchable: true,
          tdStyle: {},
          Title: '',
          hidden: true,
          isKey: false
        }
      ],
      pagination: true,
      search: true,
      tableRef:this.loadTableRefs,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: AdminUserList.MAX_ROWSIZE,
        defaultSortName:  this.props.lastUserOps.sortedCol,
        defaultSortOrder:this.props.lastUserOps.sortedOrder,
        searchPosition: 'left',
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar,
        onSortChange:this.onSortChange
      },
      bordered: false,
      multiColumnSearch: false,
    
    };
    const tableInputSmall = {
      tableContent: this.props.usersList,
      tableContents: [
        {
          dataField: 'email',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getAllColView,
          formatExtraData: 'email',
          customSortStyle: this.customSortStyle,
          searchable: true,
          Title: 'Name',
          hidden: false,
          isKey: true
        },
        {
          dataField: 'roles',
          dataSort: true,
          caretRender: false,
          dataFormat: false,
          formatExtraData: '',
          sortHeaderColumnClassName: false,
          className: false,
          columnClassName: false,
          searchable: true,
          tdStyle: {},
          Title: '',
          hidden: true,
          isKey: false
        }
      ],
      pagination: true,
      search: true,
      tableRef:this.loadTableRefSMDevices,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        defaultSortName: 'email',
        defaultSortOrder: 'desc',
        hideSizePerPage: true,
        sizePerPage: AdminUserList.MAX_ROWSIZE,
        searchPosition: 'left',
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar,
        onSortChange:this.onSortChange
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
            <div className="d-desk-block d-ipad-none d-mb-none table-responsive-xl tableRedui">
              <TableComponent tableInput={tableInput} />
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
      </main>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    usersList: state.AdminUserUserListControlState.hasOwnProperty('UsersList')
      ? state.AdminUserUserListControlState.UsersList
      : List([
          {
            email: '',
            company: null,
            userId: 0,
            firstName: '',
            lastName: '',
            roles: ['']
          }
        ]),
    UserRole:
      state.AdminUserControlState.hasOwnProperty('UserProfile') &&
      state.AdminUserControlState.UserProfile
        ? state.AdminUserControlState.UserProfile
        : {
            email: '',
            company: null,
            userId: null,
            firstName: '',
            lastName: '',
            roles: ["Audience Builder", "Campaign Request","Reporting", "Requester"]
          },
    lastUserOps: state.AdminUserTraitListPaginationControlState.hasOwnProperty(
      'PaginationProps'
    )
      ? state.AdminUserTraitListPaginationControlState.PaginationProps
      : { currPage: 1, maxPageSize: 6, pageStartIndex: 1, searchCat: 10,   sortedCol: "firstName", sortedOrder:"desc",selectedRole:"" }
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      handleSubmit: (dummyUserObj: any) => {
        dispatch(slickStateAction(dummyUserObj));
      },
      handleDialogSubmitAction: (show: boolean, rowContent: any) => {
        const payload = {
          Dialog: {
            isVisible: show,
            content: rowContent,
            Message: 'Are you sure you want to delete this user?'
          }
        };
        dispatch(submitUIConfigAction(payload));
      },
      handleEditAudienceAction: (
        editAudience: boolean,
        rowContent: any,
        histry: any
      ) => {
        const payload = { data: rowContent };
        dispatch(sendAdminUserEditAction(payload));
      },
      submitToggleSwitchAction: (payload: any) => {
        dispatch(setToggleStateAction(payload));
      },
      showMethdology(messageBoxObj: any) {
        dispatch(submitUIConfigAction(messageBoxObj));
      },
      submitLastPagination(payload: any) {
        dispatch(sendAdminAudienceTraitPaginationAction(payload));
      }
    };
  }
)(AdminUserList);

interface IAdminUserList extends React.FC<any> {
  handleSubmit: any;
  handleChange: any;
  loggingIn: any;
  usersList: any;
  UserRole: any;
  errorMessage: any;
  handleDialogSubmitAction?: any;
  handleEditAudienceAction?: any;
  lastUserOps?: any;
  submitLastPagination?: any;
  history: any;
}
