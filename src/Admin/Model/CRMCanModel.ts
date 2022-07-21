import {List} from 'immutable';

export class CRMCanModel{

    crmCanList:any;
    // private PartTwoSegement:ISegmentListWithORFilter;
    constructor(list:any) {
        this.crmCanList = [];
        let contxt = this;
        let rId = 0;
        if(list.length > 0)
        list.forEach(function(item:any) { 
            if(item.logId ) {
                rId++;
                contxt.setcrmCanListItems(item,rId);
            }
        });
        // console.log(" CRM Can list",this.crmCanList);
    }

    public getcrmCanList(){
        return List(this.crmCanList);
    }

    public getEmptyCanListItem(){
        return {
            id: 1,
            name: "",
            title:"",
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
    public getcrmCanListItem(listItem:any, indx:any) {
        const crmItem = this.getEmptyCanListItem();
        crmItem.id =listItem.logId;
        crmItem.name =crmItem.title= listItem.logId + ": "+listItem.origFileName;
        return crmItem;
    }

    public getCanListName(id:any) {
        let index = this.crmCanList.findIndex((obj: any) => obj.id === id);
        return (index>=0 ? this.crmCanList[index].name : "");
    }

    public setcrmCanListItems(reqObj:any,rId:any) {
        let crmItem = this.getcrmCanListItem(reqObj,rId);
        this.crmCanList.push(crmItem);
    }

}

export default CRMCanModel;