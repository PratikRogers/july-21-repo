/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

import {
  slickStateAction,
  submitUIConfigAction,
  setToggleStateAction,
  sendAdminUserEditAction,
  sendAdminAudienceTraitEditAction,
  sendAdminAudienceTraitPaginationAction,
  calendarChangeAction
} from '../../Actions';
import { NavBarConstants } from '../../ConstConfig';
import { FormattedNumber } from 'react-intl';
import { ConstAction } from '../../ConstConfig/ConstAction';
import ConfirmDialog from '../../CommonComponent/ConfirmDialog';
import Logger from '../../rogersframework/Logger/Logger';
import { getAudienceCreationDate, convertToDate } from '../utils/dashboardValidation';

import { UserOps } from '../../ConstConfig/UserOps';
import '../../CSS/Audiences.css';
import { List } from 'immutable';
import Pagination from '../../CommonComponent/Pagination/Pagination';
import { PageModel } from '../../CommonModels/PageModel';
import TableComponent from '../../CommonComponent/Table/TableComponent';
import MessageBox from '../../CommonComponent/MessageBox';
import { getAlertDate,getMaxCampaignDate } from 'src/CommonComponent/Calendar/utils/CampaignUtil';

class AdminAudienceSegment extends React.Component<IAdminAudienceSegment, {}> {
  private searchText: any;
  private tableProps: any;
  private pageObject: any;
  private sortedColumn: any;
  private selectedRole: any;
  private static MAX_ROWSIZE = 25;
  private timer: any;
  private tableRef: any;
  private dropDownRef: any;
  private rtBtstrpTableRef:any;

  constructor(props: any) {
    super(props);
    this.getActionControls = this.getActionControls.bind(this);
    this.createNewTrait = this.createNewTrait.bind(this);
    this.getColViewPerBreakpoint = this.getColViewPerBreakpoint.bind(this);
    this.renderPaginationPanel = this.renderPaginationPanel.bind(this);
    this.searchTextInTable = this.searchTextInTable.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.customSortStyle = this.customSortStyle.bind(this);
    this.getSortedStyle = this.getSortedStyle.bind(this);
    this.getDateSortedFormat = this.getDateSortedFormat.bind(this);
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

    this.tableRef = [];
    this.dropDownRef = [];
    this.timer = null;
    this.searchText = null;
    this.sortedColumn = 'segmentName';
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



  searchTextInTable() {
    if (this.searchText && this.searchText != '')
      this.tableProps.search(this.searchText);
  }

  /*
        Search Panel
    */
  getUserSelecctedRolePanel() {
    let roleTag = 'All ';
    let roleTxt = ' CATEGORY';
    if (this.selectedRole !== null) {
      roleTag = ' ';
      roleTxt = this.selectedRole === '' ? 'All Categories' : this.selectedRole;
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
              placeholder="Search trait by name"
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
        <div className="col-md-6 pr-0 pl-0 spaceTop spaceBottom spacerBottom0 order-mb-0">
          <a
            className="btn btnPrimary float-xl-right float-md-right"
            href="javascript:void(0);"
            role="button"
            onClick={this.createNewTrait}
          >
            Create New
          </a>
        </div>
      </div>
    );
  };

  /*
        Sorting icons
    */
  changeCaret(order: any, column: any) {}

  getColViewPerBreakpoint(cell: any, row: any, enumObject: any) {
    return <span className="visible-lg">{cell.toString()}</span>;
  }

  getAllColView(cell: any, row: any, enumObject: any, index: any) {
    const rIndex = this.tableRef.findIndex(
      (obj: any) => obj.segmentId === row.segmentId
    );
    const dialogToOpen = this.isCustomTrait(row.traitType)
      ? '#messageBoxGeneric'
      : '#deleteAudienceModal';
    const emitMethod = this.isCustomTrait(row.traitType)
      ? ConstAction.RESTRICTMSG
      : ConstAction.DELETE; //
    if (rIndex < 0) {
      this.tableRef.push(row);
    }
    return (
      <div className="listA">
        <div className="row-flex">
          <div className="col-md-4 pl-0 pr-0">
            <span>Name: </span>
            <span> {row.segmentName} </span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Category: </span>
            <span> {row.segmentType}</span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>Source: </span>
            <span> {row.traitType}</span>
          </div>

          <div className="col-md-12 mt-4 pl-0 pr-0 smallBtnPanel">
            <a
              className="arrowUp mr-lg-2"
              title="move up"
              onClick={this.handleSubmit.bind(
                this,
                row,
                ConstAction.MOVEUP,
                index
              )}
            />
            <a
              className="arrowDown mr-lg-2"
              title="move down"
              onClick={this.handleSubmit.bind(
                this,
                row,
                ConstAction.MOVEDOWN,
                index
              )}
            />
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
              data-target={dialogToOpen}
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
      selectedTab: NavBarConstants.ADMINAUDIENCESEGMENT,
      slickIdx: NavBarConstants.ADMINAUDIENCESEGMENT
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.history.push('/AdminAudienceSegment');
  }

  createNewTrait() {
    this.props.handleEditAudienceAction(false, null, this.props.history);
    let usrSelectedDates = {startDate :{date:getAlertDate()},endDate:{date:getMaxCampaignDate(),isDefault:true}};
    this.props.submitSegmentEditDates(usrSelectedDates);
    this.initTabSwitch();
  }

  public getSegmentId(index: any) {
    if (this.tableRef.length >= index) {
      return this.tableRef[index].segmentId;
    }
    return '';
  }

  public handleSubmit(rowContent: any, action: any, index: any, evt: any) {
    switch (action) {
      case ConstAction.DELETE:
        rowContent['deleteInvokedBy'] = 'AudienceTrait';
        this.props.handleDialogSubmitAction(true, rowContent);
        break;
      case ConstAction.EDIT:
        if(rowContent.startDate && rowContent.endDate) {
          let startDate = convertToDate(rowContent.startDate,false);
          let endDate = convertToDate(rowContent.endDate,false);
          let usrSelectedDates = {startDate :{date:startDate},endDate:{date:endDate,isDefault:false}};
          this.props.submitSegmentEditDates(usrSelectedDates);
        }
        this.props.handleEditAudienceAction(
          true,
          rowContent,
          this.props.history
        );
        this.initTabSwitch();
        break;
      case ConstAction.MOVEUP:
        if (index === 0) {
          return;
        }
        const payloadMvUp = {
          firstSegmentId: this.getSegmentId(index),
          secondSegmentId: this.getSegmentId(index - 1),
          userAction: UserOps.TRAIT_MOVE_UP
        };
        this.props.handleAudienceSortAction(
          true,
          payloadMvUp,
          this.props.history
        );
        break;
      case ConstAction.MOVEDOWN:
        const payloadMvDwn = {
          firstSegmentId: this.getSegmentId(index),
          secondSegmentId: this.getSegmentId(index + 1),
          userAction: UserOps.TRAIT_MOVE_DOWN
        };
        this.props.handleAudienceSortAction(
          true,
          payloadMvDwn,
          this.props.history
        );
        break;

      case ConstAction.RESTRICTMSG:
        this.props.handleMessageBoxAction(rowContent);
      default:
        break;
    }

    Logger.getInstance().printDebugLogs('Handle');
  }

  /*
    Last column view/launch
    */

  isCustomTrait(traitType: any) {
    const trType = traitType.toUpperCase();
    if (trType === 'S' || trType === 'CUSTOM') {
      return true;
    }
    return false;
  }

  getActionControls(cell: any, row: any, formatExtraData: any, index: any) {
    const rIndex = this.tableRef.findIndex(
      (obj: any) => obj.segmentId === row.segmentId
    );
    const dialogToOpen = this.isCustomTrait(row.traitType)
      ? '#messageBoxGeneric'
      : '#deleteAudienceModal';
    const emitMethod = this.isCustomTrait(row.traitType)
      ? ConstAction.RESTRICTMSG
      : ConstAction.DELETE; //
    if (rIndex < 0) {
      this.tableRef.push(row);
    }
    return (
      <span>
        <a
          className="arrowUp mr-lg-2"
          title="move up"
          onClick={this.handleSubmit.bind(this, row, ConstAction.MOVEUP, index)}
        />
        <a
          className="arrowDown mr-lg-2"
          title="move down"
          onClick={this.handleSubmit.bind(
            this,
            row,
            ConstAction.MOVEDOWN,
            index
          )}
        />
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
          data-target={dialogToOpen}
          data-backdrop="static"
          onClick={this.handleSubmit.bind(this, row, emitMethod)}
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
        console.debug(this.rtBtstrpTableRef);
        return true;
      }
    }
    return false;
  }

  /*pagination Starts */
  updatePageModel(payload: any) {
    this.pageObject = payload;
    payload['searchCat'] = this.props.lastUserOps.searchCat;
    const paginationPayload = { PaginationProps: payload };
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
  /*Pagination Ends */

  loadPagniationPreset() {
    const contxt = this;
    this.timer = setTimeout(function() {
      if (
        contxt.props.lastUserOps.searchCat &&
        contxt.props.lastUserOps.searchCat !== ''
      ) {
        contxt.tableProps.search(contxt.props.lastUserOps.searchCat);
        if (contxt.props.lastUserOps.searchCat === '') {
        } else if (contxt.props.lastUserOps.searchCat !== '') {
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
      this.props.history.push('/');
    }
    const tableInput = {
      tableContent: this.props.usersList,
      tableContents: [
        {
          dataField: 'seqNo',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'seqNo',
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: 'seqNo',
          hidden: true,
          isKey: true
        },
        {
          dataField: 'segmentName',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'segmentName',
          customSortStyle: this.customSortStyle,
          searchable: true,
          Title: 'Segment Name',
          hidden: false,
          isKey: false
        },
        {
          dataField: 'segmentType',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'segmentType',
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: { border: '1px solid #414042!' },
          Title: 'Category',
          hidden: false,
          isKey: false
        },
        {
          dataField: 'traitType',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'traitType',
          customSortStyle: this.customSortStyle,
          searchable: false,
          tdStyle: {},
          Title: 'Data Source',
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
        sizePerPage: AdminAudienceSegment.MAX_ROWSIZE, // which size per page you want to locate as default
        defaultSortName: 'seqNo',
        defaultSortOrder: 'asc',
        searchPosition: 'left',
        renderPaginationPanel: this.renderPaginationPanel,
        customSerachPanel: this.customSerachPanel,
        createCustomToolBar: this.createCustomToolBar,
        
      },
      bordered: false,
      multiColumnSearch: false,
    };
    const tableInputSmall = {
      tableContent: this.props.usersList,
      tableContents: [
        {
          dataField: 'seqNo',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'seqNo',
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: 'seqNo',
          hidden: true,
          isKey: false
        },
        {
          dataField: 'segmentName',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getAllColView,
          formatExtraData: 'segmentName',
          customSortStyle: this.customSortStyle,
          searchable: false,
          Title: 'Segment Name',
          hidden: false,
          isKey: false
        },
        {
          dataField: 'segmentType',
          dataSort: true,
          changeCaret: this.changeCaret,
          dataFormatMethod: this.getSortedStyle,
          formatExtraData: 'segmentType',
          customSortStyle: this.customSortStyle,
          searchable: true,
          tdStyle: { border: '1px solid #414042!' },
          Title: 'Category',
          hidden: true,
          isKey: true
        }
      ],
      pagination: true,
      search: true,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: AdminAudienceSegment.MAX_ROWSIZE, // which size per page you want to locate as default
        defaultSortName: 'seqNo',
        defaultSortOrder: 'asc',
        searchPosition: 'left',
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
            <h3>Audience Traits</h3>
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
    usersList: state.AdminUserTraitListControlState.hasOwnProperty('TraitsList')
      ? state.AdminUserTraitListControlState.TraitsList
      : List([]),
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
            roles: ['user']
          },
    lastUserOps: state.AdminUserTraitListPaginationControlState.hasOwnProperty(
      'PaginationProps'
    )
      ? state.AdminUserTraitListPaginationControlState.PaginationProps
      : { currPage: 1, maxPageSize: 6, pageStartIndex: 1, searchCat: '' }
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
            Message:
              'Are you sure you want to delete this segment ' +
              rowContent.segmentName +
              ' ?'
          }
        };
        dispatch(submitUIConfigAction(payload));
      },
      handleMessageBoxAction: (rowContent: any) => {
        const messageBoxObj = {
          Dialog: {
            MessageBox: {
              isVisible: true,
              UserMessage: ' Can not delete the trait due to restriction',
              saveFailed: false,
              boxButtons: UserOps.OK,
              messageHead: 'Error!'
            }
          }
        };
        dispatch(submitUIConfigAction(messageBoxObj));
      },
      handleEditAudienceAction: (
        editAudience: boolean,
        rowContent: any,
        histry: any
      ) => {
        const payload = { data: rowContent };
        dispatch(sendAdminUserEditAction(payload));
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
      submitSegmentEditDates(payload:any) {
      
            dispatch(calendarChangeAction(payload));
      }
    };
  }
)(AdminAudienceSegment);

interface IAdminAudienceSegment extends React.FC<any> {
  handleSubmit: any;
  handleChange: any;
  loggingIn: any;
  usersList: any;
  UserRole: any;
  errorMessage: any;
  handleDialogSubmitAction?: any;
  handleEditAudienceAction?: any;
  handleAudienceSortAction?: any;
  handleMessageBoxAction?: any;
  lastUserOps?: any;
  submitLastPagination?: any;
  submitSegmentEditDates?:any;
  history: any;
}
