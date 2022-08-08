/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import ManagerUpdateForm from './ManagerUpdateForm';


class RequestsDetails extends React.Component<IRequestsDetails, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
          <ManagerUpdateForm history={this.props.history} />
        );
    }
}

function mapStateToProps(state: any) {
    return {
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
       
    }
})(RequestsDetails);

interface IRequestsDetails extends React.FC<any> {
    history: any;
}
