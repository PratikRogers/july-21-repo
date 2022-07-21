import React, { useState } from "react";
import { connect } from "react-redux";
import { slickStateAction, saveDomoQuery } from "src/Actions";
import ErrorAlertBanner from "src/CommonComponent/ErrorAlertBanner";
import MessageBox from "src/CommonComponent/MessageBox";
import { Configs, NavBarConstants } from "src/ConstConfig";
import { isEmptyOrSpaces } from "src/Utility/CampaignUtil";

import { clearAllErrorStateInDomoAPIConfig } from "../utils/dashboardValidation";
const DomoQueryOps: React.FC<IDomoQueryOps> = (props) => {
  const [queryID, setQueryID] = useState<string>(props.editDomoQuery.queryID);
  const [datasetId, setDatasetId] = useState<string>(
    props.editDomoQuery.dataSetId
  );
  const [errorStateCheck, setErrorStateCheck] = useState(
    clearAllErrorStateInDomoAPIConfig()
  );
  const refArr: any[] = [];
  const [userText, setUserText] = useState<string>(
    props.editDomoQuery?.domoQuery
  );
  const config = new Configs();

  function saveUserData() {
    const orgErrState = clearAllErrorStateInDomoAPIConfig();
    if (queryID != "" && datasetId != "" && userText != "") {
      const payload = {
        data: {
          url: config.getDomoQueryUrl(),
          payload: {
            queryId: queryID,
            dataSetId: datasetId,
            domoQuery: userText,
          },
        },
      };
      if (props.editDomoQuery) {
        payload.data.payload["id"] = props.editDomoQuery.id;
      }
      props.handleSave(payload);
      const comp = refArr[0];
      if (comp) {
        comp.click();
      }
    } else {
      if (isEmptyOrSpaces(queryID)) {
        orgErrState.domoQueryID.show = true;
      }
      if (isEmptyOrSpaces(datasetId)) {
        orgErrState.domoDataSetId.show = true;
      }
      if (isEmptyOrSpaces(userText)) {
        orgErrState.domoQuery.show = true;
      }
      setErrorStateCheck({ ...orgErrState });
    }
  }

  function saveUserText(e: any) {
    setUserText(e.target.value);
  }

  function saveQueryID(e: any) {
    setQueryID(e.target.value);
  }
  function saveDatasetID(e: any) {
    setDatasetId(e.target.value);
  }

  function loadAdminPage() {
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK,
    };
    props.handleSlick(dummyUserObj);
    props.history.push("/DomoQueryManagement");
  }

  function focusText(ref: any) {
    const refComponent = ref;
    refArr.push(refComponent);
  }

  return (
    <main role="main" className="container-fluid">
      <div className="row fixed-header-top ml-0 mr-0">
        <div className="col-12">
          <div className="float-left w-100 spacerB36  borderBottomGray">
            <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
              <h3 className="float-left">Add/Edit Domo Query</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row-flex spaceTop">
        <div className="w-100">
          <form className="template">
            <div className="col-xl-3 col-md-6 col-sm-8 col-12">
              <div className="form-group leftPos">
                <label htmlFor="formQueryID">QUERY ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="formQueryID"
                  placeholder="Type query id here"
                  onChange={saveQueryID}
                  value={queryID}
                />
                <ErrorAlertBanner
                  errorMessageStruct={errorStateCheck.domoQueryID}
                />
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-8 col-12">
              <div className="form-group leftPos">
                <label htmlFor="formDataSetID">DATASET ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="formDataSetID"
                  placeholder="Type dataset id here"
                  onChange={saveDatasetID}
                  value={datasetId}
                />
                <ErrorAlertBanner
                  errorMessageStruct={errorStateCheck.domoDataSetId}
                />
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-8 col-12">
              <div className="form-group leftPos">
                <label htmlFor="formDescription">QUERY</label>
                <textarea
                  className="form-control txtAreaBorder"
                  onChange={saveUserText}
                  value={userText}
                  placeholder="Type query here"
                />
                <ErrorAlertBanner
                  errorMessageStruct={errorStateCheck.domoQuery}
                />
              </div>
            </div>
            <div className="col-12 buttonPanel spaceBottom">
              <div className="borderBottomGray spaceBottom48" />
              <a
                className="btn btnPrimary"
                href="javascript:void(0);"
                role="button"
                onClick={saveUserData}
              >
                Save
              </a>
              <a
                className=""
                href="javascript:void(0)"
                role="button"
                data-toggle="modal"
                data-target="#messageBoxGeneric"
                data-backdrop="static"
                ref={(node) => focusText(node)}
              />
              <a
                className="btn btnPrimary float-right"
                href="javascript:void(0);"
                role="button"
                onClick={loadAdminPage}
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
      <MessageBox handleUserAction={loadAdminPage} />
    </main>
  );
};

function mapStateToProps(state: any, props: any) {
  return {
    editDomoQuery: state.AdminDomoQueryEditState?.data
      ? state.AdminDomoQueryEditState.data
      : { queryID: "", dataSetId: "", domoQuery: "" },
    errorMessage: props.errorMessage,
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    handleSlick(payload: any) {
      dispatch(slickStateAction(payload));
    },
    handleSave(payload: any) {
      dispatch(saveDomoQuery(payload));
    },
  };
})(DomoQueryOps);

interface IDomoQueryOps extends React.FC<any> {
  editDomoQuery?: any;
  errorMessage?: any;
  handleSlick?: any;
  handleLoadDomoConfig?: any;
  handleSave?: any;
  history: any;
}
