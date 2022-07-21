
export function isValidDateRangeWithFlag(notification:any) {
    let resp = false;
    if (notification.hasOwnProperty("selected") && ((notification.selected === "Y") ||(notification.selected ===true))) {
    if ((notification.hasOwnProperty("startTs") && notification.startTs)) {
        const utcDate = convertToDate(notification.startTs,true);
        const utcEndDate = convertToDate(notification.endTs,true);
        const isToday = compareDates(new Date(),utcDate);
        // console.log("today - startday",new Date()," notificaiton start" ,utcDate, " Diff",isToday)
        const isEndDayToday = compareDates(new Date(),utcEndDate);
        // console.log("today - endDay",new Date()," notificaiton end" ,utcEndDate, " Diff",isEndDayToday)
        if(isToday===0 || isEndDayToday ===0) {
            resp = true;
        }
        else if(isToday<0 && isEndDayToday>=1) {
          resp = true;
        }
    }
  }
    // console.log("show Banner",resp);
    return resp;
}

export function convertToDate(date: any,toUTC=false) {
    if (date && date !== '') {
      let crdate=new Date();
      if(typeof date == "string" && date.includes("-")) {
        crdate = new Date(date.replace(/-/g, '/'));
        crdate.setUTCHours(0,0,0,0);
      }
      else{
        crdate = new Date(Number(date));
      }
      
      const month = crdate.getMonth() + 1;
      const mnth = month <= 9 ? '0' + month : month;
      if(toUTC) {
        crdate.setDate(crdate.getDate()+1);
      }
      const day =
        crdate.getDate() <= 9 ? '0' + crdate.getDate() : crdate.getDate();
      const respDate = crdate.getFullYear() + '-' + mnth + '-' + day;
      return respDate;
    }
    return '';
  }

  export function compareDates(date1: any, date2: any) {
    if (date1 && date2 && date1 !== "" && date2 !== "") {
        date1 = new Date(date1);
        date1.setUTCHours(0,0,0,0);
        date1.setDate(date1.getDate()+1);
        date2 = new Date(date2);
        date2.setUTCHours(0,0,0,0);
        date2.setDate(date2.getDate()+1);
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