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
 
export function findDiffInDays(date1: any) {
    
  if (date1  && date1 !== ""  ) {
      date1 = date1.replace(/-/g,"/");
      date1 = new Date(date1);
      date1.setHours(0,0,0,0)
      const date2 = new Date();
      date2.setHours(0,0,0,0);
 
      var one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;
      return Math.round(difference_ms / one_day);
  }
  return -1;

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