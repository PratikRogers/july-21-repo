/* eslint-disable */
import * as React from 'react';
import { Form } from 'node_modules/react-bootstrap';
import { connect } from 'react-redux';
import { submitUIConfigAction } from '../Actions';
// import { getModalProps } from '../Utility/DialogUtil';
import { KeyCode } from '../ConstConfig/KeyCode';

class SaveDialog extends React.Component<IDialog> {
  // private modalProps:any;
  private modalName: string;
  private refArr: any;
  constructor(props: any) {
    super(props);
    this.modalName = this.props.aName ? this.props.aName : '';
    //   this.modalProps = getModalProps(this.props.UIDialogstats.isVisible);
    this.handleChange = this.handleChange.bind(this);
    this.saveContents = this.saveContents.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.focusText = this.focusText.bind(this);
    this.refArr = [];
  }

  public onKeyPress(userIndx: any, e: any) {
    const isGrpButton = false;
    const isEnterPressed = e.keyCode === KeyCode.ENTER ? true : false;
    const isTabPressed = e.keyCode === KeyCode.TAB ? true : false;
    let component = null;

    if ((isTabPressed || isEnterPressed) && isGrpButton) {
      if (userIndx >= 0) {
        userIndx += 1;
      }
      component = this.refArr[userIndx].reference;
    } else if ((isEnterPressed || isTabPressed) && !isGrpButton) {
      component = this.refArr[userIndx];
    }

    if (component) {
      e.preventDefault();
      component.focus();
    }

    if (isEnterPressed) {
      this.saveContents();
    }
  }

  UNSAFE_componentWillMount() {
    this.modalName = this.props.aName ? this.props.aName : '';
  }

  /*
        handle user input event handler
        @input: event associated with inputs

        Store the user input in class variable
    */
  public handleChange(evt: any) {
    this.modalName = evt.target.value;
    if (this.modalName.trim().length > 0) {
      this.props.handleDialogSaveButtonAction(true, true);
    } else {
      this.props.handleDialogSaveButtonAction(true, false);
    }
  }

  /*
        handle user operation on Save button
        invoke the parent save content method
    */
  public saveContents() {
    // console.log("All audience list",this.props.audienceList);

    this.props.saveModalContents(
      this.modalName,
      false,
      this.props.UIDialogstats.content
    );
    this.props.handleDialogSaveButtonAction(false, false);

    const contxt = this;
    const timeOut = setTimeout(function() {
      const overWrite = contxt.props.audienceList;
      // console.log(overWrite)
      if (overWrite) {
        contxt.props.saveModalContents(contxt.modalName, true, '');

        clearTimeout(timeOut);
        return;
      }
    }, 200);
  }

  /*
        handle user operation on close button
        reset the value of modal dialog visible = false
    */
  public handleClose() {
    this.props.handleDialogSubmitAction(false);
  }

  public focusText(ref: any, grpButton?: any) {
    let refComponent = ref;
    if (grpButton && grpButton !== '') {
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
    return (
      <div
        className="modal fade"
        id="SaveAudienceModal"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header dispblock">
              <h5 className="modal-title">Save Audience</h5>
            </div>
            <div className="modal-body">
              <div className="dispblock">
                <Form.Control
                  type="text"
                  maxLength={80}
                  placeholder={this.modalName}
                  onChange={this.handleChange}
                  tabIndex={1}
                  onKeyDown={this.onKeyPress.bind(this, 1)}
                  ref={(node:any) => this.focusText(node)}
                  autoFocus={true}
                  value={this.props.aName}
                />
              </div>
            </div>
            <div className="modal-footer alignCenter">
              <button
                type="button"
                className="btn btnDarkGray spacerR12"
                data-dismiss="modal"
                disabled={!(this.modalName.trim().length > 0)}
                onClick={this.saveContents}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btnPrimary spacerL12"
                data-dismiss="modal"
                onClick={this.handleClose}
              >
                Cancel
              </button>
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
    UIDialogstats: state.configState.hasOwnProperty('Dialog')
      ? state.configState.Dialog
      : { isVisible: false, enableSaveButton: false },
    audienceList: state.AudiencesStatusState.hasOwnProperty('overWrite')
      ? state.AudiencesStatusState.overWrite
      : null
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
      handleDialogSubmitAction: (show: boolean) => {
        const payload = { Dialog: { isVisible: show } };
        dispatch(submitUIConfigAction(payload));
      },
      handleDialogSaveButtonAction: (show: boolean, saveButton: boolean) => {
        const payload = {
          Dialog: { isVisible: show, enableSaveButton: saveButton }
        };
        dispatch(submitUIConfigAction(payload));
      }
    };
  }
)(SaveDialog);

export interface IDialog extends React.FC<any> {
  handleSubmit?: any;
  UIDialogstats?: any;
  handleClose?: any;
  errorMessage?: any;
  aName?: any;
  handleDialogSubmitAction?: any;
  handleDuplicateNameSubmitAction?: any;
  saveModalContents: any;
  handleDialogSaveButtonAction?: any;
  audienceList?: any;
  enableSaveButton?: any;
}
