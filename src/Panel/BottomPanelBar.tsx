/* eslint-disable */
import * as React from 'react';
import "../bootstrap/css/bootstrap.css";
import "../CSS/redUI-styles.css";
import './BottomPanelBar.css';
import { connect } from 'react-redux';
// import { authContext } from '../Login/ADAL/adalConfig';

import { NavBarConstants } from '../ConstConfig';
import { slickStateAction } from '../Actions';
// import { withRouter } from 'react-router-dom';
// import { getComponentIndex } from '../ProgressBar/util/progressBarUtils';
import { getPageTitle, getCopyrightsYear } from './Util/bottomPanelValidationUtils';
import { getCachedUser } from 'src/Login/MSAL/msalConfig';
const flow = require('lodash/flow');
class BottomPanelBar extends React.Component<IBottomPanelBar> {

  constructor(props: any) {
    super(props);
    this.showTerminologyPage = this.showTerminologyPage.bind(this);
   }

  public showTerminologyPage() {
    this.props.showTerminologyPage();
    this.props.history.push("/Terminology");
  }

  public startEmailClient() {
    // const components = ["", "Dashboard Page", "Audiences List Page", "Audience Sizer Page", "Campaign Goals Page", "Campaign Creation Page", "Email Notification Page", "Insights Page", "Terminology Page"];
    const toEmail = process.env.REACT_APP_TO_EMAIL;
    const userName = getCachedUser().profile.name;
    const subject = process.env.REACT_APP_TO_SUBJECT + " " + userName;
    const body = process.env.REACT_APP_TO_BODY + " " + getPageTitle();

    return "mailto:" + toEmail + "?subject=" + subject + "&body=" + body + "%0D%0A%0D%0A%0D%0A";
  }

 
  public render() {
    const copyRightsYear = getCopyrightsYear(this.props.DateConfig.DateSelected);
     return (
      this.props.isLoginSuccessful ?
      <footer className="footer">
        <span>Copyright &copy; {copyRightsYear} Rogers Sports & Media</span>
        <span className="divider">|</span>
        <a href="#" onClick={this.showTerminologyPage}>Terminology</a>
        <span className="divider">|</span>
        <a href={this.startEmailClient()}>Send Feedback</a>
       </footer>
       :
       <footer className="footer">
       <span>Copyright &copy; {copyRightsYear} Rogers Sports & Media</span>
      </footer>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    slickIndex: state.slickState.hasOwnProperty("data") && state.slickState.data.slickIdx ? state.slickState.data.slickIdx : 2,
    isLoginSuccessful: state.userAuth.hasOwnProperty("data") && state.userAuth.data.isLoginSuccessful === true ? state.userAuth.data.isLoginSuccessful : false,
    DateConfig: state.DashboardState.hasOwnProperty("Config") && state.DashboardState.Config.hasOwnProperty("DateConfig") ? state.DashboardState.Config.DateConfig : { DateSelected: state.DashboardPreflightDataState.hasOwnProperty("DatesAvailable") && state.DashboardPreflightDataState.DatesAvailable.length > 0 ? (state.DashboardPreflightDataState.DatesAvailable[0]) : new Date(), disableCont: { prev: false, next: true }, respDate: new Date(), dateSelectedIndex: 0 }
  };
}

export default flow(
   connect(mapStateToProps, (dispatch) => {
  return {
    showTerminologyPage: () => {
      const dummyUserObj = { UserAction: "SlickPosition", selectedTab: NavBarConstants.TERMINOLOGY, slickIdx: NavBarConstants.TERMINOLOGYSLICK };
      dispatch(slickStateAction(dummyUserObj));
    },
  }

}))
// withRouter)
(BottomPanelBar);

interface IBottomPanelBar extends React.FC<any> {
  submitFeedback?: any;
  slickIndex?: any;
  isLoginSuccessful:any;
  showTerminologyPage?: any;
  DateConfig?: any;
  history:any;
}

