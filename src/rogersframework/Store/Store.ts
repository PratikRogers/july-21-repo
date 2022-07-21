/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducer/reduireducers';
import {  Configs, AppConstants } from "../../ConstConfig";
import { AxiosClient } from '../ClientServices/AxiosClient';
import { getAuthContext } from '../../Login/MSAL/msalConfig';
// import Logger from '../Logger/Logger';
import {    getActionTypeForConfirmOperation  } from './helper';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { StoreUitls } from './StoreUtils';
import reduiCRMUploaderMiddleWare from '../middleware/redui-crmuploader';


const RedUIStore = (preloadedState:any) => {
    
 // const dateStarted = new Date();
    const authContext = getAuthContext();
    const store = createStore(reducers, applyMiddleware( reduiCRMUploaderMiddleWare));
    const clnt = new AxiosClient(store);
    const urlConfig = new Configs();
    const storeUtil = new StoreUitls(store, clnt, urlConfig, authContext);
    const configSet = process.env.REACT_APP_LOGIN_CONFIG;
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
            actionType = store.getState().userAuth.hasOwnProperty("data") && store.getState().userAuth.isLoginSuccessful !== "" ? store.getState().userAuth.data.isLoginSuccessful : "";
        }
        if (store.getState().WizardStateHandle.hasOwnProperty("data")) {
            const WizardStateHandleData = store.getState().WizardStateHandle;
            actionType = WizardStateHandleData.data.hasOwnProperty("userAction") && WizardStateHandleData.data.userAction !== "" ? WizardStateHandleData.data.userAction : actionType;
        }
        if (store.getState().configState.hasOwnProperty("Dialog")) {
            const DialogData = store.getState().configState.Dialog;
            actionType = getActionTypeForConfirmOperation(DialogData, actionType);
        }
 
 
        switch (actionType) {
           case AppConstants.Inited:
               console.log(store.getState().userAuth.data);
               store.getState().userAuth.data.isLoginSuccessful = "";
                if(store.getState().userAuth.data.authContext.idToken.preferredName!='') {
                    storeUtil.login(true, store.getState().userAuth.data.authContext.idToken.preferredName, store.getState().userAuth.data.authContext.idToken.rawIdToken);

                }
                
               break;
            default:
                break;
        }
    }
    )
    return store;
}


export default RedUIStore;