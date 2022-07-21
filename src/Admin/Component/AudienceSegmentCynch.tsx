/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
// import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import "../../CSS/perfect-scrollbar.css";
import CustomDropDown from "../../CommonComponent/CustomDropDown";
import ErrorAlertBanner from "src/CommonComponent/ErrorAlertBanner";
import CalendarControl from "src/CommonComponent/Calendar/CalendarControl";
import { getEightYrsEndDate } from "src/CommonComponent/Calendar/utils/CampaignUtil";
// import { calendarChangeAction } from 'src/Actions';
const PerfectScrollbar = require("../../AudienceBuilder/thirdparty/perfect-scrollbar.js");
const update = require("react-addons-update");

class AudienceSegmentCynch extends React.Component<IAudienceSegmentCynch, {}> {
  public state: any;
  private refArr: any;
  private startDateCal: any;
  private endDateCal: any;

  constructor(props: any) {
    super(props);
    this.refArr = [];
    this.state = {
      agencyType: this.props.segmentModel.getAgenciesType(),
      agencyIDs: this.props.segmentModel.getAgenciesIDS()
        ? this.props.segmentModel.getAgenciesIDS()
        : 0,
      cynchSegmentType: this.props.segmentModel.getCynchSegmentType(),
      universeSize: this.props.segmentModel.getUniverseSize(),
      averageHours: this.props.segmentModel.getAvgHours(),
      agencyTypeID:
        this.props.segmentModel.getAgenciesType().toUpperCase() == "ALL"
          ? 1
          : 2,
      disableAgenciesEdit: this.props.isEditMode ? true : false,
      showInLinOpts: this.props.segmentModel.getShowInLinOpts(),
    };
    this.getSelectedAgencyType = this.getSelectedAgencyType.bind(this);
    this.getUserSelectedAgencyType = this.getUserSelectedAgencyType.bind(this);
    this.getSelectedCynchSegmentType = this.getSelectedCynchSegmentType.bind(
      this
    );
    this.getUserSelectedCynchSegmentType = this.getUserSelectedCynchSegmentType.bind(
      this
    );
    this.getAgencisDropDown = this.getAgencisDropDown.bind(this);
    this.getCynchSegType = this.getCynchSegType.bind(this);
    this.setUniverseSize = this.setUniverseSize.bind(this);
    this.setAverageHours = this.setAverageHours.bind(this);
    this.updateAllState = this.updateAllState.bind(this);
    this.updateAgencyIds = this.updateAgencyIds.bind(this);
    this.enableAgencyIDEdit = this.enableAgencyIDEdit.bind(this);
    this.setShowInLinOpts = this.setShowInLinOpts.bind(this);

    this.startDateCal = {
      Id: "startDate",
      NameId: "#startDateCal",
      name: "Valid From",
      identifier: "startDateCal",
    };
    this.endDateCal = {
      Id: "endDate",
      NameId: "#endDateCal",
      name: "Valid To",
      identifier: "endDateCal",
    };
  }

  componentDidUpdate() {
    this.props.handleCampaignUpdate({
      endDate: { date: getEightYrsEndDate(null) },
    });
  }

  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }

  updateAllState() {
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  getSelectedAgencyType() {
    return this.props.segmentModel.getAgenciesType();
  }

  getUserSelectedAgencyType(agencyType: any) {
    this.state.agencyType = agencyType.title;
    this.props.segmentModel.setAgenciesType(agencyType.title);
    this.state.agencyTypeID = agencyType.id;
    this.updateAllState();
  }

  getSelectedCynchSegmentType() {
    return this.props.segmentModel.getCynchSegmentType();
  }

  getUserSelectedCynchSegmentType(segType: any) {
    this.state.cynchSegmentType = segType.title;
    this.props.segmentModel.setCynchSegmentType(segType.title);
    if (segType.id == 1) {
      this.getUserSelectedAgencyType({ id: 1, title: "All" });
    }
    this.updateAllState();
  }

  public getAgencisDropDown() {
    const toggle =
      this.props.segmentModel.getCynchSegmentType() &&
      this.props.segmentModel.getCynchSegmentType().toUpperCase() === "STANDARD"
        ? ""
        : "dropdown";
    const ddList = {
      list: [
        { id: 1, title: "All" },
        { id: 2, title: "Specific Agencies" },
      ],
      isEditMode: false,
      toggle: toggle,
    };
    return (
      <CustomDropDown
        ddList={ddList}
        selectDDListItem={this.getUserSelectedAgencyType}
        selectedItem={this.getSelectedAgencyType}
        uiClasses={"ddWidth"}
      />
    );
  }

  public getCynchSegType() {
    const toggle = "dropdown";
    const ddList = {
      list: [
        { id: 1, title: "Standard" },
        { id: 2, title: "Custom" },
      ],
      isEditMode: false,
      toggle: toggle,
      scrollableDDclass: "scrollableDropdownSmallSize",
    };
    if (this.props.selectedDataSource.title.toUpperCase() == "PRIZM") {
      ddList.list.push({ id: 3, title: "Prizm" });
    }
    return (
      <CustomDropDown
        ddList={ddList}
        selectDDListItem={this.getUserSelectedCynchSegmentType}
        selectedItem={this.getSelectedCynchSegmentType}
        uiClasses={"ddWidth"}
      />
    );
  }

  public setUniverseSize(e: any) {
    const re = /^[0-9\b]+$/;
    if ((e.target.value && re.test(e.target.value)) || e.target.value === "") {
      this.state.universeSize = e.target.value;
      this.props.segmentModel.setUniverseSize(this.state.universeSize);
      this.updateAllState();
    }
  }

  public setShowInLinOpts(e: any) {
    this.state.showInLinOpts = e.target.checked;
    this.props.segmentModel.setShowInLinOpts(this.state.showInLinOpts);
    this.updateAllState();
  }

  public updateAgencyIds(e: any) {
    const re = /^[0-9,*]+$/;
    if ((e.target.value && re.test(e.target.value)) || e.target.value === "") {
      this.state.agencyIDs = e.target.value;
      this.props.segmentModel.setAgenciesIDS(this.state.agencyIDs);
      this.updateAllState();
    }
  }

  public setAverageHours(e: any) {
    const re = /^[0-9.*]+$/;
    if ((e.target.value && re.test(e.target.value)) || e.target.value === "") {
      this.state.averageHours = e.target.value;
      this.props.segmentModel.setAvgHours(this.state.averageHours);
      this.updateAllState();
    }
  }

  public enableAgencyIDEdit(e: any) {
    this.state.disableAgenciesEdit = false;
    this.updateAllState();
  }

  scrollRefComp(ref: any) {
    if (ref)
      new PerfectScrollbar(ref, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
  }

  public render() {
    const displayAgencyID = this.state.agencyTypeID == 2 ? " " : "d-none ";
    return (
      <div className="w-100 spaceBottom ">
        <form>
          <div className="col-xl-4 col-md-6 col-sm-8 col-12 clearB">
            <div className="platforms">
              <input
                type="checkbox"
                id="showInLinOpts"
                checked={this.state.showInLinOpts}
                key="showInLinOpts"
                onChange={this.setShowInLinOpts}
              />{" "}
              <label htmlFor="showInLinOpts">Show in Forecasting Tool</label>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12 col-12 spaceTop">
            <div className="form-group leftPos">
              <label htmlFor="formCompanyName text-uppercase">
                CYNCH SEGMENT TYPE
              </label>
              <div className="selectedTraits position-relative">
                {this.getCynchSegType()}
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 col-sm-12 col-12">
            <div className="form-group leftPos">
              <label htmlFor="agencyFormName text-uppercase">AGENCIES</label>
              <div className="selectedTraits position-relative ">
                {this.getAgencisDropDown()}
              </div>
            </div>
          </div>
          <div
            className={displayAgencyID + "col-xl-3 col-md-6 col-sm-12 col-12"}
          >
            <div className="form-group leftPos">
              <label htmlFor="aID">AGENCY ID(s)</label>
              <input
                value={this.state.agencyIDs}
                type="text"
                className="form-control"
                id="aID"
                placeholder="Type Agency IDs here"
                onChange={this.updateAgencyIds}
                disabled={this.state.disableAgenciesEdit}
              />
              {this.props.isEditMode && (
                <a href="javascript:void();" onClick={this.enableAgencyIDEdit}>
                  Edit
                </a>
              )}
              <ErrorAlertBanner
                errorMessageStruct={
                  this.props.errorStateCheck.segmentAgencyIdError
                }
              />
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12 col-12">
            <div className="form-group leftPos">
              <label htmlFor="universSizeId ">UNIVERSE SIZE</label>
              <input
                value={this.state.universeSize}
                type="text"
                className="form-control"
                id="universSizeId"
                placeholder="Type Universe size here"
                onChange={this.setUniverseSize}
              />
              <ErrorAlertBanner
                errorMessageStruct={
                  this.props.errorStateCheck.segmentUniverseSizeError
                }
              />
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12 col-12">
            <div className="form-group leftPos">
              <label htmlFor="avgTimeId ">AVERAGE HOURS/WEEK</label>
              <input
                value={this.state.averageHours}
                type="text"
                className="form-control"
                id="avgTimeId"
                placeholder="Type average hours here"
                onChange={this.setAverageHours}
              />
              <ErrorAlertBanner
                errorMessageStruct={
                  this.props.errorStateCheck.segmentAverageHoursError
                }
              />
            </div>
          </div>

          <div className="col-xl-3 col-md-6 col-sm-12 col-12">
            <CalendarControl CalendarCtrl={this.startDateCal} />
            <ErrorAlertBanner
              errorMessageStruct={this.props.errorStateCheck.dateError}
            />
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12 col-12">
            <CalendarControl CalendarCtrl={this.endDateCal} />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  return {};
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    handleCampaignUpdate(payload: any) {
      // dispatch(calendarChangeAction(payload));
    },
  };
})(AudienceSegmentCynch);

interface IAudienceSegmentCynch extends React.FC<any> {
  segmentModel: any;
  isEditMode: any;
  handleCampaignUpdate?: any;
  errorStateCheck: any;
  selectedDataSource: any;
  usrSelectedDates: any;
  history: any;
}
