/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import "../../CSS/datepicker.css";
import {  getNewEndDate, getNewMaxCampaignDate, getMaxCampaignDate, findDiffInDays, getAlertDate } from './utils/CampaignUtil';
import { calendarChangeAction } from '../../Actions';

class CalendarControl extends React.Component<ICampaignComponent, {}> {
    private calLabel: any;
    private months: any;
    private cache: any;
    private campStartDate: any
    private campEndDate: any;
     constructor(props: any) {
        super(props);
        this.months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        this.cache = {};
        this.showHideCal = this.showHideCal.bind(this);
        this.init = this.init.bind(this);
        this.switchMonth = this.switchMonth.bind(this);
        this.createCal = this.createCal.bind(this);
        this.clickDay = this.clickDay.bind(this);
        this.htmlToElement = this.htmlToElement.bind(this);
        this.hasThisClass = this.hasThisClass.bind(this);
        this.enableButtons = this.enableButtons.bind(this);
     }

    componentDidMount() {
       this.init(this.props.CalendarCtrl.NameId);
    }

    init(newWrap: any) {
        let calWrap = document.querySelector(newWrap);
        const context = this;
        if (calWrap !== null) {
            this.calLabel = calWrap.querySelector(".labelJS");
            this.campStartDate = new Date(this.props.usrSelectedDates.startDate.date);
            this.campEndDate = new Date(this.props.usrSelectedDates.endDate.date);
            calWrap.querySelector(".prevJS").onclick = function (evt: any) {
                evt = evt || window.event; // For IE
                context.switchMonth(calWrap, false);
            }
            calWrap.querySelector(".nextJS").onclick = function (evt: any) {
                evt = evt || window.event; // For IE
                context.switchMonth(calWrap, true);
            }
            this.calLabel.addEventListener('click', this.switchMonth(calWrap, null, this.campStartDate.getMonth(), this.campStartDate.getFullYear(), this.campStartDate, this.campEndDate));
            this.calLabel.click();
            this.clickDay(calWrap, this.campStartDate, this.campEndDate);
        }
    }

    switchMonth(cal: any, next: any, month?: any, year?: any, campStartDate?: any, campEndDate?: any) {
        let calWrap = cal,
            wrapLabel = calWrap.querySelector(".labelJS"),
            curr = wrapLabel.innerHTML.trim().split(" "),
            calendar, tempYear = parseInt(curr[1], 10);
        if (next !== null) {
            month = month || ((next) ? ((curr[0] === "DECEMBER" || curr[0] === "Décembre") ? 0 : this.months.indexOf(curr[0]) + 1) : ((curr[0] === "JANUARY" || curr[0] === "Janvier") ? 11 : this.months.indexOf(curr[0]) - 1));
        }
        year = year || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear - 1 : tempYear);

        if (!month) {
            if (next) {
                if (curr[0] === "DECEMBER" || curr[0] === "Décembre") {
                    month = 0;
                } else {
                    month = this.months.indexOf(curr[0]) + 1;
                }
            } else {
                if (next !== null) {
                    if (curr[0] === "JANUARY" || curr[0] === "Janvier") {
                        month = 11;
                    } else {
                        month = this.months.indexOf(curr[0]) - 1;
                    }
                }
            }
        }

        if (!year) {
            if (next && month === 0) {
                year = tempYear + 1;
            } else if (!next && month === 11) {
                year = tempYear - 1;
            } else {
                year = tempYear;
            }
        }

        calendar = this.createCal(calWrap, year, month);
        let calFrame = calWrap.querySelector(".cal-frameJS");

        let calObj = calFrame.querySelector(".curr");

        calObj.classList.remove("curr");
        calObj.classList.add("temp");

        let calTableTxt = calendar.calendar(),
            calTableNode = this.htmlToElement(calTableTxt);

        if(calTableNode && calFrame && calFrame.hasChildNodes()) {
            calFrame.insertBefore(calTableNode, (calFrame.hasChildNodes() ? calFrame.childNodes[0]:null));
            let tempStylA = calFrame.querySelector(".temp");
            if(tempStylA) {
                tempStylA.style.display = "none";
            }
        }
        wrapLabel.innerHTML = calendar.label;
        this.clickDay(calWrap, campStartDate, campEndDate);
    }


    createCal(cal: any, year: any, month: any) {
        let day = 1, j, haveDays = true,
            calWrap = cal,
            startDay = new Date(year, month, 2).getDay(),
            daysInMonths = [31, (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let calendar:any[];
        calendar = [];
        if (startDay == 0) {
            startDay = 6;
        }
        else {
            startDay = startDay - 1;
        }

        if (this.cache[year]) {
            if (this.cache[year][month]) {
                return this.cache[year][month];
            }
        } else {
            this.cache[year] = {};
        }

        let i = 0;
        while (haveDays) {
            calendar[i] = [];
            for (j = 0; j < 7; j++) {
                if (i === 0) {
                    if (j === startDay) {
                        calendar[i][j] = day++;
                        startDay++;
                    }
                } else if (day <= daysInMonths[month]) {
                    calendar[i][j] = day++;
                } else {
                    calendar[i][j] = "";
                    haveDays = false;
                }
                if (day > daysInMonths[month]) {
                    haveDays = false;
                }
            }
            i++;
        }
        let monthsName = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        let myArray = [];
        for (i = 0; i < calendar.length; i++) {
            // calendar[i] = "<tr><td>" + calendar[i].join("</td><td id=" + calendar[i] + "_" + monthsName[month] + "_" + year + ">") + "</td></tr>";
            let newArray = "<tr>"
            for (j = 0; j < calendar[i].length; j++) {
                if (calendar[i][j] == undefined || calendar[i][j] == "") {
                    newArray += "<td class=''></td>";
                } else {
                    newArray += "<td id=" + calendar[i][j] + "_" + monthsName[month] + "_" + year + ">" + calendar[i][j] + "</td>";
                }
            }
            newArray += "</tr>";
            myArray.push(newArray);
        }
        // calendar = "<table class='curr'>" + calendar.join("") + "</table>";
        let calendarX = "<table class='curr'>" + myArray.join("") + "</table>";
        if (month === new Date().getMonth()) {
            let tdArr = calWrap.querySelector(".cal-frameJS").querySelectorAll("td");
            for (let i = 0; i < tdArr.length; i++) {

                if (tdArr[i].innerHTML == new Date().getDate().toString()) {
                    tdArr[i].classList.add("today");
                }
            }
        }
        const context = this;
        this.cache[year][month] = {
            calendar: function () {
                return context.cloneObj(calendarX);
            },
            label: this.months[month] + " " + year
        };
        return this.cache[year][month];
    }


    clickDay(cal: any, campStartDate: any, campEndDate: any) {
        let wrap = cal;
        let calMonthNum;
        let tdArr = wrap.querySelector(".cal-frameJS").querySelectorAll("td"),
            label = wrap.querySelector(".labelJS"),
            curr = label.innerHTML.trim().split(" "),
            calMonth = curr[0],
            calYear = curr[1];

        if (curr[0] === "") {
            calMonth = this.months[campStartDate.getMonth()];
            calYear = campStartDate.getFullYear();
            label.innerHTML = (calMonth + " " + calYear);
            // alert("Empty");
        }
        
        
        label.innerHTML = (calMonth + " " + calYear);

        // alert("A" + calMonth + "Start " + campStartDate.getMonth().toString() + " End" + campEndDate);
        calYear = Number(calYear);

        switch (calMonth) {

            case "JANUARY":
            case "Janvier":
                calMonthNum = 0;
                break;
            case "FEBRUARY":
            case "Février":
                calMonthNum = 1;
                break;
            case "MARCH":
            case "Mars":
                calMonthNum = 2;
                break;
            case "APRIL":
            case "Avril":
                calMonthNum = 3;
                break;
            case "MAY":
            case "Mai":
                calMonthNum = 4;
                break;
            case "JUNE":
            case "Juin":
                calMonthNum = 5;
                break;
            case "JULY":
            case "Juillet":
                calMonthNum = 6;
                break;
            case "AUGUST":
            case "Août":
                calMonthNum = 7;
                break;
            case "SEPTEMBER":
            case "Septembre":
                calMonthNum = 8;
                break;
            case "OCTOBER":
            case "Octobre":
                calMonthNum = 9;
                break;
            case "NOVEMBER":
            case "Novembre":
                calMonthNum = 10;
                break;
            case "DECEMBER":
            case "Décembre":
                calMonthNum = 11;
                break;
        }
        let endSelDate = this.getMaxCampaignDate();
        
        for (let i = 0; i < tdArr.length; i++) {
            let chkdate = new Date();
            let calDate = new Date(calYear,calMonthNum,Number(tdArr[i].innerHTML.toString()));
            if  (this.props.CalendarCtrl.Id ==="endDate") {
                chkdate = new Date(this.props.usrSelectedDates.startDate.date);
                chkdate.setDate(chkdate.getDate()+1)
            }
            chkdate.setDate(chkdate.getDate());
            let diff = findDiffInDays(calDate, chkdate);
            if(calDate > new Date(endSelDate)) {
                diff = 1;
            }
             if(diff>0) {
                    tdArr[i].classList.add("beforeToday");
             }
             
        }
        
        const context = this;

        for (let i = 0; i < tdArr.length; i++) {
            let tdToChange = tdArr[i];

            tdToChange.onclick = function () {
                for (let j = 0; j < tdArr.length; j++) {
                    let tdToRevert = tdArr[j];
                    if (tdToRevert !== this) {
                        tdToRevert.classList.remove("active");
                    }
                }

                // let clsListSelector = wrap.parentElement.querySelector(".dateIcon");
                if (context.hasThisClass(this, "active")) {
                    this.classList.remove("active");
                } else {
                    if (!context.hasThisClass(this, "disabled")) {
                        this.classList.add("active");
                        context.showHideCal();
                    }
                }

                let calDate, calYear, calMonth,
                    curr = label.innerHTML.trim().split(" ");

                calMonth = curr[0];
                calYear = curr[1];
                calDate = Number(this.innerHTML);

                if (context.hasThisClass(this, "active")) {
                    let monthIndex = context.months.indexOf(calMonth);
                    let monthNum = monthIndex + 1;
                    monthNum = ('0' + monthNum).slice(-2)
                    wrap.parentElement.querySelector(".dateIcon").value = calYear + "-" + monthNum + "-" + ('0' + calDate).slice(-2);

                    if(context.props.CalendarCtrl.Id === "startDate") {
                        context.props.usrSelectedDates.startDate.date =  wrap.parentElement.querySelector(".dateIcon").value;
                        context.props.handleCampaignUpdate(context.props.usrSelectedDates);
                    }
                    else if(context.props.CalendarCtrl.Id === "endDate") {
                        context.props.usrSelectedDates.endDate.date =  wrap.parentElement.querySelector(".dateIcon").value;
                        context.props.handleCampaignUpdate(context.props.usrSelectedDates);
                    }
                 } else {
                    // wrap.parentElement.querySelector(".dateIcon").value = null;
                }
            }
        }   
        // let tdArrX = wrap.querySelectorAll("td");

 
        // for (let i = 0; i < tdArr.length; i++) {
        //     if (this.elementIsEmpty(tdArr[i])) {
        //          tdArr[i].classList.add("nil", "disabled");
        //         // tdArr[i].innerHTML = "-";
        //     }
        // }
    }


    enableButtons(cal:any, month:any, campStartDate:any, campEndDate:any) {
        let controlName = document.querySelector(this.props.CalendarCtrl.NameId);
        if (campEndDate !== undefined && month === campEndDate.getMonth()) {
            if (controlName.querySelector(".prevJS")) {
                controlName.querySelector(".prevJS").classList.remove("blockCampDate");
            }
            if (controlName.querySelector(".nextJS")) {
                controlName.querySelector(".nextJS").classList.add("blockCampDate");
            }
        }
        else if (campStartDate !== undefined && month === campStartDate.getMonth()) {
            if (controlName.querySelector(".prevJS")) {
                controlName.querySelector(".prevJS").classList.add("blockCampDate");
            }
            if (controlName.querySelector(".nextJS"))
                controlName.querySelector(".nextJS").classList.remove("blockCampDate");
        }
    }

    showHideCal() {
        let btStart: any, btEnd: any
        let cal = this.props.CalendarCtrl.NameId;
        let wrapper, dropDownBtn;
        if (typeof cal == "string") {
            wrapper = document.querySelector(cal);
        } else if (typeof cal == "object") {
            wrapper = cal;
        }
        let cal_1 = document.querySelector("#startDateCal"),
            cal_2 = document.querySelector("#endDateCal");

        if (cal == "#endDateCal") {
            let calBtn = cal_1.parentElement.querySelector(".dateIcon");
            calBtn.setAttribute("aria-expanded", "false");
            cal_1.classList.add("hidden");

        } else if (cal == "#startDateCal") {
            let calBtn = cal_2.parentElement.querySelector(".dateIcon");
            calBtn.setAttribute("aria-expanded", "false");
            cal_2.classList.add("hidden");
        }

        if (btStart !== null && btStart !== undefined && btEnd !== null && btEnd !== undefined) {
            let strStartDate = JSON.parse(btStart);
            let strEndDate = JSON.parse(btEnd);
            let startMonth = parseInt(strStartDate.split("-")[1]) - 1;
            let endMonth = parseInt(strEndDate.split("-")[1]) - 1;
            btStart = new Date(strStartDate.split("-")[0], startMonth, strStartDate.split("-")[2]);
            btEnd = new Date(strEndDate.split("-")[0], endMonth, strEndDate.split("-")[2]);
            // console.log("End Date was",btEnd);
        }

        dropDownBtn = wrapper.parentElement.querySelector(".dateIcon");

        if (this.hasThisClass(wrapper, "hidden")) {
            wrapper.classList.remove("hidden");
            dropDownBtn.setAttribute("aria-expanded", "true");

        } else {
            wrapper.classList.add("hidden");
            dropDownBtn.setAttribute("aria-expanded", "false");
        }
        this.clickDay(wrapper, btStart, btStart);
        if (btStart && btEnd && window && wrapper) {
            let calObj = window["CALENDAR"]();
            calObj.switchMonth(wrapper, null, btStart.getMonth(), btStart.getFullYear(), btStart, btEnd);
        }
    }


    hasThisClass(element: any, cls: any) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }


    elementIsEmpty(el: any) {
        return (/^(\s|&nbsp;)*$/.test(el.innerHTML));
    }

    fadeElOut(el: any) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }

    fadeElIn(el: any, display: any) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            let val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    }

    cloneObj(obj: any) {
        if (null == obj || "object" != typeof obj) return obj;
        let copy = obj.constructor();
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }


    htmlToElement(html: any) {
        let isIE11 = !(window['ActiveXObject']) && "ActiveXObject" in window;
        if (isIE11) {
            let div = document.createElement('div');
            div.innerHTML = html;
            return div.firstChild;
        } else {
            let template = document.createElement('template');
            template.innerHTML = html;
            return template.content.firstChild;
        
        }
    }

    hasSomeParentClass(element: any, classname: any) {
        if (element.className !== undefined && element.className !== "") {
            if (element.className.split(' ').indexOf(classname) >= 0) return true;
            return element.parentNode // && this.hasSomeParentClass(element.parentNode, classname);
        } 
            return false;
      
    }

    handleDatechange(payload:any) {
        this.props.handleCampaignUpdate(payload);
    }


    public getMinEndDate() {
        const endDate = this.props.usrSelectedDates.endDate.date;
        if (endDate && endDate !== "") {
            return getNewEndDate(endDate);
        }
        return getNewEndDate(new Date());
    }

    public getMaxCampaignDate() {
        const endDate = this.props.usrSelectedDates.endDate.date;
        if (endDate && endDate !== "") {
            return getNewMaxCampaignDate(endDate);
        }
        return getMaxCampaignDate();
    }

    public render() {
        let displayDate = this.props.usrSelectedDates[this.props.CalendarCtrl.Id].date;
        // if(this.props.CalendarCtrl.Id == "endDate" && this.props.usrSelectedDates[this.props.CalendarCtrl.Id].isDefault == true) {
        //     displayDate = getMaxCampaignDate();
        // }
        return (
            <div className="form-group leftPos">
                <label>{this.props.CalendarCtrl.name}</label>
                <div className="cal-dropdown-wrap">
                    <div className="inner-addon right-addon">
                        <input className="dateIcon form-control" type="text" name={this.props.CalendarCtrl.Id} id={this.props.CalendarCtrl.Id}
                            placeholder="YYYY-MM-DD" aria-haspopup="true" aria-expanded="false" value={displayDate} />
                        <div className="input-group-addon">
                            <span className="calendarIcon" onClick={this.showHideCal} />
                        </div>
                    </div>
                    <div id={this.props.CalendarCtrl.identifier} className="calendar-dropdown hidden" aria-labelledby={this.props.CalendarCtrl.Id}>
                        <div className="header">
                            <span className="left button prevJS" />
                            <span className="month-year labelJS" />
                            <span className="right button nextJS" />
                        </div>
                        <div className="calDaysPadding">
                            <table className="daysJS en">
                                <tr>
                                    <td>SUN</td>
                                    <td>MON</td>
                                    <td>TUE</td>
                                    <td>WED</td>
                                    <td>THR</td>
                                    <td>FRI</td>
                                    <td>SAT</td>
                                </tr>
                            </table>
                            <table className="daysJS fr">
                                <tr>
                                    <td>D</td>
                                    <td>L</td>
                                    <td>M</td>
                                    <td>M</td>
                                    <td>J</td>
                                    <td>V</td>
                                    <td>S</td>
                                </tr>
                            </table>
                        </div>
                        <div className="calTablePadding">
                            <div className="cal-frameJS">
                                <table className="curr" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state: any, props: any) {
    return {
        campaignData: state.CampaignState.hasOwnProperty("Config") ? state.CampaignState.Config : { audienceName: "", audienceId: "", cntBtnDisabled: true },
        CalendarCtrl: props.CalendarCtrl,
        usrSelectedDates:state.CalendarControlState.hasOwnProperty("data") &&  state.CalendarControlState.data ? state.CalendarControlState.data:{startDate:{date:getAlertDate()},endDate:{date:getAlertDate(),isDefault:true}}
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleCampaignUpdate(payload:any) {
            dispatch(calendarChangeAction(payload));
        }

    }

})(CalendarControl);

interface ICampaignComponent extends React.FC<any> {
    campaignData: any;
    handleCampaignUpdate: any;
    errorMessage: any;
    handleCapaignGoalAction?: any;
    CalendarCtrl: any;
    usrSelectedDates: any;
    history: any;
}
