/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import {   showErrorBox } from '../../Actions';
import "../login.css";
 import {  ActionConstants } from "../../ConstConfig";
 
class AccessError extends React.Component<ILoginPage, {}> {
    private userName: string;
    private userPassword: string;
    private rememberMeChkBtn: boolean;
    public clsRememberMe:string;

    constructor(props: any) {
        super(props);
        this.userName = "";
        this.userPassword = "";
        this.rememberMeChkBtn = false;
        this.clsRememberMe = "fa fa-square";
        this.handleChange = this.handleChange.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleRememberMeEvent = this.handleRememberMeEvent.bind(this);
    }

    public handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            this.props.handleSubmit(this.userName, this.userPassword);
        }
    }

    public updateErrorMessage() {
       this.props.handleErrorMessageUpdate();
    }

    public handleChange(e: any) {
        this.userName = e.target.value;
        this.updateErrorMessage();
    }

    public handlePass(e: any) {
        this.userPassword = e.target.value;
    }

    public handleSubmit() {
        this.props.handleSubmit(this.userName, this.userPassword);
    }

    public handleRememberMeEvent() {
        this.rememberMeChkBtn = !this.props.loginPageState.LoginPageState.rememberMeFlag;
        if( this.rememberMeChkBtn) {
            this.clsRememberMe = "fa fa-check-square";
        }
        else {
            this.clsRememberMe = "fa fa-square";
        }
        const configLoginObj = {LoginPageState:{rememberMeFlag:this.rememberMeChkBtn, rememberMeClass:this.clsRememberMe}};
        this.props.handleLoginChangeEvent(configLoginObj);
        // this.props.handleSubmit(this.userName, this.userPassword);
    }

    public getAccessDenied() {
        return (
            <div className="row fixed-header-top ml-0 mr-0">
                <div className="col-12 spaceBottom blockCentered">
                    <img src="https://vm1192lnxapp001/redui/static/media/safety_icon.e76fc1b1.svg" />
                    {/* <img src={require("../../svg/safety_icon.svg")} /> */}
                    <h3 className="mb-4 mt-4">
                        Access Denied
                    </h3>
                    <h4>You don't have access to this application</h4>
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
             {this.props.errorMessage.Error_Code === 401 && this.getAccessDenied()}
            {this.props.errorMessage.Error_Code !== 401 && this.showGenericAccessError()}
            </main>
        )
    }
 
}

function mapStateToProps(state: any) {
    return {
        errorMessage: state.showErrorBoxState.hasOwnProperty("Error_Code") ? state.showErrorBoxState: {Error_Code:"",Display_Error_Message:''},
        loginPageState: state.configState.hasOwnProperty("LoginPageState") ? state.configState: {LoginPageState:{rememberMeClass:"fa fa-square"}}
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleErrorMessageUpdate: (currentConf:any) => {
            const userObj = { UserAction: ActionConstants.Login, errorMessage:"", isLoginSuccessful: "" };
            dispatch(showErrorBox(userObj));
        },
    }

})(AccessError);

interface ILoginPage extends React.FC<any> {
    propsFromStore?: any;
    handleSubmit?: any;
    handleChange?: any;
    loggingIn?: any;
    username?: any;
    password?: any;
    submitted?: any;
    handlePass?: any;
    errorMessage?: any;
    loginPageState?:any;
    handleLoginChangeEvent?:any;
    handleErrorMessageUpdate?:any;
}
