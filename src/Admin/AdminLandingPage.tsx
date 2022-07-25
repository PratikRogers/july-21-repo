/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { Configs, NavBarConstants } from '../ConstConfig';
import { getAllDomoQueires, getDomoConfiguration, slickStateAction } from '../Actions';
// import AdminDashboard from './AdminDashboard';

class AdminLandingPage extends React.Component<IAdminLandingPage, {}> {
  private adminPanelList: any;
  private config:any;

  constructor(props: any) {
    super(props);
    this.itemSelected = this.itemSelected.bind(this);
    this.config = new Configs();
    this.adminPanelList = [
      {
        title: 'Admin Users',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.ADMINSLICK,
          slickIdx: NavBarConstants.ADMINSLICK,
          source: 'LISTUSER',
          hstry: this.props.history
        },
        path: '/AdminUsersList',
        id: 'AdminUsersList'
      },
      {
        title: 'Audience Traits',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.AUDIENCETRAITSLICK,
          slickIdx: NavBarConstants.AUDIENCETRAITSLICK,
          source: 'LISTTRAITS',
          hstry: this.props.history
        },
        path: '/AdminAudienceSegmentList',
        id: 'AdminAudienceSegmentList'
      },
      {
        title: 'Cynch Attributes',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.AUDIENCECYNCHSLICK,
          slickIdx: NavBarConstants.AUDIENCECYNCHSLICK,
          // Need to change 2944
          source: 'LISTTRAITS',
          hstry: this.props.history
        },
        path: '/AdminCynchAttributeList',
        id: 'AdminCynchAttributeList'
      },
      {
        title: 'CRM Uploads',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.ADMINCRMSTATUSSLICK,
          slickIdx: NavBarConstants.ADMINCRMSTATUSSLICK,
          source: 'LISTCRM',
          hstry: this.props.history
        },
        path: '/AdminCRMStatus',
        id: 'AdminCRMStatus'
      },
      {
        title: 'TV Campaign Aggregation',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.ADMINCRMSTATUSSLICK,
          slickIdx: NavBarConstants.ADMINCRMSTATUSSLICK,
          source: 'LISTTVCAMPAIGN',
          hstry: this.props.history
        },
        path: '/TVCampaignAggregation',
        id: 'TVCampaignAggregation'
      },
      {
        title: 'Reporting Status',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.ADMINREPORTINGSTATUS,
          slickIdx: NavBarConstants.ADMINREPORTINGSTATUS,
          source: 'LISTREPORTINGBANER',
          hstry: this.props.history
        },
        path: '/AdminReportingBannerStatus',
        id: 'AdminReportingBannerStatus'
      },
      {
        title: 'Audience Query Segment IDs',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.ADMINREPORTINGSTATUS,
          slickIdx: NavBarConstants.ADMINREPORTINGSTATUS,
          source: '',
          hstry: this.props.history
        },
        path: '/QueryAudienceSegmentIds',
        id: 'QueryAudienceSegmentIds'
      },
      {
        title: 'Core Configuration',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.ADMINREPORTINGSTATUS,
          slickIdx: NavBarConstants.ADMINREPORTINGSTATUS,
          source: '',
          hstry: this.props.history
        },
        path: '/ConfigurationSettings',
        id: 'ConfigurationSettings'
      },
      {
        title: 'Domo API Keys',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.DOMOAPI,
          slickIdx: NavBarConstants.DOMOAPI,
          source: '',
          hstry: this.props.history
        },
        path: '/DomoConfigManagement',
        id: 'DomoConfigManagement'
      },
      {
        title: 'Domo Queries',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.DOMOQUERY,
          slickIdx: NavBarConstants.DOMOQUERY,
          source: '',
          hstry: this.props.history
        },
        path: '/DomoQueryManagement',
        id: 'DomoQueryManagement'
      },
      {
        title: 'System Information',
        payload: {
          UserAction: 'SlickPosition',
          selectedTab: NavBarConstants.SYSINFO,
          slickIdx: NavBarConstants.SYSINFO,
          source: '',
          hstry: this.props.history
        },
        path: '/SystemInformation',
        id: 'SystemInformation'
      }
    ];
  }

  public itemSelected(row: any, e: any) {
    this.props.handleSubmit(row.payload);

    this.props.history.push(row.path);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const dummyUserObj = {
      data: { url: this.config.getDomoAPIConfigUrl() },
    };
    this.props.handleLoadDomoConfig(dummyUserObj);

    // const domoQueryObj = {data:{url:this.config.getDomoQueryUrl()}};
    // this.props.loadAllDomoQuries(domoQueryObj);
   }

  public render() {
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <h3 className="mb-sm-4 mb-4">Admin Area</h3>
            {/* <AdminDashboard />   */}
            <div className="row-flex mb-4 spaceTop">
              <ul>
                {this.adminPanelList.map((row: any, idx: any) => {
                  return (
                    <li id={row.id} key={row.title}>
                      <a
                        href={row.path}
                        onClick={this.itemSelected.bind(this, row)}
                      >
                        {' '}
                        {row.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
              
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      handleSubmit: (dummyUserObj: any) => {
        dispatch(slickStateAction(dummyUserObj));
      },
      handleLoadDomoConfig(payload:any) {
        dispatch(getDomoConfiguration(payload));
       },
       loadAllDomoQuries(payload:any) {
        dispatch(getAllDomoQueires(payload));
       }
    };
  }
)(AdminLandingPage);

interface IAdminLandingPage extends React.FC<any> {
  propsFromStore: any;
  handleSubmit: any;
  errorMessage: any;
  handleLoadDomoConfig?:any;
  loadAllDomoQuries?:any;
  history: any;
}
