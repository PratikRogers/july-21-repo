/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';

import { slickStateAction, listAllRequestAction, showIndividualRequestsAction, RequestsUpdateInPrgAction } from '../../Actions';
import { NavBarConstants, Configs } from 'src/ConstConfig';
import TablePageComponent from 'src/CommonComponent/TablePageComponent';
import { List } from 'immutable';
import UserOps from 'src/ConstConfig/UserOps';
import RedUISpinner from 'src/Panel/RedUISpinner';

class RequestManagerLandingPage extends React.Component<IRequestManagerLandingPage, {}> {
    public state: any;
    private config: any;

    constructor(props: any) {
        super(props);
        this.showRequestsForm = this.showRequestsForm.bind(this);
        this.populateRequestTable = this.populateRequestTable.bind(this);
        this.getDesktopActions = this.getDesktopActions.bind(this);
        this.config = new Configs();
     }

    public showRequestsForm(e: any) {
        let payload = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK,
            hstry: this.props.history
        };
        this.props.handleSubmit(payload);
        this.props.history.push("/RequestDetails");
    }

    componentDidMount() {
        this.populateRequestTable();
    }

    public populateRequestTable() {
        this.props.handleClicks({ url: this.config.getAllRequestsUrl(), type: UserOps.LISTALL_REQUESTS, reportConfigUrl:this.config.getAllRequestsUrl() });
    }

    public showRequests(row:any,e:any) {
        const payload = {
            type: UserOps.IND_REQUESTS,
            data: { url: this.config.getRequestsStatusUrl() + "?" + "requestId="+row.id }
        };
        this.props.handleStatusSubmit(payload);
        this.props.switchView(row);
        const dummyUserObj = {
            UserAction: 'SlickPosition',
            selectedTab: NavBarConstants.REQUESTSLISTSLICK,
            slickIdx: NavBarConstants.REQUESTSLISTSLICK
          };
          this.props.handleSubmit(dummyUserObj);
          this.props.history.push('/RequestDetails');

    }

    public getDesktopActions(cell: any, row: any, formatExtraData: any, index: any) {
        return (
            <span>
                <a className="btn btnSmall-primary" href="javascript:void(0);" role="button" onClick={this.showRequests.bind(this,row)}>
                    View
                </a>
            </span>
        );
    }

    public render() {
        const spinnerState = { UIConfig: { isSpinnerActive: true } };

        const tableInput = {
            searchTitle: "Search by requester",
            TableTitle: "Request Manager",
            tableContent: this.props.list,
            tableFields: [{
                field: 'userName',
                searchable: true,
                displayName: 'Requester',
                isHidden: false,
                isKey: true
            },
            {
                field: 'address',
                searchable: true,
                displayName: 'Address(es)',
                isHidden: false,
                isKey: false
            },
            {
                field: 'creationTs',
                searchable: false,
                displayName: 'Date',
                isHidden: false,
                isDate:true,
                isKey: false
            },
            {
                field: 'status',
                searchable: false,
                displayName: 'Status',
                isHidden: false,
                isKey: false
            },
            {
                field: '',
                searchable: false,
                displayName: 'Action',
                isHidden: false,
                isKey: false,
                actionMethod: this.getDesktopActions
            }
            ],
            bordered: false,
            multiColumnSearch: false,
            showPagination: true,
            showSearch: true,
            maxRowSize: 25,
            sortedCol: '',
            sortedOrder: ''
        };
        const tableInputSmall = {
            tableContent: this.props.list,
            tableFields: [{
                field: 'requester',
                searchable: true,
                displayName: 'Requester',
                isHidden: false,
                isKey: true
            }
            ],
            dispNames: { "userName": 'Requester: ', "creationTs": "Date : ", "status": "Status: ", "address":"Address (es)" },
            actionMethod:this.getDesktopActions,
            bordered: false,
            multiColumnSearch: false,
            showPagination: true,
            showSearch: true,
            maxRowSize: 25,
            sortedCol: '',
            sortedOrder: ''
        };
        return (
            <main role="main" className="container-fluid">
                <div className="row fixed-header-top ml-0 mr-0 spaceBottom spaceBottom-mb">
                    <div className="col-xl-7 order-xl-first col-md-12 order-md-last col-sm-12 col-12 order-mb-last spaceTop-md spaceTop-sm" />
                    <TablePageComponent tableDataInput={tableInput} tableDataInputSmall={tableInputSmall} />
                </div>
                <RedUISpinner UIConfStats={spinnerState} />
            </main>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        list: state.RequestsStats.hasOwnProperty("allList")?state.RequestsStats.allList:  List([{ requester: ' ', date: ' ', status: 'Open',address:'' }])
    };
}

export default connect(mapStateToProps, (dispatch) => {
    console.log("Request: inside Request managerLanding page.");
    
    return {
        handleSubmit: (dummyUserObj: any) => {
            dispatch(slickStateAction(dummyUserObj));
        },
        handleClicks(selectedItem: any) {
            const dummyUserObj = { type: UserOps.LISTALL_REQUESTS, data: selectedItem };
            dispatch(listAllRequestAction(dummyUserObj));
        },
        switchView(payload:any) {
            dispatch(showIndividualRequestsAction(payload));
        },
        handleStatusSubmit(payload: any) {
            dispatch(RequestsUpdateInPrgAction(payload));
        },

    }
})(RequestManagerLandingPage);

interface IRequestManagerLandingPage extends React.FC<any> {
    errorMessage: any;
    handleClicks: any;
    handleSubmit: any;
    list: any;
    history: any;
    switchView:any;
    handleStatusSubmit?:any;
}
