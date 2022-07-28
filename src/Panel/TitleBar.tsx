/* eslint-disable */
import * as React from "react";
import { connect } from "react-redux";
import "../bootstrap/css/bootstrap.css";
import "../CSS/redUI-styles.css";
import "../bootstrap/js/bootstrap.min.js";
import { NavBarConstants } from "../ConstConfig";
import { slickStateAction } from "../Actions";

import { getAuthContext } from "../Login/MSAL/msalConfig";
import { Link, withRouter } from "react-router-dom";
import { getPageTitle } from "./Util/bottomPanelValidationUtils";
import { getRequiredRoleAccess } from "../Utility/commonUtil";
import { routeToURL } from "../Utility/routes";
import UserOps from "src/ConstConfig/UserOps";
import { findMatchingRoles } from "src/Utility/roleBasedAttrib";
const flow = require("lodash/flow");
class TitleBar extends React.Component<ITitleBar, {}> {
  public itemSelected: string;
  public loginTitle: string;
  private refArr: any;
  private menuTitle: any[];
  private assignedMenus: any[];
  private terminology: any;
  private dashboard: any;
  // private tvMenu:any;   // blocked by pratik

  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getVisibilityClass = this.getVisibilityClass.bind(this);
    this.refArr = [];
    this.loadIntoUI = this.loadIntoUI.bind(this);
    this.focusComponent = this.focusComponent.bind(this);
    this.startEmailClient = this.startEmailClient.bind(this);
    this.getRequiredRoleAccess = this.getRequiredRoleAccess.bind(this);
    this.getMenuList = this.getMenuList.bind(this);
    this.isRoleExistForMenu = this.isRoleExistForMenu.bind(this);
    this.assignedMenus = [];

    this.terminology = {
      title: "Terminology",
      linkCls: NavBarConstants.TERMINOLOGYSLICK,
      linkParam: NavBarConstants.TERMINOLOGY,
      id: NavBarConstants.SUBMENU,
      cls: "",
      isExternalRoute: false,
      urlPath: "/Terminology",
      apiDataLoad: false,
    };

    this.menuTitle = [
      {
        title: "CONSOLE",
        linkCls: NavBarConstants.DASHBOARDSLICK,
        linkParam: NavBarConstants.DASHBOARD,
        id: NavBarConstants.DASHBOARDSLICK,
        cls: " ",
        isExternalRoute: true,
        urlPath: "/",
        apiDataLoad: true,
      },
      {
        title: "DIV1",
        linkCls: NavBarConstants.AUDIENCELISTSLICK,
        id: NavBarConstants.NONMENU,
        cls: "",
      },
      {
        title: "AUDIENCES",
        linkCls: NavBarConstants.AUDIENCELISTSLICK,
        linkParam: NavBarConstants.AUDIENCELIST,
        id: NavBarConstants.AUDIENCELISTSLICK,
        cls: "",
        isExternalRoute: true,
        urlPath: "/Audiences",
        apiDataLoad: false,
      },
      {
        title: "DIV2",
        linkCls: NavBarConstants.CRMSLICK,
        id: NavBarConstants.NONMENU,
        cls: "",
      },
      {
        title: "CRM UPLOADER",
        linkCls: NavBarConstants.CRMSLICK,
        linkParam: NavBarConstants.CRMUPLOADER,
        id: NavBarConstants.CRMSLICK,
        cls: "",
        isExternalRoute: true,
        urlPath: "/CRMUploader",
        apiDataLoad: false,
      },
      {
        title: "DIV3",
        linkCls: NavBarConstants.REPORTINGLISTSLICK,
        id: NavBarConstants.NONMENU,
        preRequsiteRole: [UserOps.REPORTINGTV, UserOps.REPORTINGDIGITAL],
        cls: "",
      },
      {
        title: "REPORTING",
        linkCls: NavBarConstants.REPORTINGLISTSLICK,
        linkParam: NavBarConstants.REPORTINGLIST,
        id: NavBarConstants.REPORTINGLISTSLICK,
        cls: " d-ipad-none d-mb-none",
        isExternalRoute: true,
        urlPath: "/Reporting/Digital",
        apiDataLoad: false,
        preRequsiteRole: [UserOps.REPORTINGTV, UserOps.REPORTINGDIGITAL],
      },
      {
        title: "DIGITAL REPORTING",
        linkCls: NavBarConstants.REPORTINGLISTSLICK,
        linkParam: NavBarConstants.DIGITAL,
        id: NavBarConstants.SUBMENU,
        cls: " d-desk-none d-ipad-block d-mb-block iPadLandscape-block",
        isExternalRoute: true,
        urlPath: "/Reporting/Digital",
        apiDataLoad: false,
        preRequsiteRole: [UserOps.REPORTINGDIGITAL],
      },
      {
        title: "TV REPORTING",
        linkCls: NavBarConstants.REPORTINGLISTSLICK,
        linkParam: NavBarConstants.TV,
        id: NavBarConstants.SUBMENU,
        cls: " d-desk-none d-ipad-block d-mb-block iPadLandscape-block",
        isExternalRoute: true,
        urlPath: "/Reporting/TV",
        preRequsiteRole: [UserOps.REPORTINGTV],
        apiDataLoad: false,
      },
      {
        title: "DIV4",
        linkCls: NavBarConstants.REQUESTSLISTSLICK,
        id: NavBarConstants.NONMENU,
        cls: " ",
      },
      {
        title: "REQUESTS",
        linkCls: NavBarConstants.REQUESTSLISTSLICK,
        linkParam: NavBarConstants.REQUESTS,
        id: NavBarConstants.REQUESTSLISTSLICK,
        cls: "",
        isExternalRoute: true,
        urlPath: "/Requests",
        apiDataLoad: false,
      },
      {
        title: "DIV5",
        linkCls: NavBarConstants.ADMINSLICK,
        id: NavBarConstants.NONMENU,
        cls: "",
      },
      {
        title: "ADMIN",
        linkCls: NavBarConstants.ADMINSLICK,
        linkParam: NavBarConstants.ADMIN,
        id: NavBarConstants.ADMINSLICK,
        cls: "",
        isExternalRoute: false,
        urlPath: "/Admin",
        apiDataLoad: false,
      },
    ];

    this.dashboard = this.menuTitle[0];
    // this.tvMenu = this.menuTitle[8];
  }

  public handleChange(itemName: any, e: any) {
    this.props.handleSubmit(itemName);
    if (itemName.isExternalRoute) {
      routeToURL(itemName.urlPath);
    } else {
      this.props.history.push(itemName.urlPath);
    }
    const component = this.refArr[2];
    if (component) {
      component.click();
    }
  }

  public focusComponent(ref: any, grpButton?: any) {
    this.refArr.push(ref);
  }

  public getVisibilityClass(slickIndex: any) {
    const clsName = "";
    if (this.props.slickIndexState === slickIndex) {
      return " active ";
    }
    return clsName;
  }

  public loadIntoUI(indx: any, show: any, e: any) {
    const component = this.refArr[indx];
    if (component) {
      component.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
      this.refArr[indx].setAttribute("aria-expanded", show);
    }
  }

  public getReportingMenuCls(role: any) {
    const defCls = " dropdown-item customDropdownStyle";
    if (this.props.UserRole.roles.indexOf(role) < 0) {
      return "d-none " + defCls;
    } else return defCls;
  }

  public isRoleExistForMenu(menuItem: any) {
    if (menuItem && menuItem.linkCls !== "") {
      //RED-3790
      if (menuItem.hasOwnProperty("preRequsiteRole")) {
        if (
          findMatchingRoles(this.props.UserRole.roles, menuItem.preRequsiteRole)
            .length <= 0
        ) {
          return false;
        }
      }
      const index = this.assignedMenus.findIndex(
        (obj: any) => obj == menuItem.linkCls
      );
      if (index >= 0) {
        return true;
      }
    }
    return false;
  }

  public getMenuList() {
    let newMenu: any[] = [];
    this.menuTitle.map((menuItem: any, i: any) => {
      if (this.isRoleExistForMenu(menuItem)) {
        newMenu.push(menuItem);
      }
    });

    let result = newMenu.reduce((unique, o) => {
      if (!unique.some((obj: any) => obj.title === o.title)) {
        unique.push(o);
      }
      return unique;
    }, []);

    return result.map((menuItem: any, i: any) => {
      if (menuItem.id == NavBarConstants.NONMENU)
        return <span key={i + "span"}>|</span>;
      else if (menuItem.id == NavBarConstants.REPORTINGLISTSLICK)
        return (
          // <li
          //   key={menuItem.id}
          //   className={
          //     "nav-item dropdown " +
          //     menuItem.cls +
          //     this.getVisibilityClass(menuItem.linkCls)
          //   }
          // >
          //   <a
          //     key={i + "A"}
          //     className="nav-link dropdown-toggle"
          //     aria-haspopup="true"
          //     aria-expanded="false"
          //     data-toggle="dropdown"
          //     id="navbarDropdown"
          //     href="javascript:void(0);"
          //   >
          //     {menuItem.title}
          //   </a>
          //   <div
          //     className="dropdown-menu redBg"
          //     aria-labelledby="navbarDropdown"
          //   >
          //     <a
          //       className={this.getReportingMenuCls(UserOps.REPORTINGDIGITAL)}
          //       href="javascript:void(0);"
          //       onClick={this.handleChange.bind(this, menuItem)}
          //     >
          //       DIGITAL
          //     </a>
          //     <a
          //       className={this.getReportingMenuCls(UserOps.REPORTINGTV)}
          //       href="javascript:void(0);"
          //       onClick={this.handleChange.bind(this, this.tvMenu)}
          //     >
          //       TV
          //     </a>
          //   </div>
          // </li>
          <p>URL blocked by Pratiik</p>
        );
      else
        return (
          <li
            key={menuItem.linkCls}
            className={
              "nav-item " +
              menuItem.cls +
              this.getVisibilityClass(menuItem.linkCls)
            }
          >
            <Link key={i + "A"} className="nav-link" to={menuItem.urlPath}>
              {menuItem.title}
            </Link>
          </li>
        );
    });
  }

  public getRequiredRoleAccess() {
    this.assignedMenus = getRequiredRoleAccess(this.props.UserRole);
  }

  public startEmailClient() {
    const token = getAuthContext();
    const toEmail = process.env.REACT_APP_TO_EMAIL;
    const userName = token.idToken.preferredName;
    const subject = process.env.REACT_APP_TO_SUBJECT + " " + userName;
    const body = process.env.REACT_APP_TO_BODY + " " + getPageTitle();
    return (
      "mailto:" +
      toEmail +
      "?subject=" +
      subject +
      "&body=" +
      body +
      "%0D%0A%0D%0A%0D%0A"
    );
  }

  public render() {
    this.getRequiredRoleAccess();
    return (
      <header className="fixed-top">
        <div className="container-fluid">
          <a
            id=""
            className="menu-toggle"
            aria-label="Open main menu"
            ref={this.focusComponent}
            onClick={this.loadIntoUI.bind(this, 3, true)}
          >
            <span
              ref={this.focusComponent}
              className="hamburger"
              aria-hidden="true"
            />
          </a>
          <a
            className="navbar-brand"
            href="javascript:void(0);"
            onClick={this.handleChange.bind(this, this.dashboard)}
          >
            <img src={require("../images/RED_Logo.png")} />
          </a>
          <nav
            id="main-menu"
            className="main-menu"
            aria-label="Main menu"
            ref={this.focusComponent}
          >
            <a
              ref={this.focusComponent}
              id="mainmenuclose"
              className="menu-close closeIco"
              aria-label="Close main menu"
              onClick={this.loadIntoUI.bind(this, 3, false)}
            >
              <span className="" aria-hidden="true" />
            </a>
            {this.props.isLoginSuccessful ? (
              <ul id="navbar-collapse">
                {this.getMenuList()}
                <li className="nav-item navLink">
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href="javascript:void(0);"
                    onClick={this.handleChange.bind(this, this.terminology)}
                  >
                    TERMINOLOGY
                  </a>
                </li>
                {/* <li className="nav-item navLink">
                  <a className="nav-link" href={this.startEmailClient()}>
                    SEND FEEDBACK{' '}
                  </a>
                </li> */}
              </ul>
            ) : (
              <div />
            )}
          </nav>
          <a
            className="backdrop"
            aria-hidden="true"
            onClick={this.loadIntoUI.bind(this, 3, false)}
          />
        </div>
      </header>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    isLoginSuccessful:
      state.userAuth.hasOwnProperty("data") &&
      state.userAuth.data.isLoginSuccessful === true
        ? state.userAuth.data.isLoginSuccessful
        : false,
    slickIndexState:
      state.slickState.hasOwnProperty("data") && state.slickState.data.slickIdx
        ? state.slickState.data.slickIdx
        : NavBarConstants.ADMINSLICK,
    UserRole:
      state.AdminUserControlState.hasOwnProperty("UserProfile") &&
      state.AdminUserControlState.UserProfile
        ? state.AdminUserControlState.UserProfile
        : {
            email: "",
            company: null,
            userId: null,
            firstName: "",
            lastName: "",
            roles: ["User"],
          },
  };
}

export default flow(
  connect(mapStateToProps, (dispatch, props) => {
    return {
      handleSubmit: (selectedItem: any) => {
        if (selectedItem.linkParam === NavBarConstants.FEEDBACK) {
          return;
        }
        let dummyUserObj = {
          UserAction: "SlickPosition",
          selectedTab: selectedItem.linkParam,
          slickIdx: selectedItem.linkCls,
          loadAPIData: selectedItem.apiDataLoad,
          source: "",
        };
        dispatch(slickStateAction(dummyUserObj));
      },
    };
  }),
  withRouter
)(TitleBar);

interface ITitleBar extends React.FC<any> {
  handleSubmit: any;
  errorMessage: any;
  isLoginSuccessful: any;
  slickIndexState?: number;
  UserRole: any;
  history: any;
}
