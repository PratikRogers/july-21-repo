/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import MessageBox from '../../CommonComponent/MessageBox';
import { KeyCode } from '../../ConstConfig/KeyCode';
import { UserOps } from '../../ConstConfig/UserOps';
import { submitRequestAction, slickStateAction} from '../../Actions';
import { clearReportingErrorState } from '../utils/RequestsUtil';
import { List } from 'immutable';
import CustomErrorAlertBanner from '../../CommonComponent/CustomErrorAlertBanner.';
//  import RedUISpinner from '../../Panel/RedUISpinner';
import { isEmptyOrSpaces } from '../../Utility/CampaignUtil';
import { Configs, NavBarConstants } from 'src/ConstConfig';
 

class RequestsFormComponent extends React.Component<IRequestsFormComponent, {}> {
    public state: any;
    private refArr: any;
    private streetName: any;
    private config: any;

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {errorStateCheck:{}};
        this.state.errorStateCheck = clearReportingErrorState();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEnterPress = this.onEnterPress.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.focusText = this.focusText.bind(this);
        this.goBack = this.goBack.bind(this);
        this.config = new Configs();
        this.streetName = null
        this.refArr = [];
      }

    public onControlsChange(userInput: any, e: any) {
        switch (userInput) {
            case "STREET": {
                if ((e.target.value) && (e.target.value).length > 0) {
                    this.streetName = e.target.value;
                    this.state.errorStateCheck.streetNameError.show = false;
                    this.setState({ errorStateCheck: this.state.errorStateCheck });
                }
                else {
                    this.streetName = "";
                }
            }
                break;
            default:
                break;
        }
    }

    public onEnterPress(e: any) {
        let isEnterPressed = e.keyCode === KeyCode.ENTER ? true : false;
        if (isEnterPressed) {
            this.onControlsChange("REPORTID", e);
            e.preventDefault();
            this.handleSubmit(e);
        }
        return false;
    }

    public onKeyPress(e: any) {
        const re = /^[0-9\b]+$/;
        if (e.target.value && re.test(e.target.value)) {
            this.streetName = e.target.value;
        } else {
            e.target.value = this.streetName;
        }
    }

    public resetErrorMessageBlock(e: any) {
        this.state.errorStateCheck = clearReportingErrorState()
        let isAllAttribExist = true;

        if (isEmptyOrSpaces(e)) {
            this.state.errorStateCheck.streetNameError.show = true;
            isAllAttribExist = false;
        }
        return isAllAttribExist;
    }

    public focusText(ref: any, grpButton?: any, itemName?: any) {
        this.refArr.push(ref);
    }


    public handleBtnState() {
        const btnState = this.resetErrorMessageBlock(this.streetName);
        return btnState;
    }
 
    public reqStudyLocation() {
        <div className="row fixed-header-top ml-0 mr-0">
            <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm" />
            <div className="col-xl-5 order-xl-last col-md-12 order-md-first col-sm-12 col-12 order-mb-first buttonPanel pl-lg-0">
                <a className=" btn btnPrimary col-50 align-sm-left" href="javascript:void(0);" role="button">Request Location Study</a>
            </div>
        </div>
    }
    public handleSubmit(e: any) {
        if (isEmptyOrSpaces(this.streetName)) {
            this.state.errorStateCheck.streetNameError.show = true;
            this.setState({ errorStateCheck: this.state.errorStateCheck });
            return;
        }

        this.props.handleClicks({ url: this.config.getRequestAddrReportUrl(), address: this.streetName, hstry:this.props.history });
        this.props.history.push("/RequestsReport");
        if (e) {
            e.preventDefault();
        }

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
 
    public render() {
        if (this.props.UIDialogstats.isVisible) {
            let comp = this.refArr[0];
            if (comp) {
                comp.click();
            }
        }
        // const spinnerState = { UIConfig: { isSpinnerActive: true } };
        return (
            <main role="main" className="container-fluid">
                <div className="row fixed-header-top ml-0 mr-0 spaceBottom spaceBottom-mb">
                    <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm">
                        <div  >
                            <h3 className="float-left">Report Requests</h3>
                        </div>
                    </div>
                </div>
                <div className="borderBottomGray" />
                <div className="row-flex spaceTop">
                   
                    <div className="w-100">
                        <form>
                        <label className="spacerB36 padLeftBot ">To request a location study, simply enter an address or addresses below. Please allow 5 business days for fulfillment.</label>
                            <div className="col-xl-6 col-md-8 col-sm-8 col-12">
                                <div className="form-group leftPos proposalSearch">
                                    <label htmlFor="formName">Enter your address(es) of interest here</label>
                                    <div className="row-flex">
                                        <textarea rows={20} cols={200} className="form-control col-9" id="formName" placeholder="Type address here" onChange={this.onControlsChange.bind(this, "STREET")}  ref={this.focusText} />
                                    </div>
                                    <CustomErrorAlertBanner errorMessageStruct={this.state.errorStateCheck.streetNameError} />
                                </div>
                                <a className="btn btnPrimary  col-2" href="javascript:void(0);" role="button" id="findReport" onClick={this.handleSubmit}>Submit</a>
                                <span className="spacerRight"/>
                                 <a className="btn btnPrimary col-2" href="javascript:void(0);" role="button" onClick={this.goBack}>
                                Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <MessageBox />
            </main>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        UIDialogstats: state.configState.hasOwnProperty("Dialog") && state.configState.Dialog.hasOwnProperty("MessageBox") ? state.configState.Dialog.MessageBox : { MessageBox: { isVisible: false, UserMessage: "", saveFailed: false } },
        allReportsList: state.ReportingListState.hasOwnProperty("data") && state.ReportingListState.data.list ? state.ReportingListState.data.list : List([]),
        
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleClicks(selectedItem: any) {
            const dummyUserObj = { type: UserOps.SUBMIT_STREETREQUEST, data: selectedItem };
            dispatch(submitRequestAction(dummyUserObj));
        },
        handleSubmit: (dummyUserObj: any) => {
            dispatch(slickStateAction(dummyUserObj));
          }
    }
})(RequestsFormComponent);

interface IRequestsFormComponent extends React.FC<any> {
    errorMessage?: any;
    handleClicks?: any;
    handleSubmit?:any;
    UIDialogstats?: any;
    history?: any;
}
