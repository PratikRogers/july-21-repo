/* eslint-disable */
import { UserOps } from "../ConstConfig/UserOps";

export function validateInput(requestPayload:any){
  
}

export function getModalProps(modalType:any){
   const responseObj = {
        Title: "Save Audiences",
        CloseButton: "Close",
        SaveButton: "Save",
        UserMessage: "",
        iconClass: ""
    }

    switch(modalType) {
        case UserOps.DELETE_MODAL:
            responseObj.Title = "Delete Audiences";
            responseObj.UserMessage = "Are you sure you want to delete the selected audience segment?";
            responseObj.SaveButton = "Yes";
            responseObj.CloseButton = "No";
            break;
        case UserOps.MESSAGE_BOX:
            responseObj.Title = "Red UI";
            responseObj.UserMessage = "Message Here";
            responseObj.SaveButton = "";
            responseObj.CloseButton = "Ok";
            break;
       case UserOps.METHODOLOGY:
            responseObj.Title = "Methodology";
            responseObj.UserMessage = "Message Here";
            responseObj.SaveButton = "";
            responseObj.CloseButton = "Ok";
       break;
    }
   

    return responseObj;
}

export function getMethodologyPayload() {
    const mthObj = { Dialog: { Methodology: { isVisible: true, UserMessage: "", saveFailed: false } } };
    return mthObj;
}