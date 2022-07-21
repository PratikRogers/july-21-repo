/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
const PerfectScrollbar = require('../AudienceBuilder/thirdparty/perfect-scrollbar.js');

class CustomDropDown extends React.Component<ICustomDropDown, {}> {
  public state: any;
   constructor(props: any) {
    super(props);
    this.selectDDListItem = this.selectDDListItem.bind(this)
  }

  selectDDListItem(value:any,e:any) {
    this.props.selectDDListItem(value);
  }
  scrollRefComp(ref: any) {
    if (ref)
      new PerfectScrollbar(ref, {
        suppressScrollX: true,
        suppressScrollY: false
      });
  }

  render() {
    const innerDDClass = this.props.ddList.hasOwnProperty("scrollableDDclass") ? this.props.ddList.scrollableDDclass :"scrollableDropdown ";
    return (
          <div className="dropdown customDropdown show float-left mr-3 pl-1">
            <a
              className={this.props.uiClasses +" pl-0 dropdownToggle text-uppercase"}
              href="javascript:void(0);"
              role="button"
              id="dropdownDataSource"
              data-toggle={this.props.ddList.toggle}
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.selectedItem()}
              <i className="dropdownToggleIcon float-right" />
            </a>
             <div className={this.props.uiClasses +" dropdown-menu "} aria-labelledby="dropdownDataSource">
             <div className={innerDDClass} ref={this.scrollRefComp}>

            {this.props.ddList.list.map((item: any, i: any) => {
              return (
                <a
                  className="dropdown-item text-uppercase"
                  href="javascript:void(0);"
                  onClick={this.selectDDListItem.bind(this,item)}
                  key={i}
                >
                  <span>{item.title} </span>
                </a>
              );
            })}
          </div>
        </div>
          </div>
         
 
      );
  }
}

function mapStateToProps(state: any) {
  return {
     
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {};
  }
)(CustomDropDown);

interface ICustomDropDown extends React.FC<any> {
  uiClasses:String;
  ddList:any;
  selectDDListItem:any;
  selectedItem:any;
  history?: any;
}
