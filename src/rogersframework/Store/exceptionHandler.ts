/* eslint-disable */
import { UserExceptions, UserErrorFields } from "../../ConstConfig/UserExceptions";
import { ActionConstants } from "../../ConstConfig";

export function isAccessUnauthorized(userException:any, respExceptionObj:any) {

       if(!respExceptionObj) {
            respExceptionObj= {UserAction: ActionConstants.Login, isLoginSuccessful: false}; 
       }
       const errorMessages = require("../../data/ErrorMessages.json");
       if(userException && userException.hasOwnProperty("status") && userException.status === 401  && userException.hasOwnProperty("errorData") &&  userException.errorData.hasOwnProperty("message") && userException.errorData.message ) {

        switch(userException.errorData.message) {
            case UserExceptions.UNAUTH_SERVER_EXCP_TEXT:
            {
                respExceptionObj[UserErrorFields.ERROR_CODE] =  UserExceptions.USER_UNAUTHORIZED; 
                respExceptionObj[UserErrorFields.ERROR_MESSAGE] =  errorMessages.User_InValid_Access;
            }
            break;
            case UserExceptions.UNAUTH_EXCP:
            {
                respExceptionObj[UserErrorFields.ERROR_CODE] =  UserExceptions.INVALID_TOKEN; 
                respExceptionObj[UserErrorFields.ERROR_MESSAGE] =  errorMessages.User_InValid_Token;
            }
            break;
            default:
            {
                respExceptionObj[UserErrorFields.ERROR_CODE] =  UserExceptions.UNKNOWN_EXCEPTION; 
                respExceptionObj[UserErrorFields.ERROR_MESSAGE] =  errorMessages.Unknown_Exception;
            }
            break;
        }
    }
    else if(userException && userException.hasOwnProperty("status") && userException.status === 403  && userException.hasOwnProperty("errorData") &&  userException.errorData.message && userException.errorData.message.includes("Forbidden") && userException.errorData.path.includes("getLoggedInUserDetail")  ) {
        respExceptionObj[UserErrorFields.ERROR_CODE] =  UserExceptions.USER_UNAUTHORIZED; 
        respExceptionObj[UserErrorFields.ERROR_MESSAGE] =  errorMessages.User_InValid_Access;
    }
    return respExceptionObj;
}