import Logger from "../../rogersframework/Logger/Logger";

// import * as adalC from 'node_modules/react-adal/lib/adal.js';
const AuthenticationContext = require('react-adal').AuthenticationContext;
const adalFetch =  require('react-adal').adalFetch;
const withAdalLogin = require('react-adal').withAdalLogin;

 export const QAConfig = {
  tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
  clientId: 'b042e04b-8e03-4d3e-9a09-c902c7f0cdd7',
  endpoints: {
    api: 'b042e04b-8e03-4d3e-9a09-c902c7f0cdd7',
  },
  cacheLocation: 'sessionStorage',
  expireOffsetSeconds :300,
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
  tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
  clientId: 'e5c1dbfd-69e4-4f0c-990e-1ad66787f2af',
  endpoints: {
    api: 'e5c1dbfd-69e4-4f0c-990e-1ad66787f2af',
  },
  cacheLocation: 'sessionStorage',
  expireOffsetSeconds :300,
};

export const LocalConfig = {
  tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
  clientId: '4511df5a-b8cc-4fb5-bf1c-b01b807a8769',
  endpoints: {
    api: '4511df5a-b8cc-4fb5-bf1c-b01b807a8769',
  },
  cacheLocation: 'sessionStorage',
  expireOffsetSeconds :300,
}; 

export const ProdConfig ={
  tenant: '0ab4cbbf-4bc7-4826-b52c-a14fed5286b9',
  clientId: '58934b8a-6221-4941-bfc1-d9f44ccb3a4d',
  endpoints: {
    api: '58934b8a-6221-4941-bfc1-d9f44ccb3a4d',
  },
  cacheLocation: 'sessionStorage',
  expireOffsetSeconds :300,
}
let configAdal = LocalConfig;

Logger.getInstance().printLogs(process.env.REACT_APP_LOGIN_CONFIG);
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

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch:any, url:any, options:any) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
