/* eslint-disable */
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import { AxiosClient } from '../ClientServices/AxiosClient';
import { dispatchAllQuerySegments,  submitUIConfigAction, submitSpinnerAction, getAllQuerySegments } from 'src/Actions';
// import { campaignDALStatusAction } from '../../Actions';
import { List } from 'immutable';
import UserOps from 'src/ConstConfig/UserOps';

// import { saveAs } from 'file-saver';

const reduiQuerySegmentMiddleWare = (store: any) => (next: any) => (
  action: any
) => {
  if (
    action &&
    action.hasOwnProperty('type') &&
    action.type === 'QUERYSEGMENTIDS' || action.type === 'QUERYSEGMENTIDSAVE' || action.type === 'QUERYSEGMENTIDDELETE'
  ) {
    const clnt = new AxiosClient(store);
    const contxtToken = getAuthContext();
    const token = contxtToken.idToken.rawIdToken;
    switch (action.type) {
      case 'QUERYSEGMENTIDS':
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
                store.dispatch(dispatchAllQuerySegments({data:List(returnVal)}));
              }
              const spinnerState = { UIConfig: { isSpinnerActive: false } };
              store.dispatch(submitSpinnerAction(spinnerState));
            });
        }
        break;
      case 'QUERYSEGMENTIDSAVE' :
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
                  UserMessage: " Query segment saved successfully",
                  saveFailed: false,
                  boxButtons: UserOps.OK,
                  messageHead: "Success!",
                },
              },
            };
            if (returnVal.status >= 400 && returnVal.status < 600) {
              messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
              messageBoxObj.Dialog.MessageBox.UserMessage =
                "Unable to save segment, please try again later";
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
        case 'QUERYSEGMENTIDDELETE' :
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
              store.dispatch(getAllQuerySegments({data:{url:action.payload.data.allSegsUrl}}));
            }
          });
        }
        break;
    }
  }
  return next(action);
};

export default reduiQuerySegmentMiddleWare;
