/* eslint-disable */
import { AxiosClient } from '../ClientServices/AxiosClient';
import { submitSpinnerAction, broadcastCRMStat, submitUIConfigAction, updateProgressCRM, updateCRMStateMessage, requestCRMStat} from '../../Actions';
// import { UserOps } from '../../ConstConfig/UserOps';
import { List } from 'immutable';
import { getAuthContext } from 'src/Login/MSAL/msalConfig';
import axios from 'axios';
import { UserOps } from 'src/ConstConfig/UserOps';
import Logger from '../Logger/Logger';

const reduiCRMUploaderMiddleWare = (store: any) => (next: any) => (action: any) => {
  if (action && action.hasOwnProperty('type') && ((action.type === 'UPLOADCRM') || (action.type === 'LISTALL_CRM'))) {
    const clnt = new AxiosClient(store);
    const token = getAuthContext().idToken.rawIdToken;

    let userAction = action.type;

    switch (userAction) {
      case 'UPLOADCRM': {
        console.log(" Inside UPLOADCRM")
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        const filePayload = action.payload.data.payload;

        if (action.payload.data.fileSize > 524288000) {
          const messageBoxObj = { Dialog: { MessageBox: { isVisible: true, UserMessage: ' This file is too large for processing', saveFailed: false, boxButtons: UserOps.OK, messageHead: 'Error!', popupAuto: true } } };

          store.dispatch(submitUIConfigAction(messageBoxObj));
          return;
        }

        console.log('CRMUploader: Inside postFiles');
        const contType = "Content-Type";
        axios.defaults.headers.common.Accept = "application/json";
        axios.defaults.headers.post[contType] = "multipart/form-data";
        axios.defaults.maxContentLength = Infinity;
        if (reqObjectSeg.hasOwnProperty("authToken")) {
            axios.defaults.headers.get['Authorization'] = "Bearer " + reqObjectSeg.authToken
        }
        if(!filePayload) {
            console.log("The payload is empty");
        }
        const cancelTokenSource = axios.CancelToken.source();
        return axios({
            data: filePayload,
            method: 'post',
            url: reqObjectSeg.url,
            cancelToken: cancelTokenSource.token,
            onUploadProgress: (progressEvent: any) => {
                try{
                console.log('CRMUploader: Inside onUploadProgress  try');
                
                console.log(" progress ", progressEvent.loaded, " total", progressEvent.total, " %", (progressEvent.loaded / progressEvent.total) * 100, " Progress if ", ((progressEvent.loaded / progressEvent.total) * 100) <= 97);
                if (((progressEvent.loaded / progressEvent.total) * 100) <= 97) {
                   store.dispatch(updateProgressCRM({ data: progressEvent }));
                }
                else if (((progressEvent.loaded / progressEvent.total) * 100) >= 97) {
                    const fakeProgEvent = { loaded: progressEvent.loaded, total: progressEvent.total };
                    fakeProgEvent.loaded = progressEvent.total - ((progressEvent.total/100)*3);
                    store.dispatch(updateProgressCRM({ data: fakeProgEvent }));
                }
                }catch(e) {
                }
            }
        })
            .then(res => {
                console.log('CRMUploader: Inside then(res =>', res);
                cancelTokenSource.cancel(); // Cancel reques
               // return res.data;
               
                    console.log('Sending the 100%');
                    store.dispatch(updateProgressCRM({ data: { loaded: 100, total: 100 } }));
        
                    if (res.data.hasOwnProperty('status') && (res.data.status === false || res.data.status === null)) {
                      store.dispatch(updateCRMStateMessage({ data: { msg: 'File upload operation failed. Please try again later' } }));
                    } else if (res.data.hasOwnProperty('status') && (res.data.status === 'Failure')) {
                      store.dispatch(updateCRMStateMessage({ data: { msg: res.data.message } }));
                    } else {
                      store.dispatch(updateCRMStateMessage({ data: { msg: "Thank you, your file has been received and we're processing the following columns: " + res.data.validHeaders.join(', ') } }));
                      const dummyUserObj = { type: UserOps.LISTALL_CRM, data: { url: action.payload.data.crmReportUrl, type: UserOps.LISTALL_CRM } };
        
                      store.dispatch(requestCRMStat(dummyUserObj));
                      dummyUserObj.data.url = '';
                      dummyUserObj.data.type = UserOps.NONE;
                      store.dispatch(requestCRMStat(dummyUserObj)); ({ url: '', type: '' });
                    }

                
            }).catch((error) => {
              console.log('CRMUploader: error =>', error);
                console.log(error.config);
                console.log(error.config);
                if (error.response) {
              console.log('CRMUploader: error.response =>', error.response);

                  // console.log("Failed ",error.response.data);
                  Logger.getInstance().printWarnLogs("Status with failure", error?.response?.status);
                  // console.log(error.response.headers);
              } else if (error.request) {
              console.log('CRMUploader: error.request =>', error.request);

                  Logger.getInstance().printWarnLogs(error?.request);
              } else {
              console.log('CRMUploader: error.message =>', error.message);

                  Logger.getInstance().printWarnLogs('Error', error.message);
              }
              // console.log(error.config);
              console.log('CRMUploader: error.response.status =>', error.response.status);
              console.log('CRMUploader: error.response.data =>', error.response.data);
              if(error?.response && error?.response?.status)

              return { status: error.response.status, errorData: error.response.data };
              else 
              return { status: 500, errorData: "" };
               
            });
    

     
        // clnt.postFiles(reqObjectSeg, filePayload).then((returnVal: any) => {
        //   console.log('returnVal===', returnVal);
        //   if ((returnVal.hasOwnProperty('status') && returnVal.status >= 400 && returnVal.status < 600)) {
        //     const messageBoxObj = { Dialog: { MessageBox: { isVisible: true, UserMessage: ' Unable to upload the file', saveFailed: false, boxButtons: UserOps.OK, messageHead: 'Error!', popupAuto: true } } };

        //     store.dispatch(submitUIConfigAction(messageBoxObj));
        //   } else {
        //     console.log('Sending the 100%');
        //     store.dispatch(updateProgressCRM({ data: { loaded: 100, total: 100 } }));

        //     if (returnVal.hasOwnProperty('status') && (returnVal.status === false || returnVal.status === null)) {
        //       store.dispatch(updateCRMStateMessage({ data: { msg: 'File upload operation failed. Please try again later' } }));
        //     } else if (returnVal.hasOwnProperty('status') && (returnVal.status === 'Failure')) {
        //       store.dispatch(updateCRMStateMessage({ data: { msg: returnVal.message } }));
        //     } else {
        //       store.dispatch(updateCRMStateMessage({ data: { msg: "Thank you, your file has been received and we're processing the following columns: " + returnVal.validHeaders.join(', ') } }));
        //       const dummyUserObj = { type: UserOps.LISTALL_CRM, data: { url: action.payload.data.crmReportUrl, type: UserOps.LISTALL_CRM } };

        //       store.dispatch(requestCRMStat(dummyUserObj));
        //       dummyUserObj.data.url = '';
        //       dummyUserObj.data.type = UserOps.NONE;
        //       store.dispatch(requestCRMStat(dummyUserObj)); ({ url: '', type: '' });
        //     }

        //   }

        // });
      }
        break;
      case 'LISTALL_CRM': {
       console.log("CRM Uplods => Inside LISTALL_CRM ");
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        let data = {};
        clnt.getResponse(reqObjectSeg.url, reqObjectSeg).then((returnVal: any) => {
          
          // console.log("inside debug block- 1==>", data);
          if ((returnVal.status >= 400 && returnVal.status < 600)) {
            data = List([]);
          } else {
            // console.log("inside debug block- 2==>", data);
            if (returnVal instanceof Array) {
              // console.log("inside debug block- 3==>", data);
              data = { CRMSList: List(returnVal) };
              store.dispatch(broadcastCRMStat(data));
            } else {
              // console.log("inside debug block- 4==>", data); 
              // data = List([]);
            }
          }
          // console.log("CRM Uploads  ==>", data);
          // console.log("inside debug block- 5==>", data);
         
          let spinnerState = { UIConfig: { isSpinnerActive: false } };

          store.dispatch(submitSpinnerAction(spinnerState));
        });
      }
        break;
    }
  }
  // eslint-disable-next-line consistent-return
  return next(action);
};

export default reduiCRMUploaderMiddleWare;
