/* eslint-disable */
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducer/reduireducers";
import { AppConstants, Configs } from "../../ConstConfig";
import { AxiosClient } from "../ClientServices/AxiosClient";
import { getAuthContext } from '../../Login/MSAL/msalConfig';
import { UserOps } from "../../ConstConfig/UserOps";
import {
  getActionTypeForConfirmOperation,
  getUserSelectedOperaion,
  getTraitSelectedOperaion,
  getActionType,
  getReportingStateOperaion,
} from "./helper";
import { StoreUitls } from "./StoreUtils";
import { AdminStoreUitls } from "./AdminStoreUtils.";
import reduiReportingMiddleWare from "../middleware/redui-reporting";
import reduiQuerySegmentMiddleWare from "../middleware/reduiQuerySegmentMiddleWare";
import reduiTVOrderCampaignMiddleware from "../middleware/reduiTVOrderCampaignMiddleware";
import reduiCoreConfigMiddleWare from "../middleware/reduiCoreConfigMiddleWare";
import reduiDomoConfigMiddleWare from "../middleware/reduiDomoConfigMiddleWare";
import reduiDomoQueryConfigMiddleware from "../middleware/reduiDomoQueryConfigMiddleware";
// import Logger from '../Logger/Logger';
import reduiCRMUploaderMiddleWare from '../middleware/redui-crmuploader';
import reduiRequestsMiddleWare from '../middleware/redui-requests';

const RedUIStore = (preloadedState:any) => {
    
 // const dateStarted = new Date();
    const authContext = getAuthContext();
    const urlConfig = new Configs();
    const configSet = process.env.REACT_APP_LOGIN_CONFIG;
    const store = createStore(reducers, applyMiddleware(reduiRequestsMiddleWare, reduiCRMUploaderMiddleWare ,reduiReportingMiddleWare,reduiQuerySegmentMiddleWare,reduiTVOrderCampaignMiddleware, reduiCoreConfigMiddleWare, reduiDomoConfigMiddleWare, reduiDomoQueryConfigMiddleware));
    const clnt = new AxiosClient(store);
    
    const adminStoreUtil = new AdminStoreUitls(store, clnt, urlConfig, authContext);
    const storeUtil = new StoreUitls(store, clnt, urlConfig, authContext,adminStoreUtil);
    // Logger.getInstance().printDebugLogs("AD", authContext.getCachedUser());

    if (configSet !== "LOCAL") {
    }
    else {
        console.log("Insidte timeout");
        storeUtil.login(true);
       
    }
   
    store.subscribe(() => {
        let actionType;
        if (store.getState()) {
            actionType = store.getState().userAuth.hasOwnProperty("data") && 
            store.getState().userAuth.isLoginSuccessful !== "" 
            ? store.getState().userAuth.data.isLoginSuccessful : "";
        }
        if (store.getState().WizardStateHandle.hasOwnProperty("data")) {
            const WizardStateHandleData = store.getState().WizardStateHandle;
            actionType = WizardStateHandleData.data.hasOwnProperty("userAction") && WizardStateHandleData.data.userAction !== "" ? WizardStateHandleData.data.userAction : actionType;
        }
        if (store.getState().configState.hasOwnProperty("Dialog")) {
            const DialogData = store.getState().configState.Dialog;
            actionType = getActionTypeForConfirmOperation(DialogData, actionType);
        }
      
        actionType = getActionType(store.getState().slickState, actionType);

        actionType = getUserSelectedOperaion(
          store.getState().AdminUserAddControlState,
          actionType
        );
        actionType = getTraitSelectedOperaion(
          store.getState().AdminUserTraitControlState,
          actionType
        );
        actionType = getTraitSelectedOperaion(
          store.getState().AdminUserTraitEditControlState,
          actionType
        );
        actionType = getTraitSelectedOperaion(
          store.getState().AdminCynchAttribOperationState,
          actionType
        );
        actionType = getReportingStateOperaion(
          store.getState().ReportingConfigState,
          actionType
        );
        // console.log("Admin CRM => Inside store.ts ==>", actionType);
 
 
        switch (actionType) {
           
                case AppConstants.Inited:
                    store.getState().userAuth.data.isLoginSuccessful = "";
                            if(store.getState().userAuth.data.authContext.idToken.preferredName!='') {
                                storeUtil.login(true, store.getState().userAuth.data.authContext.idToken.preferredName, store.getState().userAuth.data.authContext.idToken.rawIdToken);
            
                            }
                    break;
                  case UserOps.DELETE_USER:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.deleteUser(
                          store.getState().configState.Dialog.content.userId
                        );
                      } catch (e) {}
                    }
                    break;
                  case UserOps.DELETE_TRAITS:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.deleteTrait(
                          store.getState().configState.Dialog.content.segmentId
                        );
                        // adminStoreUtil.loadAllTrait(true);
                      } catch (e) {}
                    }
                    break;
                  case UserOps.ADD_USER:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.addUser(store.getState().AdminUserAddControlState);
                      } catch (e) {}
                    }
                    break;
                  case UserOps.EDIT_USER:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.updateUser(
                          store.getState().AdminUserAddControlState
                        );
                      } catch (e) {}
                    }
                    break;
                  case UserOps.ADD_TRAITS:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.addAudienceTrait(
                          store.getState().AdminUserTraitControlState
                        );
                      } catch (e) {}
                    }
                    break;
                  case UserOps.EDIT_TRAITS:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.updateAudienceTrait(
                          store.getState().AdminUserTraitControlState
                        );
                      } catch (e) {}
                    }
                    break;
                  case UserOps.TRAIT_MOVE_UP:
                    {
                      actionType = "";
                      try {
                        // store.getState().AdminUserTraitListControlState.TraitsList
                        adminStoreUtil.sortAudienceTrait(
                          store.getState().AdminUserTraitEditControlState,
                          UserOps.TRAIT_MOVE_UP
                        );
                        store.getState().AdminUserTraitEditControlState.userAction = "";
                      } catch (e) {}
                    }
                    break;
                  case UserOps.TRAIT_MOVE_DOWN:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.sortAudienceTrait(
                          store.getState().AdminUserTraitEditControlState,
                          UserOps.TRAIT_MOVE_DOWN
                        );
                        store.getState().AdminUserTraitEditControlState.userAction = "";
                      } catch (e) {}
                    }
                    break;
                  case UserOps.GET_USERS:
                    {
                      actionType = "";
                      store.getState().slickState.data.loadAPIData = false;
                      store.getState().slickState.data.source = "";
                      adminStoreUtil.loadAllUsers(true);
                    }
                    break;
                  case UserOps.GET_TRAITS:
                    {
                      actionType = "";
                      store.getState().slickState.data.loadAPIData = false;
                      store.getState().slickState.data.source = "";
                      adminStoreUtil.loadAllTrait(true);
                    }
                    break;
                  case UserOps.GET_CRMList:
                    {
                      console.log("Admin CRM => Inside userOps.Get crmlist");
                      actionType = "";
                      store.getState().slickState.data.loadAPIData = false;
                      store.getState().slickState.data.source = "";
                      adminStoreUtil.loadCRMStats(true);
                    }
                    break;
                  case UserOps.REPORTING_STATUS:
                    {
                      actionType = "";
                      store.getState().slickState.data.loadAPIData = false;
                      store.getState().slickState.data.source = "";
                      adminStoreUtil.loadReportingStatus(true);
                    }
                    break;
                  case UserOps.SET_REPORTING_STATUS:
                    {
                      actionType = "";
                      store.getState().ReportingConfigState.userAction = null;
                      adminStoreUtil.saveReportingStatus(
                        store.getState().ReportingConfigState
                      );
                    }
                    break;
            
                  case UserOps.DELETE_CYNCHATTRIB:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.deleteCynchAttribute(
                          store.getState().configState.Dialog.content.cynchAttributeID
                        );
                        // adminStoreUtil.loadAllTrait(true);
                      } catch (e) {}
                    }
                    break;
            
                  case UserOps.ADD_ATTRIBUTE:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.addCynchAttributes(
                          store.getState().AdminCynchAttribOperationState
                        );
                      } catch (e) {}
                    }
                    break;
                  case UserOps.EDIT_ATTRIBUTE:
                    {
                      actionType = "";
                      try {
                        adminStoreUtil.addCynchAttributes(
                          store.getState().AdminCynchAttribOperationState
                        );
                      } catch (e) {}
                    }
                
               break;
            default:
                break;
        }
    }
    );
    return store;
}


export default RedUIStore;