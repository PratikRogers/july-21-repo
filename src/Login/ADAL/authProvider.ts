/* eslint-disable */
import { MsalAuthProvider, LoginType } from 'react-aad-msal';
// import {UserAgentApplication} from 'msal';
 
// Msal Configurations
 const config = {
  auth: {
    authority: 'https://login.microsoftonline.com/common',
    clientId: '4511df5a-b8cc-4fb5-bf1c-b01b807a8769',
    replyUrl: window.location.origin
  }, 
  cache: {
    storeAuthStateInCookie: false,
    // cacheLocation: 
  }
};
 
// Authentication Parameters
const authenticationParameters = {
  scopes: [
     'openid','offline_access', 'https://graph.microsoft.com/mail.read'
  ]
}
 
// Options
const options = {
  loginType: LoginType.Redirect,
//   tokenRefreshUri: window.location.origin + '/auth.html'
}
 
export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)
// export const myMSALObj = new UserAgentApplication(config);