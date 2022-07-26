/* eslint-disable */
import { connect } from "react-redux";
// import {  addLocaleData } from "react-intl";

import * as React from 'react';
// import BottomPanelBar from "./Panel/BottomPanelBar";
import TitleBar from "./Panel/TitleBar";

import "./CSS/redUI-styles.css";
// import "./CSS/common.scss";
import "./App.css";
// import "./CSS/redui.css";
import { ActionConstants, AppConstants } from "./ConstConfig";
import { userActions } from "./Actions";
// import MessageBox from "./CommonComponent/MessageBox";
import Logger from "./rogersframework/Logger/Logger";
import { LOGLEVEL } from "./ConstConfig/logLevelConst";
import PropTypes from "prop-types";

import { Route,  Switch } from "react-router-dom";
import RedUISpinner from "./Panel/RedUISpinner";
// import AccessError from "./Login/Component/AccessError";
import AuthProvider from "./Login/MSAL/AuthProvider";
import { getRoleBasedRouteAccess } from "./Utility/commonUtil";
import Terminology from "./Terminology/Component/Terminology";
import CRMUploaderFormComponent from "./CRMUploader/Component/CRMUploaderFormComponent";
// import UnAssignedPage from "./Login/Component/UnAssignedPage";
import MessageBox from "./CommonComponent/MessageBox";
import BottomPanelBar from "./Panel/BottomPanelBar";
// import AccessError from "./Login/Component/AccessError";
import IntlProvider from "react-intl/src/components/provider";
// import UnAssignedPage from "./Login/Component/UnAssignedPage";
import AdminLandingPage from "./Admin/AdminLandingPage";
import AccessError from "./Login/Component/AccessError";
import AdminCRMStatus from "./Admin/Component/AdminCRMStatus";
// import AdminUserList from "./Admin/Component/AdminUserList";
// const possibleLocale = navigator.language.split("-")[0] || "en";
// addLocaleData(require(`react-intl/locale-data/${possibleLocale}`));

interface IApp extends React.FC<any> {
  propsFromStore?: any;
  isLoginSuccessful?: any;
  slickIndex?: any;
  UserRole?: any;
  handleSubmit?: any;
  onSignIn?: any;
  account?: any;
}
const flow = require("lodash/flow");

class App extends React.Component<IApp, {}> {
  static propTypes = {
    account: PropTypes.object,
    emailMessages: PropTypes.object,
    error: PropTypes.string,
    graphProfile: PropTypes.object,
    onSignIn: PropTypes.func.isRequired,
    // onSignOut: PropTypes.func.isRequired,
    // onRequestEmailToken: PropTypes.func.isRequired
  };
  localizationMessages = {
    fr: require("./translations/fr.json"),
    en: require("./translations/en.json"),
  };
  language: any;
  allRoutes: any[];
  assignedRoutes: any[];

  constructor(props: any) {
    super(props);
    this.language = navigator.language.split(/[-_]/)[0]; // language without region code
    if (process.env.REACT_APP_LOGIN_CONFIG !== "PROD") {
      Logger.setLogLevel(LOGLEVEL.WARN);
    } else {
      Logger.setLogLevel(LOGLEVEL.ERROR);
    }
    this.allRoutes = [
      { path: "/CRMUploader", component: CRMUploaderFormComponent },
      { path: "/Terminology", component: Terminology },
      { path: '/Admin', component: AdminLandingPage },
      // { path: '/AdminUsersList', component: AdminUserList },
      { path: '/AdminCRMStatus', component: AdminCRMStatus },



    ];
    this.getAllRoutes = this.getAllRoutes.bind(this);
    this.isRoleExistForRoute = this.isRoleExistForRoute.bind(this);
    this.assignedRoutes = [];
  }

  isRoleExistForRoute(routeItem: any) {
    if (routeItem && routeItem.path !== "") {
      const index = this.assignedRoutes.findIndex(
        (obj: any) => obj == routeItem.path
      );

      if (index >= 0) {
        console.log('returning true');
        return true;
      }
    }
    return false;
  }

  getAllRoutes() {
    this.assignedRoutes = getRoleBasedRouteAccess(this.props.UserRole);
    return this.allRoutes.map((routeItem: any, i: any) => {

      if (this.isRoleExistForRoute(routeItem)) {
        return (
          <Route key={i} path={routeItem.path}  component={routeItem.component} />
          
        );
      }  
       else {
        return null;
        
      }

      return null;
    });
  }

  render() {
    console.log(
      "this.props.isLoginSuccessful===",
      this.props.isLoginSuccessful
    );
    const spinnerState = { UIConfig: { isSpinnerActive: true } };
    if (!this.props.account) {
      this.props.onSignIn();
    }

    return (
      <IntlProvider locale={this.language} messages={this.localizationMessages[this.language]}>
      <div className="redUI">
        <TitleBar />
        <RedUISpinner UIConfStats={spinnerState} />
        {/* <AdminCRMStatus handleChange={undefined} loggingIn={undefined} history={undefined} /> */}
        {/* <CRMUploaderFormComponent /> */}
        {this.props.isLoginSuccessful ? (
            <Switch>
            {this.getAllRoutes()}
            {/* <Route path={"/"} element={<AdminLandingPage propsFromStore={''} history={'/'} />} /> */}
            <Route path={'/'} component={AdminLandingPage} />
            </Switch>
        ) : (
          <AccessError />
        )}
        <MessageBox />
        <BottomPanelBar />
      </div>
       </IntlProvider>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isLoginSuccessful:
      state.userAuth.hasOwnProperty("data") &&
      state.userAuth.data.isLoginSuccessful === true
        ? state.userAuth.data.isLoginSuccessful
        : false,
    slickIndex:
      state.slickState.hasOwnProperty("data") && state.slickState.data.slickIdx
        ? state.slickState.data.slickIdx
        : 2,
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
  connect(mapStateToProps, (dispatch) => {
    return {
      handleSubmit: (token: any) => {
        const userObj = {
          UserAction: ActionConstants.Login,
          isLoginSuccessful: AppConstants.Inited,
          authContext: token,
        };

        dispatch(userActions(userObj));
      },
    };
  }),
  AuthProvider
)(App);
