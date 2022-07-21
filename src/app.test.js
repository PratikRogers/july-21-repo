/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { mount } from "./setupTests";
import PropTypes from 'prop-types'; // ES6
import fetchMock from 'fetch-mock';
// import thunk from 'redux-thunk';
import * as actions from "./Actions";
import { List } from 'immutable';
import CRMUploaderFormComponent from './CRMUploader/Component/CRMUploaderFormComponent';
// import AxiosClient from './rogersframework/ClientServices/AxiosClient';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { IntlProvider, addLocaleData } from "react-intl";


const mockStore = configureMockStore();
const store = mockStore();
it('renders without crashing', () => {
  const wrapper = shallow((
    <Provider store={store}>
      <CRMUploaderFormComponent />
    </Provider>
  ));
  expect(wrapper.find(CRMUploaderFormComponent)).to.have.length(1)
});


describe('CRMUploader Operation Form', () => {
  it('renders User creation form', () => {
    const store1 = mockStore({
      showErrorBoxState: { errorMessage: {} },
      CRMSMessagetate: { data: { isUpldComp: false, msg: "" } },
      configState: { Dialog: { MessageBox: { isVisible: false, UserMessage: "", saveFailed: false } } },
      CRMSListState: List([]),
      ProgressCRMState: { data: { loaded: 1, total: 1 } },
      SpinnerState: { UIConfig: {} }
    });
    let props = {
      history: { action: "Pull" }
    }


    const resetWrapper = mount(
      <Provider store={store1}>
        <CRMUploaderFormComponent store={store1} {...props} />
      </Provider>
    );
    // console.log(resetWrapper.debug());
    expect(resetWrapper.find('[htmlFor="formName"]')).to.have.lengthOf(2);
    // expect(resetWrapper.find('#formName')).to.have.lengthOf(2);

  });
});


describe('CRMUploader API validation', () => {
  it('test API', () => {
    var mock = new MockAdapter(axios);
    let data = [{ "logId": 163, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "CRMfileTestCRM_11-11-2019_14_31_38_Sachin.Tawniya@rci.rogers.ca.csv", "creationTs": "11-11-2019 14:31:38", "fileStatus": "FILE_PROCESSED", "updateTs": "11-11-2019 14:31:38", "origFileName": "TestCRM.xlsx", "fileSize": 9438, "hashCount": 32 }, { "logId": 41, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "CRMfiletestfile_19-09-2019_15_36_10_Sachin.Tawniya@rci.rogers.ca.csv", "creationTs": "09-19-2019 15:36:10", "fileStatus": "FILE_PROCESSED", "updateTs": "09-19-2019 15:43:20", "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 29, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "test_500MB_06-09-2019_13_14_53_Sachin.Tawniya@rci.rogers.ca.csv", "creationTs": "09-06-2019 13:14:53", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 28, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "test_500MB_05-09-2019_16_12_30_Sachin.Tawniya@rci.rogers.ca.csv", "creationTs": "09-05-2019 16:12:30", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 17, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "test_500MB.csv", "creationTs": "08-30-2019 15:56:19", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 16, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "test_500MB.csv", "creationTs": "08-29-2019 16:00:11", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 9, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "test_500MB.csv", "creationTs": "08-08-2019 16:37:00", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 4, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "TestCrm_ls500MB.csv", "creationTs": "08-07-2019 15:46:49", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }, { "logId": 3, "advertiserName": "Sachin.Tawniya@rci.rogers.ca", "fileName": "TestCrm_ls500MB.csv", "creationTs": "08-07-2019 15:41:01", "fileStatus": null, "updateTs": null, "origFileName": null, "fileSize": null, "hashCount": null }];
    mock.onGet("/app/data/getCrmDetails").reply(200, data);
 
 
    const reqObject = { authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkQ5LWh2cFM2Vml4NlktRGpwR2ZBNEhFaTdFUSIsImtpZCI6IkQ5LWh2cFM2Vml4NlktRGpwR2ZBNEhFaTdFUSJ9" }
   
    const store1 = mockStore({
      showErrorBoxState: { errorMessage: {} },
      CRMSMessagetate: { data: { isUpldComp: false, msg: "" } },
      configState: { Dialog: { MessageBox: { isVisible: false, UserMessage: "", saveFailed: false } } },
      CRMSListState: {CRMSList:List(data)},
      ProgressCRMState: { data: { loaded: 1, total: 1 } },
      SpinnerState: { UIConfig: {} }
    });

    const clnt = new AxiosClient(store1);
    clnt.getResponse("/app/data/getCrmDetails", reqObject).then((returnVal) => {
      
      store1.CRMSListState={CRMSList:returnVal}
     
    });
    let props = {
      history: { action: "Pull" },
    }
   
    const resetWrapper = mount(
      <Provider store={store1}  >
        <IntlProvider store={store1} locale={'en'}>
        <CRMUploaderFormComponent store={store1}  {...props} />
        </IntlProvider>
      </Provider>
    );
    // console.log(resetWrapper.debug());
    expect(resetWrapper.find('[htmlFor="formName"]')).to.have.lengthOf(2);
    expect(resetWrapper.find('[name="search"]')).to.have.lengthOf(2);
    console.log(resetWrapper.find('[name="search"]').debug());


    const rows = resetWrapper.find('.table-striped')
    expect(rows.length).to.eql(2)
    const firstRowColumns = rows.first().find('td').map(column => column.text());
    // console.log("First row",firstRowColumns);
    expect(firstRowColumns[2]).to.eql("TestCRM.xlsx");
  });
});

describe('Run the actions', () => {
  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('/todos', {
      body: { todos: ['do something'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: "INCREMENT" },
      { type: "ToDoSuccess", body: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })

    store.dispatch(actions.incrementcounter());
    store.dispatch(actions.setInitializing());
    let action = store.getActions();
    expect(action[0].type).to.equal("INCREMENT")
  })

});