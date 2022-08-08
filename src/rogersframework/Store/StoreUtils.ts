/* eslint-disable */
import {
  AppConstants,
  ActionConstants,
  ErrorConstants,
  NavBarConstants,
} from "../../ConstConfig";
import {
  showErrorBox,
  userActions,
  slickStateAction,
  submitSpinnerAction,
  sendAdminUserRoleAction,
  sendRoleBasedConfiguration,
  sendAdminUserListAction,
  AudienceAction,
  updateCRMCanList,
  getAllTVOrders,
  getCoreConfiguration,
} from "../../Actions";
import AuthCache from "../../Cache/AuthCache";
// import { authContext, adalConfig } from '../../Login/ADAL/adalConfig';
import { UserOps } from "../../ConstConfig/UserOps";
import { isAccessUnauthorized } from "./exceptionHandler";
import {
  UserErrorFields,
  UserExceptions,
} from "../../ConstConfig/UserExceptions";
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import { getConfig } from "src/Utility/roleBasedAttrib";
import CRMCanModel from "src/Admin/Model/CRMCanModel";
import { AdminModel } from "../../Admin/Model/AdminModel";
import Audiences from "src/Admin/Model/AudiencesModel";
// import { getAdalEnvConfig } from './adalUtil';
// const getAuthToken  = require('react-adal').adalGetToken;
// const adalGetToken = require('react-adal').adalGetToken;

export class StoreUitls {
  clnt: any;
  store: any;
  urlConfig: any;
  adminUtil: any;

  constructor(
    pStore: any,
    client: any,
    urlConf: any,
    adalAuthCtx: any,
    adminStoreUtil: any
  ) {
    this.clnt = client;
    this.store = pStore;
    this.urlConfig = urlConf;
    this.adminUtil = adminStoreUtil;
  }

  getAuhObj() {
    const authToken = getAuthContext();
    const token = authToken; // authContext.getCachedToken(authContext.config.clientId);
    let user = "";
    let tok = "";
    let name = "";
    const configSet = process.env.REACT_APP_LOGIN_CONFIG;
    if (configSet === "LOCAL") {
      const stuffUser = require("../../data/dummyUser.json");
      user = stuffUser.userName;
      tok = stuffUser.token;
    } else {
      user = token.idToken.preferredName;
      tok = token.idToken.rawIdToken;
      name = token.idToken.name;
    }
    const uName = user;
    const authorizationResponse = {
      userName: uName,
      authToken: tok,
      userFullName: name,
    };
    return authorizationResponse;
  }

  initLogin() {}

  getUserRole() {
    const authorizationResponse = this.getAuhObj();
    let authSuccess = false;
    const reqObject = {
      userName: "",
      url: "",
      password: "",
      serviceName: "",
      authToken: "",
    };
    reqObject.url = this.urlConfig.getUserRoleUrl();
    reqObject.authToken = authorizationResponse.authToken;
    console.log("inside store utils=> call user role api");

    this.clnt.getResponse(reqObject.url, reqObject).then((returnVal: any) => {
      let respExceptionObj = {};
      if (
        returnVal.hasOwnProperty("status") &&
        returnVal.status >= 400 &&
        returnVal.status < 600
      ) {
        respExceptionObj = isAccessUnauthorized(returnVal, respExceptionObj);
        if (returnVal.hasOwnProperty("status") && returnVal.status >= 500) {
          respExceptionObj[UserErrorFields.ERROR_CODE] =
            UserExceptions.UNKNOWN_EXCEPTION;
          respExceptionObj[UserErrorFields.ERROR_MESSAGE] =
            "Unknown error occured, please try after sometime.";
        }
        this.showErrorMessage(respExceptionObj);
        let spinnerState = { UIConfig: { isSpinnerActive: false } };
        this.store.dispatch(submitSpinnerAction(spinnerState));
      } else {
        let unAuthorized = false;
        if (returnVal && returnVal.hasOwnProperty("roles") && returnVal.roles) {
          const loggedInUserEmail = "loggedInUserEmail";
          returnVal[loggedInUserEmail] = this.getAuhObj().userName;
          if (
            returnVal.roles.findIndex((obj: any) => obj == UserOps.REQUESTER) >=
              0 ||
            returnVal.roles.findIndex(
              (obj: any) => obj == UserOps.REQUESTMANAGER
            ) >= 0
          ) {
            this.store.dispatch(
              sendAdminUserRoleAction({ UserProfile: returnVal })
            );
            const index = returnVal.roles.findIndex(
                (obj: any) => obj == UserOps.ADMIN
              );
              if (index >= 0) {
                this.fetchAdminUserList();
                this.adminUtil.loadAllTrait(true);
                this.getAudienceList();
                this.getCRMCANList();
                this.getTVCampaignList();
                this.adminUtil.loadAllCynchAttributes(false);
                this.getCoreConfig();
            } else {
                let respExceptionObj = {};
                respExceptionObj = isAccessUnauthorized(
                  {
                    status: 401,
                    errorData: { message: UserExceptions.UNAUTH_SERVER_EXCP_TEXT },
                  },
                  respExceptionObj
                );
                this.showErrorMessage(respExceptionObj);
              }




            let roleConfig = getConfig(returnVal);
            this.store.dispatch(
              sendRoleBasedConfiguration({ userConfig: roleConfig })
            );
            this.initLogin();
            this.sendLoginSuccess();
            unAuthorized = false;
            let spinnerState = { UIConfig: { isSpinnerActive: true } };
            this.store.dispatch(submitSpinnerAction(spinnerState));
          } else {
            unAuthorized = true;
          }
        } else {
          unAuthorized = true;
        }
        if (unAuthorized) {
          respExceptionObj[UserErrorFields.ERROR_CODE] =
            UserExceptions.USER_UNAUTHORIZED;
          respExceptionObj[UserErrorFields.ERROR_MESSAGE] =
            "You do not have access to this application at this time";
          this.showErrorMessage(respExceptionObj);
          let spinnerState = { UIConfig: { isSpinnerActive: false } };
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      }
    });
    return authSuccess;
  }

  login(useSSO: boolean, uName?: any, ssoToken?: any) {
    // this.autoRefresh();
    let spinnerState = { UIConfig: { isSpinnerActive: true } };
    this.store.dispatch(submitSpinnerAction(spinnerState));
    console.log("Inside login method");
    if (useSSO) {
      let reqObject = {
        userName: "",
        url: "",
        password: "",
        serviceName: "",
        authToken: "",
      };
      reqObject.url = this.urlConfig.segmentGetUrl;
      reqObject.authToken = ssoToken;
      this.getUserRole();
    } else {
      if (process.env.REACT_APP_LOGIN_CONFIG === "LOCAL") {

      } else {
        const username = this.store.getState().userAuth.data.userName;
        const pass = this.store.getState().userAuth.data.password;
        const LoginUrl = this.urlConfig.loginUrl;
        const service = "Login";
        const reqObject = {
          userName: username,
          url: LoginUrl,
          password: pass,
          serviceName: service,
          authToken: "",
        };
        let inputOptions = JSON.stringify({
          userName: username,
          password: pass,
        });
        this.clnt
          .post("POST", reqObject, inputOptions)
          .then((returnVal: any) => {
            if (returnVal && returnVal.authStatus === true) {
              // let authorizationResponse = returnVal;
              // let slickIndex = 0;
              if (
                this.store
                  .getState()
                  .configState.hasOwnProperty("LoginPageState")
              ) {
                if (
                  this.store.getState().configState.LoginPageState
                    .rememberMeFlag
                ) {
                  const authenticationCache = new AuthCache();
                  authenticationCache.saveAttribInCache("isRememberME", true);
                  authenticationCache.saveAttribInCache("userName", username);
                  authenticationCache.saveAttribInCache("password", pass);
                }
              }
              const token = this.getAuhObj().authToken;
              reqObject.url = this.urlConfig.segmentGetUrl;
              reqObject.authToken = token;
              // this.getSegments(authorizationResponse, slickIndex, reqObject);
            } else {
              this.store.dispatch(
                userActions({
                  UserAction: ActionConstants.Login,
                  isLoginSuccessful: AppConstants.NotInited,
                })
              );
              const userObj = {
                UserAction: ActionConstants.Login,
                errorMessage: ErrorConstants.ERROR_401,
                isLoginSuccessful: "failed",
              };
              this.store.dispatch(showErrorBox(userObj));
            }
          });
      }
    }
  }
  public fetchAdminUserList() {
    const Url = this.urlConfig.getListUsersUrl();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const token = getAuthContext().idToken.rawIdToken;
    reqObjectSeg.authToken = token;
    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        // console.log("API response",returnVal);
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
        } else {
          const usersList = new AdminModel(returnVal);
          const respObj = { UsersList: usersList.getAdminUserList() };
          this.adminUtil.loadAllDashboardStats(true, returnVal);
          this.store.dispatch(sendAdminUserListAction(respObj));
        }
      });
  }

  sendLoginSuccess() {
    const authorizationResponse = this.getAuhObj();
    const userObj = {
      UserAction: ActionConstants.Login,
      isLoginSuccessful: true,
      authResponse: authorizationResponse,
    };
    this.store.dispatch(userActions(userObj));
  }

  showErrorMessage(responseMsg: any) {
    this.store.dispatch(
      userActions({
        UserAction: ActionConstants.Login,
        isLoginSuccessful: false,
      })
    );
    this.store.dispatch(showErrorBox(responseMsg));
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: "",
      slickIdx: NavBarConstants.DASHBOARDSLICK,
    };
    this.store.dispatch(slickStateAction(dummyUserObj));
  }

  //  autoRefresh() {
  //     const res = Math.abs(authContext.getCachedUser().profile.exp - Math.floor(new Date().getTime() / 1000));
  //     const that = this;
  //     adalGetToken(authContext, adalConfig.endpoints.api).then((returnVal: any) => { that.token = returnVal });
  //     setTimeout(function () {
  //         that.autoRefresh();
  //     }, ((res - 5) * 1000));
  // }
  getAudienceList() {
    const Url = this.urlConfig.getAudienceListUrl();
    const reqObjectSeg = {
      authToken: getAuthContext().idToken.rawIdToken,
      url: Url,
    };
    this.clnt.getResponse(Url, reqObjectSeg).then((returnVal: any) => {
      let audienceList = new Audiences(returnVal);
      const respObj = { AudienceList: audienceList.getAudienceList() };
      this.store.dispatch(AudienceAction(respObj));
    });
  }
  getCRMCANList() {
    const Url = this.urlConfig.getCrmCanUrl();
    const reqObjectSeg = {
      authToken: getAuthContext().idToken.rawIdToken,
      url: Url,
    };
    let canList = {};
    this.clnt.getResponse(Url, reqObjectSeg).then((returnVal: any) => {
      if (returnVal.hasOwnProperty("status") && returnVal.status) {
        canList = {};
      } else {
        let crmModel = new CRMCanModel(returnVal);
        canList = { CRMCanList: crmModel.getcrmCanList() };
      }
      this.store.dispatch(updateCRMCanList(canList));
    });
  }
  getTVCampaignList() {
    const dummyUserObj = {
      data: { url: this.urlConfig.getTVOrderCampaignList() },
    };
    this.store.dispatch(getAllTVOrders(dummyUserObj));
  }
  getCoreConfig() {
    const dummyUserObj = {
      data: { url: this.urlConfig.getCoreConfiguration() },
    };
    this.store.dispatch(getCoreConfiguration(dummyUserObj));
  }
 
}
