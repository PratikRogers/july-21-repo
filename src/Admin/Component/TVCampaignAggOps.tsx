/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { AdminOperationKeys } from '../../ConstConfig/AdminOperationKeys';
import MessageBox from '../../CommonComponent/MessageBox';
import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import {
  clearAllErrorStateInTVCampaignOrder,
} from '../utils/dashboardValidation';
import { isEmptyOrSpaces } from '../../Utility/CampaignUtil';
import { NavBarConstants, Configs } from 'src/ConstConfig';
import { slickStateAction, dispatchSaveTVOrders } from 'src/Actions';
 
const update = require('react-addons-update');

class TVCampaignAggOps extends React.Component<ITVCampaignAggOps, {}> {
  public state: any;
  private refArr: any;
  private config:any;
  constructor(props: any) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.loadAdminPage = this.loadAdminPage.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  
    this.resetStates = this.resetStates.bind(this);
    
    this.refArr = [];
   
    this.state = {
         content: {
           id:'',
           campaignName:'',
           contractIds:''
        },
        errorStateCheck:{}
    }
    if (this.props.editTVOrderStat) {
      this.state.content = this.props.editTVOrderStat;
    }
    this.state.errorStateCheck = clearAllErrorStateInTVCampaignOrder();
    this.config = new Configs();
  }

 public resetStates() {
   this.state = undefined;
    this.state = {
      content: {
        id:'',
        campaignName:'',
        contractIds:''
      },
      errorStateCheck: clearAllErrorStateInTVCampaignOrder()
    };
     
    this.setState(
      update(this.state, {
        state: {
          $set: this.state
        }
      })
    );
  }

  public onControlsChange(userInput: any, e: any) {
    switch (userInput) {
      case AdminOperationKeys.TVCAMPAIGNNAME:
        {
        
            this.state.content.campaignName = e.target.value;
         
        }
        break;
      case AdminOperationKeys.TVCONTRACTIDS:
        {
          const re = /^[0-9,*]+$/;
          if ((e.target.value && re.test(e.target.value)) || e.target.value === "") {
          this.state.content.contractIds = e.target.value;
          }
        }
        break;
     default:
        break;
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state
        }
      })
    );
  }

  public saveUserData() {
    this.state.errorStateCheck = clearAllErrorStateInTVCampaignOrder();
    if (this.state.content.campaignName != '' && this.state.content.contractIds != '') {
      const payload  = {
        data: {
          allSegsUrl:this.config.getTVOrderCampaignList(),
          url:this.config.getTVOrderCampaignList(),
          payload:{campaignName:this.state.content.campaignName,contractIds:this.state.content.contractIds}
        }
      }
      if (this.props.editTVOrderStat) {
        payload.data.payload['id'] = this.state.content.id;
      }
      this.props.handleSave(payload);
      const comp = this.refArr[0];
      if (comp) {
        comp.click();
        this.resetStates();
      }
    } else {
      if (isEmptyOrSpaces(this.state.content.campaignName)) {
        this.state.errorStateCheck.campaignName.show = true;
      }
      if (isEmptyOrSpaces(this.state.content.contractIds)) {
        this.state.errorStateCheck.contractIds.show = true;
      }
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state
        }
      })
    );
  }

  public loadAdminPage() {
    this.resetStates();
    const dummyUserObj = {
      UserAction: 'SlickPosition',
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK
    };
    this.props.handleSlick(dummyUserObj);
    this.props.history.push('/TVCampaignAggregation');
  }

  public resetErrorMessageBlock(userInput: any) { }

  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }
 
  public goBack() {
    this.props.history.push('/TVCampaignAggregation');
  }
  
  public render() {
     
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Add/Edit TV Campaign</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form className="template">
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formFirstName">CAMPAIGN NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formFirstName"
                    placeholder="Type campaign name here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.TVCAMPAIGNNAME
                    )}
                    value={this.state.content.campaignName}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.campaignName
                    }
                  />
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formLastName">CONTRACT IDS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formLastName"
                    placeholder="Type contract ids here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.TVCONTRACTIDS
                    )}
                    value={this.state.content.contractIds}
                  />
                   <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.contractIds
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
                  onClick={this.saveUserData}
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
                  ref={node => this.focusText(node)}
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
    editTVOrderStat: state.AdminTVOrdersEditState.hasOwnProperty('data')
      ? state.AdminTVOrdersEditState.data
      : null,
    errorMessage: props.errorMessage,
   
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
     handleSlick(payload: any) {
        dispatch(slickStateAction(payload));
      },
    
    handleSave(payload:any) {
      dispatch(dispatchSaveTVOrders(payload));
    }
     
    };
  }
)(TVCampaignAggOps);

interface ITVCampaignAggOps extends React.FC<any> {
  editTVOrderStat?:any;
  errorMessage: any;
  handleSlick?:any;
  handleSave?:any;
  history: any;
}
