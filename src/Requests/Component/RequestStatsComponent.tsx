/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
 const update = require('react-addons-update');

class RequestStatsComponent extends React.Component<IRequestStatsComponent, {}> {
    private dropDownOptions: any;
    public state: any;
    public dropDown: any;
    constructor(props: any) {
        super(props);
        this.getDrpDnClass = this.getDrpDnClass.bind(this);
        this.getUserSelecctedItem = this.getUserSelecctedItem.bind(this);
        this.changeUserSelection = this.changeUserSelection.bind(this);
        this.state = { selection:"" };
         
    }
 

    getDrpDnClass(dropDowntItem: any) {
        if (this.state.selection  == dropDowntItem) {
            return 'currentSelectedDrpDn dropdown-item ';
        } else {
            return 'dropdown-item';
        }
    }

    changeUserSelection(userSelection: any) {
        this.dropDownOptions.searchItem(userSelection);
        this.state.selection = userSelection;
        this.setState(
            update(this.state, {
                state: {
                    $set: this.state
                }
            })
        );
    }

    getUserSelecctedItem() {
        this.state.selection = this.dropDownOptions.userSelectedItem();
        // console.log("Requests found",this.state.selection);
        if(this.state.selection === "New Request" || this.state.selection === "In Progress") {
            this.state.selection = "Open";
        }
        else if(!this.state.selection) {
            this.state.selection = "";
        }
        return (
            <a className="pl-1-sm dropdownToggle"
                href="javascript:void(0);"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false" >
                {this.state.selection.toUpperCase()}
                <i className="dropdownToggleIcon float-right" />
            </a>
        );
    }

    renderCell(cell: any) {
       
        if (cell) {
            return (<a className={this.getDrpDnClass(cell)}
                href="javascript:void(0);"
                onClick={this.changeUserSelection.bind(this, cell)}
                key={"key" + cell}>
                <span key={"span" + cell}>{cell.toUpperCase()}</span>
            </a>)
        }
        return null;
    }

    public render() {
        this.dropDownOptions = {
            filterText: this.props.dropDownProp.filterText,
            searchItem: this.props.dropDownProp.searchBy,
            userSelectedItem: this.props.dropDownProp.getUserSelected,
            dropDownItemList: this.props.dropDownProp.list,
            topLevelCls: this.props.dropDownProp.topLevelCls
        }
       
            return (
                <div className="row-flex">
                    <div className={this.dropDownOptions.topLevelCls + " pl-0   order-mb-last"}>
                        <div className="row-flex selectedTraits position-relative">
                            <div className=" form-group leftPos marginDDownCustom">
                                <label htmlFor="formDescription">{this.dropDownOptions.filterText}</label>
                            </div>
                            <div className="customTopPadding dropdown customDropdown show float-left">
                                {this.getUserSelecctedItem()}
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    {this.dropDownOptions.dropDownItemList.map((cell: any, i: any) => {
                                        return (
                                            this.renderCell(cell)
                                        )
                                    })}
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

    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {

    }

})(RequestStatsComponent);

interface IRequestStatsComponent extends React.FC<any> {
    dropDownProp: any;
}
