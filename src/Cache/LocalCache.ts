/* eslint-disable */
class LocalCache {
     cachedAttributes:any;
    constructor() {
        this.cachedAttributes = sessionStorage.getItem("REDUICache");
        if(!this.cachedAttributes) {
            sessionStorage.setItem("REDUICache",JSON.stringify({}));
            this.cachedAttributes = {};
        }
        else{
            this.cachedAttributes = JSON.parse(this.cachedAttributes);
        }
    }
     getCachedAttrib(itemName:any)
    {
        this.cachedAttributes = sessionStorage.getItem("REDUICache");
        let respObj = {isAttributeExist:false};
        try{
            this.cachedAttributes = JSON.parse(this.cachedAttributes);
            
            try{
                const decodedAttr = atob(this.cachedAttributes[itemName]);
                if(decodedAttr) {
                    respObj.isAttributeExist = true;
                    respObj[itemName]  = decodedAttr;
                }
            } catch(e){
                respObj.isAttributeExist = false;
            }
        }
        catch(e) {
            respObj.isAttributeExist = false;
        }
        return respObj;
    }
     saveAttribInCache(attrName:any,attrVal:any){
        const encodeItem = btoa(attrVal);
        this.cachedAttributes[attrName] = encodeItem;
        sessionStorage.setItem("REDUICache",JSON.stringify(this.cachedAttributes));
    }
}
export default LocalCache;