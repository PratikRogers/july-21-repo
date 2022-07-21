/* eslint-disable */
import * as React from 'react';
import { connect } from "react-redux";
import {
  slickStateAction,
  getCoreConfiguration,
  sendSaveCoreConfiguration,
} from "../../Actions";
import MessageBox from "../../CommonComponent/MessageBox";
import { Configs, NavBarConstants } from "../../ConstConfig";
// import ErrorAlertBanner from '../../CommonComponent/ErrorAlertBanner';
import "../../CSS/perfect-scrollbar.css";
import { clearAllErrorStateReportingTrait } from "../utils/dashboardValidation";
// import PerfectScrollbar from "../../AudienceBuilder/thirdparty/perfect-scrollbar.js";
 
const update = require("react-addons-update");

class CoreSettingOps extends React.Component<ICoreSettingOps, {}> {
  public state: any;
  private refArr: any;
  private accordianRef: any;
  private configs: any;
  constructor(props: any) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.loadAdminPage = this.loadAdminPage.bind(this);
    this.saveConfiguration = this.saveConfiguration.bind(this);
    this.accordianRef = [];
    this.configs = new Configs();

    this.refArr = [];
    this.state = {
      coreConfigData: this.props.coreConfigData,
      errorStateCheck: {},
      restoreDefaultCls: " ",
    };
    this.state.errorStateCheck = clearAllErrorStateReportingTrait();
  }

  componentDidMount() {
    this.state.coreConfigData = this.props.coreConfigData;
  }
 

  public goBack() {
    this.props.history.push("/AdminLandingPage");
  }

  public onInputChange(
    subCatListIndex: any,
    subCatIndex: any,
    cardIndex: any,
    e: any
  ) {
    this.state.coreConfigData.configuration[cardIndex].subcategorylist[
      subCatIndex
    ].listItems = this.state.coreConfigData.configuration[cardIndex].subcategorylist[
      subCatIndex
    ].listItems.map((x: any) => ({ ...x, isSelected: false }));
    this.state.coreConfigData.configuration[cardIndex].subcategorylist[subCatIndex].listItems[
      subCatListIndex
    ].isSelected = true;
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public onUrlChange(
    subCatListIndex: any,
    subCatIndex: any,
    cardIndex: any,
    e: any
  ) {
    this.state.coreConfigData.configuration[cardIndex].subcategorylist[subCatIndex].listItems[
      subCatListIndex
    ].adminProvidedVal = e.target.value;
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  getTextWidget(
    isDisplay: boolean,
    subCatListIndex: any,
    subCatIndex: any,
    cardIndex: any
  ) {
    if (isDisplay) {
      if (
        this.state.coreConfigData.configuration[cardIndex].subcategorylist[
          subCatIndex
        ].listItems[subCatListIndex].hasOwnProperty("clientAction")
      ) {
        if (
          this.state.coreConfigData.configuration[cardIndex].subcategorylist[
            subCatIndex
          ].listItems[subCatListIndex].clientAction.input.toUpperCase() ==
          "TEXTBOX"
        ) {
          const urlValue = this.state.coreConfigData.configuration[cardIndex].subcategorylist[
            subCatIndex
          ].listItems[subCatListIndex].adminProvidedVal;
          return (
            <form className="template">
              <div className="col-xl-8 col-md-6 col-sm-8 col-12">
                <div className="form-group leftPos">
                  <label htmlFor="formUrl">ENTER URL</label>
                  <input
                    type="text"
                    className="form-control spaceBottom"
                    id="formUrl"
                    placeholder="Type Url here"
                    onChange={this.onUrlChange.bind(
                      this,
                      subCatListIndex,
                      subCatIndex,
                      cardIndex
                    )}
                    value={urlValue}
                  />
                
                </div>
              </div>
            </form>
          );
        }
      }
    }
    return null;
  }

  public saveConfiguration() {
    const comp = this.refArr[0];
    if (comp) {
      comp.click();
    }
    let payload = JSON.parse(JSON.stringify({
      data: {
        url: this.configs.getCoreConfiguration(),
        payload: this.state.coreConfigData,
      },
    }));
    this.props.handleUserEntryUpdateAction(payload);
    this.setState(
      update(this.state, {
        state: {
          $set: this.state,
        },
      })
    );
  }

  public loadAdminPage() {
    const dummyUserObj = {
      UserAction: "SlickPosition",
      selectedTab: NavBarConstants.ADMINSLICK,
      slickIdx: NavBarConstants.ADMINSLICK,
    };
    this.props.handleSubmit(dummyUserObj);
    this.props.history.push("/AdminLandingPage");
  }

  public focusText(ref: any) {
    this.refArr.push(ref);
  }

  public focusAccordian(title: any, tabIndex: any, ref: any) {
    let refComponent = {
      titleIndex: title,
      catTabIndex: tabIndex,
      reference: ref,
      matchString: title + tabIndex,
    };
    const index = this.accordianRef.findIndex(
      (obj: any) => obj.matchString == title + tabIndex
    );
    if (index < 0) {
      this.accordianRef.push(refComponent);
    }
  }

  scrollRefComp(ref: any) {
    if (ref) {
      // new PerfectScrollbar(ref, {
      //   suppressScrollX: true,
      //   suppressScrollY: false,
      // });
    }
  }

  toggleAccordian(card: any, cardTabType: any, listLen: any, e: any) {
    const userIndx = this.accordianRef.findIndex(
      (obj: any) => obj.matchString === card.subcategorytitle + cardTabType
    );
    if (userIndx >= 0) {
      const component = this.accordianRef[userIndx].reference;
      var panel = component.nextElementSibling;
      console.log(
        " Compo class",
        component.className,
        " and real class on object is#" + e.target.className + "#",
        "Panel height",
        panel.style.maxHeight
      );
      component.className = " accordion aTraits active ";

      if (
        e.target.className == "accordion aTraits empCl" &&
        panel.style.maxHeight
      ) {
        e.target.nextElementSibling.style.maxHeight = 38 * listLen + "px";
        component.className = e.target.className = " accordion aTraits active ";
        this.accordianRef[userIndx].reference = e.target;
      } else if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        component.className = e.target.className = " accordion aTraits ";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        e.target.className = " accordion aTraits active ";
      }
    }
  }

  public render() {
    if(this.state.coreConfigData.hasOwnProperty("configuration") && this.state.coreConfigData.configuration) {
      try{
        this.state.coreConfigData.configuration = JSON.parse(this.state.coreConfigData.configuration)
      } catch(e) {
console.log("its already Json");
      }
    }
    let segmentIntCls = "col-xl-12 col-md-4 col-12 pl-0 pr-0 spaceBottom10";
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <div className="float-left w-100 spacerB36  borderBottomGray">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h3 className="float-left">Configuration Settings</h3>
              </div>
            </div>
          </div>
        </div>
        {(this.state.coreConfigData && this.state.coreConfigData.configuration instanceof Array && this.state.coreConfigData.configuration.length > 0) ?
        <div className="row-flex spaceTop">
          <div className="w-100">
            <form>
              <div
                className={
                  this.state.restoreDefaultCls +
                  " audienceTraitsTabContent col-xl-8 col-md-12 col-sm-12 col-8 spaceBottom"
                }
                id="audienceTraitsTabContent"
                ref={this.scrollRefComp}
              >
                <div className="audienceTraits row-flex">
                  {this.state.coreConfigData.configuration.map(
                    (card: any, cardIndex: any) => {
                      return (
                        <div key={"pDiv" + cardIndex} className={segmentIntCls}>
                          <div key={cardIndex}>
                            <h4>
                              <span
                                className={card.cls}
                                key={"cls" + card.cls}
                              />
                              <span key={"title" + card.title}>
                                {card.title}
                              </span>
                            </h4>
                            {card.subcategorylist.map(
                              (subCat: any, subCatIndex: any) => {
                                return (
                                  <div
                                    key={"span" + subCat.subcategorytitle}
                                    className="spaceBottom10"
                                  >
                                    <a
                                      className="accordion aTraits empCl"
                                      ref={this.focusAccordian.bind(
                                        this,
                                        subCat.subcategorytitle,
                                        card.Tabtype
                                      )}
                                      onClick={this.toggleAccordian.bind(
                                        this,
                                        subCat,
                                        card.Tabtype,
                                        subCat.listItems.length
                                      )}
                                    >
                                      {subCat.subcategorytitle}
                                    </a>
                                    <div
                                      className="panel"
                                      ref={this.scrollRefComp}
                                    >
                                      <div className="card-body">
                                        <ul>
                                          {subCat.listItems.map(
                                            (
                                              subCatItem: any,
                                              subCatListIndex: any
                                            ) => {
                                              return (
                                                <li
                                                  key={"li" + subCatItem.title}
                                                >
                                                  <input
                                                    type="radio"
                                                    checked={
                                                      subCatItem.isSelected
                                                    }
                                                    onChange={this.onInputChange.bind(
                                                      this,
                                                      subCatListIndex,
                                                      subCatIndex,
                                                      cardIndex
                                                    )}
                                                    key={
                                                      subCatListIndex +
                                                      subCatItem.title +
                                                      subCat.subcategorytitle
                                                    }
                                                    id={
                                                      "chkBox" +
                                                      subCatItem.title +
                                                      subCat.subcategorytitle
                                                    }
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "chkBox" +
                                                      subCatItem.title +
                                                      subCat.subcategorytitle
                                                    }
                                                    key={
                                                      "Key" + subCatItem.title
                                                    }
                                                    className="margLeft"
                                                  >
                                                    {"   "}
                                                    {subCatItem.title}
                                                  </label>
                                                  {this.getTextWidget(
                                                    subCatItem.isSelected,
                                                    subCatListIndex,
                                                    subCatIndex,
                                                    cardIndex
                                                  )}
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="col-12 buttonPanel spaceBottom float-left">
                <div className="borderBottomGray spaceBottom48" />
                <a
                  className="btn btnPrimary"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.saveConfiguration}
                >
                  Save
                </a>
               
                <a
                  className="btn btnPrimary float-right"
                  href="javascript:void(0);"
                  role="button"
                  onClick={this.loadAdminPage}
                >
                  {" "}
                  Cancel{" "}
                </a>
              </div>
            </form>
          </div>
        </div>
        :
        <div className="col-12">
            <div className="float-left w-100 spacerB36 ">
              <div className="col-xl-7 col-md-12 col-sm-12 col-12 pl-0 pr-0">
                <h4 className="float-left">Unable to fetch configuration from server, please try later...</h4>
              </div>
            </div>
          </div>
  }
        <a
          className=""
          href="javascript:void(0)"
          role="button"
          data-toggle="modal"
          data-target="#messageBoxGeneric"
          data-backdrop="static"
          ref={(node) => this.focusText(node)}
        />
        <MessageBox handleUserAction={this.loadAdminPage} />
      </main>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  return {
    errorMessage: props.errorMessage,
    coreConfigData: state.AdminCoreConfigListState.hasOwnProperty("data")
      ? state.AdminCoreConfigListState.data
      : [],
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => {
    return {
      handleUserEntryUpdateAction(payload: any) {
        dispatch(sendSaveCoreConfiguration(payload));
      },
      handleSubmit(payload: any) {
        dispatch(slickStateAction(payload));
      },
      getCoreConfig: (dummyUserObj: any) => {
        dispatch(getCoreConfiguration(dummyUserObj));
      },
    };
  }
)(CoreSettingOps);

interface ICoreSettingOps extends React.FC<any> {
  errorMessage: any;
  handleUserEntryUpdateAction?: any;
  currentReportingStatus: any;
  handleSubmit: any;
  getCoreConfig: any;
  usrSelectedDates: any;
  coreConfigData: any;
  history: any;
}
