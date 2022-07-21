import React, { useState } from "react";
import { connect } from "react-redux";
import { slickStateAction, sendSaveDomoConfiguration } from "src/Actions";
import ErrorAlertBanner from "src/CommonComponent/ErrorAlertBanner";
import MessageBox from "src/CommonComponent/MessageBox";
import { Configs, NavBarConstants } from "src/ConstConfig";
import { isEmptyOrSpaces } from "src/Utility/CampaignUtil";
import { clearAllErrorStateInDomoAPIConfig } from "../utils/dashboardValidation";
const DomoConfigManagement: React.FC<IDomoConfigManagement> = (props) => {
  const [clientKey, setClientKey] = useState<string>(
    props.editDomoConfigStat.clientKey
  );
  const [clientSecret, setClientSecret] = useState<string>("");
  const [errorStateCheck, setErrorStateCheck] = useState(
    clearAllErrorStateInDomoAPIConfig()
  );
  const refArr: any[] = [];
  const config = new Configs();
  function saveUserData() {
    const orgErrState = clearAllErrorStateInDomoAPIConfig();
    if (clientKey != "" && clientSecret != "") {
      const payload = {
        data: {
          url: config.getDomoAPIConfigUrl(),
          payload: { clientKey: clientKey, clientSecret: clientSecret },
        },
      };
      if (props.editDomoConfigStat) {
        payload.data.payload["id"] = props.editDomoConfigStat.id;
      }
      props.handleSave(payload);
      const comp = refArr[0];
      if (comp) {
        comp.click();
      }
    } else {
      if (isEmptyOrSpaces(clientKey)) {
        orgErrState.clientKey.show = true;
      }
      if (isEmptyOrSpaces(clientSecret)) {
        orgErrState.clientSecret.show = true;
      }
      setErrorStateCheck({ ...orgErrState });
    }
  }

  function saveClientKey(e: any) {
    setClientKey(e.target.value);
  }
  function saveClientSecret(e: any) {
    setClientSecret(e.target.value);
  }

  function loadAdminPage() {
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK,
    };
    props.handleSlick(dummyUserObj);
    props.history.push("/AdminLandingPage");
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
              <h3 className="float-left">Add/Edit Domo API Keys</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row-flex spaceTop">
        <div className="w-100">
          <form className="template">
            <div className="col-xl-3 col-md-6 col-sm-8 col-12">
              <div className="form-group leftPos">
                <label htmlFor="formFirstName">CLIENT ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="formFirstName"
                  placeholder="Type client id here"
                  onChange={saveClientKey}
                  value={clientKey}
                />
                <ErrorAlertBanner
                  errorMessageStruct={errorStateCheck.clientKey}
                />
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-8 col-12">
              <div className="form-group leftPos">
                <label htmlFor="formLastName">CLIENT SECRET</label>
                <input
                  type="password"
                  className="form-control"
                  id="formLastName"
                  placeholder="Type client secret here"
                  onChange={saveClientSecret}
                  value={clientSecret}
                />
                <ErrorAlertBanner
                  errorMessageStruct={errorStateCheck.clientSecret}
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
    editDomoConfigStat: state.AdminDomoConfigListState.hasOwnProperty("data")
      ? state.AdminDomoConfigListState.data
      : [],
    errorMessage: props.errorMessage,
  };
}

export default connect(mapStateToProps, (dispatch) => {
  return {
    handleSlick(payload: any) {
      dispatch(slickStateAction(payload));
    },
    handleSave(payload: any) {
      dispatch(sendSaveDomoConfiguration(payload));
    },
  };
})(DomoConfigManagement);

interface IDomoConfigManagement extends React.FC<any> {
  editDomoConfigStat?: any;
  errorMessage?: any;
  handleSlick?: any;
  handleLoadDomoConfig?: any;
  handleSave?: any;
  history: any;
}
