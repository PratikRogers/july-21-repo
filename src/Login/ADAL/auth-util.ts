/* eslint-disable */
import { UserAgentApplication } from "msal";
import { setAuthContext } from "../MSAL/msalConfig";

export const QAConfig = {
    authority: 'https://login.microsoftonline.com/0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: 'b042e04b-8e03-4d3e-9a09-c902c7f0cdd7',
    
  };
  
  // export const DevConfig = {
  //   tenant: 'c6a741d7-f059-4f3c-9ae2-754a61748a0f',
  //   clientId: 'ed28af65-94bc-48de-93fd-321418c7ba74',
  //   endpoints: {
  //     api: '8a300448-967b-4f9c-a142-7ab8558e923b',
  //   },
  //   cacheLocation: 'localStorage'
  // };
  
  //Rogers
  export const DevConfig = {
    authority: 'https://login.microsoftonline.com/0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: 'e5c1dbfd-69e4-4f0c-990e-1ad66787f2af',
   
  };
  
  export const LocalConfig = {
    authority: 'https://login.microsoftonline.com/0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: '4511df5a-b8cc-4fb5-bf1c-b01b807a8769',
    
  }; 
  
  export const ProdConfig ={
    authority: 'https://login.microsoftonline.com/0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
    clientId: '58934b8a-6221-4941-bfc1-d9f44ccb3a4d',
    
  }
  let configAdal = LocalConfig;
  
   switch(process.env.REACT_APP_LOGIN_CONFIG) {
    case "DEV":
        configAdal = DevConfig;
        break;
    case "QA":
        configAdal = QAConfig;
        break;
    case "PROD":
        configAdal = ProdConfig;
        break;
    default:
        configAdal = LocalConfig;
        break;
  }
  
export const adalConfig = configAdal;
export const requiresInteraction = (errorMessage:any) => {
    if (!errorMessage || !errorMessage.length) {
        return false;
    }

    return (
        errorMessage.indexOf("consent_required") > -1 ||
        errorMessage.indexOf("interaction_required") > -1 ||
        errorMessage.indexOf("login_required") > -1
    );
};

export const fetchMsGraph = async (url:any, accessToken:any) => {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.json();
};

export const isIE = () => {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ") > -1;
    const msie11 = ua.indexOf("Trident/") > -1;

    // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
    const isEdge = ua.indexOf("Edge/") > -1;

    return msie || msie11 || isEdge;
};

export const GRAPH_SCOPES = {
    OPENID: "openid",
    PROFILE: "profile",
    USER_READ: "User.Read",
    MAIL_READ: "Mail.Read"
};

export const GRAPH_ENDPOINTS = {
    ME: "https://graph.microsoft.com/v1.0/me",
    MAIL: "https://graph.microsoft.com/v1.0/me/messages"
};

export const GRAPH_REQUESTS = {
    LOGIN: {
        scopes: [
            GRAPH_SCOPES.OPENID,
            GRAPH_SCOPES.PROFILE,
            GRAPH_SCOPES.USER_READ
        ]
    },
    EMAIL: {
        scopes: [GRAPH_SCOPES.MAIL_READ]
    }
};

function getCRMUploader() {
    let hostname = window && window.location && window.location.host;
    console.log("Get Home Path",window.location.origin);
    if (hostname === "localhost:3000") {
        return window.location.origin;
    }
    return window.location.origin+"/CRMUploader";

}

export const msalApp = new UserAgentApplication({
    auth: {
        clientId: configAdal.clientId,
        authority: configAdal.authority,
        validateAuthority: true,
        postLogoutRedirectUri: "http://localhost:3000",
        navigateToLoginRequestUrl: false,
        redirectUri: getCRMUploader()
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: isIE()
    },
    system: {
        navigateFrameWait: 0,
        // logger: {
        //     error: console.error,
        //     errorPii: console.error,
        //     info: console.log,
        //     infoPii: console.log,
        //     verbose: console.log,
        //     verbosePii: console.log,
        //     warning: console.warn,
        //     warningPii: console.warn
        // }
    }
});

if(isIE()) {
    msalApp.handleRedirectCallback(authCallback);

}
function authCallback(error:any, response:any) {
    console.log("Inside auth callback to get IE ",error, " Resp ",response.idToken);
    if (response.hasOwnProperty("idToken")) {
        setAuthContext(response);
    }
}


