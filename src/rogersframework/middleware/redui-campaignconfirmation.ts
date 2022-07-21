import { authContext } from "../../Login/ADAL/adalConfig";
import { AxiosClient } from "../ClientServices/AxiosClient";
import { campaignDALStatusAction } from "../../Actions";
// import { saveAs } from 'file-saver';


const reduiCampaignConfirmationMiddleWare = (store: any) => (next: any) => (action: any) => {
  if (action && action.hasOwnProperty("type") && (action.type === "CAMPAIGNDAL")) {
    const clnt = new AxiosClient(store);
    const token = authContext.getCachedToken(authContext.config.clientId);
    switch (action.type) {
      case "CAMPAIGNDAL": {
        const reqObjectSeg = { authToken: token, url: action.payload.data.url };
        clnt.getResponse(reqObjectSeg.url, reqObjectSeg).then((returnVal: any) => {
          let data = {
            payload: {
              campaignName: "",
              audience: "",
              budget: "",
              startDate: "",
              endDate: "",
              dayOfWeek: "",
              dayPart: "",
              platform: "",
              creativeFormats: "",
              CampaignDALStatus: "",
              campaignCategory:"",
              campaignMarkets:"",
              campaignGoal:"",
              campaignOptimization:"",
              planCategories: "",
              audienceList:{filter:"",list:[{}]},
              isError:false
            }
          }
          if ((returnVal.status >= 400 && returnVal.status < 600) ) {
              data.payload.isError = true;
          }
          else {
            let keys = Object.keys(returnVal.audienceDetails);
            data =  {payload:returnVal};
            data.payload.audienceList = {filter:keys[0],list:returnVal.audienceDetails[keys[0]]}
            data.payload.isError = false;
          }
           store.dispatch(campaignDALStatusAction(data));
        });
      }
        break;
    }
  }
  return next(action);
}

export default reduiCampaignConfirmationMiddleWare;