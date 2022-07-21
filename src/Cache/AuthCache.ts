/* eslint-disable */
import LocalCache from "./LocalCache";

class AuthCache {
     authCached:any;
    constructor() {
        this.authCached = new LocalCache();
    }
     getRememberMeAttrib()
    {
        const authObj = this.authCached.getCachedAttrib("isRememberME");
        return authObj;
    }
     saveAttribInCache(attrName:any,attrVal:any){
        this.authCached.saveAttribInCache(attrName,attrVal);
    }

     getAuthDetails() {
        let authObj = {isValidObj: false,userName:"", password:""}
        const respUserObj = this.authCached.getCachedAttrib("userName");
        const respPassObj = this.authCached.getCachedAttrib("password");
        if(respUserObj.isAttributeExist && respPassObj.isAttributeExist) {
                authObj.isValidObj = true;
                authObj.userName = respUserObj.userName;
                authObj.password = respPassObj.password; 
        }
        return authObj;
    }
}
export default AuthCache;