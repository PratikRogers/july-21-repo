/* eslint-disable */
import { AppConstants, ActionConstants, ErrorConstants, NavBarConstants } from "../../ConstConfig";
import { showErrorBox, userActions, slickStateAction,   sendAdminUserRoleAction,  submitSpinnerAction,   } from "../../Actions";
import AuthCache from '../../Cache/AuthCache';
// import { authContext, adalConfig } from '../../Login/ADAL/adalConfig';
import { UserOps } from '../../ConstConfig/UserOps';
import { isAccessUnauthorized } from "./exceptionHandler";
import { UserErrorFields, UserExceptions } from "../../ConstConfig/UserExceptions";
import { getAuthContext } from "src/Login/MSAL/msalConfig";
// import { getConfig } from "src/Utility/roleBasedAttrib";
// import { getAdalEnvConfig } from './adalUtil';
// const getAuthToken  = require('react-adal').adalGetToken;
// const adalGetToken = require('react-adal').adalGetToken;

export class StoreUitls {
     clnt: any;
     store: any;
     urlConfig: any;
 
    constructor(pStore: any, client: any, urlConf: any, adalAuthCtx: any) {
        this.clnt = client;
        this.store = pStore;
        this.urlConfig = urlConf;
     }

     getAuhObj() {
        const authToken = getAuthContext();
        const token = authToken;// authContext.getCachedToken(authContext.config.clientId);
        let user = "";
        let tok = "";
        let name = "";
        const configSet = process.env.REACT_APP_LOGIN_CONFIG;
        if (configSet === "LOCAL") {
            const stuffUser = require("../../data/dummyUser.json");
            user = stuffUser.userName;
            tok = stuffUser.token;
        }
        else {
            user = token.idToken.preferredName;
            tok = token.idToken.rawIdToken;
            name = token.idToken.name;
        }
        const uName = user;
        const authorizationResponse = { userName: uName, authToken: tok, userFullName: name };
        return authorizationResponse;
    }

     initLogin() {
 
    }


    getUserRole() {
        const authorizationResponse = this.getAuhObj();
        let authSuccess = false;
        const reqObject = { userName: "", url: "", password: "", serviceName: "", authToken: "" };
        reqObject.url = this.urlConfig.getUserRoleUrl();
        reqObject.authToken = authorizationResponse.authToken;

        this.clnt.getResponse(reqObject.url, reqObject).then((returnVal: any) => {
            if (returnVal.hasOwnProperty("status") && returnVal.status >= 400 && returnVal.status < 600) {
                let respExceptionObj = {};
                respExceptionObj = isAccessUnauthorized(returnVal, respExceptionObj);
                if (returnVal.hasOwnProperty("status") && returnVal.status >=500) {
                    respExceptionObj[UserErrorFields.ERROR_CODE] =  UserExceptions.UNKNOWN_EXCEPTION; 
                    respExceptionObj[UserErrorFields.ERROR_MESSAGE] =  "Unknown error occured, please try after sometime.";
                }
                this.showErrorMessage(respExceptionObj);
                let spinnerState = { UIConfig: { isSpinnerActive: false } };
                this.store.dispatch(submitSpinnerAction(spinnerState))
            }
            else {
                if (returnVal  && returnVal.hasOwnProperty("roles") && returnVal.roles) {
                    const loggedInUserEmail = "loggedInUserEmail";
                    returnVal[loggedInUserEmail] = this.getAuhObj().userName;
                    this.store.dispatch(sendAdminUserRoleAction({ UserProfile: returnVal }));
                    this.initLogin();
                    if(returnVal.roles.includes(UserOps.CRMUPLOADER) ){
                        this.sendLoginSuccess()
                    }
                    else
                    {
                        let respExceptionObj = {};
                        respExceptionObj = isAccessUnauthorized({status:401,errorData:{message:UserExceptions.UNAUTH_SERVER_EXCP_TEXT}}, respExceptionObj);
                        this.showErrorMessage(respExceptionObj);
                    }
                    let spinnerState = { UIConfig: { isSpinnerActive: false } };
                    this.store.dispatch(submitSpinnerAction(spinnerState))
                }
            }

        });
        return authSuccess;
    }


    login(useSSO: boolean, uName?: any, ssoToken?: any) {
        // this.autoRefresh();
        let spinnerState = { UIConfig: { isSpinnerActive: true } };
        this.store.dispatch(submitSpinnerAction(spinnerState));
        if (useSSO) {
            let reqObject = { userName: "", url: "", password: "", serviceName: "", authToken: "" };
            reqObject.url = this.urlConfig.segmentGetUrl;
            reqObject.authToken = ssoToken;
            this.getUserRole();
        }
        else {
            if (process.env.REACT_APP_LOGIN_CONFIG === "LOCAL") {
                
            }
            else {
                const username = this.store.getState().userAuth.data.userName;
                const pass = this.store.getState().userAuth.data.password;
                const LoginUrl = this.urlConfig.loginUrl;
                const service = "Login";
                const reqObject = { userName: username, url: LoginUrl, password: pass, serviceName: service, authToken: "" };
                let inputOptions = JSON.stringify({ userName: username, password: pass });
                this.clnt.post("POST", reqObject, inputOptions).then((returnVal: any) => {
                    if (returnVal && returnVal.authStatus === true) {
                        // let authorizationResponse = returnVal;
                        // let slickIndex = 0;
                        if (this.store.getState().configState.hasOwnProperty("LoginPageState")) {
                            if (this.store.getState().configState.LoginPageState.rememberMeFlag) {
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
                    }
                    else {
                        this.store.dispatch(userActions({ UserAction: ActionConstants.Login, isLoginSuccessful: AppConstants.NotInited }));
                        const userObj = { UserAction: ActionConstants.Login, errorMessage: ErrorConstants.ERROR_401, isLoginSuccessful: "failed" };
                        this.store.dispatch(showErrorBox(userObj));
                    }
                });
            }

        }

    }


     sendLoginSuccess() {
        const authorizationResponse = this.getAuhObj();
        const userObj = { UserAction: ActionConstants.Login, isLoginSuccessful: true, authResponse: authorizationResponse };
        this.store.dispatch(userActions(userObj));
    }

     showErrorMessage(responseMsg: any) {
        this.store.dispatch(userActions({ UserAction: ActionConstants.Login, isLoginSuccessful: false }));
        this.store.dispatch(showErrorBox(responseMsg));
        const dummyUserObj = { UserAction: "SlickPosition", selectedTab: "", slickIdx: NavBarConstants.DASHBOARDSLICK };
        this.store.dispatch(slickStateAction(dummyUserObj))
    }

    //  autoRefresh() {
    //     const res = Math.abs(authContext.getCachedUser().profile.exp - Math.floor(new Date().getTime() / 1000));
    //     const that = this;
    //     adalGetToken(authContext, adalConfig.endpoints.api).then((returnVal: any) => { that.token = returnVal });
    //     setTimeout(function () {
    //         that.autoRefresh();
    //     }, ((res - 5) * 1000));
    // }


}
