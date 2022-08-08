/* eslint-disable */
import * as React from "react";
import { connect } from "react-redux";
import HorizontalBarChart from 'src/CommonComponent/HRBarChartComponent/HorizontalBarChart';
import TableComponent from "src/CommonComponent/Table/TableComponent";
import { List } from "immutable";

class AdminDashboard extends React.Component<IAdminDashboard, {}> {
  constructor(props: any) {
    super(props);
    this.customTitle = this.customTitle.bind(this);
  }

  customTitle(cell: any, row: any, rowIndex: any, colIndex: any) {
    return `${row.alt}`;
  }

  public render() {
    const tableInput = {
      tableContent: List(this.props.dashboardCharts.topActive),
      tableContents: [
        {
          dataField: "alt",
          dataSort: false,
          formatExtraData: "alt",
          searchable: true,
          Title: "Name",
          hidden: false,
          isKey: true,
          headerText: "",
          customTitle: this.customTitle,
          width: "120",
        },
        {
          dataField: "reportCount",
          dataSort: false,
          formatExtraData: "reportCount",
          searchable: false,
          tdStyle: {},
          Title: "Reports",
          isKey: false,
          width: "40",
        },
        {
          dataField: "campaignCount",
          dataSort: false,
          formatExtraData: "campaignCount",
          searchable: false,
          tdStyle: {},
          Title: "IOs",
          isKey: false,
          width: "40",
        },
      ],
      pagination: false,
      search: false,
      tableOptions: {
        hidePageListOnlyOnePage: true,
        hideSizePerPage: true,
        sizePerPage: 10,
        defaultSortName: "reportCount",
        defaultSortOrder: "desc",
        searchPosition: "left",
      },
      bordered: false,
      multiColumnSearch: false,
      containerClass: "react-BodyClass",
    };
    return (
      <div>
        <div className="row-flex spaceTop ">
          <div className="col-xl-4 col-md-4 col-sm-12 col-12 ">
            <div className="portlet">
              <div className="portletHead">
                <h3 className="portlet_headTitle">ACTIVE USERS</h3>
              </div>
              <div className="portletBody ">
                <HorizontalBarChart chartData={this.props.dashboardCharts.users} history={undefined} />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 col-sm-12 col-12 ">
            <div className="portlet">
              <div className="portletHead">
                <h3 className="portlet_headTitle">REPORTS DOWNLOADED</h3>
              </div>
              <div className="portletBody ">
                <HorizontalBarChart chartData={this.props.dashboardCharts.Reports} history={undefined} />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-4 col-sm-12 col-12 ">
            <div className="portlet">
              <div className="portletHead">
                <h3 className="portlet_headTitle">MOST ACTIVE (30 days)</h3>
              </div>
              <div className="portletBody  scrollable">
                <TableComponent tableInput={tableInput} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    dashboardCharts: state.DashbardChartStats.hasOwnProperty('dashboardCharts')
      ? state.DashbardChartStats.dashboardCharts
      : require("../data/bubble.json"),
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {};
})(AdminDashboard);

interface IAdminDashboard extends React.FC<any> {
  errorMessage?: any;
  history?: any;
  dashboardCharts?: any;
}
