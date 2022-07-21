/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { submitUIConfigAction } from '../Actions';
import { getModalProps } from '../Utility/DialogUtil';
import { UserOps } from '../ConstConfig/UserOps';
import { KeyCode } from '../ConstConfig/KeyCode';

class MessageBox extends React.Component<IDialog> {
   modalProps: any;
   modalStyles: any;
   msgBoxNode: any;
  constructor(props: any) {
    super(props);
    this.modalProps = getModalProps(UserOps.MESSAGE_BOX);
    this.modalStyles = require("./MessageboxStyles.json");
    this.handleClose = this.handleClose.bind(this);
    this.handleUserOps = this.handleUserOps.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.showButtons = this.showButtons.bind(this);
    this.msgBoxNode = null;
  }


   onKeyPress(e: any) {
    let isEnterPressed = e.keyCode === KeyCode.ENTER ? true : false;
    let isTabPressed = e.keyCode === KeyCode.TAB ? true : false;
    let isEscape = e.keyCode === KeyCode.ESCAPE ? true : false;
    if ((isTabPressed || isEnterPressed || isEscape)) {
      this.handleClose();
    }
  }

   handleUserOps() {
    if (this.props.handleUserAction && this.props.UIDialogstats.inputParam !== "") {
      this.props.handleUserAction(this.props.UIDialogstats.inputParam);
    }
    else {
      if (this.props.handleUserAction)
        this.props.handleUserAction();
      else{
          this.handleClose();
        }
    }
  }

  /*
      handle user operation on close button
      reset the value of modal dialog visible = false
  */
   handleClose() {
    this.props.handleDialogSubmitAction(false, this.props.UIDialogstats.saveFailed);
  }

   showButtons() {
    if (this.props.UIDialogstats.boxButtons === UserOps.OK) {
      return <button type="button" className={this.modalStyles.modelButtonCancel} data-dismiss="modal" onClick={this.handleUserOps} autoFocus={true}>{this.modalProps.CloseButton}</button>
    }
    else {
      return <button type="button" className={this.modalStyles.modelButtonCancel} data-dismiss="modal"  autoFocus={true}>{this.modalProps.CloseButton}</button>
    }
  }


  render() {
    if (this.msgBoxNode && this.props.UIDialogstats.popupAuto) {
      let comp = this.msgBoxNode;
      if (comp) {
        comp.click();
      }
    }
    return (
      <div className={this.modalStyles.fadeClass} id="messageBoxGeneric" role="dialog" aria-labelledby="genericModalRedUI"
        aria-hidden="true" onKeyDown={this.onKeyPress}>
        <div className={this.modalStyles.centerModalClass} role="document">
          <div className={this.modalStyles.modelContent}>
            <div className={this.modalStyles.modalheader}>
              <h5 className={this.modalStyles.modelTitle} id="genericModalRedUI">
                <span className={this.modalStyles.modelMsgBoxTxtClass} />{this.props.UIDialogstats.UserMessage}</h5>
            </div>
            <div className={this.modalStyles.modelFooter}>
              {this.showButtons()}
            </div>
          </div>
        </div>
        <a className="" href="#" role="button" data-toggle="modal" data-target="#messageBoxGeneric" ref={(node) => this.msgBoxNode = node} />
      </div>
    );
  }
}
function mapStateToProps(state: any, props: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    UIDialogstats: state.configState.hasOwnProperty("Dialog") && state.configState.Dialog.hasOwnProperty("MessageBox") ? state.configState.Dialog.MessageBox : { MessageBox: { isVisible: false, UserMessage: "", saveFailed: false, inputParam: "", popupAuto: false } }
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    handleDialogSubmitAction: (show: boolean, saveStat: boolean) => {
      const payload = { Dialog: { MessageBox: { isVisible: false, UserMessage: "", saveFailed: saveStat } } };
      dispatch(submitUIConfigAction(payload));
    }
  }

})(MessageBox);

export interface IDialog extends React.FC<any> {
  handleSubmit?: any;
  UIDialogstats?: any;
  handleClose?: any;
  handleUserAction?: any;
  errorMessage?: any;
  handleDialogSubmitAction?: any;
  saveModalContents: any;
}