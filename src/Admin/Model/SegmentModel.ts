import { findDiffInDays } from "src/Utility/CampaignUtil";

export class SegmentModel {
  private segmentId: any;
  private segmentName: any;
  private segmentLabel: any;
  private segmentType: any;
  private adobeSegmentId: any;
  private legacyId: any;
  private inactiveLegacyId: any;
  private commissionToUi: any; // If indexed or not to show on Audience Builder
  private recordStatus: any; //A or D (active or disabled)
  private traitType: any; //Static or Dynamic
  private subCategory: any;
  private seqNo: any;
  private subSource: any;
  private subSourceId: any;
  private showInBuilder: any;
  // RED- 2615
  private exposeToCynch?: any;
  private cynchSegmentType?: any;
  private agencyDetails?: any;
  private agencyType?: any;
  private agencyIds?: any;
  private universeSize?: any;
  private averageTime?: any;
  // RED-2827
  private startDate?: any;
  private endDate?: any;

  private inactiveAdobeTraitId?:any;

  //RED-
  private showInLinOpts?:any;

  constructor(userentry: any) {
    this.segmentId = "";
    this.segmentName = "";
    this.segmentLabel = "";
    this.segmentType = 1;
    this.adobeSegmentId = "";
    this.legacyId = "";
    this.commissionToUi = "";
    this.recordStatus = "";
    this.traitType = "ADOBE SEGMENT";
    this.inactiveLegacyId = "";
    this.subCategory = "";
    this.seqNo = "";
    this.subSource = "";
    this.subSourceId = "";
    this.showInBuilder = "Y";
    // RED- 2615
    this.exposeToCynch = "N";
    this.cynchSegmentType = "Standard";
    this.agencyDetails = { agencyType: "All", agencyIds: 0 };
    this.universeSize = "";
    this.averageTime = "";
    this.agencyType = "All";
    this.agencyIds = null;
    this.inactiveAdobeTraitId="";
    this.showInLinOpts = false;

    if (userentry) {
      // const sourceArr = ["ADOBE","CUSTOME","PRIZM","TEMPLATE"];
      if (
        (userentry.agencyDetails &&
          userentry.agencyDetails.hasOwnProperty("agencyType") &&
          userentry.agencyDetails.agencyType == null) ||
        !userentry.agencyDetails
      ) {
        this.agencyDetails = { agencyType: "All", agencyIds: null };
        this.agencyType = this.agencyDetails.agencyType;
        this.agencyIds = null;
      } else {
        this.agencyDetails = userentry.agencyDetails;
        this.agencyType = this.agencyDetails.agencyType;
        this.agencyIds = this.agencyDetails.agencyIds
          ? this.agencyDetails.agencyIds.join(",")
          : null;
      }

      const subSourceId = userentry.prizmId
        ? userentry.prizmId
        : userentry.templateId
        ? userentry.templateId
        : userentry.inactiveCrmId
        ? userentry.inactiveCrmId
        : userentry.inactiveTvCampaignId
        ? userentry.inactiveTvCampaignId
        : "";
      this.segmentId = userentry.segmentId;
      this.segmentName = userentry.segmentName;
      this.segmentLabel = userentry.segmentLabel;
      this.segmentType = userentry.segmentType;
      this.adobeSegmentId = userentry.adobeSegmentId;
      this.inactiveLegacyId = userentry.inactiveLegacyId;
      this.inactiveAdobeTraitId = userentry.inactiveAdobeTraitId;
      this.legacyId = userentry.legacyId;
      this.commissionToUi = userentry.commissionToUi;
      this.recordStatus = userentry.recordStatus;
      this.traitType = userentry.traitType;
      this.subCategory = userentry.subCategory;
      this.seqNo = userentry.seqNo;
      this.subSource = subSourceId;
      this.subSourceId = subSourceId;
      this.showInBuilder =
        (userentry.hasOwnProperty("showInBuilder") &&
          userentry.showInBuilder == "Y") ||
        userentry.showInBuilder === true
          ? true
          : false;

      this.showInLinOpts  = (userentry.hasOwnProperty("showInLinOpts") &&
      userentry.showInLinOpts == "Y") ||
    userentry.showInLinOpts == true
      ? true
      : false;
      // RED- 2615
      this.exposeToCynch = userentry.exposeToCynch;
      this.cynchSegmentType = userentry.cynchSegmentType
        ? userentry.cynchSegmentType
        : "STANDARD";

      this.universeSize = userentry.universeSize ? userentry.universeSize : 0;
      this.averageTime = userentry.averageTime ? userentry.averageTime : 0;

      // RED-2827
      this.startDate = userentry.startDate;
      this.endDate = userentry.endDate;
      // console.log("In Edit mode", userentry);
    }
  }

  public getSegmentId() {
    return this.segmentId;
  }
  public setSegmentId(id: any) {
    this.segmentId = "";
    this.segmentId = id;
  }

  public displayLegacyOrTraitId(){
    if (this.inactiveAdobeTraitId != "" && this.getStateIndex() == 1) {
      return this.inactiveAdobeTraitId;
    }
    else return this.getInactiveLegacyId()
  }

  public getSegmentName() {
    return this.segmentName;
  }
  public setSegmentName(str: any) {
    this.segmentName = str;
  }

  public getSegmentLabel() {
    return this.segmentLabel;
  }
  public setSegmentLabel(str: any) {
    this.segmentLabel = str;
  }

  public getSegmentType() {
    return this.segmentType;
  }
  public setSegmentType(str: any) {
    this.segmentType = str;
  }

  public getAdobeSegmentId() {
    return this.adobeSegmentId;
  }
  public setAdobeSegmentId(str: any) {
    this.adobeSegmentId = str;
  }
  public getLegacyId() {
    return this.legacyId;
  }
  public setLegacyId(str: any) {
    this.legacyId = str;
  }
  public getInactiveLegacyId() {
    return this.inactiveLegacyId;
  }
  public setInactiveLegacyId(str: any) {
    this.inactiveLegacyId = str;
  }

  public getInactiveAdobeTraitId() {
    return this.inactiveAdobeTraitId;
  }
  public setInactiveAdobeTraitId(str: any) {
    this.inactiveAdobeTraitId = str;
  }

  public getCommissionToUi() {
    return this.commissionToUi;
  }
  public setCommissionToUi(str: any) {
    this.commissionToUi = str;
  }
  public getRecordStatus() {
    return this.recordStatus;
  }
  public setRecordStatus(str: any) {
    this.recordStatus = str;
  }

  public getSubCategory() {
    return this.subCategory;
  }

  public getSeqNo() {
    return this.seqNo;
  }
  public setSeqNo(str: any) {
    this.seqNo = str;
  }

  public setSubCategory(subCat: any) {
    this.subCategory = subCat;
  }

  public setShowInBuilder(isChecked: any) {
    if (isChecked == true || isChecked == "Y") {
      this.showInBuilder = "Y";
    } else {
      this.showInBuilder = "N";
    }
  }

  public getShowInBuilder() {
    let checked = this.showInBuilder;
    if (checked == "Y" || checked === true) {
      return true;
    } else {
      return false;
    }
  }

  public setShowInLinOpts(isChecked: any) {
    if (isChecked == true || isChecked == "Y") {
      this.showInLinOpts = "Y";
    } else {
      this.showInLinOpts = "N";
    }
  }

  public getShowInLinOpts() {
    let checked = this.showInLinOpts;
    if (checked == "Y" || checked === true) {
      return true;
    } else {
      return false;
    }
  }

  private getShowInLinOptsText() {
    if (this.showInLinOpts === true || this.showInLinOpts === false) {
      if (this.showInLinOpts === true) {
        return "Y";
      }
      if (this.showInLinOpts === false) {
        return "N";
      }
    } else {
      return this.showInLinOpts;
    }
  }


  public getTraitTypeIndex() {
    if (this.traitType.toUpperCase() === "ADOBE SEGMENT") {
      this.traitType = "D";
    } 
    else if(this.traitType.toUpperCase() === "ADOBE TRAIT") {
      this.traitType = "A";
    }
    else this.traitType = "S";

    return this.traitType;
  }

  public getTraitTypeText() {
    if (this.traitType === "D" || this.traitType.toUpperCase() === "ADOBE SEGMENT") {
      return "ADOBE SEGMENT";
    } 
    else if(this.traitType === "A" || this.traitType.toUpperCase() === "ADOBE TRAIT") {
      return "ADOBE TRAIT";
    }
    else return "Custom";
  }

  public getSegmentTypeIndex() {
    if (isNaN(this.segmentType)) {
      let indx = 1;
      switch (this.segmentType) {
        case "Demographics":
          indx = 1;
          break;
        case "Behaviours":
          indx = 2;
          break;
        case "Interests":
          indx = 3;
          break;
        default:
          indx = 1;
          break;
      }
      return indx;
    }
    return this.segmentType;
  }

  public getTraitType() {
    return this.traitType;
  }

  public setTraitType(str: any) {
    this.traitType = str;
  }

  public getSubSource() {
    return this.subSource;
  }

  public getSubSourceId() {
    return this.subSourceId;
  }

  setSubSourceId(str: any) {
    this.subSourceId = str;
  }

  public setSubSource(str: any) {
    this.subSource = str;
  }

  public findIndex(arrObj: any, id: any) {
    return arrObj.findIndex((obj: any) => obj == id);
  }

  public getPrizmId() {
    if (this.getStateIndex() == 3) {
      return this.subSourceId;
    }
    return "";
  }

  public getInactiveCRMId() {
    if (this.getStateIndex() == 5) {
      return this.subSourceId;
    }
    return "";
  }

  public getTemplateId() {
    if (this.getStateIndex() == 4) {
      return this.subSourceId;
    }
    return "";
  }

  public getInactiveTvCampaignId() {
    if (this.getStateIndex() == 6) {
      return this.subSourceId;
    }
    return "";
  }

  // RED- 2615
  public getExportToCynch() {
    return this.exposeToCynch;
  }

  public setExportToCynch(str: any) {
    this.exposeToCynch = str;
  }

  public getCynchSegmentType() {
    return this.cynchSegmentType;
  }

  public setCynchSegmentType(str: any) {
    this.cynchSegmentType = str;
  }

  public getAgenciesType() {
    return this.agencyType;
  }

  public setAgenciesType(str: any) {
    this.agencyType = str;
  }

  public getAgenciesIDS() {
    return this.agencyIds;
  }

  public setAgenciesIDS(str: any) {
    this.agencyIds = str;
  }

  public getUniverseSize() {
    return this.universeSize;
  }

  public setUniverseSize(str: any) {
    this.universeSize = str;
  }

  public getAvgHours() {
    return this.averageTime;
  }

  public setAvgHours(str: any) {
    this.averageTime = str;
  }
  /////////////// end 2615

  //// RED-2827
  public getStartDate() {
    return this.startDate;
  }
  public setStartDate(date: any) {
    this.startDate = date;
  }
  public getEndDate() {
    return this.endDate;
  }
  public setEndDate(date: any) {
    this.endDate = date;
  }

  //

  public getUserTemplate() {
    const statIndex = this.getStateIndex();
    const traitTypeIndex = ["D", "A", "S", "P", "T", "C", "F"];
    const inactiveLegId = statIndex < 2 ? this.getInactiveLegacyId() : "";
    const adobId = statIndex < 3 ? this.getAdobeSegmentId() : "";
    if (this.agencyType.toUpperCase() === "ALL") {
      this.agencyDetails.agencyIds = [];
    } else {
      if (this.agencyIds.includes(",")) {
        this.agencyDetails.agencyType = this.agencyType;
        this.agencyDetails.agencyIds = this.agencyIds.split(",");
      } else {
        this.agencyDetails.agencyIds = [this.agencyIds];
      }
    }

    const traitId = statIndex!=1  ? null : this.getInactiveAdobeTraitId();

    if (this.exposeToCynch == "N") {
      this.startDate = null;
      this.endDate = null;
    }

    this.agencyDetails.agencyType = this.agencyType;

    const requestObj = {
      segmentId: this.getSegmentId(),
      segmentName: this.getSegmentName(),
      segmentLabel: this.getSegmentLabel(),
      segmentType: this.getSegmentTypeIndex(),
      adobeSegmentId: adobId,
      legacyId: this.getLegacyId(),
      inactiveLegacyId: inactiveLegId,
      commissionToUi: this.getCommissionToUi(),
      recordStatus: this.getRecordStatus(),
      traitType: traitTypeIndex[statIndex],
      subCategory: this.getSubCategory(),
      seqNo: this.getSeqNo(),
      prizmId: this.getPrizmId(),
      templateId: this.getTemplateId(),
      showInBuilder: this.getShowInBuilderText(),
      agencyDetails: this.agencyDetails,
      exposeToCynch: this.exposeToCynch,
      universeSize: this.universeSize,
      averageTime: this.getAvgHours(),
      cynchSegmentType: this.getCynchSegmentType(),
      inactiveCrmId: this.getInactiveCRMId(),
      startDate: this.startDate,
      endDate: this.endDate,
      inactiveTvCampaignId: this.getInactiveTvCampaignId(),
      inactiveAdobeTraitId: traitId,
      showInLinOpts: this.getShowInLinOptsText(),
    };
    return requestObj;
  }

  getShowInBuilderText() {
    if (this.showInBuilder === true || this.showInBuilder === false) {
      if (this.showInBuilder === true) {
        return "Y";
      }
      if (this.showInBuilder === false) {
        return "N";
      }
    } else {
      return this.showInBuilder;
    }
  }

  isObjectReady(isEdit: any) {
    let isReady = false;
    let selIndex = this.getStateIndex();
    if (
      this.segmentName !== "" &&
      this.segmentLabel !== "" &&
      this.subCategory !== ""
    ) {
      isReady = true;
    }
    if (
      selIndex == 0 &&
      (this.adobeSegmentId == "" || this.inactiveLegacyId == "")
    ) {
      isReady = false;
    }
    if (selIndex == 1 && this.inactiveAdobeTraitId == "") {
      isReady = false;
    }
    if (selIndex == 2 && this.inactiveLegacyId == "") {
      isReady = false;
    }
    if (selIndex >= 3 && this.subSourceId == "") {
      isReady = false;
    }
    if (
      this.exposeToCynch == "Y" &&
      (this.universeSize === "" || this.averageTime === "")
    ) {
      isReady = false;
    }
    if (
      this.exposeToCynch == "Y" &&
      this.agencyType.toUpperCase() != "ALL" &&
        (this.agencyIds === "" || !this.agencyIds)
    ) {
      isReady = false;
    }
    let tempstartDate = this.startDate.replace(/-/g, "/");
    let tempendDate = this.endDate.replace(/-/g, "/");
    let diff = findDiffInDays(tempstartDate, tempendDate);
    // console.log("Start Date and Date date diff is ",diff);
    if (diff < 0) {
      isReady = false;
    }
    return isReady;
  }

  public getStateIndex() {
    let selectedIndex = 0;
    // console.log(" Trait type is ", this.getTraitType())
    switch (this.getTraitType().toUpperCase()) {
      case "S":
      case "CUSTOM":
        {
          selectedIndex = 2;
        }
        break;
      case "A":
      case "ADOBE TRAIT":
        {
          selectedIndex = 1;
        }
        break;
      case "D":
      case "ADOBE SEGMENT":
        {
          selectedIndex = 0;
        }
        break;
      case "P":
      case "PRIZM":
        {
          selectedIndex = 3;
        }
        break;
      case "TEMPLATE":
      case "T":
        {
          selectedIndex = 4;
        }
        break;
      case "C":
      case "CRM CANS":
        {
          selectedIndex = 5;
        }
        break;
      case "F":
      case "TV EXPOSURE":
        {
          selectedIndex = 6;
        }
        break;
      default:
        selectedIndex = 0;
        break;
    }
    return selectedIndex;
  }
}

export default SegmentModel;
