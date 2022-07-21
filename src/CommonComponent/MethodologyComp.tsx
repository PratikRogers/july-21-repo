/* eslint-disable */
 /* eslint-disable */
import * as React from 'react';
 import {  Button, Modal } from 'react-bootstrap';
 import { connect } from 'react-redux';
import { submitUIConfigAction } from '../Actions';
import { getModalProps } from '../Utility/DialogUtil';
import { UserOps } from '../ConstConfig/UserOps';
import { KeyCode } from '../ConstConfig/KeyCode';

class MethodologyComp extends React.Component<IDialog> {
     modalProps:any;
     methodologyMaps:any;
    constructor(props:any) {
      super(props);
      this.modalProps = getModalProps(UserOps.METHODOLOGY);
      this.handleClose = this.handleClose.bind(this);
      this.onKeyPress = this.onKeyPress.bind(this);
      this.getMethodologyMessage = this.getMethodologyMessage.bind(this);
      this.methodologyMaps =
      [
        {
          message:"Counts are estimates only and are subject to daily fluctuations based on actual usage."
        },
        {
          message:"Number of Canadians is derived from a model combining Wireless and Cable billing records with digital cookie data."
        },
        {
          message:"TV Inventory is based on the average ad exposure in a 28 day period by the average viewer across all Rogers channels."
        },
        {
          message:" Digital Inventory is based on the average ad load and average page views per visitor in a 28 day period across all Rogers owned properties."
        },
        {
          message:"This does not include exchange-based traffic."
        },
    ];
  }


     onKeyPress(e: any) {
      let isEnterPressed = e.keyCode === KeyCode.ENTER ? true : false;
      let isTabPressed  = e.keyCode === KeyCode.TAB ? true: false;
      let isEscape = e.keyCode === KeyCode.ESCAPE ? true: false;
      if ((isTabPressed || isEnterPressed || isEscape)) {
        this.handleClose();
      }
  }

   getMethodologyMessage() {
    return (
        <div>
           {this.methodologyMaps.map((item: any, i: any) => {
            return <div key={"mmap"+i} className="clsMethodologyFnt">{item.message} </div>
           })}
        </div>
    )
  }

    /*
        handle user operation on close button
        reset the value of modal dialog visible = false
    */
     handleClose() {
        this.props.handleDialogSubmitAction(false,this.props.UIDialogstats.saveFailed);
    }
  

     showIcon(){
      const iconClass = this.props.UIDialogstats.saveFailed ? "fa fa-times-circle" :"fa fa-check";
      return <span> <i className={iconClass} /> </span>
    }

    render() {
      return (
        <div  onKeyDown={this.onKeyPress} >
          <Modal show={this.props.UIDialogstats.isVisible} onHide={this.handleClose} dialogClassName="modalDialogPos">
            <Modal.Header closeButton={true}>
              <Modal.Title>{this.modalProps.Title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.getMethodologyMessage()}
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} autoFocus={true}>{this.modalProps.CloseButton}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state: any,props:any) {
    return {
        errorMessage: state.showErrorBoxState.errorMessage,
        UIDialogstats: state.configState.hasOwnProperty("Dialog") && state.configState.Dialog.hasOwnProperty("Methodology") ? state.configState.Dialog.Methodology : {Methodology:{isVisible:false, UserMessage:"",saveFailed:false}}
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleDialogSubmitAction: (show:boolean,saveStat:boolean) =>{
            const payload = {Dialog:{MessageBox:{isVisible:false, UserMessage:"",saveFailed:saveStat}}};
            dispatch(submitUIConfigAction(payload));
        }
    }

})(MethodologyComp);

export interface IDialog extends React.FC<any> {
    handleSubmit?: any;
    UIDialogstats?:any;
    handleClose?:any;
    errorMessage?: any;
    handleDialogSubmitAction?:any;
    saveModalContents:any;
}