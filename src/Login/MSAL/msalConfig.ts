/* eslint-disable */
let authContext={idToken:{
  preferredName:'',
  rawIdToken:'',
  name:''
}};
export function getAuthContext(){
  return authContext;
}

export function setAuthContext(token:any) {
  authContext = token;
}

export function setAuthContextByAxios(token:any) {
  console.log("Setting new token",token);
  authContext = token;
}
export function getCachedUser() {
  return {
    profile:{name:authContext.idToken.name}
  }
}