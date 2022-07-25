/* eslint-disable */
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import { AxiosClient } from '../ClientServices/AxiosClient';
import {   submitUIConfigAction, submitSpinnerAction,  dispatchAllDomoQueries, getAllDomoQueires } from 'src/Actions';
import { List } from 'immutable';
import UserOps from 'src/ConstConfig/UserOps';

const reduiDomoQueryConfigMiddleware = (store: any) => (next: any) => (
  action: any
) => {
  if (
    action &&
    action.hasOwnProperty('type') &&
    action.type === 'LISTDOMOQUERY' || action.type === 'SAVEDOMOQUERY' || action.type === 'DELETEDOMOQUERY'
  ) {
    const clnt = new AxiosClient(store);
    const contxtToken = getAuthContext();
    const token = contxtToken.idToken.rawIdToken;
    switch (action.type) {
      case 'LISTDOMOQUERY':
        {
          const spinnerState = { UIConfig: { isSpinnerActive: true } };
          store.dispatch(submitSpinnerAction(spinnerState));
          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url
          };
          clnt
            .getResponse(reqObjectSeg.url, reqObjectSeg)
            .then((returnVal: any) => {
              if (returnVal.status >= 400 && returnVal.status < 600) {
                 
              } else {
               
                store.dispatch(dispatchAllDomoQueries({data:List(returnVal)}));
              }
              const spinnerState = { UIConfig: { isSpinnerActive: false } };
              store.dispatch(submitSpinnerAction(spinnerState));
            });
        }
        break;
      case 'SAVEDOMOQUERY' :
        {
          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url
          };
          clnt.post("POST", reqObjectSeg, action.payload.data.payload).then((returnVal: any) => {
            const messageBoxObj = {
              Dialog: {
                MessageBox: {
                  isVisible: true,
                  UserMessage: " Domo Query saved successfully",
                  saveFailed: false,
                  boxButtons: UserOps.OK,
                  messageHead: "Success!",
                },
              },
            };
            if (returnVal.status >= 400 && returnVal.status < 600) {
              messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
              messageBoxObj.Dialog.MessageBox.UserMessage =
                "Unable to save Domo Query, please try again later";
              messageBoxObj.Dialog.MessageBox.saveFailed = true;
            } else {
              if (returnVal.hasOwnProperty("status") && returnVal.status === "Failure") {
                messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
                messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
                messageBoxObj.Dialog.MessageBox.saveFailed = true;
              } else {
                // store.dispatch(dispatchSaveQuerySegments({data:{url:action.payload.data.allSegsUrl}}));
              }
            }
            store.dispatch(submitUIConfigAction(messageBoxObj));
          });
        }
        break;
        case 'DELETEDOMOQUERY' :
        {
          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url
          };
          clnt.delete(reqObjectSeg, {}).then((returnVal: any) => {
            if (
              returnVal.hasOwnProperty("status") &&
              returnVal.status === UserOps.SUCCESS
            ) {
              store.dispatch(getAllDomoQueires({data:{url:action.payload.data.allRecordAPI}}));
            }
          });
        }
        break;
    }
  }
  return next(action);
};

export default reduiDomoQueryConfigMiddleware;
