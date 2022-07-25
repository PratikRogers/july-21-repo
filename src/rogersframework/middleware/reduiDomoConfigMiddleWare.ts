/* eslint-disable */
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import { AxiosClient } from '../ClientServices/AxiosClient';
import {   submitUIConfigAction, submitSpinnerAction, sendDomoConfiguration } from 'src/Actions';
import UserOps from 'src/ConstConfig/UserOps';
const reduiDomoConfigMiddleWare = (store: any) => (next: any) => (
  action: any
) => {
  if (
    action &&
    action.hasOwnProperty('type') &&
    action.type === 'LISTDOMOCONFIG' || action.type === 'SAVEDOMOCONFIG'
  ) {
    const clnt = new AxiosClient(store);
    const contxtToken = getAuthContext();
    const token = contxtToken.idToken.rawIdToken;
    switch (action.type) {
      case 'LISTDOMOCONFIG':
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
                store.dispatch(sendDomoConfiguration({data:[]}));
              } else {
                 
                store.dispatch(sendDomoConfiguration({data:returnVal}));
              }
              const spinnerState = { UIConfig: { isSpinnerActive: false } };
              store.dispatch(submitSpinnerAction(spinnerState));
            });
        }
        break;
      case 'SAVEDOMOCONFIG' :
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
                  UserMessage: "Domo configuration saved successfully",
                  saveFailed: false,
                  boxButtons: UserOps.OK,
                  messageHead: "Success!",
                },
              },
            };
            if (returnVal.status >= 400 && returnVal.status < 600) {
              messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
              messageBoxObj.Dialog.MessageBox.UserMessage =
                "Unable to save/update domo configuration, please try again later";
              messageBoxObj.Dialog.MessageBox.saveFailed = true;
            } else {
              if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
                messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
                messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
                messageBoxObj.Dialog.MessageBox.saveFailed = true;
              } else {
                // const dummyUserObj ={
                //   data: { url: reqObjectSeg.url },
                // };
                // store.dispatch(getDomoConfiguration(dummyUserObj));
              }
            }
            store.dispatch(submitUIConfigAction(messageBoxObj));
          });
        }
        break;
 
    }
  }
  return next(action);
};

export default reduiDomoConfigMiddleWare;
