/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { AdminOperationKeys } from '../../ConstConfig/AdminOperationKeys';
import MessageBox from '../../CommonComponent/MessageBox';
import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import {
  clearAllErrorStateInQuerySegment,
} from '../utils/dashboardValidation';
import { isEmptyOrSpaces } from '../../Utility/CampaignUtil';
import { NavBarConstants, Configs } from 'src/ConstConfig';
import { slickStateAction, dispatchSaveQuerySegments } from 'src/Actions';
 
const update = require('react-addons-update');

class AdminAudienceQuerySegsOps extends React.Component<IAdminAudienceQuerySegsOps, {}> {
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
           segmentId:'',
           description:''
        },
        errorStateCheck:{}
    }
    if (this.props.editSegmentStat) {
      this.state.content = this.props.editSegmentStat;
    }
    this.state.errorStateCheck = clearAllErrorStateInQuerySegment();
    this.config = new Configs();
  }

 public resetStates() {
   this.state = undefined;
    this.state = {
      content: {
        id:'',
        segmentId:'',
        description:''
      },
      errorStateCheck: clearAllErrorStateInQuerySegment()
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
      case AdminOperationKeys.SEGMENTNAME:
        {
          this.state.content.segmentId = e.target.value;
        }
        break;
      case AdminOperationKeys.SEGMENTDESCR:
        {
          this.state.content.description = e.target.value;
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
    this.state.errorStateCheck = clearAllErrorStateInQuerySegment();
    if (this.state.content.segmentId != '') {
      const payload  = {
        data: {
          allSegsUrl:this.config.getQuerySegmentUrl(),
          url:this.config.getSaveQuerySegmentUrl(),
          payload:{segmentId:this.state.content.segmentId,description:this.state.content.description}
        }
      }
      if (this.props.editSegmentStat) {
        payload.data.payload['id'] = this.state.content.id;
      }
      this.props.handleSave(payload);
      const comp = this.refArr[0];
      if (comp) {
        comp.click();
        this.resetStates();
      }
    } else {
      if (isEmptyOrSpaces(this.state.content.segmentId)) {
        this.state.errorStateCheck.segmentId.show = true;
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
    // this.props.submitLastPagination({
    //   PaginationProps: this.props.lastUserOps
    // });
   
    this.props.history.push('/QueryAudienceSegmentIds');
  }

  public resetErrorMessageBlock(userInput: any) { }

  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }
 
  public goBack() {
    this.props.history.push('/QueryAudienceSegmentIds');
  }
  
  public render() {
     
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Add/Edit Query Segments</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form className="template">
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formFirstName">SEGMENT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formFirstName"
                    placeholder="Type segment id here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.SEGMENTNAME
                    )}
                    value={this.state.content.segmentId}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.segmentId
                    }
                  />
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formLastName">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formLastName"
                    placeholder="Type Segment Description here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.SEGMENTDESCR
                    )}
                    value={this.state.content.description}
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
    editSegmentStat: state.AdminQueryAudienceEditState.hasOwnProperty('data')
      ? state.AdminQueryAudienceEditState.data
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
      dispatch(dispatchSaveQuerySegments(payload));
    }
     
    };
  }
)(AdminAudienceQuerySegsOps);

interface IAdminAudienceQuerySegsOps extends React.FC<any> {
  editSegmentStat?:any;
  errorMessage: any;
  handleSlick?:any;
  handleSave?:any;
  history: any;
}
