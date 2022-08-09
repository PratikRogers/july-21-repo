/* eslint-disable */
import { UserOps } from "./UserOps";

export class Configs {
  baseUrl: any;
  apiPath: any;
  port: number;
  prefix: string;
  loginUrl: any;
  logoutUrl: any;
  segmentGetUrl: any;
  segmentPostUrl: any;
  segmentAdvanceModeUrl: string;

  audienceListUrl: string;
  audienceEditListUrl: string;
  deleteAudienceListUrl: string;
  saveAudienceListUrl: string;
  overwriteAudienceListUrl: string;

  dashboardUrl: String;
  dashboardGeopMapUrl: String;
  dashboardPreflightAPIUrl: String;
  dashboardLineChartAPIUrl: String;

  insightsAListAPI: String;
  insightsAdvModeApi: String;
  insightsASizerAPI: String;

  emailUrl: String;

  userRoleUrl: String;
  adminUserUrl: String;
  audienceTraitUrl: String;
  audienceTraitSortUrl: String;

  reportSerachUrl: String;
  reportDownloadUrl: String;
  reportListUrl: String;

  campaignStatusUrl: String;
  cmrFileUploadUrl: String;
  crmListUrl: String;

  // Added for admin rule

   crmStatListUrl: string;

   reportingStatusSetUrl: string;
   reportingStatusUrl: string;
   crmCanUrl: string;
   reportsStats: string;
   cynchAttributeUrl: string;
   querySegmentUrl: String;
   saveQuerySegmentUrl: String;
   deleteDigitalReportSegments: String;

   tvCampaignOrderList: String;
  

   requestAddrReportUrl: String;
   requestStatsUrl: String;
   requestAllStatsUrl: String;
   requestUploadUrl: String;
   requestUpdateRequestUrl: String;
   requestDownLoadUrl: String;
   requestRequesterUrl: String;
   requestersRecentListUrl: String;

  //RED-3264
   configurationUrl: String;

  //RED-3477
   domoConfigUrl: String;

   domoQueryUrl: String;
  
   
  constructor() {
    let hostname = window && window.location && window.location.host;
    let isLocalHost = false;
    if (hostname === "localhost:3000") {
      isLocalHost = true;
    }
    this.prefix = ":";
    this.port = 443;
    console.log("hostname at Configs.ts file ==>", hostname);
    // hostname = "https://ehdpde101.dev.dmt.rogers.com";
     this.baseUrl = "https://" + hostname + this.prefix + this.port + "/";
    // this.baseUrl = "https://10.73.186.42:8098/";
    if (isLocalHost) {
      this.baseUrl = "/";
    }
    this.apiPath = "RED/";
    this.loginUrl = this.baseUrl + this.apiPath + "getAuthToken";
    this.logoutUrl = this.baseUrl + this.apiPath + "logout";
    this.segmentGetUrl = this.baseUrl + this.apiPath + "app/getSegmentLabels";
    this.segmentPostUrl =
      this.baseUrl + this.apiPath + "app/getAudienceListCounts";


      
    this.reportDownloadUrl =
      this.baseUrl + this.apiPath + "app/report/downloadFile";
    this.reportListUrl = this.baseUrl + this.apiPath + "app/report/getReports";

    this.audienceTraitSortUrl =
      this.baseUrl + this.apiPath + "app/admin/moveSegments";
    this.campaignStatusUrl = this.baseUrl + this.apiPath + "app/getCampaign";

    this.segmentAdvanceModeUrl =
      this.baseUrl + this.apiPath + "app/getAudienceListCountsAdvanceMode";
    this.insightsAdvModeApi =
      this.baseUrl + this.apiPath + "app/audianceBuilderInsightAdvanceMode";

    this.cmrFileUploadUrl = this.baseUrl + this.apiPath + "app/data/upload";
    this.crmListUrl = this.baseUrl + this.apiPath + "app/data/getCrmDetails";

    this.crmStatListUrl =
      this.baseUrl + this.apiPath + "app/data/getAdminCrmDetails";
    this.reportingStatusSetUrl =
      this.baseUrl + this.apiPath + "app/admin/notificationMessage";
    this.reportingStatusUrl =
      this.baseUrl + this.apiPath + "app/admin/getNotificationMessages";
    this.crmCanUrl =
      this.baseUrl + this.apiPath + "app/data/getCrmListForSegmentCreation";

    this.reportsStats = this.baseUrl + this.apiPath + "app/admin/reportsStats";

    this.cynchAttributeUrl =
      this.baseUrl + this.apiPath + "app/admin/cynchAttributes";
    this.querySegmentUrl =
      this.baseUrl + this.apiPath + "app/admin/getDigitalReportingSegments";
    this.saveQuerySegmentUrl =
      this.baseUrl + this.apiPath + "app/admin/digitalReportingSegment";
    this.deleteDigitalReportSegments =
      this.baseUrl + this.apiPath + "app/admin/removeDititalReportSegments";

    this.tvCampaignOrderList =
      this.baseUrl + this.apiPath + "app/admin/tvCampaignOrders";

    this.configurationUrl =
      this.baseUrl + this.apiPath + "app/admin/coreConfig";
    this.domoConfigUrl = this.baseUrl + this.apiPath + "app/admin/domoConfig";
    this.domoQueryUrl = this.baseUrl + this.apiPath + "app/admin/domoQueries";
    this.saveAudienceListUrl =
      this.baseUrl + this.apiPath + "app/saveAudiences";
    this.overwriteAudienceListUrl =
      this.baseUrl + this.apiPath + "app/updateAudience";
    this.audienceListUrl = this.baseUrl + this.apiPath + "app/listAudience";
    this.audienceEditListUrl = this.baseUrl + this.apiPath + "app/editAudience";
    this.deleteAudienceListUrl =
      this.baseUrl + this.apiPath + "app/deleteAudience";

    this.dashboardUrl = this.baseUrl + this.apiPath + "app/getDashBoardDetails";
    this.dashboardGeopMapUrl = this.baseUrl + this.apiPath + "app/GeoMap";
    this.dashboardPreflightAPIUrl =
      this.baseUrl + this.apiPath + "app/dashBoardDates";
    this.emailUrl = this.baseUrl + this.apiPath + "app/sendMail";
    this.dashboardLineChartAPIUrl =
      this.baseUrl + this.apiPath + "app/lineCharts";
    this.insightsAListAPI =
      this.baseUrl + this.apiPath + "app/audianceBuilderInsight/launchInsights";
    this.insightsASizerAPI =
      this.baseUrl + this.apiPath + "app/audianceBuilderInsight";

    this.userRoleUrl =
      this.baseUrl + this.apiPath + "app/getLoggedInUserDetail";
    this.adminUserUrl = this.baseUrl + this.apiPath + "app/admin/users";

    this.audienceTraitUrl = this.baseUrl + this.apiPath + "app/admin/segments";
    this.reportSerachUrl =
      this.baseUrl + this.apiPath + "app/report/checkFilesAvailability";
    this.reportDownloadUrl =
      this.baseUrl + this.apiPath + "app/report/downloadFile";
    this.reportListUrl = this.baseUrl + this.apiPath + "app/report/getReports";

    this.audienceTraitSortUrl =
      this.baseUrl + this.apiPath + "app/admin/moveSegments";
    this.campaignStatusUrl = this.baseUrl + this.apiPath + "app/getCampaign";

    this.segmentAdvanceModeUrl =
      this.baseUrl + this.apiPath + "app/getAudienceListCountsAdvanceMode";
    this.insightsAdvModeApi =
      this.baseUrl + this.apiPath + "app/audianceBuilderInsightAdvanceMode";


    this.reportingStatusUrl =
      this.baseUrl + this.apiPath + "app/admin/getNotificationMessages";
    this.requestAddrReportUrl =
      this.baseUrl + this.apiPath + "app/requests/addLocationStudy";
    this.requestStatsUrl =
      this.baseUrl + this.apiPath + "app/requests/viewRequest";
    this.requestAllStatsUrl =
      this.baseUrl + this.apiPath + "app/requests/getOpenRequests";
    this.requestUploadUrl =
      this.baseUrl + this.apiPath + "app/requests/uploadFile";
    this.requestUpdateRequestUrl =
      this.baseUrl + this.apiPath + "app/requests/updateLocationStudy";
    this.requestDownLoadUrl =
      this.baseUrl + this.apiPath + "app/requests/downloadFile";
    this.requestRequesterUrl =
      this.baseUrl + this.apiPath + "app/requests/getRequesterData";
    this.requestersRecentListUrl =
      this.baseUrl + this.apiPath + "app/requests/getRequesterList";
  }
  getAudienceListUrl() {
    return this.audienceListUrl;
  }
  getEditAudienceListUrl() {
    return this.audienceEditListUrl;
  }
  getDeleteAudienceListUrl() {
    return this.deleteAudienceListUrl;
  }
  getSaveAudienceListUrl(overWrite?: any) {
    if (overWrite && overWrite === true) {
      return this.overwriteAudienceListUrl;
    }
    return this.saveAudienceListUrl;
  }

  getDashboardUrl() {
    return this.dashboardUrl;
  }
  getGeoMapUrl() {
    return this.dashboardGeopMapUrl;
  }
  getDashboardPreflightAPIUrl() {
    return this.dashboardPreflightAPIUrl;
  }

  getLineChartUrl() {
    return this.dashboardLineChartAPIUrl;
  }

  getCampaignEmailUrl() {
    return this.emailUrl;
  }

  getInsightsAPI(source: any) {
    if (source === UserOps.AUDIENCELIST) {
      return this.insightsAListAPI;
    }
    return this.insightsASizerAPI;
  }

  getInsightsAdvanceModeAPI() {
    return this.insightsAdvModeApi;
  }

  /* Admin APIs */
  getUserRoleUrl() {
    return this.userRoleUrl;
  }
  getListUsersUrl() {
    return this.adminUserUrl;
  }
  getEditUserUrl() {
    return this.adminUserUrl;
  }
  getDeleteUserUrl() {
    return this.adminUserUrl;
  }
  getAddUserUrl() {
    return this.adminUserUrl;
  }

  getListAudienceTraitUrl() {
    return this.audienceTraitUrl;
  }
  getEditAudienceTraitUrl() {
    return this.audienceTraitUrl;
  }
  getDeleteAudienceTraitUrl() {
    return this.audienceTraitUrl;
  }
  getSortAudienceTraitUrl() {
    return this.audienceTraitSortUrl;
  }

  getReportSearchUrl() {
    return this.reportSerachUrl;
  }
  getReportDownloadUrl() {
    return this.reportDownloadUrl;
  }
  getReportListUrl() {
    return this.reportListUrl;
  }

  getCampaignStatusUrl() {
    return this.campaignStatusUrl;
  }

  getAdvanceModeAPIUrl() {
    return this.segmentAdvanceModeUrl;
  }

  getCRMListComponentUrl() {
    return this.crmListUrl;
  }

  /* File */

  getCRMFileUploadUrl() {
    return this.cmrFileUploadUrl;
  }
  public getCRMListUrl() {
    return this.crmStatListUrl;
  }

  getReportingStatusConfigSaveUrl() {
    return this.reportingStatusSetUrl;
  }
  getReportingStatusConfigUrl() {
    return this.reportingStatusUrl;
  }

  getCrmCanUrl() {
    return this.crmCanUrl;
  }

  getReportsStats() {
    return this.reportsStats;
  }

  getListCynchAttributeUrl() {
    return this.cynchAttributeUrl;
  }

  getQuerySegmentUrl() {
    return this.querySegmentUrl;
  }

  getSaveQuerySegmentUrl() {
    return this.saveQuerySegmentUrl;
  }

  getDeleteQuerySegmentUrl() {
    return this.deleteDigitalReportSegments;
  }

  getTVOrderCampaignList() {
    return this.tvCampaignOrderList;
  }

  //RED-3264
  getCoreConfiguration() {
    return this.configurationUrl;
  }

  //RED-3477
  getDomoAPIConfigUrl() {
    return this.domoConfigUrl;
  }

  getDomoQueryUrl() {
    return this.domoQueryUrl;
  }
  

  getRequestAddrReportUrl() {
    return this.requestAddrReportUrl;
  }

  getRequestsStatusUrl() {
    return this.requestStatsUrl;
  }

  getAllRequestsUrl() {
    return this.requestAllStatsUrl;
  }

  getRequestUploadUrl() {
    return this.requestUploadUrl;
  }
  getRequestUpdatRequesteUrl() {
    return this.requestUpdateRequestUrl;
  }

  getRequestDownloadUrl() {
    return this.requestDownLoadUrl;
  }

  getRequesterUrl() {
    return this.requestRequesterUrl;
  }
  getRequestersRecentListUrl() {
    return this.requestersRecentListUrl;
  }

}
export default Configs;
