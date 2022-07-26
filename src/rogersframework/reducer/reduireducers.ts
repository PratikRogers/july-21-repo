/* eslint-disable */
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import ActionConstants from "../../ConstConfig/ActionConstants";

const rootReducer = combineReducers<any>({
  increaseCounter: handleActions<any>(
    {
      ["INCREMENT"]: (state, { payload: {} }) => {
        return { count: state.count + 1 };
      },
    },
    { count: 0 }
  ),
  setInitState: handleActions<any>(
    {
      ["SET_INIT"]: (state, { payload: {} }) => {
        return { ...state, status: "Init" };
      },
    },
    { count: 0 }
  ),
  slickState: handleActions<any>(
    {
      ["CHANGE_SLICK"]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  showErrorBoxState: handleActions<any>(
    {
      ["SHOW_ERROR_SCREEN"]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),

  configState: handleActions<any>(
    {
      // [ActionConstants.ChangeConfig]: (state, { payload: data }) => data,
      [ActionConstants.UIConfig]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),

  FlyoutConfigState: handleActions<any>(
    {
      // [ActionConstants.ChangeConfig]: (state, { payload: data }) => data,
      [ActionConstants.FLYOUTCONFIG]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),

  SpinnerState: handleActions<any>(
    {
      // [ActionConstants.ChangeConfig]: (state, { payload: data }) => data,
      [ActionConstants.SpinnerConfig]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),

  userAuth: handleActions<any>(
    {
      ["USER_ENTRIES"]: (state, { payload: data }) => {
        return { ...state, data };
      },
      [ActionConstants.UserLogin]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  DDZoneState: handleActions<any>(
    {
      ["DROP_INDDZONE"]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  WizardStateHandle: handleActions<any>(
    {
      ["SEGMENT_REQ"]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  DragZoneContent: handleActions<any>(
    {
      ["DRAGITEM"]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  WizardPageStats: handleActions<any>(
    {
      ["WIZARDSTATS"]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  SizingCountStats: handleActions<any>(
    {
      ["SIZING_RESPONSE"]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  AudiencesState: handleActions<any>(
    {
      [ActionConstants.Audiences]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AudiencesStatusState: handleActions<any>(
    {
      [ActionConstants.AudienceStatus]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  DashboardState: handleActions<any>(
    {
      [ActionConstants.DashboardDateControl]: (state, { payload: data }) =>
        data,
    },
    { count: 0 }
  ),
  CampaignState: handleActions<any>(
    {
      [ActionConstants.CAMPAIGNCONTROL]: (state, { payload: data }) => data,
      [ActionConstants.CREATECAMPAIGN]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  toggleSwitchState: handleActions<any>(
    {
      [ActionConstants.TOGGLE_BUTTON_STATE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  GeoMapState: handleActions<any>(
    {
      [ActionConstants.GEOMAP_STATE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  GeoMapAPIState: handleActions<any>(
    {
      [ActionConstants.GEOMAP_APISTATE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  feedBackState: handleActions<any>(
    {
      [ActionConstants.SEND_FEEDBACK]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  InsightsState: handleActions<any>(
    {
      [ActionConstants.INSIGHT_STATE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  DashboardGenderDataState: handleActions<any>(
    {
      [ActionConstants.DashboardGenderState]: (state, { payload: data }) =>
        data,
    },
    { count: 0 }
  ),
  DashboardPreflightDataState: handleActions<any>(
    {
      [ActionConstants.PREFLIGHT_GENDATA]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  LineChartDataState: handleActions<any>(
    {
      [ActionConstants.LINECHART]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  InsightsAPIState: handleActions<any>(
    {
      [ActionConstants.INSIGHT_API_STATE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  ProgressBarState: handleActions<any>(
    {
      [ActionConstants.PROGRESS_BAR_STATE]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  CalendarControlState: handleActions<any>(
    {
      [ActionConstants.CALENDAR_STATE]: (state, { payload: data }) => {
        return { ...state, data };
      },
    },
    { count: 0 }
  ),
  AdminUserControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_USER_FETCH_ROLE]: (state, { payload: data }) =>
        data,
    },
    { count: 0 }
  ),
  AdminUserEditControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_USER_EDIT]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AdminUserDeleteControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_USER_DELETE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),

  AdminUserAddControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_USER_ADD]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AdminUserUserListControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_USER_LISTING]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AdminUserTraitControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_TRAIT_ADD]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AdminUserTraitListControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_TRAIT_LISTING]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AdminUserTraitEditControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_TRAIT_EDIT]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  AdminUserTraitDeleteControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_TRAIT_DELETE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  ReportingControlState: handleActions<any>(
    {
      [ActionConstants.REPORT_RESPONSE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  ReportingListState: handleActions<any>(
    {
      [ActionConstants.REPORT_LISTRESPONSE]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  ReportingDownloadState: handleActions<any>(
    {
      [ActionConstants.REPORT_DOWNLOAD]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  CampaignDALStatus: handleActions<any>(
    {
      [ActionConstants.CAMPAIGNDAL]: (state, { payload: data }) => data,
      [ActionConstants.CAMPAIGNSTATUS]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  RequestsDALStatus: handleActions<any>(
    {
      [ActionConstants.DAL_REQUESTS]: (state, { payload: data }) =>
        data,
      [ActionConstants.IND_REQUESTS]: (state, { payload: data }) =>
        data,
    },
    { count: 0 }
  ),
  AdminUserTraitListPaginationControlState: handleActions<any>(
    {
      [ActionConstants.ADMIN_TRAIT_PAGINATION]: (state, { payload: data }) =>
        data,
    },
    { count: 0 }
  ),
  UploadCRMState: handleActions<any>(
    {
      [ActionConstants.UPLOADCRM]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  ProgressCRMState: handleActions<any>(
    {
      [ActionConstants.PROGRESS]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  CRMSMessagetate: handleActions<any>(
    {
      [ActionConstants.CRMMSG]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  CRMSListState: handleActions<any>(
    {
      [ActionConstants.CRMLISTSTAT]: (state, { payload: data }) => data,
    },
    { count: 0 }
  ),
  RequestsSubmitState: handleActions<any>(
    {
      [ActionConstants.SUBMIT_REQUESTS]: (
        state,
        { payload: data }) => data,
    },
    { count: 0 }
  ),
  RoleBasedConfiguration: handleActions<any>(
    {
      [ActionConstants.ROLECONFIG]: (state, { payload: data }) =>
        data,
    },
    { count: 0 }
  ),
  RequestsStats: handleActions<any>(
    {
      [ActionConstants.SHOWALL_REQUESTS]: (
        state,
        { payload: data }
      ) => data,
    },
    { count: 0 }
  ),
  RequestersListStats: handleActions<any>(
    {
      [ActionConstants.REQUESTERSRECENT_REQUESTS]: (
        state,
        { payload: data }
      ) => data,
    },
    { count: 0 }
  ),

  RequestsUpdateState: handleActions<any>(
    {
      [ActionConstants.UPDATE_REQUESTS]: (
        state,
        { payload: data }
      ) => data,
    },
    { count: 0 }
  ),
  RequestsDownload: handleActions<any>(
    {
      [ActionConstants.DOWNLOAD_REQUEST]: (
        state,
        { payload: data }
      ) => data,
    },
    { count: 0 }
  ),
  CRMCanListState: handleActions<any>(
    {
      [ActionConstants.CRMCANLIST]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  
  DashbardChartStats: handleActions<any>(
    {
      [ActionConstants.DASHBOARD_CHARTS]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  // 2944
  AdminCynchAttribListControlState: handleActions<any>(
    {
      [ActionConstants.CYNCHATTRIBUTES]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminCynchAttribCategoryState: handleActions<any>(
    {
      [ActionConstants.CYNCHATTRIUPDATE]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminCynchAttribOperationState: handleActions<any>(
    {
      [ActionConstants.CYNCHOPERATION]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminCynchAttribEditOperationState: handleActions<any>(
    {
      [ActionConstants.CYNCHEDIT]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminCynchAttribParentUpdateState: handleActions<any>(
    {
      [ActionConstants.CYNCHCATPARENT]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminQueryAudienceListState: handleActions<any>(
    {
      [ActionConstants.QUERYSEGMENTIDSLIST]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminQueryAudienceSaveState: handleActions<any>(
    {
      [ActionConstants.QUERYSEGMENTIDSAVE]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminQueryAudienceEditState: handleActions<any>(
    {
      [ActionConstants.QUERYSEGMENTIDEDIT]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminQueryAudienceDeleteState: handleActions<any>(
    {
      [ActionConstants.QUERYSEGMENTIDDELETE]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  
  AdminTVOrdersListState: handleActions<any>(
    {
      [ActionConstants.DISPLAYALLTVORDERS]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminTVOrdersSaveState: handleActions<any>(
    {
      [ActionConstants.SAVETVORDER]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminTVOrdersEditState: handleActions<any>(
    {
      [ActionConstants.EDITTVORDERS]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminTVOrdersDeleteState: handleActions<any>(
    {
      [ActionConstants.DELETETVORDER]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  
  //RED-3264
  
  AdminCoreConfigListState: handleActions<any>(
    {
      [ActionConstants.LOADCONFIG]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminCoreConfigSaveState: handleActions<any>(
    {
      [ActionConstants.SAVECONFIG]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
   
  AdminCoreConfigGetState: handleActions<any>(
    {
      [ActionConstants.LISTALLCONFIG]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  
  //RED-3477
  
  AdminDomoConfigListState: handleActions<any>(
    {
      [ActionConstants.LOADDOMOCONFIG]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminDomoConfigSaveState: handleActions<any>(
    {
      [ActionConstants.SAVEDOMOCONFIG]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
   
  AdminDomoConfigGetState: handleActions<any>(
    {
      [ActionConstants.LISTDOMOCONFIG]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  
  //RED-3458 Create Domo query manager in admin
  
  AdminDomoQueryListState: handleActions<any>(
    {
      [ActionConstants.DISPLAYALLDOMOQUERIES]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminDomoSaveState: handleActions<any>(
    {
      [ActionConstants.SAVEDOMOQUERY]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminDomoQueryEditState: handleActions<any>(
    {
      [ActionConstants.EDITDOMOQUERY]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  AdminDomoQueryDeleteState: handleActions<any>(
    {
      [ActionConstants.DELETEDOMOQUERY]: (state, { payload: data }) =>
        data
    },
    { count: 0 }
  ),
  ReportingConfigState: handleActions<any>(
    {
      [ActionConstants.REPORTINGSTATUS]: (state, { payload: data }) => data,
      [ActionConstants.SETREPORTINGSTATUS]: (state, { payload: data }) => data
    },
    { count: 0 }
  ),




});

export default rootReducer;
//
