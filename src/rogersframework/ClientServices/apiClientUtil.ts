/* eslint-disable */
import { userActions, showErrorBox, slickStateAction } from "../../Actions";
import { ActionConstants, NavBarConstants } from "../../ConstConfig";
import { isAccessUnauthorized } from "../Store/exceptionHandler";
import { UserErrorFields, UserExceptions } from "../../ConstConfig/UserExceptions";

export class clientUitls {
     store: any;
    constructor(pStore: any) {
        this.store = pStore;
    }

     checkAndReportError(errObj: any) {
        let respExceptionObj = isAccessUnauthorized(errObj, null);
        if (respExceptionObj.hasOwnProperty(UserErrorFields.ERROR_CODE) && respExceptionObj[UserErrorFields.ERROR_CODE] === 401 &&  respExceptionObj.hasOwnProperty("message") && respExceptionObj.message === UserExceptions.UNAUTH_SERVER_EXCP_TEXT) {
            this.store.dispatch(userActions({ UserAction: ActionConstants.Login, isLoginSuccessful: false }));
            this.store.dispatch(showErrorBox(respExceptionObj));
            const dummyUserObj = { UserAction: "SlickPosition", selectedTab: "", slickIdx: NavBarConstants.DASHBOARDSLICK };
            this.store.dispatch(slickStateAction(dummyUserObj))
        }
       
    }
}