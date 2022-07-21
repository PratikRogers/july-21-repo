/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
import { submitUIConfigAction } from "../Actions";
// import { getModalProps } from '../Utility/DialogUtil';
// import { KeyCode } from "../ConstConfig/KeyCode";
import AutoCompleteInput from "./AutoCompleteInput";


class SegmentModal extends React.Component<ISegmentModal> {
  // private modalProps:any;
  private refArr: any;
  private segName: any;
  private categoryID:any;
   constructor(props: any) {
    super(props);
    //   this.modalProps = getModalProps(this.props.UIDialogstats.isVisible);
    this.saveContents = this.saveContents.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.focusText = this.focusText.bind(this);
    this.segName = "";
    this.getSegmentName = this.getSegmentName.bind(this);
    this.refArr = [];
    this.categoryID = '';
   }

  componentWillMount() {}

  /*
        handle user operation on Save button
        invoke the parent save content method
    */
  public saveContents(userSelectedSegments:any) {
    this.props.onSubmit(this.props.modalProps.categoryId,userSelectedSegments);
   }

  /*
        handle user operation on close button
        reset the value of modal dialog visible = false
    */
  public handleClose() {
    this.props.handleDialogSubmitAction(false);
  }

  public getSegmentName(segName: any) {
    this.segName = segName;
    console.debug("The user name selected",this.segName);
  }

  public focusText(ref: any, grpButton?: any) {
    let refComponent = ref;
    if (grpButton && grpButton !== "") {
      refComponent = { name: grpButton, reference: ref };
    } else {
    }
    this.refArr.push(refComponent);
  }



  render() {
    if (this.refArr.length >= 1) {
      const component = this.refArr[0].reference;
      if (component) {
        component.focus();
      }
    }
    this.categoryID = this.props.modalProps.categoryId;
    let segmentList =  this.props.modalProps.cynchSegments.filter((item:any) => ((item.ownedBy == '' || item.ownedBy == this.categoryID) && (item.cynchSegmentType && item.cynchSegmentType == "Prizm"))).map(function(item:any) {
      return item['segmentName'];
    });
    return (
      <div
        className="modal fade"
        id={"EESegmentModal"}
        // id={"EE"+this.categoryID}
        role="dialog"
        aria-hidden="true"
        aria-labelledby="genericModalRedUI"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content shareSegmentModalHeight">
            <div className="modal-header dispblock">
              <h5 className="modal-title">Select Segments</h5>
            </div>
            <div className="modal-body">
              <div className="dispblock">
              <div className="borderBottomGray " />

                <AutoCompleteInput
                  suggestions={segmentList}
                  setUserName={this.getSegmentName}
                  categoryDetails={this.categoryID}
                  saveContent={this.saveContents}
                />
              </div>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state: any, props: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    UIDialogstats: state.configState.hasOwnProperty("Dialog")
      ? state.configState.Dialog
      : { isVisible: false, enableSaveButton: false },
 
    modalProps: state.AdminCynchAttribCategoryState.hasOwnProperty("data") ? 
    state.AdminCynchAttribCategoryState.data: {categoryId:'',cynchSegments:[]}
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => {
    return {
      handleDialogSubmitAction: (show: boolean) => {
        const payload = { Dialog: { isVisible: show } };
        dispatch(submitUIConfigAction(payload));
      },
      handleDialogSaveButtonAction: (show: boolean, saveButton: boolean) => {
        const payload = {
          Dialog: { isVisible: show, enableSaveButton: saveButton },
        };
        dispatch(submitUIConfigAction(payload));
      },
      
    };
  }
)(SegmentModal);

export interface ISegmentModal extends React.FC<any> {
  handleSubmit?: any;
  UIDialogstats?: any;
  handleClose?: any;
  errorMessage?: any;
  aName?: any;
  handleDialogSubmitAction?: any;
  handleDuplicateNameSubmitAction?: any;
  saveModalContents: any;
  handleDialogSaveButtonAction?: any;
  enableSaveButton?: any;
  onSubmit?:any;
  category?:any;
  modalProps?:any;
  cynchSegments?: any;
}
