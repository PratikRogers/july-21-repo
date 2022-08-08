/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import {   showErrorBox } from '../../Actions';
import "../login.css";
 import {  ActionConstants } from "../../ConstConfig";
 
class AccessDeined extends React.Component<ILoginPage, {}> {

    constructor(props: any) {
        super(props);
    }

    public getAccessDenied() {
        if(this.props.customMsg) {
            return(
            <div className="row fixed-header-top ml-0 mr-0">
            <div className="col-12 spaceBottom blockCentered">
                <h4>{this.props.customMsg}</h4>
            </div>
        </div>)
        }
        else 
        return (
            <div className="row fixed-header-top ml-0 mr-0">
                <div className="col-12 spaceBottom blockCentered">
                    <img src={require("../../svg/safety_icon.svg")} />
                    <h3 className="mb-4 mt-4">
                        Access Denied
                    </h3>
                    <h4>You don't have access to this page</h4>
                </div>
            </div>
        )
    }

    public showGenericAccessError() {
        return (
            <div className="row fixed-header-top ml-0 mr-0">
            <div className="col-12">
                <div className="">
                    <h3 className="text-center">{this.props.errorMessage.Display_Error_Message}</h3>
                </div>
            </div>
        </div>
        )
    }

    public render() {
        return (
            <main role="main" className="container-fluid">
            
            {this.getAccessDenied()}
            
            </main>
        )
    }
 
}

function mapStateToProps(state: any) {
    return {
          };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleErrorMessageUpdate: (currentConf:any) => {
            const userObj = { UserAction: ActionConstants.Login, errorMessage:"", isLoginSuccessful: "" };
            dispatch(showErrorBox(userObj));
        },
    }

})(AccessDeined);

interface ILoginPage extends React.FC<any> {
    customMsg?:any;
    errorMessage?: any;
}
