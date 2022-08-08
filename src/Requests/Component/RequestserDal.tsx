/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import {  RequestsStatusDalAction, showErrorBox, downloadRequestFileAction, slickStateAction, submitSpinnerAction } from '../../Actions';
import UserOps from 'src/ConstConfig/UserOps';
import UserExceptions, { UserErrorFields } from 'src/ConstConfig/UserExceptions';
import AccessDeined from 'src/Login/Component/AccessDeined';
import { Configs, NavBarConstants } from 'src/ConstConfig';
import { convertToDate } from 'src/Utility/reportingValidation';
import MessageBox from 'src/CommonComponent/MessageBox';

class RequestserDal extends React.Component<IRequestserDal, {}> {
    public state: any;
    private config: any;

    constructor(props: any) {
        super(props);
        this.config = new Configs();
        this.download = this.download.bind(this);
        this.isRequestCompleted = this.isRequestCompleted.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.showSpinner();
        let requestId = this.props.match.params // this.props.match.params.campaignId.replace("=","campaignId=");
        let srchId = this.props.location;
        console.log("Got into Requester DAL, calling with ", srchId);
        if (srchId.hasOwnProperty("search")) {
            requestId = srchId.search.replace("?", "requestId=");
        }
        const dummyUserObj = {
            type: UserOps.IND_REQUESTS,
            data: { url: this.config.getRequesterUrl() + "?" + requestId }
        };
        this.props.handleStatusSubmit(dummyUserObj);
    }

    public isRequestCompleted() {
        if (this.props.requestDetails.id === -1) return false;
        return true;
    }

    public download(e:any) {
        const dummyUserObj = {
            type: UserOps.DOWNLOAD_REQUEST,
            data: { url: this.config.getRequestDownloadUrl(), requestId: this.props.requestDetails.id }
        };
        this.props.handleDownloadClicks(dummyUserObj);
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
        let downloadFile = (this.props.requestDetails.uploadedFileName && this.props.requestDetails.uploadedFileName !="") ?this.props.requestDetails.uploadedFileUrl:false;
        let urlLink = (this.props.requestDetails.url && this.props.requestDetails.url !="") ?true:false;
        let commnt = (this.props.requestDetails.managersComment && this.props.requestDetails.managersComment !="") ?true:false;
        return (
            <span>
                {(downloadFile!==false) && <p>Report file: <a className="" href="javascript:void(0);" role="button" onClick={this.download}>{this.props.requestDetails.uploadedFileName}</a><br/><a className="btn btnPrimary  col-2" href="javascript:void(0);" role="button" onClick={this.download}>Download</a></p>}
                <div className="spaceBottom20"/>
                {urlLink&&
                 <div className="form-group leftPos proposalSearch">
                    <label>This request has an online component. </label>
                    <a className="" href={this.props.requestDetails.url} target="_blank"> Click here to access it</a>
                    <p>Note that this URL may only be available within the Rogers corporate network, and might only be visible to your account.</p>
                </div>
                }
                {commnt && 
                <div className="form-group leftPos">
                    <label htmlFor="formName">Comments/Feedback</label>
                    <div className="row-flex">
                        <textarea readOnly={true} rows={20} cols={200} className="form-control col-6" id="formName" placeholder="comments here" value={this.props.requestDetails.managersComment} />
                    </div>
                </div>
                }
            </span>)
    }
    public render() {
            if(this.props.requestDetails.id !==-1) {
                this.props.showSpinner(false);
            }
            return (
            (this.isRequestCompleted()) ?
                    <div>
                        {this.props.requestDetails.id !==-1 &&
                       <main role="main" className="container-fluid spaceBottom">
                       <div className="row fixed-header-top ml-0 mr-0 ">
                           <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm">
                               <div>
                                   <h2 className="row">Your Location Report Is Ready!</h2>
                               </div>
                           </div>
                       </div>
                       <div className="borderBottomGray" />
   
                       <div className="row-flex spaceTop">
                           <div className="w-100">
                               <form>
                                   <div className="spaceBottom20 form-group leftPos">
                                       <label className="">Requested Date: </label><p className="d-inline-block">{convertToDate(this.props.requestDetails.creationTs, true)}</p>
                                       <br/>
                                       <label className="">Requested Address(es): </label><p className="d-inline-block">{this.props.requestDetails.address}</p>
                                   </div>
                                   <div className="form-group leftPos">
                                       {this.renderUrlCommentPanel()}
                                   </div>
  
                                   <a className="btn btnPrimary col-2" href="javascript:void(0);" role="button" onClick={this.goBack} >
                                       Ok
                                   </a>
   
                               </form>
                           </div>
                       </div>
                       <MessageBox />
                   </main>
                    }
                    </div>
                :
                <AccessDeined customMsg={"Page Not Found"}/>
        )
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
        handleSubmit: (dummyUserObj: any) => {
            dispatch(slickStateAction(dummyUserObj));
        },
        handleStatusSubmit(payload: any) {
            dispatch(RequestsStatusDalAction(payload));
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
        showSpinner(state=true) {
            const spinnerState = { UIConfig: { isSpinnerActive: state } };
            dispatch(submitSpinnerAction(spinnerState));
        }
    }
})(RequestserDal);

interface IRequestserDal extends React.FC<any> {
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
    handleDownloadClicks:any;
    showSpinner:any;
}
