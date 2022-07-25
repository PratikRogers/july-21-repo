/* eslint-disable */
import { getAuthContext } from "src/Login/MSAL/msalConfig";
import {
  submitUIConfigAction,
  sendAdminUserListAction,
  submitSpinnerAction,
  sendAdminAudienceTraitListAction,
  broadcastCRMStat,
  reportingStatusAction,
  calendarChangeAction,
  updateDashboardCharts,
  sendAdminCynchAttributeListAction,
} from "../../Actions";
import { AdminModel } from "../../Admin/Model/AdminModel";
import { UserOps } from "../../ConstConfig/UserOps";
import { AdminTraitModel } from "../../Admin/Model/AdminTraitModel";
import { List } from "immutable";
import { convertToDate } from "src/Admin/utils/dashboardValidation";
import { findDiffInDays } from "./DashboardResp";
export class AdminStoreUitls {
  private clnt: any;
  private store: any;
  private urlConfig: any;

  constructor(pStore: any, client: any, urlConf: any, adalAuthCtx: any) {
    this.clnt = client;
    this.store = pStore;
    this.urlConfig = urlConf;

  }

  public getAuhObj() {
    const token = getAuthContext();
    let user = "";
    let tok = "";
    let name = "";
    const configSet = process.env.REACT_APP_LOGIN_CONFIG;
    if (configSet === "LOCAL") {
      const stuffUser = require("../../data/dummyUser.json");
      user = stuffUser.userName;
      tok = stuffUser.token;
    } else {
      user = token.idToken.preferredName;
            tok = token.idToken.rawIdToken;
            name = token.idToken.name;
    }
    const uName = user;
    const authorizationResponse = {
      userName: uName,
      authToken: tok,
      userFullName: name,
    };
    return authorizationResponse;
  }

  addUser(payload: any) {
    const token = this.getAuhObj().authToken;
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getAddUserUrl(),
    };
    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      const messageBoxObj = {
        Dialog: {
          MessageBox: {
            isVisible: true,
            UserMessage: " User created successfully",
            saveFailed: false,
            boxButtons: UserOps.OK,
            messageHead: "Success!",
          },
        },
      };
      if (returnVal.status >= 400 && returnVal.status < 600) {
        messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
        messageBoxObj.Dialog.MessageBox.UserMessage =
          "Unable to create user, please try again later";
        messageBoxObj.Dialog.MessageBox.saveFailed = true;
      } else {
        if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
          messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
          messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
          messageBoxObj.Dialog.MessageBox.saveFailed = true;
        } else {
          this.loadAllUsers(false);
        }
      }
      this.store.dispatch(submitUIConfigAction(messageBoxObj));
    });
    this.store.getState().AdminUserAddControlState.userAction = "";
  }

  updateUser(payload: any) {
    const token = this.getAuhObj().authToken;
    const uAction = "userAction";
    delete payload[uAction];
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getAddUserUrl(),
    };
    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      const messageBoxObj = {
        Dialog: {
          MessageBox: {
            isVisible: true,
            UserMessage: " User updated successfully",
            saveFailed: false,
            boxButtons: UserOps.OK,
            messageHead: "Success!",
          },
        },
      };
      if (returnVal.status >= 400 && returnVal.status < 600) {
        messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
        messageBoxObj.Dialog.MessageBox.UserMessage =
          "Unable to update user, please try again";
        messageBoxObj.Dialog.MessageBox.saveFailed = true;
      } else {
        if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
          messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
          messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
          messageBoxObj.Dialog.MessageBox.saveFailed = true;
        } else {
          this.loadAllUsers(false);
        }
      }
      this.store.dispatch(submitUIConfigAction(messageBoxObj));
    });
    this.store.getState().AdminUserAddControlState.userAction = "";
  }

  loadAllUsers(showSpinner: any) {
    const Url = this.urlConfig.getListUsersUrl();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (showSpinner) {
      this.store.dispatch(submitSpinnerAction(spinnerState));
    }

    const token = this.getAuhObj().authToken;
    reqObjectSeg.authToken = token

    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        // console.log("API response",returnVal);
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
        } else {
          const usersList = new AdminModel(returnVal);
          const respObj = { UsersList: usersList.getAdminUserList() };
          this.store.dispatch(sendAdminUserListAction(respObj));
          //
        }
        const spinnerState = { UIConfig: { isSpinnerActive: false } };
        if (showSpinner) {
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      });
  }

  loadAllDashboardStats(showSpinner: any, usersStats: any) {
    const Url = this.urlConfig.getReportsStats();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (showSpinner) {
      this.store.dispatch(submitSpinnerAction(spinnerState));
    }

    const token = this.getAuhObj().authToken;
    reqObjectSeg.authToken = token;

    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        // console.log("API response", returnVal);
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
        } else {
          // returnVal = {"dailyDownloadCount":1,"weeklyDownloadCount":70,"monthlyDownloadCount":70,"userCampaignReport":[{"userId":161,"downloadCount":1,"campaignCount":1},{"userId":2,"downloadCount":69,"campaignCount":2}]};
          let repDlndStats = returnVal;
          let rept30D = repDlndStats.userCampaignReport;

          let totalReportsDownloaded: any[] = [];
          rept30D.filter((item: any) => {
              let indx = usersStats.findIndex(
                (x: any) => x.userId == item.userId
              );
              if (indx >= 0) {
                totalReportsDownloaded.push({
                  name: usersStats[indx].firstName,
                  alt:
                    usersStats[indx].firstName +
                    " " +
                    usersStats[indx].lastName,
                    campaignCount: item.campaignCount,
                  reportCount: item.downloadCount,
                  userId: item.userId,
                });
              }
          });

          let charts24H = usersStats.filter(
            (user: any) =>
              findDiffInDays(user.lastActiveTs) >= 0 &&
              findDiffInDays(user.lastActiveTs) <= 1
          );
          let charts7D = usersStats.filter(
            (user: any) =>
              findDiffInDays(user.lastActiveTs) >= 0 &&
              findDiffInDays(user.lastActiveTs) <= 7
          );
          let charts30D = usersStats.filter(
            (user: any) =>
              findDiffInDays(user.lastActiveTs) >= 0 &&
              findDiffInDays(user.lastActiveTs) <= 30
          );
          let dashboardCharts = {
            dashboardCharts: {
              users: [
                {
                  range: "24 Hours",
                  percent: charts24H.length,
                },
                {
                  range: "7 Days",
                  percent: charts7D.length,
                },
                {
                  range: "30 Days",
                  percent: charts30D.length,
                },
              ],
              Reports: [
                {
                  range: "24 Hours",
                  percent: repDlndStats.dailyDownloadCount,
                },
                {
                  range: "7 Days",
                  percent: repDlndStats.weeklyDownloadCount,
                },
                {
                  range: "30 Days",
                  percent: repDlndStats.monthlyDownloadCount,
                },
              ],
              topActive: totalReportsDownloaded,
            },
          };

          this.store.dispatch(updateDashboardCharts(dashboardCharts));
        }
        const spinnerState = { UIConfig: { isSpinnerActive: false } };
        if (showSpinner) {
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      });
  }

  deleteUser(contentId: any) {
    const token = this.getAuhObj();
    const reqObjectSeg = {
      authToken: token.authToken,
      url: this.urlConfig.getDeleteUserUrl() + "/" + contentId,
    };
    const inputOptions = {};
    this.clnt.delete(reqObjectSeg, inputOptions).then((returnVal: any) => {
      if (
        returnVal.hasOwnProperty("status") &&
        returnVal.status === UserOps.SUCCESS
      ) {
        this.loadAllUsers(true);
      }
    });
    this.store.getState().configState.Dialog.confirmAction = false;
  }

  /*
        Traits API
    */
  addAudienceTrait(payload: any) {
    const token = this.getAuhObj().authToken;
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getListAudienceTraitUrl(),
    };
    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      const messageBoxObj = {
        Dialog: {
          MessageBox: {
            isVisible: true,
            UserMessage: " Trait created successfully",
            saveFailed: false,
            boxButtons: UserOps.OK,
            messageHead: "Success!",
          },
        },
      };
      if (returnVal.status >= 400 && returnVal.status < 600) {
        messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
        messageBoxObj.Dialog.MessageBox.UserMessage =
          returnVal.hasOwnProperty("message") && returnVal.message != ""
            ? returnVal.message
            : "Unable to create Trait, please try again later";
        messageBoxObj.Dialog.MessageBox.saveFailed = true;
      } else {
        if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail" || returnVal.status === "Failure") {
          messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
          messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
          messageBoxObj.Dialog.MessageBox.saveFailed = true;
        } else {
          this.loadAllTrait(false);
        }
      }
      this.store.dispatch(submitUIConfigAction(messageBoxObj));
    });
    this.store.getState().AdminUserTraitControlState.userAction = "";
  }

  updateAudienceTrait(payload: any) {
    const token = this.getAuhObj().authToken;
    const uAction = "userAction";
    delete payload[uAction];
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getListAudienceTraitUrl(),
    };
    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      const messageBoxObj = {
        Dialog: {
          MessageBox: {
            isVisible: true,
            UserMessage: " Trait updated successfully",
            saveFailed: false,
            boxButtons: UserOps.OK,
            messageHead: "Success!",
          },
        },
      };
      if (returnVal.status >= 400 && returnVal.status < 600) {
        messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
        messageBoxObj.Dialog.MessageBox.UserMessage =
          "Unable to update trait, please try again";
        messageBoxObj.Dialog.MessageBox.saveFailed = true;
      } else {
        if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
          messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
          messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
          messageBoxObj.Dialog.MessageBox.saveFailed = true;
        } else {
          this.loadAllTrait(false);
        }
      }
      this.store.dispatch(submitUIConfigAction(messageBoxObj));
    });
    this.store.getState().AdminUserTraitControlState.userAction = "";
  }

  sortAudienceTrait(payload: any, direction: any) {
    const token = this.getAuhObj().authToken;
    const uAction = "userAction";
    delete payload[uAction];
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getSortAudienceTraitUrl(),
    };
    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      if (returnVal.status >= 400 && returnVal.status < 600) {
      } else {
        this.loadAllTrait(true);
      }
    });
    this.store.getState().AdminUserTraitControlState.userAction = "";
  }

  loadAllTrait(showSpinner: any) {
    const Url = this.urlConfig.getListAudienceTraitUrl();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (showSpinner) {
      this.store.dispatch(submitSpinnerAction(spinnerState));
    }
    const token = this.getAuhObj().authToken;
    reqObjectSeg.authToken = token;

    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        // returnVal = require("../../data/segments.json");
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
        } else {
          const usersList = new AdminTraitModel(returnVal);
          const respObj = { TraitsList: usersList.getAudienceTraitList() };
          this.store.dispatch(sendAdminAudienceTraitListAction(respObj));
        }
        const spinnerState = { UIConfig: { isSpinnerActive: false } };
        if (showSpinner) {
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      });
  }

  deleteTrait(contentId: any) {
    const token = this.getAuhObj();
    const reqObjectSeg = {
      authToken: token.authToken,
      url: this.urlConfig.getListAudienceTraitUrl() + "/" + contentId,
    };
    const inputOptions = {};
    this.clnt.delete(reqObjectSeg, inputOptions).then((returnVal: any) => {
      if (
        returnVal.hasOwnProperty("status") &&
        returnVal.status === UserOps.SUCCESS
      ) {
        this.loadAllTrait(true);
      }
    });
    this.store.getState().configState.Dialog.confirmAction = false;
  }

  loadCRMStats(showSpinner: any) {
    // const Url = this.urlConfig.getCRMListUrl();
    console.log("Admin CRMUploader = > inside loadCRMStats(showSpinner: any)");
    const Url = this.urlConfig.getCRMListUrl();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (showSpinner) {
      this.store.dispatch(submitSpinnerAction(spinnerState));
    }
    const token = this.getAuhObj().authToken;
    reqObjectSeg.authToken = token;

    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
        } else {
          
          returnVal = returnVal.map((x:any) => ({...x,processedDate:convertToDate(x.updateTs,false,false),
            uploadedOn:convertToDate(x.creationTs,false,false)}));
         const sortedVals = returnVal.sort((a:any, b:any) => Date.parse(b.uploadedOn) - Date.parse(a.uploadedOn));
          this.store.dispatch(broadcastCRMStat({ CRMSList: List(sortedVals) }));
        }
        const spinnerState = { UIConfig: { isSpinnerActive: false } };
        if (showSpinner) {
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      });
  }

  saveReportingStatus(payload: any) {
    const token = this.getAuhObj().authToken;
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getReportingStatusConfigSaveUrl(),
    };

    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      const messageBoxObj = {
        Dialog: {
          MessageBox: {
            isVisible: true,
            UserMessage: " Configuration saved successfully",
            saveFailed: false,
            boxButtons: UserOps.OK,
            messageHead: "Success!",
          },
        },
      };
      if (returnVal.status >= 400 && returnVal.status < 600) {
        messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
        messageBoxObj.Dialog.MessageBox.UserMessage =
          "Unable to save configuration, please try again later";
        messageBoxObj.Dialog.MessageBox.saveFailed = true;
      } else {
        if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
          messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
          messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
          messageBoxObj.Dialog.MessageBox.saveFailed = true;
        } else {
          this.store.dispatch(reportingStatusAction(messageBoxObj));
        }
      }
      this.store.dispatch(submitUIConfigAction(messageBoxObj));
    });
    this.store.getState().AdminUserTraitControlState.userAction = "";
  }

  loadReportingStatus(showSpinner: any) {
    const Url = this.urlConfig.getReportingStatusConfigUrl();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (showSpinner) {
      this.store.dispatch(submitSpinnerAction(spinnerState));
    }
    const token = this.getAuhObj().authToken;
    reqObjectSeg.authToken = token;
    const inValidReponse = {
      id: -1,
      pageLable: "",
      message: "",
      selected: false,
      startTs: "",
      endTs: "",
      creationTs: "",
      updateTs: "",
    };
    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
          this.store.dispatch(
            reportingStatusAction({
              data: { currReportingStatus: inValidReponse, currTVStatus: inValidReponse},
            })
          );
        } else {
          const reportIndex = returnVal.findIndex(
            (obj: any) => obj.pageLable == "Digital"
          );
          const tvIndex = returnVal.findIndex(
            (obj: any) => obj.pageLable == "TV"
          );
          if (reportIndex >= 0 || tvIndex >= 0) {
            const resp = reportIndex>=0 ? returnVal[reportIndex]:inValidReponse;
            const tvResp = tvIndex >=0 ? returnVal[tvIndex]:inValidReponse
            
            this.store.dispatch(
              reportingStatusAction({ data: { currReportingStatus: resp,currTVStatus: tvResp } })
            );
            let startDate = convertToDate(resp.startTs, false);
            let endDate = convertToDate(resp.endTs, false);

            let usrSelectedDates = {
              startDate: { date: startDate },
              endDate: { date: endDate },
            };
            this.store.dispatch(calendarChangeAction(usrSelectedDates));
          } else {
            this.store.dispatch(
              reportingStatusAction({
                data: { currReportingStatus: inValidReponse },
              })
            );
          }
        }
        const spinnerState = { UIConfig: { isSpinnerActive: false } };
        if (showSpinner) {
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      });
  }

  // 2944

  addCynchAttributes(payload: any) {
    const token = this.getAuhObj().authToken;
    const reqObjectSeg = {
      authToken: token,
      url: this.urlConfig.getListCynchAttributeUrl(),
    };
    let msg =this.store.getState().AdminCynchAttribOperationState.userAction == UserOps.EDIT_ATTRIBUTE ? " Attribute updated successfully":" Attribute created successfully";
    this.clnt.post("POST", reqObjectSeg, payload).then((returnVal: any) => {
      const messageBoxObj = {
        Dialog: {
          MessageBox: {
            isVisible: true,
            UserMessage: msg,
            saveFailed: false,
            boxButtons: UserOps.OK,
            messageHead: "Success!",
          },
        },
      };
      if (returnVal.status >= 400 && returnVal.status < 600) {
        messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
        messageBoxObj.Dialog.MessageBox.UserMessage =
          returnVal.hasOwnProperty("message") && returnVal.message != ""
            ? returnVal.message
            : "Unable to create attribute, please try again later";
        messageBoxObj.Dialog.MessageBox.saveFailed = true;
      } else {
        if (returnVal.hasOwnProperty("status") && returnVal.status === "Fail") {
          messageBoxObj.Dialog.MessageBox.messageHead = "Error!";
          messageBoxObj.Dialog.MessageBox.UserMessage = returnVal.message;
          messageBoxObj.Dialog.MessageBox.saveFailed = true;
        } else {
          this.loadAllCynchAttributes(false);
        }
      }
      this.store.dispatch(submitUIConfigAction(messageBoxObj));
    });
    this.store.getState().AdminCynchAttribOperationState.userAction = "";
  }

  loadAllCynchAttributes(showSpinner: any) {
    const Url = this.urlConfig.getListCynchAttributeUrl();
    const segservice = "Login";
    const reqObjectSeg = { authToken: "", url: Url, serviceName: segservice };
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (showSpinner) {
      this.store.dispatch(submitSpinnerAction(spinnerState));
    }
    const token = this.getAuhObj().authToken;
    reqObjectSeg.authToken = token;

    this.clnt
      .getResponse(reqObjectSeg.url, reqObjectSeg)
      .then((returnVal: any) => {
        // returnVal = require("../../data/attributes.json");
        if (returnVal.hasOwnProperty("status") && returnVal.status) {
        } else {
          returnVal.forEach(function(e: any) {
            e["categoryTitle"] = e.categories
              .map((o: any) => o.cynchCategoryName)
              .join(", ");
          });

          const respObj = { AttributeList: List(returnVal) };
          this.store.dispatch(sendAdminCynchAttributeListAction(respObj));
        }
        const spinnerState = { UIConfig: { isSpinnerActive: false } };
        if (showSpinner) {
          this.store.dispatch(submitSpinnerAction(spinnerState));
        }
      });
  }

  deleteCynchAttribute(contentId: any) {
    const token = this.getAuhObj();
    const reqObjectSeg = {
      authToken: token.authToken,
      url: this.urlConfig.getListCynchAttributeUrl() + "/" + contentId,
    };
    const inputOptions = {};
    this.clnt.delete(reqObjectSeg, inputOptions).then((returnVal: any) => {
      if (
        returnVal.hasOwnProperty("status") &&
        returnVal.status === UserOps.SUCCESS
      ) {
        this.loadAllCynchAttributes(true);
      }
    });
    this.store.getState().configState.Dialog.confirmAction = false;
  }
}
