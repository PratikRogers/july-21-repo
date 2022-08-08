/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

import { slickStateAction, RequestsStatusDalAction, showErrorBox, submitUpdateRequestAction, downloadRequestFileAction } from '../../Actions';
import { NavBarConstants, Configs } from 'src/ConstConfig';
import UserOps from 'src/ConstConfig/UserOps';
import UserExceptions, { UserErrorFields } from 'src/ConstConfig/UserExceptions';
import AccessDeined from 'src/Login/Component/AccessDeined';
// import CustomErrorAlertBanner from 'src/CommonComponent/CustomErrorAlertBanner.';
import RequestStatsComponent from './RequestStatsComponent';
import MessageBox from 'src/CommonComponent/MessageBox';
import { convertToDate } from 'src/Utility/reportingValidation';
import RequestSubmissionModel from '../Model/RequestSubmissionModel';
import { clearReportingErrorState, validURL } from '../utils/RequestsUtil';
import CustomErrorAlertBanner from 'src/CommonComponent/CustomErrorAlertBanner.';

class ManagerUpdateForm extends React.Component<IManagerUpdateForm, {}> {
    public state: any;
    private refArr: any;
    private config: any;
    private requestModel: RequestSubmissionModel;

    constructor(props: any) {
        super(props);
        this.showRequestsForm = this.showRequestsForm.bind(this);
        this.focusText = this.focusText.bind(this);
        this.refArr = [];
        this.config = new Configs();
        this.requestModel = new RequestSubmissionModel();
        this.state = { fileName: "", reqModel: { comments: "", redirectUrl: null, status: null }, errorStateCheck: {} };
        this.onControlsChange = this.onControlsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userSelected = this.userSelected.bind(this);
        this.updateUserSelected = this.updateUserSelected.bind(this);
        this.setComments = this.setComments.bind(this);
        this.setRefurl = this.setRefurl.bind(this);
        this.focusText = this.focusText.bind(this);
        this.goBack = this.goBack.bind(this);
        this.renderUrlCommentPanel = this.renderUrlCommentPanel.bind(this);
        this.download = this.download.bind(this);

        this.state.errorStateCheck = clearReportingErrorState();
        this.setValueIntoFormItem = this.setValueIntoFormItem.bind(this);
    }

    public focusText(ref: any, grpButton?: any, itemName?: any) {
        this.refArr.push(ref);
    }

    private setValueIntoFormItem(index: any, value: any) {
        if (this.refArr && this.refArr.length > index && this.refArr[index]) {
            this.refArr[index].value = value;
        }
    }

    // downloadRequestFileAction
    public download(e:any) {
        const dummyUserObj = {
            type: UserOps.DOWNLOAD_REQUEST,
            data: { url: this.config.getRequestDownloadUrl(), requestId: this.props.requestDetails.id }
        };
        this.props.handleDownloadClicks(dummyUserObj);
    }

    componentDidMount() {
        this.state.reqModel.status = this.props.requestDetails.status;
        this.requestModel.buildRequestModel(this.props.requestDetails);
        this.setValueIntoFormItem(0, this.requestModel.redirectUrl);
        this.setValueIntoFormItem(1, this.requestModel.comments);

    }

    public onControlsChange(e: any) {
        if (e.target.files.length > 0) {
            this.requestModel.formData = e.target.files[0];
            this.requestModel.fileName =  e.target.files[0].name;
            this.state.fileName = e.target.files[0].name;
            this.state.fileSize = e.target.files[0].size;
            console.log("File Size",this.state.fileSize);
            this.setState(this.state);
        }
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

    public getStatus(status: any) {
        if (status === "New Request") {
            return "In Progress";
        }
        return status;
    }
    public handleSubmit(e: any) {
        if (this.state.reqModel.redirectUrl) {
            if (!validURL(this.state.reqModel.redirectUrl)) {
                this.state.errorStateCheck.referenceUrlError.show = true;
                this.setState(this.state);
                return;
            }
        }

        this.props.handleClicks({
            updateurl: this.config.getRequestUpdatRequesteUrl(),
            payloadUpdate: this.requestModel.getUpdateRequestPayload(this.props.requestDetails),
            uploadurl: this.config.getRequestUploadUrl() + "?requestId=" + this.requestModel.requestId,
            payloadFile: this.requestModel.getSubmitPayload(), hstry: this.props.history, fileSize: this.state.fileSize
        });
        // this.props.history.push("/RequestsReport");
        if (e) {
            e.preventDefault();
        }
    }

    setRefurl(e: any) {
        this.requestModel.redirectUrl = e.target.value;
        this.state.reqModel.redirectUrl = this.requestModel.redirectUrl;
        this.state.errorStateCheck.referenceUrlError.show = false;
        this.setState(this.state);
    }

    setComments(e: any) {
        this.requestModel.comments = e.target.value;
        this.state.reqModel.comments = this.requestModel.comments;
        this.setState(this.state);
    }

    public userSelected() {
        if (!this.state.reqModel.status) {
            this.state.reqModel.status = this.props.requestDetails.status;
            this.requestModel.requestStatus = this.props.requestDetails.status;
        }
        return this.requestModel.requestStatus;
    }

    public updateUserSelected(userSelection: any) {
        this.state.reqModel.status = userSelection;
        this.requestModel.requestStatus = userSelection;
        this.setState(this.state)
    }

    goBack() {
        let payload = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK,
            hstry: this.props.history
        };
        this.props.handleSubmit(payload);
        this.props.history.push("/Requests");
    }

    renderUrlCommentPanel() {
        let downloadFile = (this.props.requestDetails.uploadedFileUrl && this.props.requestDetails.uploadedFileUrl !="") ?this.props.requestDetails.uploadedFileUrl:false 
        return (
            <span>
                {(downloadFile!==false) && <p>Existing file: <a className="" href="javascript:void(0);" role="button" onClick={this.download}>{this.props.requestDetails.uploadedFileName}</a></p>}
                <div className="spaceBottom"/>
                <div className="form-group leftPos proposalSearch">
                    <label>Additional Reference URL</label>
                    <input type="text" className="form-control col-6" id="formAdvertiserName" placeholder="Type external url" ref={this.focusText} onChange={this.setRefurl} />
                    <CustomErrorAlertBanner errorMessageStruct={this.state.errorStateCheck.referenceUrlError} />
                </div>

                <div className="form-group leftPos">
                    <label htmlFor="formName">Public Comments/Feedback</label>
                    <div className="row-flex">
                        <textarea rows={20} cols={200} className="form-control col-6" id="formName" placeholder="Type comments here" ref={this.focusText} onChange={this.setComments} />
                    </div>

                </div>
            </span>)
    }


    public render() {
        let drpDownListProp = {
            filterText: "Request Status",
            searchBy: this.updateUserSelected,
            getUserSelected: this.userSelected,
            list: ["Open", "Closed"]
        }

        return (
            (this.isUserHavingRequestManagerRole()) ?
                <main role="main" className="container-fluid spaceBottom">
                    <div className="row fixed-header-top ml-0 mr-0 ">
                        <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm">
                            <div>
                                <h2 className="row">Report Request</h2>

                            </div>
                        </div>
                    </div>
                    <div className="borderBottomGray" />

                    <div className="row-flex spaceTop">
                        <div className="w-100">
                            <form>

                                <div className="form-group leftPos">
                                    <label className="">Requester Details: </label><p className="d-inline-block">{this.props.requestDetails.userName}</p>
                                    <br/>
                                    <label className="">Requested Date: </label><p className="d-inline-block">{convertToDate(this.props.requestDetails.creationTs, true)}</p>
                                    <br/>
                                    <label className="">Requested Address(es): </label><p className="d-inline-block">{this.props.requestDetails.address}</p>

                                </div>
                                <div className="form-group leftPos">
                                    <RequestStatsComponent dropDownProp={drpDownListProp} />
                                    <div >Please choose a file to upload (max file size 50MB) </div>
                                    <div className="fileinputs">
                                        <input type="file" className="file" onChange={this.onControlsChange} />
                                        <div className="fakefile">
                                            <input type="text" value={this.state.fileName} />
                                            <img src={require("../../svg/fileUpload.jpg")} height="30px" width="30px" />
                                        </div>
                                    </div>
                                    
                                    {this.renderUrlCommentPanel()}
                                </div>
                                <a className="btn btnPrimary  col-2" href="javascript:void(0);" role="button" onClick={this.handleSubmit}>Submit</a>
                                <span className="spacerRight" />
                                <a className="btn btnPrimary col-2" href="javascript:void(0);" role="button" onClick={this.goBack}>
                                    Cancel
                                </a>

                            </form>
                        </div>
                    </div>
                    <MessageBox />
                </main>
                :
                <AccessDeined />
        );
    }
}

function mapStateToProps(state: any) {
    return {
        requestDetails: state.RequestsDALStatus.hasOwnProperty("creationTs") ? state.RequestsDALStatus : { requestId: "", creationTs: "N/A", userName: "N/A", status: null, address: "" },
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

    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleSubmit: (dummyUserObj: any) => {
            dispatch(slickStateAction(dummyUserObj));
        },
        handleStatusSubmit(payload: any) {
            dispatch(RequestsStatusDalAction(payload));
        },
        handleClicks: (dummyUserObj: any) => {
            dispatch(submitUpdateRequestAction(dummyUserObj));
        },
        unAuthorized: () => {
            let respExceptionObj = {};
            respExceptionObj[UserErrorFields.ERROR_CODE] = UserExceptions.USER_UNAUTHORIZED;
            respExceptionObj[UserErrorFields.ERROR_MESSAGE] = "You do not have access to this application at this Page";
            dispatch(showErrorBox(respExceptionObj));
        },
        handleDownloadClicks:(dummyUserObj: any) => {
            dispatch(downloadRequestFileAction(dummyUserObj));
        },
    }
})(ManagerUpdateForm);

interface IManagerUpdateForm extends React.FC<any> {
    errorMessage?: any;
    handleClicks?: any;
    handleSubmit?: any;
    handleStatusSubmit?: any;
    handleDownloadClicks?:any;
    match?: any;
    history: any;
    requestDetails?: any;
    location?: any;
    userPermissions?: any;
    unAuthorized?: any;
}
