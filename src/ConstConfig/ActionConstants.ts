/* eslint-disable */
export enum ActionConstants {
    Login = "Login",
    UserLogin = "USER_LOGIN",
    ChangeConfig = "CHANGE_CONFIG",
    UIConfig = "UI_CONFIG",
    FLYOUTCONFIG = "FLYOUTCONFIG",
    SpinnerConfig = "SPINNER",
    Audiences = "AUDIENCES",
    AudienceStatus = "AudienceStatus",
    DashboardDateControl = "DASHBOARD_DATECONT",
    CAMPAIGNCONTROL = "CAMPAIGN_CONT",
    CREATECAMPAIGN = "CREATE_CAMPAIGN",
    TOGGLE_BUTTON_STATE = "TOGGLE_BUTTON_STATE",
    GEOMAP_STATE = "GEO_MAPS",
    GEOMAP_APISTATE = "GEO_MAP_APISTATE",
    INSIGHT_STATE = "INSIGHTS",
    SEND_FEEDBACK = "SEND_FEEDBAK",
    DASHBOARD_DATE_STATE = "DASHBOARD_PREFETCH_DATE",
    DashboardGenderState = "DASHBOARD_GENDER",
    PREFLIGHT_GENDATA = "PREFLIGHT_GENDATA",
    LINECHART = "LINECHART",
    INSIGHT_API_STATE = "INSIGHT_API_STATE",
    PROGRESS_BAR_STATE = "PROGRESS_BAR",
    CALENDAR_STATE = "CALENDAR_STATE",

    /* ADMIN */
    ADMIN_USER_LISTING = "ADMIN_USER_LISTING",
    ADMIN_USER_ADD = "ADMIN_USER_ADD",
    ADMIN_USER_DELETE = "ADMIN_USER_DELETE",
    ADMIN_USER_EDIT = "ADMIN_USER_EDIT",
    ADMIN_USER_FETCH_ROLE = "ADMIN_USER_FETCH_ROLE",

    ADMIN_TRAIT_LISTING = "ADMIN_TRAIT_LISTING",
    ADMIN_TRAIT_ADD = "ADMIN_TRAIT_ADD",
    ADMIN_TRAIT_DELETE = "ADMIN_TRAIT_DELETE",
    ADMIN_TRAIT_EDIT = "ADMIN_TRAIT_EDIT",
    ADMIN_TRAIT_FETCH_ROLE = "ADMIN_TRAIT_FETCH_ROLE",
    ADMIN_TRAIT_PAGINATION = "ADMIN_TRAIT_PAGINATION",

    /*Report */
    SEARCH_REPORT = "SEARCH_REPORT",
    REPORT_RESPONSE = "REPORT_RESPONSE",
    REPORT_LISTRESPONSE = "REPORT_LISTRESPONSE",
    PACINGREPORT_LISTRESPONSE = "PACINGREPORT_LISTRESPONSE",
    REPORT_DOWNLOAD = "DOWNLOAD_REPORT",

    /* DAL */
    CAMPAIGNDAL = "CAMPAIGNDAL",
    CAMPAIGNSTATUS = "CAMPAIGNSTATUS",

    /*Report */
    UPLOADCRM = "UPLOADCRM",
    PROGRESS="PROGRESS",
    CRMMSG="CRMMSG",
    CRMLISTSTAT= 'CRMLISTSTAT',
    LISTALL_CRM="LISTALL_CRM",
    REPORTINGSTATUS = 'REPORTINGSTATUS',
    ROLECONFIG="ROLECONFIG",
    DOMOSTATS="DOMOSTATS",

    GETFORCAST="GETFORCAST",
    RESPONSEFORCAST="RESPONSEFORCAST",

    
    //RED-3264
    LISTALLCONFIG="LISTALLCONFIG",
    LOADCONFIG="LOADCONFIG",
    SAVECONFIG="SAVECONFIG",


    //RED-3489
    DOMOQUERYAPI="DOMOQUERYAPI",
    DOMOQUERYAPIRESPONSE="DOMOQUERYAPIRESPONSE",

    ////RED-3548
    DWONLOAD_EXCEL="DWONLOAD_EXCEL",

    DWONLOAD_DOMOPPT="DWONLOAD_DOMOPPT",

   
 



 

  /*Report */

  SETREPORTINGSTATUS = 'SETREPORTINGSTATUS',


  CRMCANLIST='CRMCANLIST',
  DASHBOARD_CHARTS = "DASHBOARD_CHARTS",
  CYNCHATTRIBUTES= "CYNCHATTRIBUTES",
  CYNCHATTRIUPDATE="CYNCHATTRIUPDATE",
  CYNCHOPERATION="CYNCHOPERATION",
  CYNCHEDIT="CYNCHEDIT",
  CYNCHCATPARENT="CYNCHCATPARENT",

  QUERYSEGMENTIDS="QUERYSEGMENTIDS",
  QUERYSEGMENTIDSLIST = "QUERYSEGMENTIDSLIST",
  QUERYSEGMENTIDSAVE= "QUERYSEGMENTIDSAVE",
  QUERYSEGMENTIDDELETE="QUERYSEGMENTIDDELETE",
  QUERYSEGMENTIDEDIT = "QUERYSEGMENTIDEDIT",

  LISTALLTVORDERS="LISTALLTVORDERS",
  SAVETVORDER="SAVETVORDER",
  DELETETVORDER="DELETETVORDER",
  DISPLAYALLTVORDERS="DISPLAYALLTVORDERS",
  EDITTVORDERS="EDITTVORDERS",



  // RED-3477
  LISTDOMOCONFIG="LISTDOMOCONFIG",
  SAVEDOMOCONFIG="SAVEDOMOCONFIG",
  LOADDOMOCONFIG="LOADDOMOCONFIG",

  //RED-3458 Create Domo query manager in admin
  LISTDOMOQUERY="LISTDOMOQUERY",
  DISPLAYALLDOMOQUERIES="DISPLAYALLDOMOQUERIES",
  SAVEDOMOQUERY="SAVEDOMOQUERY",
  DELETEDOMOQUERY="DELETEDOMOQUERY",
  EDITDOMOQUERY="EDITDOMOQUERY"

}

export default ActionConstants;