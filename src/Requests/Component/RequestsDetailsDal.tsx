/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import {  RequestsStatusDalAction, showErrorBox } from '../../Actions';
import UserOps from 'src/ConstConfig/UserOps';
import UserExceptions, { UserErrorFields } from 'src/ConstConfig/UserExceptions';
import AccessDeined from 'src/Login/Component/AccessDeined';
import ManagerUpdateForm from './ManagerUpdateForm';
import { Configs } from 'src/ConstConfig';

class RequestsDetailsDal extends React.Component<IRequestsDetailsDal, {}> {
    public state: any;
    private config: any;

    constructor(props: any) {
        super(props);
        this.config = new Configs();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let requestId = this.props.match.params // this.props.match.params.campaignId.replace("=","campaignId=");
        let srchId = this.props.location;
        // console.log("Going to call", srchId);
        if (srchId.hasOwnProperty("search")) {
            requestId = srchId.search.replace("?", "requestId=");
        }
        const dummyUserObj = {
            type: UserOps.IND_REQUESTS,
            data: { url: this.config.getRequestsStatusUrl() + "?" + requestId }
        };
        this.props.handleStatusSubmit(dummyUserObj);
    }

    public isUserHavingRequestManagerRole() {
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
            return (
            (this.isUserHavingRequestManagerRole()) ?
                    <div>
                        {this.props.requestDetails.id !==-1 &&
    <ManagerUpdateForm history={this.props.history} /> }
                    </div>
                :
                <AccessDeined />
        );
    }
}

function mapStateToProps(state: any) {
    return {
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
        requestDetails: state.RequestsDALStatus.hasOwnProperty("creationTs") ? state.RequestsDALStatus : { id: -1, creationTs: "N/A", userName: "N/A", status: null, address: "" },
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleStatusSubmit(payload: any) {
            dispatch(RequestsStatusDalAction(payload));
        },
        unAuthorized: () => {
            let respExceptionObj = {};
            respExceptionObj[UserErrorFields.ERROR_CODE] = UserExceptions.USER_UNAUTHORIZED;
            respExceptionObj[UserErrorFields.ERROR_MESSAGE] = "You do not have access to this application at this Page";
            dispatch(showErrorBox(respExceptionObj));
        }
    }
})(RequestsDetailsDal);

interface IRequestsDetailsDal extends React.FC<any> {
    errorMessage: any;
    handleClicks: any;
    handleSubmit: any;
    handleStatusSubmit?: any;
    match?: any;
    history: any;
    requestDetails: any;
    location: any;
    userPermissions: any;
    unAuthorized: any;
}
