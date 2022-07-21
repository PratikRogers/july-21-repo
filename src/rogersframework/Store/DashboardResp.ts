/* eslint-disable */
import { UserOps } from "../../ConstConfig/UserOps";
import { getGenderCount } from "./helper";

export function getDashboardGenderResponsePayload(returnVal: any) {
    let respObj ={};
    if (returnVal && returnVal.hasOwnProperty("femalePercentage") && returnVal.femalePercentage.hasOwnProperty(UserOps.AGE65)) {
        // this.clnt.post("POST", reqObjectSeg, dashboardObj).then((genderRes: any) => {
            const dummyResponseGen = returnVal;
            respObj = {
                femaleCount: dummyResponseGen.femaleTotalCount,
                maleCount: dummyResponseGen.maleTotalCount,
                malePercentage: dummyResponseGen.maleTotalPercentage,
                femalePercentage: dummyResponseGen.femaleTotalPercentage,
                tableFemaleData: getGenderCount(dummyResponseGen.femalePercentage),
                tableMaleData: getGenderCount(dummyResponseGen.malePercentage),
                canadian: dummyResponseGen.totalCanadians
            }
    }
    else {
        
        }
    // }
    return respObj;
}
 

export function getDashboardGeoMapResponsePayload(returnVal:any, geoMapCache:any, date:any,cIndex:any) {
    let respObj ={GeoMapAPIData:{}};
    if (returnVal && returnVal.hasOwnProperty("geoMaps") && returnVal.geoMaps.length > 0) {
        respObj.GeoMapAPIData = {GeoMaps:returnVal.geoMaps};
    }
    else {
         
    }
    // const allMaps = geoMapCache.getCachedAttrib("mapCityDate");
    // const cacheMap = {city:cIndex,geoMap: respObj.GeoMapAPIData};
    // const dMap = {date:date}
    // allMaps.push(cacheMap);
    // geoMapCache.saveAttribInCache("mapCityDate",allMaps);
    return respObj;
}