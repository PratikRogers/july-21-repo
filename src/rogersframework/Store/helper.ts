/* eslint-disable */
import { NavBarConstants } from "../../ConstConfig";
import { UserOps } from "../../ConstConfig/UserOps";
export function getAttrib(stateObj: any, attribName: any) {
  if (stateObj && stateObj.hasOwnProperty(attribName)) {
    return stateObj[attribName];
  }
  return null;
}

export function isAudienceInvokedWithNew(stateObj: any) {
  const slickStateObj = getAttrib(stateObj, "data");
  if (
    slickStateObj &&
    getAttrib(slickStateObj, "UserAction") &&
    slickStateObj.UserAction === "SlickPosition" &&
    getAttrib(slickStateObj, "source") &&
    slickStateObj.source === "NEW" &&
    getAttrib(slickStateObj, "slickIdx") &&
    slickStateObj.slickIdx === NavBarConstants.AUDIENCESIZINGSLICK
  ) {
    return true;
  }
  return false;
}

export function isAdminListInvokedWithNew(stateObj: any) {
  const slickStateObj = getAttrib(stateObj, "data");
  if (
    slickStateObj &&
    getAttrib(slickStateObj, "UserAction") &&
    slickStateObj.UserAction === "SlickPosition" &&
    getAttrib(slickStateObj, "source") &&
    slickStateObj.source === "LISTUSER" &&
    getAttrib(slickStateObj, "slickIdx") &&
    slickStateObj.slickIdx === NavBarConstants.ADMINSLICK
  ) {
    return true;
  }
  return false;
}

export function isTraitListInvokedWithNew(stateObj: any) {
  const slickStateObj = getAttrib(stateObj, "data");
  if (
    slickStateObj &&
    getAttrib(slickStateObj, "UserAction") &&
    slickStateObj.UserAction === "SlickPosition" &&
    getAttrib(slickStateObj, "source") &&
    slickStateObj.source === "LISTTRAITS" &&
    getAttrib(slickStateObj, "slickIdx") &&
    slickStateObj.slickIdx === NavBarConstants.AUDIENCETRAITSLICK
  ) {
    return true;
  }
  return false;
}

export function isInsightsPageInited(stateObj: any) {
  const slickStateObj = getAttrib(stateObj, "data");
  if (
    slickStateObj &&
    getAttrib(slickStateObj, "UserAction") &&
    slickStateObj.UserAction === "SlickPosition" &&
    getAttrib(slickStateObj, "source") &&
    (slickStateObj.source === UserOps.AUDIENCELIST ||
      slickStateObj.source === UserOps.AUDIENCSIZER) &&
    getAttrib(slickStateObj, "slickIdx") &&
    slickStateObj.slickIdx === NavBarConstants.INSIGHTSLICK
  ) {
    return slickStateObj.source;
  }
  return "";
}

export function isWizardPageStateExist(stateObj: any) {
  const slickStateObj =
    getAttrib(stateObj, "data") && getAttrib(stateObj.data, "WizardPage")
      ? stateObj.data.WizardPage
      : null;
  if (slickStateObj && getAttrib(slickStateObj, "editAudienceAction")) {
    return true;
  }
  return false;
}

export function setAllFalse(stateObj: any) {
  const slickStateObj =
    getAttrib(stateObj, "data") && getAttrib(stateObj.data, "WizardPage")
      ? stateObj.data.WizardPage
      : null;
  if (
    slickStateObj &&
    slickStateObj.hasOwnProperty("PanelFirstZoneList") &&
    slickStateObj.PanelFirstZoneList.hasOwnProperty("PanelFirstZoneList")
  ) {
    slickStateObj.PanelFirstZoneList.isTraitDeletedInAudienc = false;
    slickStateObj.PanelFirstZoneList.PanelFirstZoneList.forEach(function (
      item: any
    ) {
      if (item.isSelected) {
        item.isSelected = false;
        item.selected = false;
        item.linkClass = " link";
        item.linkedSegmentId = [];
        item.operator = "AND";
        item.linkDirection = 0;
      }
    });
  }
}

export function isDashboardChangeAPI(reqObj: any) {
  if (
    reqObj.hasOwnProperty("Config") &&
    reqObj.Config.hasOwnProperty("initDashboardCall") &&
    reqObj.Config.initDashboardCall === true
  ) {
    return true;
  }
  return false;
}

export function isDashboardToBeInvoked(reqObj: any) {
  if (
    reqObj.hasOwnProperty("data") &&
    reqObj.data.hasOwnProperty("slickIdx") &&
    reqObj.data.slickIdx === NavBarConstants.DASHBOARDSLICK &&
    reqObj.data.hasOwnProperty("loadAPIData") &&
    reqObj.data.loadAPIData === true
  ) {
    return true;
  }
  return false;
}

export function isGeoMapInvoked(reqObj: any) {
  if (
    reqObj.hasOwnProperty("GeoMapProps") &&
    reqObj.GeoMapProps.hasOwnProperty("initedAPIRequest") &&
    reqObj.GeoMapProps.initedAPIRequest === true
  ) {
    return true;
  }
  return false;
}

export function getInitialDashboardObj() {
  const reqDate = new Date();
  // reqDate.setMonth(reqDate.getMonth() +1);
  const mnth = reqDate.getMonth().toString().length === 1 ? "0" : "";
  // reqDate.setDate(reqDate.getDate());
  // console.log("Date say", reqDate);
  const dt = Number(reqDate.getDate() + 1).toString().length === 1 ? "0" : "";

  const reqObj = {
    sourceType: "Age Range",
    date:
      dt +
      reqDate.getDate() +
      "-" +
      mnth +
      Number(reqDate.getMonth() + 1) +
      "-" +
      reqDate.getFullYear(),
  };

  return reqObj;
}

export function getGenderCount(genderContResp: any) {
  const responseTable = [];
  for (var key in genderContResp) {
    // skip loop if the property is from prototype
    if (!genderContResp.hasOwnProperty(key)) continue;

    var obj = genderContResp[key];
    responseTable.push({ percent: obj, id: key });
  }
  return responseTable;
}

export function isCampgainCreateInited(stateObj: any) {
  const campaignObj = getAttrib(stateObj, "userAction");
  if (campaignObj && campaignObj === UserOps.SEND_EMAIL) {
    return true;
  }
  return false;
}

export function generateDateFromString(dateObj: any) {
  let reqDate = new Date(dateObj);
  if (isNaN(reqDate.getMonth())) {
    const dateStr = dateObj.replace(/-/g, "/").split("/", 3);
    reqDate = new Date(dateStr[2], Number(dateStr[1] - 1), dateStr[0]);
  }
  const mnth = reqDate.getMonth().toString().length === 1 ? "0" : "";
  const dt = reqDate.getDate().toString().length === 1 ? "0" : "";

  const date =
    dt +
    reqDate.getDate() +
    "-" +
    mnth +
    Number(reqDate.getMonth() + 1) +
    "-" +
    reqDate.getFullYear();
  return date;
}

export function getPlainDate(dateObj: any) {
  if (
    dateObj &&
    dateObj.hasOwnProperty("date") &&
    dateObj.date &&
    dateObj.date.includes("/")
  ) {
    return generateDateFromString(dateObj);
  } else if (
    dateObj &&
    dateObj.hasOwnProperty("date") &&
    dateObj.date &&
    !(dateObj.date instanceof Date)
  ) {
    return dateObj.date;
  }
  // console.log("Date is",dateObj);
  if (dateObj && dateObj.hasOwnProperty("date") && dateObj.date) {
    return dateObj.date;
  }

  return generateDateFromString(dateObj);
}

export function getDashboardPayload(reqObj: any) {
  let respObj = reqObj;
  if (
    reqObj &&
    reqObj.hasOwnProperty("Config") &&
    reqObj.Config.hasOwnProperty("DateConfig") &&
    reqObj.Config.DateConfig.hasOwnProperty("DateSelected") &&
    reqObj.Config.DateConfig.DateSelected !== ""
  ) {
    const reqDate = new Date(reqObj.Config.DateConfig.DateSelected);
    const mnth = reqDate.getMonth().toString().length === 1 ? "0" : "";
    const dt = reqDate.getDate().toString().length === 1 ? "0" : "";
    respObj = {
      sourceType: "Age Range",
      date:
        dt +
        reqDate.getDate() +
        "-" +
        mnth +
        Number(reqDate.getMonth() + 1) +
        "-" +
        reqDate.getFullYear(),
    };
  } else if (reqObj && reqObj.hasOwnProperty("count")) {
    respObj = getInitialDashboardObj();
  } else if (!reqObj.hasOwnProperty("date")) {
    respObj = {
      sourceType: "Age Range",
      date: getPlainDate(respObj),
    };
  } else if (
    reqObj &&
    reqObj.hasOwnProperty("date") &&
    reqObj.date &&
    reqObj.date instanceof Date
  ) {
    respObj = {
      sourceType: "Age Range",
      date: getPlainDate(reqObj.date),
    };
  } else if (
    reqObj &&
    reqObj.hasOwnProperty("date") &&
    reqObj.date &&
    reqObj.date.includes("/")
  ) {
    respObj = {
      sourceType: "Age Range",
      date: getPlainDate(reqObj.date),
    };
  }
  return respObj;
}

export function addResizeEvent() {
  setTimeout(function () {
    let evt = document.createEvent("UIEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  }, 500);
}

export function getCity(index: any) {
  let cityArr = [
    "vancouver",
    "calgary",
    "edmonton",
    "toronto",
    "ottawa",
    "montreal",
  ];
  if (index <= cityArr.length) {
    return cityArr[index];
  }
  return cityArr[0];
}

export function getActionTypeForConfirmOperation(
  DialogData: any,
  actionType: any
) {
  if (DialogData.hasOwnProperty("confirmAction") && DialogData.confirmAction) {
    if (
      DialogData.hasOwnProperty("content") &&
      DialogData.content &&
      DialogData.content.hasOwnProperty("deleteInvokedBy") &&
      DialogData.content.deleteInvokedBy === "AdminUser"
    ) {
      return UserOps.DELETE_USER;
    } else if (
      DialogData.hasOwnProperty("content") &&
      DialogData.content &&
      DialogData.content.hasOwnProperty("deleteInvokedBy") &&
      DialogData.content.deleteInvokedBy === "AudienceTrait"
    ) {
      return UserOps.DELETE_TRAITS;
    } else if (
      DialogData.hasOwnProperty("content") &&
      DialogData.content &&
      DialogData.content.hasOwnProperty("deleteAudience") &&
      DialogData.content.deleteAudience
    ) {
      return UserOps.DELETE_AUDIENCE_SEGMENT;
    } else if (
      DialogData.hasOwnProperty("content") &&
      DialogData.content &&
      DialogData.content.hasOwnProperty("overwriteAudiece") &&
      DialogData.content.overwriteAudiece
    ) {
      return UserOps.OVERWRITE_AUDIENCE;
    }
  } else if (
    DialogData.hasOwnProperty("editAudienceAction") &&
    DialogData.editAudienceAction
  ) {
    return UserOps.EDIT_AUDIENCE;
  }

  return actionType;
}

export function getUserSelectedOperaion(stateObj: any, action: any) {
  let returnAction = action;
  if (isAddUserActionInited(stateObj) || isEditUserActionInited(stateObj)) {
    returnAction = getUserActionInited(stateObj);
  }
  return returnAction;
}

export function getUserActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (userObj && userObj === UserOps.ADD_USER) {
    return UserOps.ADD_USER;
  } else if (userObj && userObj === UserOps.EDIT_USER) {
    return UserOps.EDIT_USER;
  }
  return false;
}

export function isAddUserActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (userObj && userObj === UserOps.ADD_USER) {
    return true;
  }
  return false;
}

export function isEditUserActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (userObj && userObj === UserOps.EDIT_USER) {
    return true;
  }
  return false;
}

export function getTraitActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (userObj && userObj === UserOps.ADD_TRAITS) {
    return UserOps.ADD_TRAITS;
  } else if (userObj && userObj === UserOps.EDIT_TRAITS) {
    return UserOps.EDIT_TRAITS;
  } else if (userObj && userObj === UserOps.TRAIT_MOVE_UP) {
    return UserOps.TRAIT_MOVE_UP;
  } else if (userObj && userObj === UserOps.TRAIT_MOVE_DOWN) {
    return UserOps.TRAIT_MOVE_DOWN;
  }

  return false;
}

export function isAddTraitActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (userObj && userObj === UserOps.ADD_TRAITS) {
    return true;
  }
  return false;
}

export function isEditTraitActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (userObj && userObj === UserOps.EDIT_TRAITS) {
    return true;
  }
  return false;
}

export function isSprtTraitActionInited(stateObj: any) {
  const userObj = getAttrib(stateObj, "userAction");
  if (
    (userObj && userObj === UserOps.TRAIT_MOVE_UP) ||
    userObj === UserOps.TRAIT_MOVE_DOWN
  ) {
    return true;
  }
  return false;
}

export function getTraitSelectedOperaion(stateObj: any, action: any) {
  let returnAction = action;
  if (
    isAddTraitActionInited(stateObj) ||
    isEditTraitActionInited(stateObj) ||
    isSprtTraitActionInited(stateObj)
  ) {
    returnAction = getTraitActionInited(stateObj);
  }
  return returnAction;
}
