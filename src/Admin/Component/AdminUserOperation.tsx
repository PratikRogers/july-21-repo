/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
import {
  CampaignCtrlAction,
  sendAdminUserAddAction,
  slickStateAction,
  sendAdminAudienceTraitPaginationAction,
} from "../../Actions";
import { UserOps } from "../../ConstConfig/UserOps";
import { UserModel } from "../Model/UserModel";
import { AdminOperationKeys } from "../../ConstConfig/AdminOperationKeys";
import MessageBox from "../../CommonComponent/MessageBox";
import { NavBarConstants } from "../../ConstConfig";
import ErrorAlertBanner from "../../CommonComponent/ErrorAlertBanner";
import {
  clearAllErrorStateInAdmin,
  isValidEmailAddress,
} from "../utils/dashboardValidation";
import { isEmptyOrSpaces } from "../../Utility/CampaignUtil";
import { userListObj } from "./userRoles";

const update = require("react-addons-update");

class AdminUserOperation extends React.Component<IAdminUserOperation, {}> {
  public state: any;
  private refArr: any;
  private userModel: UserModel;
  constructor(props: any) {
    super(props);
    this.userModel = new UserModel(null);
    this.goBack = this.goBack.bind(this);
    this.loadAdminPage = this.loadAdminPage.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.resetStates = this.resetStates.bind(this);

    this.rolesUpdated = this.rolesUpdated.bind(this);
    this.refArr = [];
    this.resetStates();
    if (this.props.editUserStat) {
      this.userModel = new UserModel(this.props.editUserStat);
      const roles = this.userModel.getRoles();
      this.state.adminSelectedRoles = this.state.adminSelectedRoles = JSON.parse(
        JSON.stringify(
          userListObj.map((x: any) => ({
            ...x,
            isSelected: roles.includes(x.displayName),
          }))
        )
      );
      this.state.content = this.props.editUserStat;
      if( !(/Rogers\s*$/.test(this.props.editUserStat.company))) {
        this.state.content.showPhone = true;
      }
      this.userModel.setSelectedRoles(this.state.adminSelectedRoles);
    }
    this.state.errorStateCheck = clearAllErrorStateInAdmin();
  }

  public resetStates() {
    // this.state = undefined;
    this.state = {
      adminSelectedRoles: [],
      content: {
        email: "",
        userId: "",
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
        showPhone: true,
        domoDataConstraint:""
      },
      errorStateCheck: {},
    };

    this.state.adminSelectedRoles = JSON.parse(JSON.stringify(userListObj));
    this.userModel.setSelectedRoles(this.state.adminSelectedRoles);
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public onControlsChange(userInput: any, e: any) {
    switch (userInput) {
      case AdminOperationKeys.FNAME:
        {
          this.state.content.firstName = e.target.value;
          this.userModel.setFirstName(e.target.value);
          if (!isEmptyOrSpaces(this.userModel.getFirstName())) {
            this.state.errorStateCheck.userFirstNameError.show = false;
          }
        }
        break;
      case AdminOperationKeys.LNAME:
        {
          this.state.content.lastName = e.target.value;
          this.userModel.setLastName(e.target.value);
          if (!isEmptyOrSpaces(this.userModel.getLastName())) {
            this.state.errorStateCheck.userLastNameError.show = false;
          }
        }
        break;
      case AdminOperationKeys.EMAIL:
        {
          this.state.content.email = e.target.value;
          this.userModel.setEmailAddress(e.target.value);
         
          if (!isEmptyOrSpaces(this.userModel.getEmailAddress())) {
            this.state.errorStateCheck.userEmailError.show = false;
          }
        }
        break;
      case AdminOperationKeys.COMPANY:
        {
          this.state.content.company = e.target.value;
          this.userModel.setCompany(e.target.value);
          if (!(/Rogers\s*$/.test(e.target.value))) {
            this.state.content.showPhone = true;
          } else {
            this.state.content.showPhone = false;
          }
          if (!isEmptyOrSpaces(this.userModel.getCompany())) {
            this.state.errorStateCheck.userCompanyNameError.show = false;
          }
        }
        break;

      case AdminOperationKeys.PHONE:
        {
          this.state.content.phone = e.target.value;
          this.userModel.setPhone(e.target.value);
          if (!isEmptyOrSpaces(this.userModel.getPhone())) {
            this.state.errorStateCheck.phoneError.show = false;
          }
        }
        break;
      case AdminOperationKeys.DOMOCONSTRAINT:
          {
            this.state.content.domoDataConstraint = e.target.value;
            this.userModel.setDomoDataConstraint(e.target.value);
          
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

  public saveUser() {
    this.state.errorStateCheck = clearAllErrorStateInAdmin();
    // this.userModel.setRoles(this.state.rolesAssigned);
    if (this.userModel.isObjectReady()) {
      const payload = this.userModel.getUserTemplate();
      let updateUserAction = false;
      if (this.props.editUserStat) {
        updateUserAction = true;
      }
      this.props.handleUserEntryUpdateAction(payload, updateUserAction);
      const comp = this.refArr[0];
      if (comp) {
        comp.click();
        // this.resetStates();
      }
    } else {
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (isEmptyOrSpaces(this.userModel.getFirstName())) {
        this.state.errorStateCheck.userFirstNameError.show = true;
      }
      if (isEmptyOrSpaces(this.userModel.getLastName())) {
        this.state.errorStateCheck.userLastNameError.show = true;
      }
      if (isEmptyOrSpaces(this.userModel.getCompany())) {
        this.state.errorStateCheck.userCompanyNameError.show = true;
      }
      if (!isValidEmailAddress(this.userModel.getEmailAddress())) {
        this.state.errorStateCheck.userEmailError.show = true;
      }
      if (this.userModel.getRoles().length <= 0) {
        this.state.errorStateCheck.userRoleSelectionError.show = true;
      }
      if ((!(
        /Rogers\s*$/.test(this.userModel.getCompany())) &&
        isEmptyOrSpaces(this.userModel.getPhone())
      )|| !regex.test(this.userModel.getPhone())) {
        this.state.errorStateCheck.phoneError.show = true;
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
    this.resetStates();
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK,
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.submitLastPagination({
      PaginationProps: this.props.lastUserOps,
    });

    this.props.history.push("/AdminUsersList");
  }

  public resetErrorMessageBlock(userInput: any) {}

  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }

  public goBack() {
    this.props.history.push("/AdminUsersList");
  }

  public rolesUpdated(item: any, index: any, e: any) {
    if (e.target.checked) {
      this.state.adminSelectedRoles[index].isSelected = true;
    } else {
      this.state.adminSelectedRoles[index].isSelected = false;
    }
    this.userModel.setSelectedRoles(this.state.adminSelectedRoles);
    if (this.userModel.getRoles().length > 0) {
      this.state.errorStateCheck.userRoleSelectionError.show = false;
    }
    this.setState(
      update(this.state, {
        adminSelectedRoles: { $set: this.state.adminSelectedRoles },
      })
    );
  }

  public renderRoles() {
    return this.state.adminSelectedRoles.map((pltfrm: any, i: any) => {
      return (
        <span key={"span" + pltfrm.id + pltfrm.displayName}>
          <input
            type="checkbox"
            checked={pltfrm.isSelected}
            key={pltfrm.id + pltfrm.displayName}
            id={pltfrm.displayName}
            value={pltfrm.displayName}
            tabIndex={pltfrm.id}
            onChange={this.rolesUpdated.bind(this, pltfrm, i)}
          />{" "}
          <label htmlFor={pltfrm.displayName}>{pltfrm.displayName}</label>
        </span>
      );
    });
  }

  public editUser() {}

  public render() {
    if (this.props.history.action === "POP") {
      this.props.history.push("/redui");
    }
    const phoneVisibility = this.state.content.showPhone ? " " : "d-none";
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Add/Edit User</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form className="template">
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formFirstName">FIRST NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formFirstName"
                    placeholder="Type first name here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.FNAME
                    )}
                    value={this.userModel.getFirstName()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.userFirstNameError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formLastName">LAST NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formLastName"
                    placeholder="Type last name here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.LNAME
                    )}
                    value={this.userModel.getLastName()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.userLastNameError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formCompanyName">COMPANY</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formCompanyName"
                    placeholder="Type company name here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.COMPANY
                    )}
                    value={this.userModel.getCompany()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.userCompanyNameError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formEmail">EMAIL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formEmail"
                    placeholder="Type email id here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.EMAIL
                    )}
                    value={this.userModel.getEmailAddress()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.userEmailError
                    }
                  />
                </div>
              </div>
              <div
                className={
                  phoneVisibility + " col-xl-3 col-md-6 col-sm-8 col-12"
                }
              >
                <div className="form-group leftPos">
                  <label htmlFor="formPhone">PHONE</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhone"
                    placeholder="Type phone number here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.PHONE
                    )}
                    value={this.userModel.getPhone()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={this.state.errorStateCheck.phoneError}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-8 col-12">
              <div className="form-group leftPos">
                <label htmlFor="formDescription">Domo Data Constraint</label>
                <textarea
                  className="form-control txtAreaBorder"
                  onChange={this.onControlsChange.bind(
                    this,
                    AdminOperationKeys.DOMOCONSTRAINT
                  )}
                  value={this.userModel.getDomoDataConstraint()}
                  placeholder="Type constraint here"
                />
              </div>
            </div>
              <div className="col-xl-4 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label className="mr-4">ROLE</label>
                  <div className="platforms">{this.renderRoles()}</div>
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.userRoleSelectionError
                    }
                  />
                </div>
              </div>
              <div className="col-12 buttonPanel spaceBottom">
                <div className="borderBottomGray spaceBottom48" />
                <a
                  className="btn btnPrimary"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.saveUser}
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
    editUserStat: state.AdminUserEditControlState.hasOwnProperty("data")
      ? state.AdminUserEditControlState.data
      : null,
    errorMessage: props.errorMessage,
    lastUserOps: state.AdminUserTraitListPaginationControlState.hasOwnProperty(
      "PaginationProps"
    )
      ? state.AdminUserTraitListPaginationControlState.PaginationProps
      : { currPage: 1, maxPageSize: 6, pageStartIndex: 1 },
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    handleUserEntryUpdateAction(payload: any, userOps?: any) {
      payload.userAction = UserOps.ADD_USER;
      if (userOps) {
        payload.userAction = UserOps.EDIT_USER;
      }
      dispatch(sendAdminUserAddAction(payload));
    },
    handleCampaignUpdate(payload: any) {
      dispatch(CampaignCtrlAction(payload));
    },
    handleSubmit(payload: any) {
      dispatch(slickStateAction(payload));
    },
    submitLastPagination(payload: any) {
      dispatch(sendAdminAudienceTraitPaginationAction(payload));
    },
  };
})(AdminUserOperation);

interface IAdminUserOperation extends React.FC<any> {
  campaignData: any;
  handleCampaignUpdate: any;
  errorMessage: any;
  handleUserEntryUpdateAction?: any;
  usrSelectedDates: any;
  handleSubmit: any;
  editUserStat?: any;
  submitLastPagination?: any;
  lastUserOps?: any;
  history: any;
}
