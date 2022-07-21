/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

class RedUISpinner extends React.Component<IRedUISpinner, {}> {
	constructor(props: any) {
		super(props);
	}


	render() {
		return (
			<span>
				{this.props.UIConfStats && this.props.UIConfStats.isSpinnerActive ?
					<span className="overlaySpinner">
						<img className="" src={require('../Img/page-loader.gif')} />
					</span>
					:
					null
				}
			</span>
		);
	}
}


function mapStateToProps(state: any, props: any) {
	return {
		UIConfStats: state.SpinnerState.hasOwnProperty("UIConfig") ? state.SpinnerState.UIConfig : props.UIConfig
	};
}

export default connect(mapStateToProps, (dispatch) => {
	return {

	}
})(RedUISpinner);

interface IRedUISpinner extends React.FC<any> {
	listId?: any;
	UIConfStats?: any;
}
