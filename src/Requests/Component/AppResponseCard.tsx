/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
 
import { slickStateAction } from '../../Actions';
import { NavBarConstants } from 'src/ConstConfig';


class AppResponseCard extends React.Component<IAppResponseCard, {}> {
    public state: any;
    private refArr: any;

    constructor(props: any) {
        super(props);
        this.showRequestsForm = this.showRequestsForm.bind(this);
        this.focusText = this.focusText.bind(this);
        this.refArr = [];
    }

    public focusText(ref: any, grpButton?: any, itemName?: any) {
        this.refArr.push(ref);
    }
 
    public showRequestsForm(e: any) {
        let payload = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK,
            hstry: this.props.history
          };
        this.props.handleSubmit(payload);
        this.props.history.push("/Requests");
    }

    public render() {
        return (
            <main role="main" className="container-fluid">
                <div className="row fixed-header-top ml-0 mr-0 spaceBottom spaceBottom-mb">
                    <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm">
                        <div>
                            <h3 className="float-left">Requests Status</h3>
                        </div>
                    </div>
                    <div className="col-xl-5 order-xl-last col-md-12 order-md-first col-sm-12 col-12 order-mb-first buttonPanel pl-lg-0">
                        <a className=" btn btnPrimary col-50 align-sm-left" onClick={this.showRequestsForm} href="javascript:void(0);" role="button">Request Another Report</a>
                    </div>
                </div>
                <div className="borderBottomGray" />
                <div className="spaceBottom" />
                <label htmlFor="formName">Thanks for your request! You'll receive emails when things are updated and you can also monitor the progress of your asks via the <a onClick={this.showRequestsForm} href="javascript:void(0);" role="button">requests page</a></label>
            </main>
        );
    }
}

function mapStateToProps(state: any) {
    return {
           
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        handleSubmit: (dummyUserObj: any) => {
            dispatch(slickStateAction(dummyUserObj));
          }
    }
})(AppResponseCard);

interface IAppResponseCard extends React.FC<any> {
    errorMessage: any;
    handleClicks: any;
    handleSubmit: any;
    history: any;
}
