/* eslint-disable */
export function getTomorrowsDate() {
    const reqDate = new Date();

    reqDate.setDate(reqDate.getDate() + 5);
    const month = reqDate.getMonth() + 1;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    const mnth = month.toString().length === 1 ? "0" + month : month;
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}

export function getAlertDate() {
    const reqDate = new Date();

    reqDate.setDate(reqDate.getDate());
    const month = reqDate.getMonth() + 1;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    const mnth = month.toString().length === 1 ? "0" + month : month;
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}
export function getNewEndDate(date: any) {
    const reqDate = new Date(date);
    reqDate.setDate(reqDate.getDate());
    const month = reqDate.getMonth() + 1;
    const mnth = month.toString().length === 1 ? "0" + month : month;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}

export function getEightYrsEndDate(date: any) {
    let reqDate = new Date();
    if (date !==null) {
        reqDate = new Date(date);
    }
    reqDate.setDate(reqDate.getDate()+2920);
    const month = reqDate.getMonth() + 1;
    const mnth = month.toString().length === 1 ? "0" + month : month;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}


export function convertToUTCDate(date: any) {
    const reqDate = new Date(date).toISOString();;
    console.log("UTC is ",reqDate);
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate()+1)
    const month = newDate.getMonth() + 1;
    const mnth = month.toString().length === 1 ? "0" + month : month;
    const day = newDate.getDate().toString().length === 1 ? "0" + newDate.getDate() : newDate.getDate();
    console.log("New Date is ", day +  "-" + mnth + "-" + newDate.getFullYear());
    return mnth+ "-" + day + "-" + newDate.getFullYear() ;
}

export function getMaxCampaignDate() {
    const reqDate = new Date();
    reqDate.setDate(reqDate.getDate() + 2920);
    const month = reqDate.getMonth() + 1;
    const mnth = month.toString().length === 1 ? "0" + month : month;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}

export function getNewMaxCampaignDate(date: any) {
    if (date && date !== "") {
        const reqDate = new Date(date);
        reqDate.setDate(reqDate.getDate() + 2920);
        const month = reqDate.getMonth() + 1;
        const mnth = month.toString().length === 1 ? "0" + month : month;
        const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
        return reqDate.getFullYear() + "-" + mnth + "-" + day;
    }
    return getMaxCampaignDate();
}

export function findDiffInDays(date1: any, date2: any) {
    
    if (date1 && date2 && date1 !== "" && date2 !== "") {
        date1 = new Date(date1);
        date1.setHours(0,0,0,0)
        date2 = new Date(date2);
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

export function isPastDateSelected(date1: any, date2: any, diff: any) {
    if (date1 && date2 && date1 !== "" && date2 !== "") {
        date1 = new Date(date1);
        date2 = new Date(date2);
        if (date1 < new Date() || date2 < new Date() || date1 > date2) {
            return -1;
        }
    }
    return diff;

}
 
export function isEmptyOrSpaces(str:any){
    return str === null || str.match(/^ *$/) !== null;
}