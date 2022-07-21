/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
import {
  slickStateAction,
  sendAdminAudienceTraitAddAction,
  sendAdminAudienceTraitPaginationAction,
} from "../../Actions";
import { UserOps } from "../../ConstConfig/UserOps";
import { AdminOperationKeys } from "../../ConstConfig/AdminOperationKeys";
import MessageBox from "../../CommonComponent/MessageBox";
import { NavBarConstants } from "../../ConstConfig";
// import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import {
  clearAllErrorStateAudienceTrait,
  getSubSource,
} from "../utils/dashboardValidation";
import { isEmptyOrSpaces, findDiffInDays } from "src/Utility/CampaignUtil";

import ErrorAlertBanner from "../../CommonComponent/ErrorAlertBanner";
import { SegmentModel } from "../Model/SegmentModel";
import "../../CSS/perfect-scrollbar.css";
import CustomDropDown from "../../CommonComponent/CustomDropDown";
import { List } from "immutable";
import AudienceSegmentCynch from "./AudienceSegmentCynch";
import {
  convertToUTCDate,
  getAlertDate,
  getMaxCampaignDate,
} from "src/CommonComponent/Calendar/utils/CampaignUtil";
const PerfectScrollbar = require("../../AudienceBuilder/thirdparty/perfect-scrollbar.js");

const update = require("react-addons-update");

class AdminAudienceSegmentOperation extends React.Component<
  IAdminAudienceSegmentOperation,
  {}
> {
  public state: any;
  private refArr: any;
  private audienceTraitModel: SegmentModel;
  private selectedCat: any;
  private subCategoryList: any;
  private dataSourceList: any;
  private prizmData: any;
  constructor(props: any) {
    super(props);
    this.audienceTraitModel = new SegmentModel(null);
    this.goBack = this.goBack.bind(this);
    this.loadAdminPage = this.loadAdminPage.bind(this);

    this.saveAudienceTrait = this.saveAudienceTrait.bind(this);
    this.getUserSelectedCategoryPanel = this.getUserSelectedCategoryPanel.bind(
      this
    );
    this.getUserSelectedSubCategoryPanel = this.getUserSelectedSubCategoryPanel.bind(
      this
    );
    this.getCatDropDownCls = this.getCatDropDownCls.bind(this);
    this.getSubCatDropDownCls = this.getSubCatDropDownCls.bind(this);
    this.dropDownListItemSelected = this.dropDownListItemSelected.bind(this);
    this.getSelectedSource = this.getSelectedSource.bind(this);
    this.getLegacyField = this.getLegacyField.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.saveSubCategory = this.saveSubCategory.bind(this);
    this.getUserSelectedSource = this.getUserSelectedSource.bind(this);
    this.dropDownSourceSelected = this.dropDownSourceSelected.bind(this);
    this.getUserSelectedSubSource = this.getUserSelectedSubSource.bind(this);
    this.refArr = [];
    this.selectedCat = 1;
    this.state = {
      selectedCat: 1,
      selectedSoure: { title: "ADOBE SEGMENT", id: 1, heading: "LEGACY ID", key:AdminOperationKeys.LEGACYID},
      subCategory: "PROVINCE",
      showInBuilder: true,
      exposeToCynch: true,
      content: {
        email: "",
        userId: "",
        firstName: "",
        lastName: "",
        company: "",
      },
      errorStateCheck: {},
    };
    this.prizmData = require("../../data/prizm.json");
    this.dataSourceList = [
      {
        title: "ADOBE SEGMENT",
        needsDD: false,
        id: 1,
        heading: "LEGACY ID",
        key: AdminOperationKeys.LEGACYID,
      },
      {
        title: "ADOBE TRAIT",
        needsDD: false,
        id: 2,
        heading: "TRAIT ID",
        key: AdminOperationKeys.TRIATID,
      },
      {
        title: "CUSTOM",
        needsDD: false,
        id: 3,
        heading: "LEGACY ID",
        key: AdminOperationKeys.LEGACYID,
      },
      {
        title: "PRIZM",
        needsDD: true,
        id: 4,
        heading: "SELECT PRIZM ID",
        uiClasses: "ddWidth",
        dSource: this.prizmData,
      },
      {
        title: "TEMPLATE",
        needsDD: true,
        id: 5,
        heading: "SELECT AUDIENCE",
        uiClasses: "ddWidthAudi",
        dSource: this.props.audienceList,
      },
      {
        title: "CRM CANS",
        needsDD: true,
        id: 6,
        heading: "SELECT CRM CANs",
        uiClasses: "ddWidthAudi",
        dSource: this.props.crmCanList,
      },
      {
        title: "TV EXPOSURE",
        needsDD: true,
        id: 7,
        heading: "SELECT TV CAMPAIGN",
        uiClasses: "ddWidthAudi",
        dSource: this.props.TVCampaigOrders,
      },
    ];
    this.audienceTraitModel.setSubCategory(this.state.subCategory);
    if (this.props.editTraitsStat) {
      this.audienceTraitModel = new SegmentModel(this.props.editTraitsStat);
      this.selectedCat = this.audienceTraitModel.getSegmentTypeIndex();
      this.state.subCategory = this.audienceTraitModel.getSubCategory();
      this.state.selectedCat = this.selectedCat;
      this.state.selectedSoure = this.dataSourceList[
        this.audienceTraitModel.getStateIndex()
      ];
      this.state.showInBuilder = this.audienceTraitModel.getShowInBuilder();
      this.state.exposeToCynch = this.audienceTraitModel.getExportToCynch();
      let subSource = getSubSource(
        this.prizmData,
        this.props.audienceList,
        this.audienceTraitModel.getStateIndex(),
        this.audienceTraitModel.getSubSource(),
        this.audienceTraitModel.getInactiveLegacyId(),
        this.props.crmCanList,
        this.audienceTraitModel.getInactiveTvCampaignId(),
        this.props.TVCampaigOrders
      );
      this.audienceTraitModel.setSubSource(subSource);
    }

    this.subCategoryList = [
      { title: "PROVINCE" },
      { title: "AGE" },
      { title: "GENDER" },
      { title: "INCOME" },
      { title: "LANGUAGE" },
      { title: "WEBSITES" },
      { title: "TV" },
      { title: "R.E.D. STANDARD" },
      { title: "R.E.D. PREMIUM" },
      { title: "LOCATION INSIGHTS" },
      { title: "PRIZM5" },
      { title: "TEMPLATE" },
      { title: "CRM" },
      { title: "TV EXPOSURE" },
      { title: "ADOBE TRAITS" },
    ];

    this.state.errorStateCheck = clearAllErrorStateAudienceTrait();
    this.showEditWarning = this.showEditWarning.bind(this);
    this.getSelectedSource = this.getSelectedSource.bind(this);
    this.getSubCategory = this.getSubCategory.bind(this);
  }

  getUserSelectedCategoryPanel() {
    let roleTxt = " CATEGORY";
    const audTraitCat = ["", "DEMOGRAPHICS", "BEHAVIOURS", "INTERESTS"];
    if (this.state.selectedCat !== null) {
      roleTxt = audTraitCat[this.state.selectedCat];
    }
    if (roleTxt === "") {
      roleTxt = "DEMOGRAPHICS";
    }
    const userSelectedCat = roleTxt.charAt(0).toUpperCase() + roleTxt.slice(1);
    return (
      <a
        className="pl-0 dropdownToggle ddWidth"
        href="javascript:void(0);"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {userSelectedCat}
        <i className="dropdownToggleIcon float-right" />
      </a>
    );
  }

  getUserSelectedSubCategoryPanel() {
    return this.state.subCategory;;
  }

  getSubCatDropDownCls(roleDpLevel: any) {
    if (
      this.state.subCategory !== null &&
      this.state.subCategory === roleDpLevel
    ) {
      return "currentSelectedDrpDn dropdown-item ";
    } else {
      return "dropdown-item";
    }
  }

  getCatDropDownCls(roleDpLevel: any) {
    if (
      this.state.selectedCat !== null &&
      this.state.selectedCat === roleDpLevel
    ) {
      return "currentSelectedDrpDn dropdown-item ";
    } else {
      return "dropdown-item";
    }
  }

  public goBack() {
    this.props.submitLastPagination(this.props.lastUserOps);
    this.props.history.push("/AdminAudienceSegmentList");
  }

  public onControlsChange(userInput: any, e: any) {
    switch (userInput) {
      case AdminOperationKeys.SEGMENTNAME:
        {
          this.state.content.segmentName = e.target.value;
          this.audienceTraitModel.setSegmentName(e.target.value);
          if (!isEmptyOrSpaces(this.audienceTraitModel.getSegmentName())) {
            this.state.errorStateCheck.segmentNameError.show = false;
          }
        }
        break;
      case AdminOperationKeys.SEGMENTDESCR:
        {
          this.state.content.segmentLabel = e.target.value;
          this.audienceTraitModel.setSegmentLabel(e.target.value);
          if (!isEmptyOrSpaces(this.audienceTraitModel.getSegmentLabel())) {
            this.state.errorStateCheck.segmentDescriptionError.show = false;
          }
        }
        break;
      case AdminOperationKeys.LEGACYID:
        {
          this.state.content.inactiveLegacyId = e.target.value;
          this.audienceTraitModel.setInactiveLegacyId(e.target.value);
          if (!isEmptyOrSpaces(this.audienceTraitModel.getInactiveLegacyId())) {
            this.state.errorStateCheck.segmentLegacyIDError.show = false;
          }
        }
        break;
      case AdminOperationKeys.TRIATID:
        {
          this.state.content.inactiveAdobeTraitId = e.target.value;
          this.audienceTraitModel.setInactiveAdobeTraitId(e.target.value);
          if (
            !isEmptyOrSpaces(this.audienceTraitModel.getInactiveAdobeTraitId())
          ) {
            this.state.errorStateCheck.segmentLegacyIDError.show = false;
          }
        }
        break;
      case AdminOperationKeys.ADOBEID:
        {
          this.state.content.adobeId = e.target.value;
          this.audienceTraitModel.setAdobeSegmentId(e.target.value);
          if (!isEmptyOrSpaces(this.audienceTraitModel.getAdobeSegmentId())) {
            this.state.errorStateCheck.segmentAdobeSegmentIdError.show = false;
          }
        }
        break;
      case AdminOperationKeys.DATASOURCE:
        {
          this.state.selectedSoure = e.target;
          this.audienceTraitModel.setTraitType(e.target.title);
        }
        break;
      case AdminOperationKeys.SHOWINBUILDER:
        {
          this.state.showInBuilder = e.target.checked;
          this.audienceTraitModel.setShowInBuilder(e.target.checked);
        }
        break;
      case AdminOperationKeys.EXPOSETOCYNCH:
        {
          this.state.exposeToCynch = e.target.checked ? "Y" : "N";
          this.audienceTraitModel.setExportToCynch(this.state.exposeToCynch);
        }
        break;

      default:
        break;
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public saveCategory(catID: any, e: any) {
    this.selectedCat = catID;
    this.audienceTraitModel.setSegmentType(this.selectedCat);
    this.setState(
      update(this.state, {
        selectedCat: {
          $set: this.selectedCat,
        },
      })
    );
  }

  public saveSubCategory(subCatID: any) {
    this.audienceTraitModel.setSubCategory(subCatID.title);
    this.setState(
      update(this.state, {
        subCategory: {
          $set: subCatID.title,
        },
      })
    );
  }

  public saveAudienceTrait() {
    this.state.errorStateCheck = clearAllErrorStateAudienceTrait();
    let startTs = convertToUTCDate(this.props.usrSelectedDates.startDate.date);
    let endTs = convertToUTCDate(this.props.usrSelectedDates.endDate.date);
    this.audienceTraitModel.setStartDate(startTs);
    this.audienceTraitModel.setEndDate(endTs);
    if (this.audienceTraitModel.isObjectReady(this.props.editTraitsStat)) {
      const payload = this.audienceTraitModel.getUserTemplate();
      // console.log("Start and end date",startTs, endTs);
      let updateAudienceTratiAction = false;
      if (this.props.editTraitsStat) {
        updateAudienceTratiAction = true;
      }
      this.props.handleUserEntryUpdateAction(
        payload,
        updateAudienceTratiAction
      );
      const comp = this.refArr[3];
      if (comp) {
        comp.click();
      }
    } else {
      if (isEmptyOrSpaces(this.audienceTraitModel.getSegmentName())) {
        this.state.errorStateCheck.segmentNameError.show = true;
      }
      if (isEmptyOrSpaces(this.audienceTraitModel.getSegmentLabel())) {
        this.state.errorStateCheck.segmentDescriptionError.show = true;
      }
      if (
        this.audienceTraitModel.getStateIndex() == 0 && (
        isEmptyOrSpaces(this.audienceTraitModel.getInactiveLegacyId()))
      ) {
        this.state.errorStateCheck.segmentLegacyIDError.show = true;
      }
      if (
        this.audienceTraitModel.getStateIndex() == 1 && (
         isEmptyOrSpaces(this.audienceTraitModel.getInactiveAdobeTraitId())
      )) {
        this.state.errorStateCheck.segmentLegacyIDError.show = true;
      }
      if (
        this.audienceTraitModel.getStateIndex() == 0 &&
        isEmptyOrSpaces(this.audienceTraitModel.getAdobeSegmentId())
      ) {
        this.state.errorStateCheck.segmentAdobeSegmentIdError.show = true;
      }
      if (
        this.audienceTraitModel.getStateIndex() >= 3 &&
        this.audienceTraitModel.getSubSourceId() == ""
      ) {
        this.state.errorStateCheck.segmentSourceError.show = true;
      }
      if (this.audienceTraitModel.getExportToCynch() == "Y") {
        if (
          isEmptyOrSpaces(this.audienceTraitModel.getUniverseSize().toString())
        ) {
          this.state.errorStateCheck.segmentUniverseSizeError.show = true;
        }
        if (
          this.audienceTraitModel.getAgenciesType().toUpperCase() != "ALL" &&
          (!this.audienceTraitModel.getAgenciesIDS() ||
            isEmptyOrSpaces(
              this.audienceTraitModel.getAgenciesIDS().toString()
            ))
        ) {
          this.state.errorStateCheck.segmentAgencyIdError.show = true;
        }
        if (isEmptyOrSpaces(this.audienceTraitModel.getAvgHours().toString())) {
          this.state.errorStateCheck.segmentAverageHoursError.show = true;
        }
        let tempstartDate = startTs.replace(/-/g, "/");
        let tempendDate = endTs.replace(/-/g, "/");
        let diff = findDiffInDays(tempstartDate, tempendDate);
        // console.log("Start Date and Date date diff is ",diff);
        if (diff < 0) {
          this.state.errorStateCheck.dateError.show = true;
        }
      }
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public loadAdminPage() {
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK,
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.submitLastPagination({
      PaginationProps: this.props.lastUserOps,
    });
    this.props.history.push("/AdminAudienceSegmentList");
  }

  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }

  public showEditWarning(isVisiable: any) {
    const isNewlyAddedSegment =
      isVisiable !== "Y" && this.props.editTraitsStat ? true : false;
    const isSegmentOnlyUpdated =
      isVisiable === "Y" &&
      this.props.editTraitsStat &&
      this.props.editTraitsStat &&
      this.props.editTraitsStat &&
      this.audienceTraitModel.getLegacyId() !==
        this.audienceTraitModel.getInactiveLegacyId()
        ? true
        : false;
    let msg = "";
    const showWarning =
      isNewlyAddedSegment || isSegmentOnlyUpdated ? true : false;
    if (isNewlyAddedSegment) {
      msg =
        "This trait will not appear in the front end until the jobs re-index";
    } else if (isSegmentOnlyUpdated) {
      msg =
        "This trait has been modified. The updates will get reflected after job re-indexes";
    }

    if (showWarning) {
      return (
        <div className="col-xl-4 col-md-6 col-sm-8 col-12">
          <div className="form-group leftPos">
            <label htmlFor="formName">{msg}</label>
          </div>
        </div>
      );
    }

    return null;
  }

  public dropDownListItemSelected(item: any) {
    this.state.selectedSoure = item;
    this.audienceTraitModel.setTraitType(item.title);

    if(item.id === 2 && item.key == "TRIATID") {
      if((this.audienceTraitModel.getInactiveLegacyId() != "" || this.audienceTraitModel.getInactiveLegacyId()) && this.audienceTraitModel.displayLegacyOrTraitId()) {
        this.audienceTraitModel.setInactiveAdobeTraitId(this.audienceTraitModel.displayLegacyOrTraitId())
      }
    }
    

    if (item.id != 4) {
      if (
        this.audienceTraitModel.getCynchSegmentType() !== "" &&
        this.audienceTraitModel.getCynchSegmentType().toUpperCase() != "PRIZM"
      ) {
      } else {
        this.audienceTraitModel.setCynchSegmentType("Standard");
      }
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public dropDownSourceSelected(item: any) {
    // this.state.selectedSoure = item;
    this.audienceTraitModel.setSubSource(item.title);
    this.audienceTraitModel.setSubSourceId(item.id);
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public getUserSelectedSource() {
    return this.audienceTraitModel.getTraitType();
  }
  public getUserSelectedSubSource() {
    return this.audienceTraitModel.getSubSource();
  }

  public getSelectedSource() {
    const isEditMode = this.props.editTraitsStat ? true : false;
    const toggle = isEditMode ? "" : "dropdown";
    const ddList = {
      list: this.dataSourceList,
      isEditMode: isEditMode,
      toggle: toggle,
    };
    return (
      <CustomDropDown
        ddList={ddList}
        selectDDListItem={this.dropDownListItemSelected}
        selectedItem={this.getUserSelectedSource}
        uiClasses={"ddWidth"}
      />
    );
  }

  public getLegacyField() {
    const isEditMode = this.props.editTraitsStat ? true : false;
    const toggle = "dropdown";
    const ddList = {
      list: this.state.selectedSoure.dSource,
      isEditMode: isEditMode,
      toggle: toggle,
    };

    if (this.state.selectedSoure.id > 3) {
      return (
        <div className="form-group leftPos float-left col-6 pl-0 pr-0">
          <label htmlFor="legacyId">{this.state.selectedSoure.heading}</label>
          <div className="selectedTraits position-relative top15">
            <CustomDropDown
              ddList={ddList}
              selectDDListItem={this.dropDownSourceSelected}
              selectedItem={this.getUserSelectedSubSource}
              uiClasses={this.state.selectedSoure.uiClasses}
            />
          </div>
          <ErrorAlertBanner
            errorMessageStruct={this.state.errorStateCheck.segmentLegacyIDError}
          />
        </div>
      );
    } else {
      return (
        <div className="form-group leftPos float-left col-6 pl-0 pr-0">
          <label htmlFor="legacyId">{this.state.selectedSoure.heading}</label>
          <input
            type="text"
            className="form-control"
            id="legacyId"
            onChange={this.onControlsChange.bind(
              this,
              this.state.selectedSoure.key
            )}
            value={this.audienceTraitModel.displayLegacyOrTraitId()}
            placeholder="Type id here"
          />
          <ErrorAlertBanner
            errorMessageStruct={this.state.errorStateCheck.segmentLegacyIDError}
          />
        </div>
      );
    }
  }

  scrollRefComp(ref: any) {
    if (ref)
      new PerfectScrollbar(ref, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
  }

  getSubCategory() {
    let subCat = {
      list: this.subCategoryList,
      isEditMode: "",
      toggle: "dropdown",
    };
    return (
      <CustomDropDown
        ddList={subCat}
        selectDDListItem={this.saveSubCategory}
        selectedItem={this.getUserSelectedSubCategoryPanel}
        uiClasses={"ddWidth"}
      />
    );
  }

  public render() {
    const hideCynch = this.state.exposeToCynch === "Y" ? true : false;
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Add/Edit Trait</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form>
              {this.showEditWarning(
                this.audienceTraitModel.getCommissionToUi()
              )}
              <div className="col-xl-4 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formName">NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.SEGMENTNAME
                    )}
                    value={this.audienceTraitModel.getSegmentName()}
                    placeholder="Type name here"
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.segmentNameError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formDescription">DESCRIPTION</label>
                  <textarea
                    className="form-control"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.SEGMENTDESCR
                    )}
                    value={this.audienceTraitModel.getSegmentLabel()}
                    placeholder="Type description here"
                  >
                    derived from browser behaviour and billing records
                  </textarea>
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.segmentDescriptionError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12 zindex1">
                <div className="form-group leftPos float-left col-6 pl-0 pr-0">
                  <label htmlFor="formCompanyName">DATA SOURCE</label>
                  <div className="selectedTraits position-relative top15">
                    {this.getSelectedSource()}
                  </div>
                </div>
                {this.getLegacyField()}
                <ErrorAlertBanner
                  errorMessageStruct={
                    this.state.errorStateCheck.segmentSourceError
                  }
                />
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPo col-12 pl-0 pr-0 clearB">
                  <label htmlFor="adobeId">ADOBE ID</label>
                  <input
                    disabled={this.state.selectedSoure.id > 2 ? true : false}
                    type="text"
                    className="form-control"
                    id="adobeId"
                    placeholder="Type adobe id here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.ADOBEID
                    )}
                    value={this.audienceTraitModel.getAdobeSegmentId()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.segmentAdobeSegmentIdError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12 clearB">
                <div className="form-group leftPos float-left">
                  <label htmlFor="category">CATEGORY</label>
                  <div className="selectedTraits position-relative top15">
                    <div className="dropdown customDropdown show float-left pl-1">
                      {this.getUserSelectedCategoryPanel()}
                      <div
                        className="dropdown-menu ddWidth"
                        aria-labelledby="dropdownCategory"
                      >
                        <a
                          className={this.getCatDropDownCls(1)}
                          href="javascript:void(0);"
                          onClick={this.saveCategory.bind(this, 1)}
                          ref={(node) => this.focusText(node)}
                        >
                          <span>
                            DEMOGRAPHICS{" "}
                            <i className="dropdownToggleIcon float-right iconPosition" />
                          </span>
                        </a>
                        <a
                          className={this.getCatDropDownCls(3)}
                          href="javascript:void(0);"
                          onClick={this.saveCategory.bind(this, 3)}
                          ref={(node) => this.focusText(node)}
                        >
                          <span>INTERESTS</span>
                        </a>
                        <a
                          className={this.getCatDropDownCls(2)}
                          href="javascript:void(0);"
                          onClick={this.saveCategory.bind(this, 2)}
                          ref={(node) => this.focusText(node)}
                        >
                          <span>BEHAVIOURS</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12 clearB">
                <div className="form-group leftPos float-left">
                  <label htmlFor="category">SUB CATEGORY</label>
                  <div className="selectedTraits position-relative top15">
                    {this.getSubCategory()}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12 clearB">
                <div className="platforms">
                  <input
                    type="checkbox"
                    id="commissionToUI"
                    checked={this.state.showInBuilder}
                    key="commissionToUI"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.SHOWINBUILDER
                    )}
                  />{" "}
                  <label htmlFor="commissionToUI">Visible in Builder</label>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12 clearB">
                <div className="platforms">
                  <input
                    type="checkbox"
                    id="exposetoCynch"
                    checked={this.state.exposeToCynch == "Y" ? true : false}
                    key="exposetoCynch"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.EXPOSETOCYNCH
                    )}
                  />{" "}
                  <label htmlFor="exposetoCynch">Expose to Cynch</label>
                </div>
              </div>
              {hideCynch && (
                <AudienceSegmentCynch
                  segmentModel={this.audienceTraitModel}
                  isEditMode={this.props.editTraitsStat}
                  errorStateCheck={this.state.errorStateCheck}
                  usrSelectedDates={this.props.usrSelectedDates}
                  selectedDataSource={this.state.selectedSoure}
                />
              )}
              <div className="col-12 buttonPanel spaceBottom float-left">
                <div className="borderBottomGray spaceBottom48" />
                <a
                  className="btn btnPrimary"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.saveAudienceTrait}
                >
                  Save
                </a>
                <a
                  className=""
                  href="javascript:void(0)"
                  role="button"
                  data-toggle="modal"
                  data-target="#messageBoxGeneric"
                  data-backdrop="static"
                  ref={(node) => this.focusText(node)}
                />
                <a
                  className="btn btnPrimary float-right"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.loadAdminPage}
                >
                  Cancel
                </a>
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
    editTraitsStat: state.AdminUserEditControlState.hasOwnProperty("data")
      ? state.AdminUserEditControlState.data
      : null,
    errorMessage: props.errorMessage,
    lastUserOps: state.AdminUserTraitListPaginationControlState.hasOwnProperty(
      "PaginationProps"
    )
      ? state.AdminUserTraitListPaginationControlState.PaginationProps
      : { currPage: 1, maxPageSize: 6, pageStartIndex: 1 },
    audienceList: state.AudiencesState.hasOwnProperty("AudienceList")
      ? state.AudiencesState.AudienceList
      : List([]),
    crmCanList: state.CRMCanListState.hasOwnProperty("CRMCanList")
      ? state.CRMCanListState.CRMCanList
      : List([]),
    usrSelectedDates:
      state.CalendarControlState.hasOwnProperty("data") &&
      state.CalendarControlState.data
        ? state.CalendarControlState.data
        : {
            startDate: { date: getAlertDate() },
            endDate: { date: getMaxCampaignDate() },
          },
    TVCampaigOrders: state.AdminTVOrdersListState.hasOwnProperty("data")
      ? state.AdminTVOrdersListState.data
      : List([]),
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    handleUserEntryUpdateAction(payload: any, userOps?: any) {
      payload.userAction = UserOps.ADD_TRAITS;
      if (userOps) {
        payload.userAction = UserOps.EDIT_TRAITS;
      }
      dispatch(sendAdminAudienceTraitAddAction(payload));
    },

    handleSubmit(payload: any) {
      dispatch(slickStateAction(payload));
    },
    submitLastPagination(payload: any) {
      dispatch(sendAdminAudienceTraitPaginationAction(payload));
    },
  };
})(AdminAudienceSegmentOperation);

interface IAdminAudienceSegmentOperation extends React.FC<any> {
  audienceList: any;
  handleCampaignUpdate: any;
  errorMessage: any;
  handleUserEntryUpdateAction?: any;
  usrSelectedDates: any;
  handleSubmit: any;
  editTraitsStat?: any;
  lastUserOps?: any;
  submitLastPagination?: any;
  crmCanList?: any;
  TVCampaigOrders?: any;
  history: any;
}
