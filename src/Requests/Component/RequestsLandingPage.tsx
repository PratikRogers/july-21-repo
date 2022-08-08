/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

import { slickStateAction, showErrorBox, listAllRecentRequestAction} from '../../Actions';
import { NavBarConstants, Configs } from 'src/ConstConfig';
import { getRoleConfigs } from 'src/Utility/roleBasedAttrib';
import UserOps from 'src/ConstConfig/UserOps';
import UserExceptions, { UserErrorFields } from 'src/ConstConfig/UserExceptions';
import AccessDeined from 'src/Login/Component/AccessDeined';
import TablePageComponent from 'src/CommonComponent/TablePageComponent';
import { getTablePayload } from '../utils/RequestsUtil';
import { List } from 'immutable';


class RequestsLandingPage extends React.Component<IRequestsLandingPage, {}> {
    public state: any;
    private refArr: any;
    private config: any;

    constructor(props: any) {
        super(props);
        this.showRequestsForm = this.showRequestsForm.bind(this);
        this.showRequestsManager = this.showRequestsManager.bind(this);
        this.focusText = this.focusText.bind(this);
        this.populateRequestTable = this.populateRequestTable.bind(this);
        this.getDesktopActions = this.getDesktopActions.bind(this);
        this.config = new Configs();
        this.isUserHavingRequestManagerRole = this.isUserHavingRequestManagerRole.bind(this);
        this.refArr = [];
    }


    componentDidMount() {
        this.populateRequestTable();
    }
    public focusText(ref: any, grpButton?: any, itemName?: any) {
        this.refArr.push(ref);
    }
    public populateRequestTable() {
        console.log("Request: inside populateRequestTable");
        
        this.props.handleClicks({ url: this.config.getRequestersRecentListUrl(), type: UserOps.LISTALL_REQUESTERSRECENT_REQUESTS });
    }

    public showRequestsForm(e: any) {
        let payload = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK,
            hstry: this.props.history
        };
        this.props.handleSubmit(payload);
        
        this.props.history.push("/RequestsReport");
    }

    public showIndividualRequests(id: any) {
        // console.log("Make call to ",id,"/Requests")
        let payload = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK,
            hstry: this.props.history
        };
        this.props.handleSubmit(payload);

        this.props.history.push("/Requests:" + id);
    }

    showRequestsManager(e: any) {
        console.log("Request: inside showRequestsManager");
        
        let payload = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK,
            hstry: this.props.history
        };
        this.props.handleSubmit(payload);
        this.props.history.push("/RequestManager");
    }

    public showRequests(row: any, e: any) {
        this.props.history.push('/ViewRequests:?'+row.id);
        const dummyUserObj = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK
        };
        this.props.handleSubmit(dummyUserObj);
    }

    public getDesktopActions(cell: any, row: any, formatExtraData: any, index: any) {
        const isDisabled = (row && row.hasOwnProperty("status") && row.status === "Closed") ? "btn btnSmall-primary " : "disabled btn btnSmall-primary";
        return (
            <span>
                <a className={isDisabled} href="javascript:void(0);" role="button" onClick={this.showRequests.bind(this, row)}>
                    View
                </a>
            </span>
        );
    }

    customTitle(cell:any, row:any, rowIndex:any, colIndex:any) {
        return `${cell}`;
     }
    public isUserHavingRequestManagerRole() {
        // console.log("Permis",this.props.userPermissions);
        if (this.props.userPermissions &&
            this.props.userPermissions.hasOwnProperty('roles') &&
            this.props.userPermissions.roles) {
            const index = this.props.userPermissions.roles.findIndex(
                (obj: any) => obj == UserOps.REQUESTMANAGER
            );
            if (index >= 0) {
                return true;
            }
        }
        return false;
    }

    public render() {
        let conf = this.props.UserRole;
        if (this.props.location.search !== "") {
            if (!this.isUserHavingRequestManagerRole()) {
                return <AccessDeined />
            }
            this.showIndividualRequests(this.props.location.search);
            return (<span />);
        }
        const tableData = getTablePayload(this.props.requestersRecentList, this.getDesktopActions,this.customTitle);
        return (
            <main role="main" className="container-fluid">
                <div className="row fixed-header-top ml-0 mr-0 spaceBottom spaceBottom-mb">
                    <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm">
                        <div>
                            <h3 className="float-left">Report Requests</h3>
                        </div>
                    </div>
                    <div className="col-xl-5 order-xl-last col-md-12 order-md-first col-sm-12 col-12 order-mb-first buttonPanel pl-lg-0">
                        <a className=" btn btnPrimary col-50 align-sm-left" onClick={this.showRequestsForm} href="javascript:void(0);" role="button">Request Location Study</a>
                        <a className= {conf.requestManager?.clsName + " btn btnPrimary col-50 align-sm-left"} onClick={this.showRequestsManager} href="javascript:void(0);" role="button">Request Manager</a>
                    </div>
                </div>
                <div className="borderBottomGray" />
                <div className="row ml-0 mr-0">
                    <TablePageComponent tableDataInput={tableData.desktop} tableDataInputSmall={tableData.device} />
                </div>
            </main>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        UserRole: state.RoleBasedConfiguration.hasOwnProperty("userConfig") && state.RoleBasedConfiguration.userConfig ? state.RoleBasedConfiguration.userConfig :
            getRoleConfigs(),
        userPermissions:
            state.AdminUserControlState.hasOwnProperty('UserProfile') &&
                state.AdminUserControlState.UserProfile
                ? state.AdminUserControlState.UserProfile
                : {
                    email: '',
                    company: null,
                    userId: null,
                    firstName: '',
                    lastName: '',
                    roles: ["Audience Builder", "Campaign Request", "Reporting"]
                },
        requestersRecentList: state.RequestersListStats.hasOwnProperty("allList") ? state.RequestersListStats.allList : List([{ requester: ' ', date: ' ', status: 'Open', address: '' }])
    };
}

export default connect(mapStateToProps, (dispatch) => {
    console.log("Request: inside connect");

    return {
        
        handleSubmit: (dummyUserObj: any) => {
            dispatch(slickStateAction(dummyUserObj));
            
        },
        unAuthorized: () => {
            let respExceptionObj = {};
            respExceptionObj[UserErrorFields.ERROR_CODE] = UserExceptions.USER_UNAUTHORIZED;
            respExceptionObj[UserErrorFields.ERROR_MESSAGE] = "You do not have access to this application at this Page";
            dispatch(showErrorBox(respExceptionObj));

        },
        handleClicks(selectedItem: any) {
            const dummyUserObj = { type: UserOps.LISTALL_REQUESTERSRECENT_REQUESTS, data: selectedItem };
            dispatch(listAllRecentRequestAction(dummyUserObj));
        },
    }
})(RequestsLandingPage);

interface IRequestsLandingPage extends React.FC<any> {
    errorMessage: any;
    handleClicks: any;
    handleSubmit: any;
    requestersRecentList: any;
    UserRole: any;
    history: any;
    match?: any;
    userPermissions: any;
    unAuthorized: any;
    location: any;
}
