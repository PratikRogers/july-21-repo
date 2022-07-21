import { IAudienceList, IAudience } from "./IAudienceModel";
import {List} from 'immutable';
import { convertToDate } from "../utils/dashboardValidation";

export class Audiences implements IAudienceList{
    audienceListID:any;
    audienceList:any;
    // private PartTwoSegement:ISegmentListWithORFilter;
    constructor(list:any) {
        this.audienceListID = 1234;
        this.audienceList = [];
        let contxt = this;
        let rId = 0;
        if(list.length > 0)
        list.forEach(function(item:any) { 
            if(item.userId ) {
                rId++;
                contxt.setAudienceListItems(item,rId);
            }
           
        });
    }
  
    public getAudienceListPerRow(audienceRowID:any) {
        return this.audienceList[audienceRowID];
    }
 
    public getAudienceList(){
        return List(this.audienceList);
    }

    public getEmptyAudienceItem(){
        return {
            id: 1,
            name: "",
            title:"",
            people: 0,
            tvSize: 0,
            radioSize: 0,
            digitalSize: 0,
            mobileSize: 0,
            emailSize: 0,
            status: 1,
            lastUpdated: "0",
            rowIndex:0
        };
    }

    public getRecordCountDetails(audienceSize:any) {
        const arrayOfStrings = audienceSize.split(",");
        return arrayOfStrings;
    }

    public getRecordWithSeparator(record:any,separator:any) {
        const arrayOfStrings = record.split(separator);
        return arrayOfStrings;
    }
    public getAudienceListItem(listItem:any, indx:any) {
        let audienceItem = <IAudience>listItem;
        const audience = this.getEmptyAudienceItem();
        const countItems = this.getRecordCountDetails(audienceItem.audienceSize);
        audience.id = audienceItem.audienceSizingId;
        audience.rowIndex = indx;
        audience.name =audience.title= audienceItem.templateName;
        audience.people = this.getRecordWithSeparator(countItems[0],"=")[1];
        audience.tvSize =  this.getRecordWithSeparator(countItems[1],"=")[1];
        audience.digitalSize =  this.getRecordWithSeparator(countItems[2],"=")[1];
        audience.lastUpdated = convertToDate(audienceItem.updateTs);
        return audience;
    }

    public getAudienceName(id:any) {
        let index = this.audienceList.findIndex((obj: any) => obj.id === id);
        return (index>=0 ? this.audienceList[index].name : "");
    }

    public setAudienceListItems(reqObj:any,rId:any) {
        let audienceItem = this.getAudienceListItem(reqObj,rId);
        this.audienceList.push(audienceItem);
    }

}

export default Audiences;