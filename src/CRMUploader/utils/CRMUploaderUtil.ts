/* eslint-disable */
import { CampaignEleConstants } from "../../ConstConfig/CampaignEleConstants";



export function isEmptyOrSpaces(str:any){
    return str === null || str.match(/^ *$/) !== null;
}

export function clearReportingErrorState() {
    const errStateObj = {
        proposalIDError: { show: false, errFlyoutIdentifier: CampaignEleConstants.REPORTING_ID_ERROR , cssAttrib:"proposalSearch error"},
        proposalID_NotExist_Error: { show: false, errFlyoutIdentifier: CampaignEleConstants.REPORTING_ID_FAILURE_ERROR , cssAttrib:"proposalSearch error"},
    }
    return errStateObj;
}

export function formatBytes(bytes:any, decimals = 2) {
    if (!bytes || bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}