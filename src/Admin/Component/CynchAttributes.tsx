/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
import {
  slickStateAction,
  sendAdminAudienceTraitPaginationAction,
  sendCynchOperationAction,
  sendParentStateUpdated,
  sendCynchCategoryAction,
} from "../../Actions";
import { v4 as uuidv4 } from "uuid";

import { AdminOperationKeys } from "../../ConstConfig/AdminOperationKeys";
import MessageBox from "../../CommonComponent/MessageBox";
// import { NavBarConstants } from "../../ConstConfig";
import ErrorAlertBanner from "../../CommonComponent/ErrorAlertBanner";
import {  clearAllErrorStateInCynch } from "../utils/dashboardValidation";
// import CynchCategory from "./CynchCategory";
// import SegmentModal from "src/CommonComponent/SegmentModal";
import CynchCategoryModel from "../Model/CynchCategoryModel";
import { List } from 'immutable';
import UserOps from "src/ConstConfig/UserOps";
import { isEmptyOrSpaces } from "src/Utility/CampaignUtil";
import SegmentModal from "src/CommonComponent/SegmentModal";


const update = require("react-addons-update");

class CynchAttributes extends React.Component<ICynchAttributes, {}> {
  public state: any;
  private refArr: any;
  private cynchCatModel: any;
  constructor(props: any) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.loadAdminPage = this.loadAdminPage.bind(this);
    this.resetStates = this.resetStates.bind(this);
    this.cynchCatModel = new CynchCategoryModel(this.props.traitsList.toArray());
    this.refArr = [];
    
    this.addCategory = this.addCategory.bind(this);
   
    this.onControlsChange = this.onControlsChange.bind(this);
    this.renderCynchCategory = this.renderCynchCategory.bind(this);
    this.saveCynchAttributes = this.saveCynchAttributes.bind(this);
    if (this.props.editCynchStat) {
      this.cynchCatModel.build(this.props.editCynchStat,this.props.traitsList.toArray());
    }
    this.resetStates();
    this.state.errorStateCheck = clearAllErrorStateInCynch();


    this.submitModalData = this.submitModalData.bind(this);
    this.updateCynchCategory = this.updateCynchCategory.bind(this);
    this.renderSegments = this.renderSegments.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  public resetStates() {
    this.state = undefined;
    this.state = {
      content: {
        attributeName:this.cynchCatModel.getAttributeName(),
        attributeDescription:this.cynchCatModel.getAttributeDescription(),
        categories: this.cynchCatModel.getcategoryList(),
        cynchSegment:this.cynchCatModel.getCynchSegments()
      },
      errorStateCheck:   clearAllErrorStateInCynch()
    };

    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  saveCynchAttributes() {
    this.state.errorStateCheck = clearAllErrorStateInCynch();  
    if (this.cynchCatModel.isObjectReady()) {
      const payload = this.cynchCatModel.getCynchAttributePayload();
      let updateCynchAttribAction = false;
      if (this.props.editCynchStat) {
        updateCynchAttribAction = true;
      }
      this.props.handleCynchAttributeAction(
        payload,
        updateCynchAttribAction
      );
      const comp = this.refArr[0];
      if (comp) {
        comp.click();
      }
    } else {
      if (isEmptyOrSpaces(this.cynchCatModel.getAttributeName())) {
        this.state.errorStateCheck.AttributeNameError.show = true;
      }
      if (isEmptyOrSpaces(this.cynchCatModel.getAttributeDescription())) {
        this.state.errorStateCheck.AttributeDescError.show = true;
      }
      if (this.cynchCatModel.isCategoryEmpty()) {
        this.state.errorStateCheck.AttributeCatError.show = true;
      }
      if (this.cynchCatModel.isCategoryDuplicate()) {
        this.state.errorStateCheck.AttributeDuplicateCatError.show = true;
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

  public onControlsChange(userInput: any, e: any) {
    switch (userInput) {
      case AdminOperationKeys.ATTRIBNAME:
        {
          this.state.content.attributeName = e.target.value;
          this.cynchCatModel.setAttributeName(this.state.content.attributeName);
        }
        break;
        case AdminOperationKeys.ATTRIBUTEDESCIPTIPON:
        {
          this.state.content.attributeDescription = e.target.value;
          this.cynchCatModel.setAttributeDescription(this.state.content.attributeDescription)
        }
        break;
        
      case AdminOperationKeys.CATNAME:
        {
          this.cynchCatModel.updateCategoryName(e.name, e.id);
          this.state.content.categories = this.cynchCatModel.getcategoryList();
        }
        break;
      case AdminOperationKeys.SEGIDFORCATEGORY:
        {
          this.cynchCatModel.updateCategorySegmentList(e.selectedSegments, e.id);
          this.state.content.categories = this.cynchCatModel.getcategoryList();
          this.state.content.cynchSegment = this.cynchCatModel.getCynchSegments();
          this.props.sendParentUpdates(this.state.content.categories);
        }
        break;
        // 
        case AdminOperationKeys.DELETESEGIDFORCATEGORY:
        {
          this.cynchCatModel.deleteSegment(e.selectedSegments, e.id);
          this.state.content.categories = this.cynchCatModel.getcategoryList();
          this.state.content.cynchSegment = this.cynchCatModel.getCynchSegments();
        }
        break
        case AdminOperationKeys.DELETECATEGORY:
          {
            this.cynchCatModel.deleteCategory(e.id);
            this.state.content.categories = this.cynchCatModel.getcategoryList();
            this.state.content.cynchSegment = this.cynchCatModel.getCynchSegments();
          }
          break;
      default:
        break;
    }
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );

    
  }

  public loadAdminPage() {
    this.resetStates();
    const dummyUserObj = {
      UserAction: "SlickPosition",
      // selectedTab: NavBarConstants.AUDIENCECYNCHSLICK,
      // slickIdx: NavBarConstants.AUDIENCECYNCHSLICK,
    };
    this.props.handleSubmit(dummyUserObj);

    this.props.history.push("/AdminCynchAttributeList");
  }

  public resetErrorMessageBlock(userInput: any) {}

  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }

  public goBack() {
    this.props.history.push("/AdminCynchAttributeList");
  }

  public addCategory() {
    this.cynchCatModel.addEmptyCategoryItem();
    this.state.content.categories = this.cynchCatModel.getcategoryList();
    this.state.errorStateCheck = clearAllErrorStateInCynch();  
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }


  public updateCynchCategory(catId:any,e:any) {
    const payload = {
      data: {
        categoryId: catId,
        cynchSegments: this.state.content.cynchSegment,
      },
    };
    this.props.sendCynchCategoryUpdate(payload);
  }

  public sendInputToParent(categoryItem: any, userInput: any, e: any) {
    if (userInput == AdminOperationKeys.CATNAME) {
      let eventData = { name: e.target.value, id: categoryItem.categoryId };
      this.onControlsChange(userInput, eventData);
      
     }
  }

  public submitModalData(catId: any, userSelectedSegments: any) {
    let eventData = { selectedSegments: userSelectedSegments, id: catId };
    this.onControlsChange(AdminOperationKeys.SEGIDFORCATEGORY, eventData);
  }

  public deleteIndex(segment: any,categoryId:any, e: any) {
    let eventData = { selectedSegments: segment, id: categoryId };
    this.onControlsChange(
      AdminOperationKeys.DELETESEGIDFORCATEGORY,
      eventData
    );
    // this.forceUpdate();
  }

  public deleteCategory(catId:any,e: any) {
    let eventData = { id: catId };
    this.onControlsChange(AdminOperationKeys.DELETECATEGORY, eventData);
    // this.forceUpdate();
  }

  public renderSegments(item:any) {

        return (
          <div className="selectedSegmentsContent ">  
            {item.segIds.map((pltfrm: any, i: any) => {
              return (
                <div key={uuidv4()}>
                  <div key={uuidv4()}>
                    <p className="d-inline-block col-12" key={uuidv4()}>
                      {pltfrm.segmentName}
                      <a
                        className="float-right d-inline-block deleteAudience"
                        onClick={this.deleteIndex.bind(this, pltfrm,item.categoryId)}
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
     
  }

  public renderCynchCategory(cynchCatItem:any) {
   return (
     <div className="w-100 spaceBottom">
       <form>
         <div className="col-12">
           <div className="form-group leftmgr">
             <div>
               <label htmlFor="formLastName" className="d-inline-block font-weight-bolder">
                 CATEGORY NAME{" "}
               </label>
               <a
                 href="javascript:void(0);"
                 className="float-right d-inline-block deleteAudience"
                 onClick={this.deleteCategory.bind(this,cynchCatItem.categoryId)}
               />
             </div>
             <input
               type="text"
               className="form-control d-inline-block"
               id="formFirstName"
               placeholder="Type category name here"
               onChange={this.sendInputToParent.bind(
                 this,
                 cynchCatItem,
                 AdminOperationKeys.CATNAME
               )}
               value={cynchCatItem.categoryName}
             />
             {this.renderSegments(cynchCatItem)}
             <a
               className={ " btn btnSmall-primary mr-lg-2 "}
               role="button"
               href="javascript:void(0);"
               data-toggle="modal"
               data-target={"#EESegmentModal"}
               onClick={this.updateCynchCategory.bind(this,cynchCatItem.categoryId)}
             >
               Add Segments
             </a>
           </div>
         </div>
         <SegmentModal
           onSubmit={this.submitModalData}
           category={cynchCatItem.categoryItem}
           cynchSegments={this.state.content.cynchSegments}
         />
       </form>
     </div>
   );
 }

  
  public render() {
    if (this.props.history.action === "POP") {
      this.props.history.push("/");
    }

    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Add/Edit Cynch Attribute</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form className="template">
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formFirstName">NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formFirstName"
                    placeholder="Type attribute name here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.ATTRIBNAME
                    )}
                    value={this.cynchCatModel.getAttributeName()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.AttributeNameError
                    }
                  />
                  </div></div>
                  <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formDescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formDescription"
                    placeholder="Type description here"
                    onChange={this.onControlsChange.bind(
                      this,
                      AdminOperationKeys.ATTRIBUTEDESCIPTIPON
                    )}
                    value={this.cynchCatModel.getAttributeDescription()}
                  />
                  <ErrorAlertBanner
                    errorMessageStruct={
                      this.state.errorStateCheck.AttributeDescError
                    }
                  />
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formLastName">CATEGORIES</label>
                 
                   {this.state.content.categories.map(
                  (cynchCategory: any, i: any) => {
                    return (
                      this.renderCynchCategory(cynchCategory)
                )})} 
                  <div>
                      <ErrorAlertBanner
                  errorMessageStruct={this.state.errorStateCheck.AttributeCatError}
                />
                <ErrorAlertBanner
                  errorMessageStruct={this.state.errorStateCheck.AttributeDuplicateCatError}
                />
                  <a
                    className=" btn btnSmall-secondary mr-lg-2"
                    role="button"
                    href="javascript:void(0);"
                    onClick={this.addCategory}
                  >
                    Add Category
                  </a>
                  </div>
                </div>
              </div>
              
              <div className="col-12 buttonPanel spaceBottom">
                <a
                  className="btn btnPrimary"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.saveCynchAttributes}
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
                  ref={(node) => this.focusText(node)}
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
    editCynchStat: state.AdminCynchAttribEditOperationState.hasOwnProperty("data")
      ? state.AdminCynchAttribEditOperationState.data
      : null,
    errorMessage: props.errorMessage,
    lastUserOps: state.AdminUserTraitListPaginationControlState.hasOwnProperty(
      "PaginationProps"
    )
      ? state.AdminUserTraitListPaginationControlState.PaginationProps
      : { currPage: 1, maxPageSize: 6, pageStartIndex: 1 },
    traitsList: state.AdminUserTraitListControlState.hasOwnProperty('TraitsList')
    ? state.AdminUserTraitListControlState.TraitsList
    : List([]),
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => {
    return {
      handleSubmit(payload: any) {
        dispatch(slickStateAction(payload));
      },
      submitLastPagination(payload: any) {
        dispatch(sendAdminAudienceTraitPaginationAction(payload));
      },
      sendParentUpdates(payload: any) {
        dispatch(sendParentStateUpdated({data:payload}));
      },
      handleCynchAttributeAction(payload: any, userOps?: any) {
        payload.userAction = UserOps.ADD_ATTRIBUTE;
        if (userOps) {
          payload.userAction = UserOps.EDIT_ATTRIBUTE;
        }
        dispatch(sendCynchOperationAction(payload));
      },
      sendCynchCategoryUpdate(payload: any) {
        dispatch(sendCynchCategoryAction(payload));
    }
  }
  }
)(CynchAttributes);

interface ICynchAttributes extends React.FC<any> {
  campaignData: any;
  handleCampaignUpdate: any;
  errorMessage: any;
  handleUserEntryUpdateAction?: any;
  usrSelectedDates: any;
  handleSubmit: any;
  editCynchStat?: any;
  submitLastPagination?: any;
  handleCynchAttributeAction: any;
  lastUserOps?: any;
  traitsList?: any;
  sendParentUpdates?:any;
  history: any;


  segmentModel?: any;
  isEditMode?: any;
  errorStateCheck?: any;
  categoryItem?: any;
  updateModel?: any;
  cynchSegments?: any;
  cynchCategoryItemState?:any;
  sendCynchCategoryUpdate?: any;
}
