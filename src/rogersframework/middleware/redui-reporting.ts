/* eslint-disable */
import { authContext } from "../../Login/ADAL/adalConfig";
import { AxiosClient } from "../ClientServices/AxiosClient";
import { reportResponseAction, submitUIConfigAction, displayReportListAction, submitSpinnerAction } from "../../Actions";
// import { saveAs } from 'file-saver';
import { UserOps } from "../../ConstConfig/UserOps";
import { List } from 'immutable';

const reduiReportingMiddleWare = (store: any) => (next: any) => (action: any) => {
  if (action && action.hasOwnProperty("type") && (action.type === "DOWNLOAD_REPORT" || action.type === "SEARCH_REPORT" || action.type === "LISTALL_REPORT")) {
    const clnt = new AxiosClient(store);
    const token = authContext.getCachedToken(authContext.config.clientId);
    let userAction = action.type;
    if (action.payload.data.type === "LISTALL_REPORT") {
      userAction = "LISTALL_REPORT";
    }
    switch (userAction) {
      case "SEARCH_REPORT": {
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        clnt.getResponse(reqObjectSeg.url, reqObjectSeg).then((returnVal: any) => {
          const data = { data: { enableExcle: false, enablePPT: false, proposalExist: false, isReportExist: false } }
          if ((returnVal.status >= 400 && returnVal.status < 600) || returnVal.hasOwnProperty("reportPresent") && !returnVal.reportPresent) {
            data.data.isReportExist = true;
          }
          else {
            if (returnVal.hasOwnProperty("reportPresent") && returnVal.reportPresent) {
              data.data.proposalExist = true;
              data.data.isReportExist = false;
              let pptxIndex = returnVal.reportFormat.findIndex((obj: any) => obj == "pptx");
              if (pptxIndex >= 0) {
                data.data.enablePPT = true;
              }
              let excelIndex = returnVal.reportFormat.findIndex((obj: any) => obj == "xlsx");
              if (excelIndex >= 0) {
                data.data.enableExcle = true;
              }
            }
          }
          store.dispatch(reportResponseAction(data));
        });
      }
        break;
      case "DOWNLOAD_REPORT": {
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        const payload = {
          proposalId: action.payload.data.proposalID,
          reportFormat: action.payload.data.reportFormat
        }
        clnt.postAndDownload("POST", reqObjectSeg, payload).then((returnVal: any) => {
          if (returnVal.status >= 400 && returnVal.status < 600) {
            const messageBoxObj = { Dialog: { MessageBox: { isVisible: true, UserMessage: " Unable to download the file", saveFailed: false, boxButtons: UserOps.OK, messageHead: "Error!" , popupAuto: true} } };
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

            // saveAs(new Blob([returnVal.data]),fileName);
          }
        });
      }
        break;
      case "LISTALL_REPORT": {
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        clnt.getResponse(reqObjectSeg.url, reqObjectSeg).then((returnVal: any) => {
          const data = { data: { enableExcle: false, enablePPT: false, proposalExist: false, isReportExist: false, list: {} } }
           if ((returnVal.status >= 400 && returnVal.status < 600)) {
            data.data.isReportExist = true;
            data.data.list = List([]);
          }
          else {
            data.data.proposalExist = true;
            data.data.isReportExist = false;
            data.data.list = returnVal;
          }
          store.dispatch(displayReportListAction(data));
          let spinnerState = { UIConfig: { isSpinnerActive: false }};
          store.dispatch(submitSpinnerAction(spinnerState));
        });
      }
        break;
    }
  }
  return next(action);
}

export default reduiReportingMiddleWare;