/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
// import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import "../../CSS/perfect-scrollbar.css";
import AdminOperationKeys from "src/ConstConfig/AdminOperationKeys";
import SegmentModal from "src/CommonComponent/SegmentModal";
import { sendCynchCategoryAction } from "src/Actions";
import { v4 as uuidv4 } from "uuid";
// import ErrorAlertBanner from "src/CommonComponent/ErrorAlertBanner";
// const update = require('react-addons-update');

class CynchCategory extends React.Component<ICynchCategory, {}> {
  private refArr: any;
  public state: any;
  constructor(props: any) {
    super(props);
    this.refArr = [];
    this.submitModalData = this.submitModalData.bind(this);
    this.updateCynchCategory = this.updateCynchCategory.bind(this);
    this.renderSegments = this.renderSegments.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.state = this.props.categoryItem;
  }

  UNSAFE_componentWillReceiveProps(newProps: any) {
    this.setState({ ...this.state, newProps });
  }

  // componentWillReceiveProps({(someProp:any)}) {
  //   this.setState({...this.state,someProp})
  // }
  public focusText(ref: any) {
    const refComponent = ref;
    this.refArr.push(refComponent);
  }

  public updateCynchCategory() {
    const payload = {
      data: {
        categoryId: this.props.categoryItem.categoryId,
        cynchSegments: this.props.cynchSegments,
      },
    };
    this.props.sendCynchCategoryUpdate(payload);
  }

  public sendInputToParent(categoryItem: any, userInput: any, e: any) {
    if (userInput == AdminOperationKeys.CATNAME) {
      let eventData = { name: e.target.value, id: categoryItem.categoryId };
      this.props.updateModel(userInput, eventData);

      this.forceUpdate();
    }
  }

  public submitModalData(catId: any, userSelectedSegments: any) {
    let eventData = { selectedSegments: userSelectedSegments, id: catId };
    this.props.updateModel(AdminOperationKeys.SEGIDFORCATEGORY, eventData);
  }

  public deleteIndex(segment: any, e: any) {
    let eventData = {
      selectedSegments: segment,
      id: this.props.categoryItem.categoryId,
    };
    this.props.updateModel(
      AdminOperationKeys.DELETESEGIDFORCATEGORY,
      eventData
    );
    this.forceUpdate();
  }

  public deleteCategory(e: any) {
    let eventData = { id: this.props.categoryItem.categoryId };
    this.props.updateModel(AdminOperationKeys.DELETECATEGORY, eventData);
    this.forceUpdate();
  }

  public renderSegments() {
    if (this.props.cynchCategoryItemState) {
      let indx = this.props.cynchCategoryItemState.findIndex(
        (item: any) => item.categoryId == this.props.categoryItem.categoryId
      );
      if (indx >= 0) {
        return (
          <div className="selectedSegmentsContent ">
            {this.props.cynchCategoryItemState[indx].segIds.map(
              (pltfrm: any, i: any) => {
                return (
                  <div key={uuidv4()}>
                    <div key={uuidv4()}>
                      <p className="d-inline-block col-12" key={uuidv4()}>
                        {pltfrm.segmentName}
                        <a
                          className="float-right d-inline-block deleteAudience"
                          onClick={this.deleteIndex.bind(this, pltfrm)}
                        />
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        );
      }
      return <span />;
    } else return null;
  }

  public render() {
    let segmentList = this.props.cynchSegments.filter(
      (item: any) =>
        (item.ownedBy == "" ||
          item.ownedBy == this.props.categoryItem.categoryId) &&
        item.cynchSegmentType && item.cynchSegmentType == "Prizm"
    );
    const clsDisabled = segmentList.length <= 0 ? "disabled" : "";
    return (
      <div className="w-100 spaceBottom">
        <form>
          <div className="col-12">
            <div className="form-group leftmgr">
              <div>
                <label
                  htmlFor="formLastName"
                  className="d-inline-block font-weight-bolder"
                >
                  CATEGORY NAME{" "}
                </label>
                <a
                  href="javascript:void(0);"
                  className="float-right d-inline-block deleteAudience"
                  onClick={this.deleteCategory}
                />
              </div>
              <input
                type="text"
                className="form-control d-inline-block"
                id="formFirstName"
                placeholder="Type category name here"
                onChange={this.sendInputToParent.bind(
                  this,
                  this.props.categoryItem,
                  AdminOperationKeys.CATNAME
                )}
                value={this.props.categoryItem.categoryName}
              />
              {this.renderSegments()}
              <a
                className={clsDisabled + " btn btnSmall-primary mr-lg-2 "}
                role="button"
                href="javascript:void(0);"
                data-toggle="modal"
                data-target={"#EESegmentModal"}
                onClick={this.updateCynchCategory}
              >
                Add Segments
              </a>
            </div>
          </div>
          <SegmentModal
            onSubmit={this.submitModalData}
            category={this.props.categoryItem}
            cynchSegments={this.props.cynchSegments}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    cynchCategoryItemState: state.AdminCynchAttribParentUpdateState.hasOwnProperty(
      "data"
    )
      ? state.AdminCynchAttribParentUpdateState.data
      : null,
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    sendCynchCategoryUpdate(payload: any) {
      dispatch(sendCynchCategoryAction(payload));
    },
  };
})(CynchCategory);

interface ICynchCategory extends React.FC<any> {
  segmentModel?: any;
  isEditMode?: any;
  errorStateCheck?: any;
  categoryItem?: any;
  history?: any;
  updateModel?: any;
  cynchSegments?: any;
  cynchCategoryItemState?: any;
  sendCynchCategoryUpdate?: any;
}
