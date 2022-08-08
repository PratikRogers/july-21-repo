/* eslint-disable */
// import { authContext } from "../../Login/ADAL/adalConfig";
import { AxiosClient } from "../ClientServices/AxiosClient";
import { populateRequestsData, submitSpinnerAction, showIndividualRequestsAction, submitUIConfigAction, listAllRequestersAction } from "src/Actions";
import { List } from 'immutable';
import UserOps from "src/ConstConfig/UserOps";
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import axios from "axios";
import Logger from "../Logger/Logger";

const reduiRequestsMiddleWare = (store: any) => (next: any) => (action: any) => {
   if (action && action.hasOwnProperty("type") && ((action.type === "SUBMIT_REQUESTS")||(action.type === "LISTALL_REQUESTS")||(action.type === "DAL_REQUESTS") ||(action.type === "UPDATE_REQUESTS")  ||(action.type === "DOWNLOAD_REQUEST") || (action.type === "DUMMY_UPDATE" || (action.type === "LISTALL_REQUESTERSRECENT_REQUESTS")) ) ) { 
    const clnt = new AxiosClient(store);
    const token = getAuthContext().idToken.rawIdToken;
    let userAction = action.type;

    switch (userAction) {
      case "SUBMIT_REQUESTS": {
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        const payload = { address: action.payload.data.address };
        clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
          if ((returnVal.status >= 400 && returnVal.status < 600)) {
          }
          else {
            action.payload.data.hstry.push("/RequestConfirmation")
          }
        });
      }
        break;
      case 'LISTALL_REQUESTS':
        {
          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url
          };
          let apiResp = List([]);
          const spinnerState = { UIConfig: { isSpinnerActive: false } };
          store.dispatch(submitSpinnerAction(spinnerState));
          clnt.getResponse(reqObjectSeg.url, reqObjectSeg)
            .then((returnVal: any) => {
              if (returnVal.status >= 400 && returnVal.status < 600) {
                apiResp = List([{ requester: ' ', date: ' ', status: ' ' }]);

              } else {
                apiResp = List(returnVal);
              }
              spinnerState.UIConfig.isSpinnerActive=false;
              store.dispatch(submitSpinnerAction(spinnerState));
              store.dispatch(populateRequestsData({allList:List(apiResp)}));
           
            });
        }
        break;
        case 'LISTALL_REQUESTERSRECENT_REQUESTS':
        {
          const reqObjectSeg = {
            authToken: token,
            url: action.payload.data.url
          };
          let apiResp = List([]);
          const spinnerState = { UIConfig: { isSpinnerActive: false } };
          store.dispatch(submitSpinnerAction(spinnerState));
          clnt.getResponse(reqObjectSeg.url, reqObjectSeg)
            .then((returnVal: any) => {
              if (returnVal.status >= 400 && returnVal.status < 600) {
                apiResp = List([{ requester: ' ', date: ' ', status: ' ' }]);

              } else {
                apiResp = List(returnVal);
              }
              spinnerState.UIConfig.isSpinnerActive=false;
              store.dispatch(submitSpinnerAction(spinnerState));
              store.dispatch(listAllRequestersAction({allList:List(apiResp)}));
           
            });
        }
        break;
        case 'DAL_REQUESTS':
          {
            const reqObjectSeg = {
              authToken: token,
              url: action.payload.data.url
            };
            const spinnerState = { UIConfig: { isSpinnerActive: true } };
            store.dispatch(submitSpinnerAction(spinnerState));
            clnt.getResponse(reqObjectSeg.url, reqObjectSeg)
              .then((returnVal: any) => {
                if (returnVal.status >= 400 && returnVal.status < 600) {
                  returnVal= { id: -1, creationTs: "", userName: "", status: null, address: "" } 
  
                } else {

                }
              
                store.dispatch(showIndividualRequestsAction(returnVal));
                
                spinnerState.UIConfig.isSpinnerActive=false;
                store.dispatch(submitSpinnerAction(spinnerState));
              });
          }
          break;
          case 'DUMMY_UPDATE':
            {
              const reqObjectSeg = {
                authToken: token,
                url: action.payload.data.url
              };
              
              clnt.getResponse(reqObjectSeg.url, reqObjectSeg)
                .then((returnVal: any) => {
                  if (returnVal.status >= 400 && returnVal.status < 600) {
                     
    
                  } else {
                  }
                   
               
                });
            }
            break;
        case "UPDATE_REQUESTS" :
          {
            const updateReqObjectSeg = { authToken: token, url: action.payload.updateurl };
            const uploadObjectSeg = { authToken: token, url: action.payload.uploadurl };
            const filePayload = action.payload.payloadFile;
            const updateReqPayload = action.payload.payloadUpdate;
            console.log("File Size", action.payload);
            let updateResult = true;
            let uploadResult = true;
            let messageBoxObj = { Dialog: { MessageBox: { isVisible: true, UserMessage: " Unable to upload the file", saveFailed: false, boxButtons: UserOps.OK, messageHead: "Error!", popupAuto: true } } };
            if (action.payload.fileSize > 52428800) {
              messageBoxObj = { Dialog: { MessageBox: { isVisible: true, UserMessage: " This file is too large for processing", saveFailed: false, boxButtons: UserOps.OK, messageHead: "Error!", popupAuto: true } } };
              store.dispatch(submitUIConfigAction(messageBoxObj));
              return;
            }
            clnt.post("POST", updateReqObjectSeg, updateReqPayload).then(async (returnVal: any) => {
              if ((returnVal.status >= 400 && returnVal.status < 600)) {
                  updateResult = false;
              }
              else {
              console.log("inside redui-requests post callreturnVal = >", returnVal);

             
                // action.payload.data.hstry.push("/RequestConfirmation")
                if(filePayload) {
                  const contType = "Content-Type";
                  axios.defaults.headers.common.Accept = "application/json";
                  axios.defaults.headers.post[contType] = "multipart/form-data";
                  axios.defaults.maxContentLength = Infinity;
                  if (uploadObjectSeg.hasOwnProperty("authToken")) {
                    axios.defaults.headers.get["Authorization"] = "Bearer " + uploadObjectSeg.authToken;
                  }
                  try {
                    const res = await axios({
                      data: filePayload,
                      method: 'post',
                      url: uploadObjectSeg.url,
                      onUploadProgress: (progressEvent_1: any) => {
                      }
                    });
                    if (uploadResult && updateResult) {
                      action.payload.hstry.push("/RequestUpdateCompleted");
                    }
                    return res.data;
                  } catch (error) {
                    if (error.response) {
                      Logger.getInstance().printWarnLogs("Status with failure", error.response.status);
                    } else if (error.request) {
                      Logger.getInstance().printWarnLogs(error.request);
                    } else {
                      Logger.getInstance().printWarnLogs('Error', error.message);
                    }
                    const returnValue = { status: error.response.status, errorData: error.response.data };
                    if ((returnValue.hasOwnProperty("status") && returnValue.status >= 400 && returnValue.status < 600)) {
                      store.dispatch(submitUIConfigAction(messageBoxObj));
                      uploadResult = false;
                    }
                  }
                  




                  // clnt.postFiles(uploadObjectSeg, filePayload).then((returnVal: any) => {
                    // console.log('returnVal = >', returnVal);
                    
                    // if ((returnVal.hasOwnProperty("status") && returnVal.status >= 400 && returnVal.status < 600)) {
                    //   store.dispatch(submitUIConfigAction(messageBoxObj));
                    //   uploadResult = false;
                    // }
                    // else {
                    //   if(uploadResult && updateResult) {
                    //     action.payload.hstry.push("/RequestUpdateCompleted")
                    //   }
                    // }
          
                  // });
                }
                else{
                  if(uploadResult && updateResult) {
                    action.payload.hstry.push("/RequestUpdateCompleted")
                  }
                }
                
              }
            });
            
           
          }
          break;
          case "DOWNLOAD_REQUEST": {
            const reqObjectSeg = { authToken: token, url: action.payload.data.url };
             
             const payload = {
              requestId: action.payload.data.requestId,
             }
            
            clnt.postAndDownload("POST", reqObjectSeg, payload).then((returnVal: any) => {
              if (returnVal.status >= 400 && returnVal.status < 600) {
                const messageBoxObj = { Dialog: { MessageBox: { isVisible: true, UserMessage: " Unable to download the file", saveFailed: false, boxButtons: UserOps.OK, messageHead: "Error!", popupAuto: true } } };
                store.dispatch(submitUIConfigAction(messageBoxObj));
              }
              else {
                const contentDisposition = returnVal.headers['content-disposition'];
                let fileName = 'downloaded.' + action.payload.data.reportFormat;
                if (contentDisposition) {
                  const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                  if (fileNameMatch.length === 2)
                    fileName = fileNameMatch[1];
                  fileName = decodeURIComponent(fileName);
                }
                const url = window.URL.createObjectURL(new Blob([returnVal.data]));
                const link = document.createElement('a');
                link.href = url;
                if (fileName === 'unknown') {
                  fileName = 'downloaded.' + action.payload.data.reportFormat;
                }
                link.setAttribute('download', fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
    
              }
            });
          }
    }
  }
  return next(action);
}
// function makeGetCall(clnt: any, reqObjectSeg: any) {
//   return clnt.getResponse(reqObjectSeg.url, reqObjectSeg);
// }
export default reduiRequestsMiddleWare;