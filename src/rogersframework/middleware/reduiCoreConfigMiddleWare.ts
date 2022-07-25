/* eslint-disable */
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import { AxiosClient } from "../ClientServices/AxiosClient";
import {
  submitUIConfigAction,
  submitSpinnerAction,
  sendCoreConfiguration,
  getCoreConfiguration,
} from "src/Actions";
// import { campaignDALStatusAction } from '../../Actions';
import UserOps from "src/ConstConfig/UserOps";

// import { saveAs } from 'file-saver';

const reduiCoreConfigMiddleWare = (store: any) => (next: any) => (
  action: any
) => {
  if (
    (action &&
      action.hasOwnProperty("type") &&
      action.type === "LISTALLCONFIG") ||
    action.type === "SAVECONFIG"
  ) {
    const clnt = new AxiosClient(store);
    const contxtToken = getAuthContext();
    const token = contxtToken.idToken.rawIdToken;
    switch (action.type) {
      case "LISTALLCONFIG":
        {
          const spinnerState = { UIConfig: { isSpinnerActive: true } };
          store.dispatch(submitSpinnerAction(spinnerState));

          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url,
          };
          clnt
            .getResponse(reqObjectSeg.url, reqObjectSeg)
            .then((returnVal: any) => {
              if (returnVal.status >= 400 && returnVal.status < 600) {
                store.dispatch(sendCoreConfiguration({ data: [] }));
              } else {
                store.dispatch(sendCoreConfiguration({ data: returnVal }));
              }
              const spinnerState = { UIConfig: { isSpinnerActive: false } };
              store.dispatch(submitSpinnerAction(spinnerState));
            });
        }
        break;
      case "SAVECONFIG":
        {
          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url,
          };
          // action.payload.data.payload.configuration = JSON.stringify(action.payload.data.payload.configuration);
          action.payload.data.payload.configuration = JSON.stringify(
            action.payload.data.payload.configuration
          );

          clnt
            .post("POST", reqObjectSeg, action.payload.data.payload)
            .then((returnVal: any) => {
              const messageBoxObj = {
                Dialog: {
                  MessageBox: {
                    isVisible: true,
                    UserMessage: " Configuration saved successfully",
                    saveFailed: false,
                    boxButtons: UserOps.OK,
                    messageHead: "Success!",
                  },
                },
              };
              if (returnVal.status >= 400 && returnVal.status < 600) {
                messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
                messageBoxObj.Dialog.MessageBox.UserMessage =
                  "Unable to save/update configuration, please try again later";
                messageBoxObj.Dialog.MessageBox.saveFailed = true;
              } else {
                if (
                  returnVal.hasOwnProperty("status") &&
                  returnVal.status === "Fail"
                ) {
                  messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
                  messageBoxObj.Dialog.MessageBox.UserMessage =
                    returnVal.message;
                  messageBoxObj.Dialog.MessageBox.saveFailed = true;
                } else {
                  const dummyUserObj = {
                    data: { url: reqObjectSeg.url },
                  };
                  store.dispatch(getCoreConfiguration(dummyUserObj));
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

export default reduiCoreConfigMiddleWare;
