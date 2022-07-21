import LocalCache from "./LocalCache";

class GeoMapCache {
    private geoMapCached:any;
    constructor() {
        this.geoMapCached = new LocalCache();
    }
    public getAllCityMap()
    {
        const authObj = this.geoMapCached.getCachedAttrib("mapCityDate");
        return authObj;
    }
    public saveAttribInCache(attrName:any,attrVal:any) {
        this.geoMapCached.saveAttribInCache(attrName,attrVal);
    }

    public getCityMap(city:any,date:any) {
        let authObj = {isValidObj: false,cityMap:{}};
        const respUserObj = this.geoMapCached.getCachedAttrib("mapCityDate");
        if(respUserObj && respUserObj.hasOwnProperty("date")) {
            let resp = respUserObj.findIndex((obj: any) => obj.date === date);
            let cityMap = resp.findIndex((obj:any) => obj.cityIndex === city);
            if(respUserObj.isAttributeExist  ) {
                    authObj.isValidObj = true;
                    authObj.cityMap = cityMap;
            }   
            return authObj;
        }
     return null;   
    }
    
}
export default GeoMapCache;