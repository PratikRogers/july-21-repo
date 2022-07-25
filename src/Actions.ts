/* eslint-disable */
import { createAction } from "redux-actions";
import ActionConstants from "./ConstConfig/ActionConstants";
export const setInitializing = createAction<void>("SET_INIT");
export const showErrorBox = createAction<any>("SHOW_ERROR_SCREEN");
export const incrementcounter = createAction<void>("INCREMENT");
export const userActions = createAction<any>(ActionConstants.UserLogin);
export const userCredentials = createAction<any>("USER_ENTRIES");
export const startLoader = createAction<any>("START_LOADER");
export const stopLoader = createAction<any>("STOP_LOADER");
export const slickStateAction = createAction<any>("CHANGE_SLICK");
export const configurationStateAction = createAction<any>(ActionConstants.ChangeConfig);
export const addItemToDropZone = createAction<any>("DROP_INDDZONE");
export const submitSegmentRequest = createAction<any>("SEGMENT_REQ");
export const submitWizardAction = createAction<any>("WIZARDSTATS");
export const submiSizingChangeAction = createAction<any>("SIZING_RESPONSE");
export const submiDragAction = createAction<any>("DRAGITEM");
export const submitUIConfigAction = createAction<any>(ActionConstants.UIConfig);
export const submitSpinnerAction = createAction<any>(ActionConstants.SpinnerConfig);

export const AudienceAction = createAction<any>(ActionConstants.Audiences);
export const AudienceStatusAction = createAction<any>(ActionConstants.AudienceStatus);

export const DashboardDateControlAction = createAction<any>(ActionConstants.DashboardDateControl);
export const CampaignCtrlAction = createAction<any>(ActionConstants.CAMPAIGNCONTROL);
export const sendEmailAction = createAction<any>(ActionConstants.CREATECAMPAIGN);

export const setToggleStateAction = createAction<any>(ActionConstants.TOGGLE_BUTTON_STATE);
export const setGEOMapStateAction = createAction<any>(ActionConstants.GEOMAP_STATE);
export const setInsightStateAction = createAction<any>(ActionConstants.INSIGHT_STATE);

export const geoMapAction = createAction<any>(ActionConstants.GEOMAP_APISTATE);
export const sendFeedbackAction = createAction<any>(ActionConstants.SEND_FEEDBACK);
export const sendDashboardGenderStateAction = createAction<any>(ActionConstants.DashboardGenderState);

export const sendPreflightDateAction = createAction<any>(ActionConstants.PREFLIGHT_GENDATA);

export const sendLineChartAction = createAction<any>(ActionConstants.LINECHART);
export const sendInsightAPIStateAction = createAction<any>(ActionConstants.INSIGHT_API_STATE);
export const progressStateAction = createAction<any>(ActionConstants.PROGRESS_BAR_STATE);
export const calendarChangeAction = createAction<any>(ActionConstants.CALENDAR_STATE);
 
/*Admin */
export const sendAdminUserRoleAction = createAction<any>(ActionConstants.ADMIN_USER_FETCH_ROLE);
export const sendAdminUserListAction = createAction<any>(ActionConstants.ADMIN_USER_LISTING);
export const sendAdminUserAddAction = createAction<any>(ActionConstants.ADMIN_USER_ADD);
export const sendAdminUserEditAction = createAction<any>(ActionConstants.ADMIN_USER_EDIT);
export const sendAdminUserDeleteAction = createAction<any>(ActionConstants.ADMIN_USER_DELETE);


/*Admin */
export const sendAdminAudienceTraitListAction = createAction<any>(ActionConstants.ADMIN_TRAIT_LISTING);
export const sendAdminAudienceTraitAddAction = createAction<any>(ActionConstants.ADMIN_TRAIT_ADD);
export const sendAdminAudienceTraitEditAction = createAction<any>(ActionConstants.ADMIN_TRAIT_EDIT);
export const sendAdminAudienceTraitDeleteAction = createAction<any>(ActionConstants.ADMIN_TRAIT_DELETE);
export const sendAdminAudienceTraitPaginationAction = createAction<any>(ActionConstants.ADMIN_TRAIT_PAGINATION);


/*Report */
export const searchReportAction = createAction<any>(ActionConstants.SEARCH_REPORT);
export const reportResponseAction = createAction<any>(ActionConstants.REPORT_RESPONSE);
export const downloadReportAction = createAction<any>(ActionConstants.REPORT_DOWNLOAD);
export const displayReportListAction = createAction<any>(ActionConstants.REPORT_LISTRESPONSE);

/* Flyout */

export const submitFlyoutConfigAction = createAction<any>(ActionConstants.FLYOUTCONFIG);


/* DAL */
export const campaignStatusAction = createAction<any>(ActionConstants.CAMPAIGNDAL);
export const campaignDALStatusAction = createAction<any>(ActionConstants.CAMPAIGNSTATUS);

export const uploadCMRFile = createAction<any>(ActionConstants.UPLOADCRM);
export const updateProgressCRM = createAction<any>(ActionConstants.PROGRESS);
export const updateCRMStateMessage = createAction<any>(ActionConstants.CRMMSG);

export const broadcastCRMStat = createAction<any>(ActionConstants.CRMLISTSTAT);
export const requestCRMStat = createAction<any>(ActionConstants.LISTALL_CRM);

// Added for admin export member
    // export const setInitializing = createAction<void>(
    //   'SET_INIT'
    // ) as () => ReduxActions.Action<void>;
    // export const showErrorBox = createAction<any>('SHOW_ERROR_SCREEN') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const incrementcounter = createAction<void>(
    //   'INCREMENT'
    // ) as () => ReduxActions.Action<void>;
    // export const userActions = createAction<any>(ActionConstants.UserLogin) as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const userCredentials = createAction<any>('USER_ENTRIES') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const startLoader = createAction<any>('START_LOADER') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const stopLoader = createAction<any>('STOP_LOADER') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const slickStateAction = createAction<any>('CHANGE_SLICK') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const configurationStateAction = createAction<any>(
    //   ActionConstants.ChangeConfig
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const addItemToDropZone = createAction<any>('DROP_INDDZONE') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const submitSegmentRequest = createAction<any>('SEGMENT_REQ') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const submitWizardAction = createAction<any>('WIZARDSTATS') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const submiSizingChangeAction = createAction<any>('SIZING_RESPONSE') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const submiDragAction = createAction<any>('DRAGITEM') as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const submitUIConfigAction = createAction<any>(
    //   ActionConstants.UIConfig
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const submitSpinnerAction = createAction<any>(
    //   ActionConstants.SpinnerConfig
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // export const AudienceAction = createAction<any>(ActionConstants.Audiences) as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    // export const AudienceStatusAction = createAction<any>(
    //   ActionConstants.AudienceStatus
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // export const DashboardDateControlAction = createAction<any>(
    //   ActionConstants.DashboardDateControl
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const CampaignCtrlAction = createAction<any>(
    //   ActionConstants.CAMPAIGNCONTROL
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendEmailAction = createAction<any>(
    //   ActionConstants.CREATECAMPAIGN
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // export const setToggleStateAction = createAction<any>(
    //   ActionConstants.TOGGLE_BUTTON_STATE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const setGEOMapStateAction = createAction<any>(
    //   ActionConstants.GEOMAP_STATE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const setInsightStateAction = createAction<any>(
    //   ActionConstants.INSIGHT_STATE
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // export const geoMapAction = createAction<any>(
    //   ActionConstants.GEOMAP_APISTATE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendFeedbackAction = createAction<any>(
    //   ActionConstants.SEND_FEEDBACK
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // export const sendInsightAPIStateAction = createAction<any>(
    //   ActionConstants.INSIGHT_API_STATE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const progressStateAction = createAction<any>(
    //   ActionConstants.PROGRESS_BAR_STATE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const calendarChangeAction = createAction<any>(
    //   ActionConstants.CALENDAR_STATE
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // /*Admin */
    // export const sendAdminUserRoleAction = createAction<any>(
    //   ActionConstants.ADMIN_USER_FETCH_ROLE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminUserListAction = createAction<any>(
    //   ActionConstants.ADMIN_USER_LISTING
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminUserAddAction = createAction<any>(
    //   ActionConstants.ADMIN_USER_ADD
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminUserEditAction = createAction<any>(
    //   ActionConstants.ADMIN_USER_EDIT
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminUserDeleteAction = createAction<any>(
    //   ActionConstants.ADMIN_USER_DELETE
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // /*Admin */
    // export const sendAdminAudienceTraitListAction = createAction<any>(
    //   ActionConstants.ADMIN_TRAIT_LISTING
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminAudienceTraitAddAction = createAction<any>(
    //   ActionConstants.ADMIN_TRAIT_ADD
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminAudienceTraitEditAction = createAction<any>(
    //   ActionConstants.ADMIN_TRAIT_EDIT
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminAudienceTraitDeleteAction = createAction<any>(
    //   ActionConstants.ADMIN_TRAIT_DELETE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const sendAdminAudienceTraitPaginationAction = createAction<any>(
    //   ActionConstants.ADMIN_TRAIT_PAGINATION
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // /*Report */
    // export const searchReportAction = createAction<any>(
    //   ActionConstants.SEARCH_REPORT
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const reportResponseAction = createAction<any>(
    //   ActionConstants.REPORT_RESPONSE
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const downloadReportAction = createAction<any>(
    //   ActionConstants.REPORT_DOWNLOAD
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const displayReportListAction = createAction<any>(
    //   ActionConstants.REPORT_LISTRESPONSE
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // /* Flyout */
    
    // export const submitFlyoutConfigAction = createAction<any>(
    //   ActionConstants.FLYOUTCONFIG
    // ) as (data: any) => ReduxActions.Action<any>;
    
    // /* DAL */
    // export const campaignStatusAction = createAction<any>(
    //   ActionConstants.CAMPAIGNDAL
    // ) as (data: any) => ReduxActions.Action<any>;
    // export const campaignDALStatusAction = createAction<any>(
    //   ActionConstants.CAMPAIGNSTATUS
    // ) as (data: any) => ReduxActions.Action<any>;
    

    export const reportingStatusAction = createAction<any>(
      ActionConstants.REPORTINGSTATUS
    );
    export const saveReportingStatusAction = createAction<any>(
      ActionConstants.SETREPORTINGSTATUS
    );
    
    // export const updateCRMCanList = createAction<any>(ActionConstants.CRMCANLIST) as (
    //   data: any
    // ) => ReduxActions.Action<any>;
    
    export const updateDashboardCharts = createAction<any>(ActionConstants.DASHBOARD_CHARTS);
    
    export const sendAdminCynchAttributeListAction = createAction<any>(ActionConstants.CYNCHATTRIBUTES);
    export const sendCynchCategoryAction = createAction<any>(ActionConstants.CYNCHATTRIUPDATE);
    
    export const sendCynchOperationAction = createAction<any>(ActionConstants.CYNCHOPERATION);
    
    export const sendEditCynchAttribute = createAction<any>(ActionConstants.CYNCHEDIT);
    export const sendParentStateUpdated = createAction<any>(ActionConstants.CYNCHCATPARENT);
    export const getAllQuerySegments = createAction<any>(ActionConstants.QUERYSEGMENTIDS);
    export const dispatchAllQuerySegments = createAction<any>(ActionConstants.QUERYSEGMENTIDSLIST);
    
    export const dispatchSaveQuerySegments = createAction<any>(ActionConstants.QUERYSEGMENTIDSAVE);
    
    export const deleteQuerySegments = createAction<any>(ActionConstants.QUERYSEGMENTIDDELETE);
    export const editQuerySegmentsAction = createAction<any>(ActionConstants.QUERYSEGMENTIDEDIT);
    export const getAllTVOrders = createAction<any>(ActionConstants.LISTALLTVORDERS);
    export const dispatchAllTVOrders = createAction<any>(ActionConstants.DISPLAYALLTVORDERS);
    
    export const dispatchSaveTVOrders = createAction<any>(ActionConstants.SAVETVORDER);
    
    export const deleteTVOrders = createAction<any>(ActionConstants.DELETETVORDER);
    export const editTVOrdersAction = createAction<any>(ActionConstants.EDITTVORDERS);
    
    // // RED 3264
    export const getCoreConfiguration = createAction<any>(ActionConstants.LISTALLCONFIG);
    export const sendCoreConfiguration = createAction<any>(ActionConstants.LOADCONFIG);
    
    export const sendSaveCoreConfiguration = createAction<any>(ActionConstants.SAVECONFIG);
    
    
    // // RED 3477
    export const getDomoConfiguration = createAction<any>(ActionConstants.LISTDOMOCONFIG);
    export const sendDomoConfiguration = createAction<any>(ActionConstants.LOADDOMOCONFIG);
    
    export const sendSaveDomoConfiguration = createAction<any>(ActionConstants.SAVEDOMOCONFIG);
    
    
    // // RED-3458 Create Domo query manager in admin
    export const getAllDomoQueires = createAction<any>(ActionConstants.LISTDOMOQUERY);
    export const dispatchAllDomoQueries = createAction<any>(ActionConstants.DISPLAYALLDOMOQUERIES);
    
    export const saveDomoQuery = createAction<any>(ActionConstants.SAVEDOMOQUERY);
    
    export const deleteDomoQuery = createAction<any>(ActionConstants.DELETEDOMOQUERY);
    export const editDomoQuery = createAction<any>(ActionConstants.EDITDOMOQUERY);
    