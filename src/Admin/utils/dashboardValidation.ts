/* eslint-disable */
import AdminOperationKeys from "src/ConstConfig/AdminOperationKeys";
import { CampaignEleConstants } from "../../ConstConfig/CampaignEleConstants";

export function validateCredentials() {
  return true;
}

export function getAudienceCreationDate(date: any) {
  return date;
}

export function convertToDate(date: any, toUTC = false, toMDY = false) {
  if (date && date !== "") {
    const crdate = new Date(date.replace(/-/g, "/"));
    // crdate.setUTCHours(0, 0, 0, 0);
    const month = crdate.getMonth() + 1;
    const mnth = month <= 9 ? "0" + month : month;
    if (toUTC) {
      crdate.setDate(crdate.getDate() + 1);
    }
    const day =
      crdate.getDate() <= 9 ? "0" + crdate.getDate() : crdate.getDate();

    if (toMDY) {
      return mnth + "-" + day + "-" + crdate.getFullYear();
    }
    const respDate = crdate.getFullYear() + "-" + mnth + "-" + day;

    return respDate;
  }
  return "";
}

export function getMMDDYYYY(date: any) {}

export function getPageNumber(
  direction: any,
  pageNum: any,
  pageObject: any,
  pageProps: any
) {
  if (direction === "prev") {
    pageObject.currPage -= 1;
  } else if (direction === "next") {
    pageObject.currPage += 1;
  } else if (direction === "first") {
    pageObject.currPage = 1;
  } else if (direction === "last") {
    pageObject.currPage = pageProps.totalPages;
  } else if (direction === "pageSwitch") {
    pageObject.currPage = pageNum;
  }
  if (pageObject.currPage >= pageProps.totalPages) {
    pageObject.currPage = pageProps.totalPages;
  }
  if (pageObject.currPage <= 1) {
    pageObject.currPage = 1;
  }

  return pageObject;
}

export function getPaginationMatrices(pagination: any, direction: any) {
  if (direction === "prev") {
    return pagePrev(pagination);
  } else if (direction === "next") {
    return pageNext(pagination);
  } else if (direction === "first") {
    return pagFirst(pagination);
  } else if (direction === "last") {
    return pageLast(pagination);
  } else if (direction === "pageSwitch") {
    return pagination;
  }
}

export function pageNext(pagination: any) {
  const pageShift = 10;
  if (pagination.showMaxPage <= 11 && pagination.currPage < 11) {
  } else {
    pagination.showMaxPage += 1;
    if (pagination.showMaxPage >= pagination.maxPageSize) {
      pagination.showMaxPage = pagination.maxPageSize;
    }
    pagination.pageStartIndex = pagination.showMaxPage - pageShift;
    //    if(pagination.pageStartIndex  === 1) {
    //     pagination.pageStartIndex = 2;
    //    }
  }
  return pagination;
}

export function pagePrev(pagination: any) {
  const pageShift = 10;

  if (pagination.showMaxPage <= 11 && pagination.currPage < 11) {
  } else {
    pagination.showMaxPage -= 1;

    pagination.pageStartIndex = pagination.showMaxPage - pageShift;
    //    if( pagination.pageStartIndex < 2) {
    //     pagination.pageStartIndex = 2;
    //    }
  }
  return pagination;
}

export function pageLast(pagination: any) {
  const pageShift = 11;

  if (pagination.maxPageSize <= 11) {
    pagination.showMaxPage = pagination.maxPageSize;
  } else {
    pagination.showMaxPage = pagination.maxPageSize;
    pagination.pageStartIndex = pagination.showMaxPage - pageShift;
  }
  return pagination;
}

export function pagFirst(pagination: any) {
  const pageShift = 11;

  if (pagination.maxPageSize <= 11) {
    pagination.showMaxPage = pagination.maxPageSize;
  } else {
    pagination.showMaxPage = pageShift;
    pagination.pageStartIndex = 1;
  }
  return pagination;
}

export function clearAllErrorStateInCynch() {
  const errStateObj = {
    AttributeNameError: {
      show: false,
      errFlyoutIdentifier: "ATTRIBUTENAME",
      cssAttrib: "  error ",
    },
    AttributeDescError: {
      show: false,
      errFlyoutIdentifier: "ATTRIBUTEDESC",
      cssAttrib: " error ",
    },
    AttributeCatError: {
      show: false,
      errFlyoutIdentifier: "ATTRIBUTECAT",
      cssAttrib: "error ",
    },
    AttributeDuplicateCatError: {
      show: false,
      errFlyoutIdentifier: "DUPATTRIBUTECAT",
      cssAttrib: "error ",
    },
  };
  return errStateObj;
}

export function clearAllErrorStateInAdmin() {
  const errStateObj = {
    userFirstNameError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.USERFIRSTNAME,
      cssAttrib: " error",
    },
    userLastNameError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.USERLASTNAME,
      cssAttrib: " error",
    },
    userEmailError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.USEREMAIL,
      cssAttrib: " error",
    },
    userCompanyNameError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.USERCOMPANY,
      cssAttrib: " error",
    },
    userRoleSelectionError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.USERROLE,
      cssAttrib: " popoverUserErr error ",
    },
    phoneError : {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.PHONEERROR,
      cssAttrib: " error",
    }
  };
  return errStateObj;
}

export function clearAllErrorStateAudienceTrait() {
  const errStateObj = {
    segmentNameError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.SEGMENTNAME,
      cssAttrib: " error",
    },
    segmentDescriptionError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.SEGMENTDESCR,
      cssAttrib: " error",
    },
    segmentLegacyIDError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.LEGACYID,
      cssAttrib: " error",
    },
    segmentAdobeSegmentIdError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.ADOBESEGMENTID,
      cssAttrib: " error",
    },
    subCategoryError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.SUBCATEGORY,
      cssAttrib: " error",
    },
    segmentAgencyIdError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.AGENCYIDERROR,
      cssAttrib: " error",
    },
    segmentUniverseSizeError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.UNIVERSESIZEERROR,
      cssAttrib: " error",
    },
    segmentAverageHoursError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.AVERAGEHOURERROR,
      cssAttrib: " error",
    },
    segmentSourceError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.SOURCEERROR,
      cssAttrib: " error",
    },
    dateError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.DATEERROR,
      cssAttrib: " error",
    },
  };
  return errStateObj;
}

export function isValidEmailAddress(email: any) {
  const emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if (!emailFilter.test(email)) {
    return false;
  }
  return true;
}

export function formatBytes(bytes: any, decimals = 2) {
  if (!bytes || bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function clearAllErrorStateReportingTrait() {
  const errStateObj = {
    reportingDescription: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.reportingDescription,
      cssAttrib: " error",
    },
    reportingChkBox: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.reportingChkBox,
      cssAttrib: " error",
    },
    reportDateError: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.REPORTDATE_ERROR,
      cssAttrib: " error",
    }
  };
  return errStateObj;
}

export function getTraitTypeText(traitType: any) {
  let selectedIndex = { indx: 0, title: "ADOBE SEGMENT", heading:"LEGACY ID" ,key:AdminOperationKeys.LEGACYID};
  switch (traitType.toUpperCase()) {
    case "S":
    case "CUSTOM":
      {
        selectedIndex = { indx: 2, title: "CUSTOM", heading:"LEGACY ID",key:AdminOperationKeys.LEGACYID };
      }
      break;
    case "A":
    case "ADOBE TRAIT":
      {
        selectedIndex = { indx: 1, title: "ADOBE TRAIT", heading:"TRAIT ID",key:AdminOperationKeys.TRIATID };
      }
      break;

    case "D":
    case "ADOBE SEGMENT":
      {
        selectedIndex = { indx: 0, title: "ADOBE SEGMENT", heading:"LEGACY ID",key:null};
      }
      break;
    case "P":
    case "PRIZM":
      {
        selectedIndex = { indx: 3, title: "PRIZM", heading:"",key:null };
      }
      break;
    case "TEMPLATE":
    case "T":
      {
        selectedIndex = { indx: 4, title: "TEMPLATE", heading:"",key:null };
      }
      break;
    case "CRM CANS":
    case "C":
      {
        selectedIndex = { indx: 5, title: "CRM CANS", heading:"",key:null};
      }
      break;
    case "TV EXPOSURE":
    case "F":
      {
        selectedIndex = { indx: 6, title: "TV EXPOSURE", heading:"",key:null };
      }
      break;
    default:
      selectedIndex = { indx: 0, title: "ADOBE SEGMENT", heading:"",key:null };
      break;
  }
  return selectedIndex;
}

export function getSubSource(
  prizmData: any,
  audienceData: any,
  index: any,
  iD: any,
  legacyId: any,
  crmCanSource: any,
  inactiveTVContractId: any,
  tVCampaigOrder: any
) {
  let subSource = legacyId ? legacyId : "";
  if (index == 3 && iD) {
    // console.log("Audience data is", prizmData)
    let idx = prizmData.findIndex((obj: any) => obj.id == iD);
    if (idx >= 0) {
      subSource = prizmData[idx].title;
    }
  }

  if (index == 4 && iD) {
    const audiSource = audienceData.toArray();
    // console.log("Audience data is", audiSource)
    let idx = audiSource.findIndex((obj: any) => obj.id == iD);
    if (idx >= 0) {
      subSource = audiSource[idx].title;
    }
  }

  if (index == 5 && iD) {
    const crmSource = crmCanSource.toArray();
    let idx = crmSource.findIndex((obj: any) => obj.id == iD);
    if (idx >= 0) {
      subSource = crmSource[idx].title;
    }
  }

  if (index == 6 && iD) {
    const tVOrders = tVCampaigOrder.toArray();
    let idx = tVOrders.findIndex((obj: any) => obj.id == iD);
    if (idx >= 0) {
      subSource = tVOrders[idx].title;
    }
  }
  return subSource;
}

export function clearAllErrorStateInQuerySegment() {
  const errStateObj = {
    segmentId: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.QUERYSEGMENT,
      cssAttrib: " error",
    },
  };
  return errStateObj;
}

export function clearAllErrorStateInTVCampaignOrder() {
  const errStateObj = {
    campaignName: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.TVCAMPAIGNNAME,
      cssAttrib: " error",
    },
    contractIds: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.TVCONTRACTIDS,
      cssAttrib: " error",
    },
  };
  return errStateObj;
}


export function clearAllErrorStateInDomoAPIConfig() {
  const errStateObj = {
    clientKey: {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.CLIENTKEY,
      cssAttrib: " error",
    },
    clientSecret:  {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.CLIENTSECRET,
      cssAttrib: " error",
    },
    domoQueryID:  {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.DOMOQUERYID,
      cssAttrib: " error",
    },
    domoDataSetId:  {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.DOMODATASETID,
      cssAttrib: " error",
    },
    domoQuery:  {
      show: false,
      errFlyoutIdentifier: CampaignEleConstants.DOMOQUERY,
      cssAttrib: " error",
    },
    
  };
  return errStateObj;
}

