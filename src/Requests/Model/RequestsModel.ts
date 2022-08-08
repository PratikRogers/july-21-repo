import { List } from 'immutable';

export class RequestsModel {
    reportsList: any;
    rowId: any;
    constructor(list: any) {
        this.reportsList = [];
        this.buildModel(list);
        this.rowId = -1;
    }

    public buildModel(list: any) {
        this.reportsList = [];
        let contxt = this;
        if (list instanceof Object)
            for (let key in list) {
                if (list.hasOwnProperty(key)) {

                    if (key.endsWith("x") && list[key].hasOwnProperty("length") && list[key].length > 0) {
                        // console.log("Key is ",list[key]);
                        list[key].forEach(function (item: any) {
                            let fObject = contxt.extractFileName(item);
                            contxt.setReportingListItems(item, fObject);
                        });
                    }
                }
            }
    }

    public getReportingListPerRow(reportingRowID: any) {

    }

    public isReportingListEmpty() {
        if (this.reportsList.length <= 0) {
            return true;
        }
        return false;
    }

    public getReportingList() {
        return List(this.reportsList);
    }

    public fillAndResetReportList(payload: any) {
        this.buildModel(payload);
    }

    public setReportingItem(reptItem: any, fObject: any) {
        let tImpression = parseInt(reptItem.totalImpressions);
        let pacing = parseFloat(reptItem.pacing) * 100;
        let tClick = parseInt(reptItem.totalClicks);
        let bImpression =  Math.round(tImpression / (pacing / 100));
        let ctrs = tImpression > 0 ? (tClick / tImpression) * 100 : 0;
        let proposalId = "";
        this.rowId++;
        if (reptItem.proposalId && reptItem.proposalId !== "") {
            proposalId = reptItem.proposalId;
        }
        else {
            proposalId = fObject.propId;
        }
        
         let reportEntryObj = {
            rowId: this.rowId,
            fileId: reptItem.fileId,
            fileName: fObject.fileName,
            zipFileName: reptItem.zipFileName,
            fileCreateDate: reptItem.fileCreateDate,
            fileOwner: reptItem.fileOwner,
            ownerGroup: reptItem.ownerGroup,
            fileAvailableOnWl: reptItem.fileAvailableOnWl,
            pacing: pacing,
            totalImpressions: tImpression,
            totalClicks: tClick,
            totalConversions: reptItem.totalConversions,
            contractedAmount: reptItem.contractedAmount,
            actualAmount: reptItem.actualAmount,
            reportingPeriod: reptItem.reportingPeriod,
            proposalId: proposalId,
            reportType: reptItem.reportType,
            bookedImpression: bImpression,
            CTR: ctrs,
            isExcelAvailable: false,
            isPPTAvailable: false,
        };
        reportEntryObj.isExcelAvailable = fObject.excel;
        reportEntryObj.isPPTAvailable = fObject.ppt
        return reportEntryObj;
    }

    public setReportingListItems(reqObj: any, fObject: any) {
        let audienceItem = this.setReportingItem(reqObj, fObject);
        this.reportsList.push(audienceItem);
    }

    public extractFileName(row:any) {
        let fileObj = {fileName:"",excel:false,ppt:false, propId:""};
        let delemeterIndex = 0;
        if (row.hasOwnProperty("pptFileName") && row.pptFileName && row.pptFileName !== "") {
            delemeterIndex = row.pptFileName.indexOf("-");
            fileObj.fileName =  row.pptFileName.substring(delemeterIndex + 1, row.pptFileName.length-4);
            fileObj.propId = row.pptFileName.substring(0, delemeterIndex - 1);
            fileObj.ppt = true;
        }

        if (row.hasOwnProperty("excelFileName") && row.excelFileName && row.excelFileName !=="") {
            delemeterIndex = row.excelFileName.indexOf("-");
            fileObj.fileName =  row.excelFileName.substring(delemeterIndex + 1, row.excelFileName.length-4);
            fileObj.propId = row.excelFileName.substring(0, delemeterIndex - 1);
            fileObj.excel = true;
        }
        return fileObj;
    }
}

export default RequestsModel;