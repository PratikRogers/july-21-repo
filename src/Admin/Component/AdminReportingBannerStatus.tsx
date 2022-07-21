/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import {
  slickStateAction, saveReportingStatusAction, calendarChangeAction,
} from '../../Actions';
import { UserOps } from '../../ConstConfig/UserOps';
import { AdminOperationKeys } from '../../ConstConfig/AdminOperationKeys';
import MessageBox from '../../CommonComponent/MessageBox';
import { NavBarConstants } from '../../ConstConfig';
// import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import '../../CSS/perfect-scrollbar.css';
import { isEmptyOrSpaces, getTomorrowsDate, getNewEndDate } from 'src/Utility/CampaignUtil';
import { clearAllErrorStateReportingTrait, convertToDate } from '../utils/dashboardValidation';
// import RTEComponent from 'src/CommonComponent/RTEEditor/RTEComponent';
import CalendarControl from 'src/CommonComponent/Calendar/CalendarControl';
import { convertToUTCDate, findDiffInDays } from 'src/CommonComponent/Calendar/utils/CampaignUtil';
import CustomDropDown from 'src/CommonComponent/CustomDropDown';
// import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import CustomErrorAlertBanner from 'src/CommonComponent/CustomErrorAlertBanner.';

const update = require('react-addons-update');

class AdminReportingBannerStatus extends React.Component<IAdminReportingBannerStatus, {}> {
  public state: any;
  private refArr: any;
  private startDateCal: any;
  private endDateCal: any;

  constructor(props: any) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.loadAdminPage = this.loadAdminPage.bind(this);
    this.saveReportingConf = this.saveReportingConf.bind(this);
    this.showPageDropDown = this.showPageDropDown.bind(this);
    this.getUserSelectedPageLabel = this.getUserSelectedPageLabel.bind(this);
    this.savePageLabel = this.savePageLabel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refArr = [];
    this.state = {
      selectedCat: 1,
      pageLabel: 'Digital',
      content:
        {
          'Digital' : this.props.currentReportingStatus,
          'TV' : this.props.currTVStatus
         } ,
      errorStateCheck: {}
    };
    this.state.errorStateCheck = clearAllErrorStateReportingTrait();
    this.setUserText = this.setUserText.bind(this);
    this.startDateCal = { Id: 'startDate', NameId: "#startDateCal", name: "ALERT START DATE", identifier: "startDateCal" };
    this.endDateCal = { Id: 'endDate', NameId: "#endDateCal", name: "ALERT END DATE", identifier: "endDateCal" };
  }

  componentDidUpdate() {
    this.state.content = {
      'Digital' : this.props.currentReportingStatus,
      'TV' : this.props.currTVStatus
     };
    const chkBox = this.refArr[0];
    if (chkBox) {
      chkBox.checked = (this.state.content[this.state.pageLabel].selected == true || this.state.content[this.state.pageLabel].selected == "Y") ? true : false;
    }
  }

  public goBack() {
    this.props.history.push('/AdminLandingPage');
  }

  public setUserText(userText: any) {
    let evnt = { target: { value: userText } };
    this.onControlsChange(AdminOperationKeys.STATUSMSG, evnt);
  }

  public onControlsChange(userInput: any, e: any) {
    switch (userInput) {
      case AdminOperationKeys.STATUSMSG:
        {
          this.state.content[this.state.pageLabel].message = e.target.value;
        }
        break;
      case AdminOperationKeys.REPORTBANNERTOGGLE:
        {
          this.state.content[this.state.pageLabel].selected = e.target.checked;
        }
        break;
      default:
        break;
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state
        }
      })
    );
  }

  public saveReportingConf() {
    this.state.errorStateCheck = clearAllErrorStateReportingTrait();
    const isInValidDateRange =  findDiffInDays(this.props.usrSelectedDates.startDate.date,this.props.usrSelectedDates.endDate.date) 
    console.log("The date is ",isInValidDateRange)
    if (!isEmptyOrSpaces(this.state.content[this.state.pageLabel].message) && isInValidDateRange >=0) {
    
      let startTs = convertToUTCDate(this.props.usrSelectedDates.startDate.date);
      let endTs = convertToUTCDate(this.props.usrSelectedDates.endDate.date);

      const toggleState = this.state.content[this.state.pageLabel].selected ? "Y" : "N";
      const id = this.state.content[this.state.pageLabel].id >= 0 ?  this.state.content[this.state.pageLabel].id : '';
      const payload = { id: id, pageLable: this.state.pageLabel, selected: toggleState, message: this.state.content[this.state.pageLabel].message, startTs: startTs, endTs: endTs }
      this.props.handleUserEntryUpdateAction(payload);
      const comp = this.refArr[1];
      if (comp) {
        comp.click();
      }
      this.setState(
        update(this.state, {
          pageLabel: {
            $set: ""
          }
        }));
    }
    else {
      if (isEmptyOrSpaces(this.state.content[this.state.pageLabel].message)) {
        this.state.errorStateCheck.reportingDescription.show = true;
      }
      if (isInValidDateRange < 0) {
        this.state.errorStateCheck.reportDateError.show = true;
      }
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state
        }
      })
    );
  }

  public loadAdminPage() {
    const dummyUserObj = {
      UserAction: 'SlickPosition',
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.history.push('/AdminLandingPage');
  }

  public handleChange(value:any) {
    this.setUserText(value);
   }


  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }

  getUserSelectedPageLabel() {
    return this.state.pageLabel;
  }

  public savePageLabel(subCatID: any) {
    this.state.pageLabel = subCatID.title
    this.props.updateDates(this.state.content[this.state.pageLabel].startTs,this.state.content[this.state.pageLabel].endTs);
     this.setState(
      update(this.state, {
        state: {
          $set: this.state
        }
      })
    );
  }

  showPageDropDown() {
    let subCat = {
      list: [  
        { title: "Digital" },
        { title: "TV" }],
      isEditMode: "",
      toggle: "dropdown",
    };
    return (
      <CustomDropDown
        ddList={subCat}
        selectDDListItem={this.savePageLabel}
        selectedItem={this.getUserSelectedPageLabel}
        uiClasses={"ddWidth"}
      />
    );
  }

  public render() {
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Reporting Status Page</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form>
              <div className="col-xl-6 col-md-6 col-sm-8 col-12 spaceBottom">
                <div className="form-group leftPos">
                  <label htmlFor="category">SELECT PAGE</label>
                  <div className="selectedTraits position-relative">
                    {this.showPageDropDown()}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formDescription">STATUS MESSAGE</label>
                  {/* <RTEComponent setUserText={this.setUserText} getUserText={this.userText} pageLabel={this.state.pageLabel}/> */}
                {/* uncomment below code before going ahead */}
                  {/* <ReactQuill value={this.state.content[this.state.pageLabel].message}
                  onChange={this.handleChange}  />  */}
                </div>

              </div>
              <div className="col-xl-3 col-md-6 col-sm-12 col-12">
                <CalendarControl CalendarCtrl={this.startDateCal} />
              </div>
              <div className="col-xl-3 col-md-6 col-sm-12 col-12">
                <CalendarControl CalendarCtrl={this.endDateCal} />
              </div>
              <div className="col-12 spaceBottom">
              <CustomErrorAlertBanner
                    errorMessageStruct={this.state.errorStateCheck.reportDateError}
                  />
              </div>
              <div className="col-xl-6 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <div className="reportStatus">
                    <span key={"span"}>
                      <input type="checkbox" id={"chkBox"}
                        onChange={this.onControlsChange.bind(this, AdminOperationKeys.REPORTBANNERTOGGLE)}
                        ref={node => this.focusText(node)} />
                      <label htmlFor={"chkBox"}>Show status message on reporting page</label></span>
                  </div>
                </div>
              </div>
              <div className="col-12 buttonPanel spaceBottom float-left">
                <div className="borderBottomGray spaceBottom48" />
                <a className="btn btnPrimary"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.saveReportingConf}>Save</a>
                <a className=""
                  href="javascript:void(0)"
                  role="button"
                  data-toggle="modal"
                  data-target="#messageBoxGeneric"
                  data-backdrop="static"
                  ref={node => this.focusText(node)} />
                <a className="btn btnPrimary float-right"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.loadAdminPage} > Cancel </a>
              </div>
            </form>
          </div>
        </div>
        <MessageBox handleUserAction={this.loadAdminPage} />
      </main>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  return {
    currentReportingStatus: state.ReportingConfigState.hasOwnProperty('data') && state.ReportingConfigState.data.hasOwnProperty('currReportingStatus')
      ? state.ReportingConfigState.data.currReportingStatus
      : { "id": -1, "pageLable": "Digital", "message": "", "selected": false, "startTs": "", "endTs": "", "creationTs": "", "updateTs": "" },
    currTVStatus: state.ReportingConfigState.hasOwnProperty('data') && state.ReportingConfigState.data.hasOwnProperty('currTVStatus')
    ? state.ReportingConfigState.data.currTVStatus
    : { "id": -1, "pageLable": "TV", "message": "", "selected": false, "startTs": "", "endTs": "", "creationTs": "", "updateTs": "" },
    errorMessage: props.errorMessage,
    usrSelectedDates: state.CalendarControlState.hasOwnProperty("data") && state.CalendarControlState.data ? state.CalendarControlState.data : { startDate: { date: getTomorrowsDate() }, endDate: { date: getNewEndDate(getTomorrowsDate()) } }
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      handleUserEntryUpdateAction(payload: any) {
        payload.userAction = UserOps.SET_REPORTING_STATUS;
        dispatch(saveReportingStatusAction(payload));
      },
      handleSubmit(payload: any) {
        dispatch(slickStateAction(payload));
      },
      updateDates(startTs:any,endTs:any) {
        let startDate = convertToDate(startTs, false);
        let endDate = convertToDate(endTs, false);

        let usrSelectedDates = {
          startDate: { date: startDate },
          endDate: { date: endDate },
        };
        dispatch(calendarChangeAction(usrSelectedDates));
      }

    };
  }
)(AdminReportingBannerStatus);

interface IAdminReportingBannerStatus extends React.FC<any> {
  errorMessage: any;
  handleUserEntryUpdateAction?: any;
  currentReportingStatus: any;
  handleSubmit: any;
  usrSelectedDates: any;
  currTVStatus: any;
  updateDates:any;
  history: any;
}
