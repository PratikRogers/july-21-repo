/* eslint-disable */
import * as React from 'react';
//  import {  Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submitUIConfigAction } from '../Actions';
// import { getModalProps } from '../Utility/DialogUtil';
// import { UserOps } from '../ConstConfig/UserOps';

class ConfirmDialog extends React.Component<IDialog> {
    private modalProps:any;
    
    constructor(props: any) {
        super(props);
        this.modalProps = require("./MessageboxStyles.json");
        this.confirmAccept = this.confirmAccept.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getConfirmationMessage = this.getConfirmationMessage.bind(this);
        
    }

    /*
        handle user operation on Save button
        invoke the parent save content method
    */
    public confirmAccept() {
        // console.log("Deleted",this.props.UIDialogstats.content);
        this.props.handleConfirmDialogSubmitAction(true, this.props.UIDialogstats.content);
        // this.props.handleDialogSubmitAction(false);
    }

    /*
        handle user operation on close button
        reset the value of modal dialog visible = false
    */
    public handleClose() {
        this.props.handleDialogSubmitAction(false);
    }


    public getConfirmationMessage() {
        if(this.props.UIDialogstats.hasOwnProperty("Message") && this.props.UIDialogstats.Message !=="") {
            return this.props.UIDialogstats.Message;
        }
        return "Are you sure you want to delete this?"
    }

    render() {
        return (
            <div className={this.modalProps.fadeClass} id="deleteAudienceModal" role="dialog" aria-labelledby="genericModalRedUI"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="genericModalRedUI">
                                <span className="warningIcon spacerR16" />{this.getConfirmationMessage()}</h5>
                        </div>
                        <div className="modal-footer alignCenter">
                            <button type="button" className="btn btnDarkGray spacerR12" data-dismiss="modal" onClick={this.confirmAccept}>Continue</button>
                            <button type="button" id="btnModalClose"className="btn btnPrimary spacerL12" data-dismiss="modal" onClick={this.handleClose}>Cancel</button>
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
        UIDialogstats: state.configState.hasOwnProperty("Dialog") ? state.configState.Dialog : { isVisible: false }
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleDialogSubmitAction: (show: boolean) => {
            const payload = { Dialog: { isVisible: show } };
            dispatch(submitUIConfigAction(payload));
        },
        handleConfirmDialogSubmitAction: (show: boolean, deleteSegment: any) => {
            const payload = { Dialog: { isVisible: false, confirmAction: show, content: deleteSegment} };
            dispatch(submitUIConfigAction(payload));
        }
    }

})(ConfirmDialog);

export interface IDialog extends React.FC<any> {
    handleSubmit?: any;
    UIDialogstats?: any;
    handleClose?: any;
    errorMessage?: any;
    handleDialogSubmitAction?: any;
    handleConfirmDialogSubmitAction: any;
}