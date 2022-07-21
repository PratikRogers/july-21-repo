/* eslint-disable */
import * as React from 'react';
// import { connect } from 'react-redux';

class ErrorAlertBanner extends React.Component<IDialog> {
  private errorMessagesContent: any;
  constructor(props: any) {
    super(props);
    this.errorMessagesContent = require("../data/UIErrorMessages.json");
  }

  render() {
    if( !this.props.errorMessageStruct.show) {
        return null;
    }
 
    const cssName= (this.props.errorMessageStruct.hasOwnProperty("cssAttrib") && this.props.errorMessageStruct.cssAttrib) ? this.props.errorMessageStruct.cssAttrib: "";
    return (
      <div>
        <div className={cssName+" popoverCustom "}>
          <div className="arrow_box float-right">
            <span><span className="errorIcon float-left"/><strong>Error!</strong>{this.errorMessagesContent[this.props.errorMessageStruct.errFlyoutIdentifier]}!</span>
          </div>
        </div>
        <div className="errorMessage">
          <span className="errorIcon float-left" /><strong>Error!</strong>{this.errorMessagesContent[this.props.errorMessageStruct.errFlyoutIdentifier]}!
        </div>
      </div>
    );
  }
}

export default  ErrorAlertBanner

interface IDialog extends React.FC<any> {
  errorMessageStruct: any;
}