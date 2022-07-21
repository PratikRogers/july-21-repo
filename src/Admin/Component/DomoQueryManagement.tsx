import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Configs } from "../../ConstConfig";
import { ConstAction } from "../../ConstConfig/ConstAction";
import ConfirmDialog from "../../CommonComponent/ConfirmDialog";
import Logger from "../../rogersframework/Logger/Logger";
import "../../CSS/Audiences.css";
import { List } from "immutable";
import Pagination from "../../CommonComponent/Pagination/Pagination";
import { PageModel } from "../../CommonModels/PageModel";
import TableComponent from "../../CommonComponent/Table/TableComponent";
import MessageBox from "../../CommonComponent/MessageBox";
import {
  submitUIConfigAction,
  editDomoQuery,
  deleteDomoQuery,
  getAllDomoQueires,
} from "src/Actions";

const DomoQueryManagement: React.FC<IDomoQueryManagement> = (props) => {
  let tableProps: any = null;
  const [sortedColumn] = useState<string>("queryID");
  let pageObject: any = new PageModel(null);
  const MAX_ROWSIZE: number = 25;
  const configs: any = new Configs();

  useEffect(() => {
    const domoQueryObj = { data: { url: configs.getDomoQueryUrl() } };
    props.loadAll(domoQueryObj);
  }, []);

  function customSerachPanel(props: any) {
    tableProps = props;
    function search(e: any) {
      props.search(e.target.value);
    }

    return (
      <div className="row-flex">
        <div className="col-md-6 pl-0 spaceTopTraits spaceTopTraitsmd  spaceTopTraitssmall spaceTopTraitsmob spaceBottom mb-3 order-mb-last">
          <div className="col-xl-4 col-md-8 col-sm-12 col-12 pl-0 pr-0 searchPanel order-mb-1">
            <input
              type="text"
              placeholder="Search"
              name="search"
              onChange={search}
            />
            <button className="" type="submit" onClick={search}>
              <i className="searchBtnInactive float-right" />
            </button>
            <input type="button" className="hid" onClick={search} />
          </div>
        </div>
        <div className="col-md-6 pr-0 pl-0 spaceTop spaceBottom spacerBottom0 order-mb-0">
          <a
            className="btn btnPrimary float-xl-right float-md-right"
            href="javascript:void(0);"
            role="button"
            onClick={createNewOrder}
          >
            Create New
          </a>
        </div>
      </div>
    );
  }

  function changeCaret(order: any, column: any) {}
  function getAllColView(cell: any, row: any, enumObject: any, index: any) {
    return (
      <div className="listA">
        <div className="row-flex">
          <div className="col-md-4 pl-0 pr-0">
            <span>Query Id: </span>
            <span> {row.queryID} </span>
          </div>
          <div className="col-md-4 pl-0 pr-0">
            <span>DataSet ID: </span>
            <span> {row.dataSetId}</span>
          </div>
          <div className="col-md-12 mt-4 pl-0 pr-0 smallBtnPanel">
            <a
              className="btn btnSmall-secondary mr-lg-2"
              href="javascript:void(0);"
              role="button"
              onClick={handleSubmit(row, ConstAction.EDIT, 0, null)}
            >
              EDIT
            </a>
            <a
              className="btn btnSmall-primary"
              href="javascript:void(0);"
              role="button"
              data-toggle="modal"
              data-target="#deleteAudienceModal"
              data-backdrop="static"
              onClick={handleSubmit(row, ConstAction.DELETE, 0, null)}
            >
              {" "}
              DELETE
            </a>
          </div>
        </div>
      </div>
    );
  }

  function getSortedStyle(
    cell: any,
    row: any,
    formatExtraData: any,
    index: any
  ) {
    const style = formatExtraData === sortedColumn ? " boldText " : "";
    const val = cell ? cell.toString() : "";
    return <span className={style}>{val}</span>;
  }

  function initTabSwitch() {
    props.history.push("/DomoQueryOps");
  }

  function createNewOrder() {
    props.editDomoQuery({ data: null });
    initTabSwitch();
  }

  const handleSubmit = (rowContent: any, action: any, index: any, evt: any) => (
    e: any
  ) => {
    const url = configs.getDomoQueryUrl() + "/" + rowContent.id;
    switch (action) {
      case ConstAction.DELETE:
        rowContent["deleteInvokedBy"] = "";
        props.handleDialogSubmitAction(
          true,
          { data: { url: url, allRecordAPI: configs.getDomoQueryUrl() } },
          rowContent.queryID
        );
        break;
      case ConstAction.EDIT:
        props.editDomoQuery({ data: rowContent });
        initTabSwitch();
        break;
      default:
        break;
    }
    Logger.getInstance().printDebugLogs("Handle");
  };

  function getActionControls(
    cell: any,
    row: any,
    formatExtraData: any,
    index: any
  ) {
    return (
      <span>
        <a
          className="btn btnSmall-secondary mr-lg-2"
          href="javascript:void(0);"
          role="button"
          onClick={handleSubmit(row, ConstAction.EDIT, 0, null)}
        >
          EDIT
        </a>
        <a
          className="btn btnSmall-primary"
          href="javascript:void(0);"
          role="button"
          data-toggle="modal"
          data-target="#deleteAudienceModal"
          data-backdrop="static"
          onClick={handleSubmit(row, ConstAction.DELETE, 0, null)}
        >
          {" "}
          DELETE
        </a>
      </span>
    );
  }

  function createCustomToolBar(props: any) {
    return (
      <div className="col-12 pl-15 pr-15">{props.components.searchPanel}</div>
    );
  }
  function customSortStyle(order: any, dataField: any) {
    if ((order && order === "desc") || order === "asc") {
      // setSortedColumn(dataField);
      return "boldText";
    }
    return "";
  }

  /*pagination Starts */
  function updatePageModel(payload: any) {
    pageObject = payload;
  }

  function handleDelete(payload: any) {
    props.handleDelete(payload);
  }

  function renderPaginationPanel(props: any) {
    return (
      <Pagination
        paginationProps={props}
        pageObject={pageObject}
        updatePaginationModel={updatePageModel}
        userOps={props.lastUserOps}
        tableProps={tableProps}
      />
    );
  }
  /*Pagination Ends */
  const tableInput = {
    tableContent: props.DomoQueryDataList,
    tableContents: [
      {
        dataField: "queryID",
        dataSort: true,
        changeCaret: changeCaret,
        dataFormatMethod: getSortedStyle,
        formatExtraData: "queryID",
        customSortStyle: customSortStyle,
        searchable: true,
        Title: "Query ID",
        hidden: false,
        isKey: true,
      },
      {
        dataField: "dataSetId",
        dataSort: true,
        changeCaret: changeCaret,
        dataFormatMethod: getSortedStyle,
        formatExtraData: "dataSetId",
        customSortStyle: customSortStyle,
        searchable: true,
        Title: "Dataset ID",
        hidden: false,
        isKey: false,
      },
      {
        dataField: "",
        dataSort: false,
        changeCaret: false,
        dataFormatMethod: getActionControls,
        formatExtraData: "",
        customSortStyle: false,
        className: false,
        columnClassName: false,
        searchable: false,
        tdStyle: {},
        Title: "Actions",
        hidden: false,
        isKey: false,
      },
    ],
    pagination: true,
    search: true,
    tableOptions: {
      hidePageListOnlyOnePage: true,
      hideSizePerPage: true,
      sizePerPage: MAX_ROWSIZE, // which size per page you want to locate as default
      defaultSortName: "queryID",
      defaultSortOrder: "asc",
      searchPosition: "left",
      renderPaginationPanel: renderPaginationPanel,
      customSerachPanel: customSerachPanel,
      createCustomToolBar: createCustomToolBar,
    },
    bordered: false,
    multiColumnSearch: false,
  };
  const tableInputSmall = {
    tableContent: props.DomoQueryDataList,
    tableContents: [
      {
        dataField: "queryID",
        dataSort: true,
        changeCaret: changeCaret,
        dataFormatMethod: getAllColView,
        formatExtraData: "queryID",
        customSortStyle: customSortStyle,
        searchable: false,
        Title: "Query ID",
        hidden: false,
        isKey: true,
      },
    ],
    pagination: true,
    search: true,
    tableOptions: {
      hidePageListOnlyOnePage: true,
      hideSizePerPage: true,
      sizePerPage: MAX_ROWSIZE, // which size per page you want to locate as default
      defaultSortName: "queryID",
      defaultSortOrder: "asc",
      searchPosition: "left",
      renderPaginationPanel: renderPaginationPanel,
      customSerachPanel: customSerachPanel,
      createCustomToolBar: createCustomToolBar,
    },
    bordered: false,
    multiColumnSearch: false,
  };

  return (
    <main role="main" className="container-fluid">
      <div className="row fixed-header-top ml-0 mr-0">
        <div className="col-12">
          <h3>Domo Query Management</h3>
          <div className="d-desk-block d-ipad-none d-mb-none table-responsive-xl tableRedui">
            <TableComponent tableInput={tableInput} />
            <div className="hSpacer20" />
            <div className="hSpacer20" />
            <div className="hSpacer20" />
          </div>
          <div className="d-desk-none d-ipad-block d-mb-block iPadLandscape-block">
            <TableComponent tableInput={tableInputSmall} />
            <div className="hSpacer20" />
            <div className="hSpacer20" />
            <div className="hSpacer20" />
            <div className="hSpacer20" />
          </div>
        </div>
      </div>
      <ConfirmDialog handleUserAction={handleDelete} />
      <MessageBox />
    </main>
  );
};

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage,
    DomoQueryDataList: state.AdminDomoQueryListState.hasOwnProperty("data")
      ? state.AdminDomoQueryListState.data
      : List([]),
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    loadAll(payload: any) {
      dispatch(getAllDomoQueires(payload));
    },
    handleDelete: (dummyUserObj: any) => {
      dispatch(deleteDomoQuery(dummyUserObj));
    },
    handleDialogSubmitAction: (
      show: boolean,
      rowContent: any,
      queryId: any
    ) => {
      const payload = {
        Dialog: {
          isVisible: show,
          content: rowContent,
          Message: "Are you sure you want to delete this query with " + queryId,
        },
      };
      dispatch(submitUIConfigAction(payload));
    },
    editDomoQuery(payload: any) {
      dispatch(editDomoQuery(payload));
    },
  };
})(DomoQueryManagement);

interface IDomoQueryManagement extends React.FC<any> {
  handleChange: any;
  lastUserOps?: any;
  loadAll?: any;
  DomoQueryDataList?: any;
  handleDialogSubmitAction?: any;
  handleDelete?: any;
  editDomoQuery?: any;
  history: any;
}
