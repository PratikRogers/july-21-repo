/* eslint-disable */
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import { AxiosClient } from '../ClientServices/AxiosClient';
import {   submitUIConfigAction, submitSpinnerAction,  getAllTVOrders, dispatchAllTVOrders } from 'src/Actions';
// import { campaignDALStatusAction } from '../../Actions';
import { List } from 'immutable';
import UserOps from 'src/ConstConfig/UserOps';

// import { saveAs } from 'file-saver';

const reduiTVOrderCampaignMiddleware = (store: any) => (next: any) => (
  action: any
) => {
  if (
    action &&
    action.hasOwnProperty('type') &&
    action.type === 'LISTALLTVORDERS' || action.type === 'SAVETVORDER' || action.type === 'DELETETVORDER'
  ) {
    const clnt = new AxiosClient(store);
    const contxtToken = getAuthContext();
    const token = contxtToken.idToken.rawIdToken;
    switch (action.type) {
      case 'LISTALLTVORDERS':
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
                returnVal = returnVal.map((x:any) => ({...x,title:x.campaignName
                   }));
                const sortedTVOrderList = returnVal.sort((a:any, b:any) => a.campaignName > b.campaignName ? 1 : -1);
                store.dispatch(dispatchAllTVOrders({data:List(sortedTVOrderList)}));
              }
              const spinnerState = { UIConfig: { isSpinnerActive: false } };
              store.dispatch(submitSpinnerAction(spinnerState));
            });
        }
        break;
      case 'SAVETVORDER' :
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
                  UserMessage: " TV Campaign Order saved successfully",
                  saveFailed: false,
                  boxButtons: UserOps.OK,
                  messageHead: "Success!",
                },
              },
            };
            if (returnVal.status >= 400 && returnVal.status < 600) {
              messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
              messageBoxObj.Dialog.MessageBox.UserMessage =
                "Unable to save TV Campaign Order, please try again later";
              messageBoxObj.Dialog.MessageBox.saveFailed = true;
            } else {
              if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
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
        case 'DELETETVORDER' :
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
              store.dispatch(getAllTVOrders({data:{url:action.payload.data.allSegsUrl}}));
            }
          });
        }
        break;
    }
  }
  return next(action);
};

export default reduiTVOrderCampaignMiddleware;
