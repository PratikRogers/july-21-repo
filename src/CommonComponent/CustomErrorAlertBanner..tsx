/* eslint-disable */
import * as React from 'react';
// import { connect } from 'react-redux';

class CustomErrorAlertBanner extends React.Component<IDialog> {
  private errorMessagesContent: any;
  constructor(props: any) {
    super(props);
    this.errorMessagesContent = require("../data/UIErrorMessages.json");
  }

  render() {
    if( !this.props.errorMessageStruct.show) {
        return null;
    }
    return (
      <div>
        <div className="errorMessage">
          <span className="errorIcon float-left" /><strong>Error!</strong>{this.errorMessagesContent[this.props.errorMessageStruct.errFlyoutIdentifier]}!
        </div>
      </div>
    );
  }
}

export default  CustomErrorAlertBanner

interface IDialog extends React.FC<any> {
  errorMessageStruct: any;
}