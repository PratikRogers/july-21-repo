 import {List} from 'immutable';
 
export class ReportingModel {
    reportsList:any;
    rowId:any;
    constructor(list:any) {
        this.reportsList = [];
        this.buildModel(list);
        this.rowId=-1;
    }

    public buildModel(list:any) {
        let contxt = this;
        if(list instanceof Object)
        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                if(key.endsWith(".zip") && list[key].length > 0)
                list[key].forEach(function(item:any){
                    let delemeterIndex = item.fileName.indexOf("-");
                    let propId = item.fileName.substring(0,delemeterIndex-1);
                    let xIndex = contxt.reportsList.findIndex((obj:any) => obj.proposalId === propId);
                    if(xIndex <= -1) {
                        contxt.setReportingListItems(item,propId);
                    }
                    else{
                        if(item.fileName.endsWith("xlsx")) {
                            contxt.reportsList[xIndex].isExcelAvailable = true;
                        }
                        if(item.fileName.endsWith("pptx")) {
                            contxt.reportsList[xIndex].isPPTAvailable = true;
                        }
                    }
                });
            }
        }
    }

    public getReportingListPerRow(reportingRowID:any) {
        
    }
 
    public isReportingListEmpty() {
        if(this.reportsList.length<=0) {
            return true;
        }
        return false;
    }

    public getReportingList() {
        return List(this.reportsList);
    }

    public fillAndResetReportList(payload:any) {
        this.buildModel(payload);
    }

    public setReportingItem(reptItem:any,propId:any) {
        let tImpression = parseInt(reptItem.totalImpressions);
        let pacing = parseFloat( reptItem.pacing);
        let tClick = parseInt(reptItem.totalClicks);
        let bImpression = Math.round(tImpression/(pacing/100));
        let ctrs =tImpression>0? (tClick/tImpression)*100:0;
        let proposalId = "";
        this.rowId++;
        if(reptItem.proposalId && reptItem.proposalId !=="" ) {
            proposalId = reptItem.proposalId;
        }
        else {
            proposalId = propId;
        }

        let reportEntryObj = {
            rowId:this.rowId,
            fileId: reptItem.fileId,
            fileName: reptItem.fileName,
            zipFileName: reptItem.zipFileName,
            fileCreateDate: reptItem.fileCreateDate,
            fileOwner: reptItem.fileOwner,
            ownerGroup: reptItem.ownerGroup,
            fileAvailableOnWl: reptItem.fileAvailableOnWl,
            pacing: pacing,
            totalImpressions: tImpression,
            totalClicks: tClick,
            totalConversions:reptItem.totalConversions,
            contractedAmount:reptItem.contractedAmount,
            actualAmount:reptItem.actualAmount,
            reportingPeriod:reptItem.reportingPeriod,
            proposalId:proposalId,
            reportType: reptItem.reportType,
            bookedImpression:bImpression,
            CTR:ctrs,
            isExcelAvailable:false,
            isPPTAvailable:false,
        };
        reportEntryObj.isExcelAvailable = reptItem.fileName.endsWith("xlsx")?true:false;
        reportEntryObj.isPPTAvailable = reptItem.fileName.endsWith("pptx")?true:false;
        // console.log("Adding entry row ",this.rowId,reptItem)
        return reportEntryObj;
    }
 
    public setReportingListItems(reqObj:any,propId:any) {
        let audienceItem = this.setReportingItem(reqObj,propId);
        this.reportsList.push(audienceItem);
     }

}

export default ReportingModel;