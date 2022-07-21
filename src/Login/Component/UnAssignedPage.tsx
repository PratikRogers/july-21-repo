/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

class UnAssignedPage extends React.Component<ILoginPage, {}> {

    constructor(props: any) {
        super(props);
    }

    public getAccessDenied() {
        return (
            <div className="row fixed-header-top ml-0 mr-0">
                <div className="col-12 spaceBottom blockCentered">
                    <img src={require("../../svg/safety_icon.svg")} />
                    <h3 className="mb-4 mt-4">
                        Restricted Page
                    </h3>
                    <h4>You don't have access to this page</h4>
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

    }

})(UnAssignedPage);

interface ILoginPage extends React.FC<any> {
    history?: any;
}
