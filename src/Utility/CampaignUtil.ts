
export function getTemplate() {
    return {
        "campaignName": "Test Campaign",
        "audience": "audience1",
        "budget": "$1000000",
        "startDate": "2018-08-16",
        "endDate": "2018-08-26",
        "dayOfWeek": "Wednesday",
        "dayPart": "Morning",
        "platform": "TV",
        "userName": "swami",
        "mailToAddresses": "swaminathan.balarama@rci.rogers.com"
    }
}

export function getTomorrowsDate() {
    const reqDate = new Date();

    reqDate.setDate(reqDate.getDate() + 5);
    const month = reqDate.getMonth() + 1;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    const mnth = reqDate.getMonth().toString().length === 1 ? "0" + month : month;
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}

export function getNewEndDate(date: any) {
    const reqDate = new Date(date);
    reqDate.setDate(reqDate.getDate() + 2);
    const month = reqDate.getMonth() + 1;
    const mnth = reqDate.getMonth().toString().length === 1 ? "0" + month : month;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}

export function getMaxCampaignDate() {
    const reqDate = new Date();
    reqDate.setDate(reqDate.getDate() + 549);
    const month = reqDate.getMonth() + 1;
    const mnth = reqDate.getMonth().toString().length === 1 ? "0" + month : month;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    return reqDate.getFullYear() + "-" + mnth + "-" + day;
}

export function getNewMaxCampaignDate(date: any) {
    if (date && date !== "") {
        const reqDate = new Date(date);
        reqDate.setDate(reqDate.getDate() + 549);
        const month = reqDate.getMonth() + 1;
        const mnth = reqDate.getMonth().toString().length === 1 ? "0" + month : month;
        const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
        return reqDate.getFullYear() + "-" + mnth + "-" + day;
    }
    return getMaxCampaignDate();
}

export function findDiffInDays(date1: any, date2: any) {
    if (date1 && date2 && date1 !== "" && date2 !== "") {
        date1 = new Date(date1);
        date2 = new Date(date2);
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        return Math.round(difference_ms / one_day);
    }
    return false;

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

export function getTodaysDate() {
    const reqDate = new Date();
    const month = reqDate.getMonth() + 1;
    const day = reqDate.getDate().toString().length === 1 ? "0" + reqDate.getDate() : reqDate.getDate();
    const mnth = reqDate.getMonth().toString().length === 1 ? "0" + month : month;
    return reqDate.getFullYear().toString() + mnth + day;
}