import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// const update = require('react-addons-update');
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

class AutoCompleteInput extends Component<IAutoCompleteProps, {}> {
  private userName: any;
 
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    setUserName: PropTypes.any,
    categoryDetails: PropTypes.any,
    saveContent: PropTypes.any,
    cynchSegments:PropTypes.any,
    history: PropTypes.any,
    modalProps: PropTypes.any
  };

  static defaultProps = {
    suggestions: [{}],
    setUserName: '',
    categoryDetails: '',
    saveContent: '',
    cynchSegments: [{}],
    history: '',
        
  };
  public state: any;
  constructor(props: any) {
    super(props);
    let cynchSegments =[];
    let catID = '';
    if(this.props.modalProps != null) {
      cynchSegments = this.props.modalProps.cynchSegments
      catID= this.props.modalProps.categoryId
    }
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      saveDisabled: true,
      selectedSegments: cynchSegments,
      categoryId:catID
    };
    this.userName = "";
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.cancel = this.cancel.bind(this);
    this.selectSegment = this.selectSegment.bind(this);
 
    this.renderPlatforms = this.renderPlatforms.bind(this);
  }

    // Event fired when the input value is changed
  onChange = (e: any) => {
    const { suggestions } = this.props;
    
    const userInput = e.currentTarget.value;
  
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion: any) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    console.log("UIser asfsaf",userInput," Filter",filteredSuggestions.length);
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
      saveDisabled: true,
      selectedSegments: this.state.selectedSegments,
      categoryId:this.state.categoryId
    });
  };

  onSave() {
    this.setState({
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      saveDisabled: true,
      selectedSegments: this.state.selectedSegments,
      categoryId:this.state.categoryId

    });
    this.props.saveContent(this.state.selectedSegments);
  }



  // Event fired when the user clicks on a suggestion
  onClick = (e: any) => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      saveDisabled: false,
      selectedSegments: this.state.selectedSegments,
      categoryId:this.state.categoryId

    });
    this.userName = e.currentTarget.innerText;
    this.props.setUserName(this.userName);
  };

  // Event fired when the user presses a key down
  onKeyDown = (e: any) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        saveDisabled: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({
        activeSuggestion: activeSuggestion - 1,
        saveDisabled: true,
      });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({
        activeSuggestion: activeSuggestion + 1,
        saveDisabled: true,
      });
    }
  };

  public cancel() {
    this.setState({
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      saveDisabled: true,
      selectedSegments: this.state.selectedSegments,
      categoryId:this.state.categoryId
    });
  }



  public selectSegment(index:any,e:any) {
     if(e.target.checked) {
      this.state.selectedSegments[index].isSelected = true;
      this.state.selectedSegments[index].ownedBy = this.props.modalProps.categoryId; 
    }
    else {
      this.state.selectedSegments[index].isSelected = false;
      this.state.selectedSegments[index].ownedBy = '';
    }
 
    // this.setState(
    //   update(this.state, {
    //     selectedSegments: {$set:this.state.selectedSegments}
    //   })
    // );
    
    this.setState({
      activeSuggestion: this.state.activeSuggestion,
      filteredSuggestions: [],
      showSuggestions: this.state.showSuggestions,
      userInput: this.state.userInput,
      saveDisabled: this.state.saveDisabled,
      selectedSegments: this.state.selectedSegments,
      categoryId:this.state.categoryId

    });
    console.log("If state updated",this.selectSegment)
    // this.forceUpdate();
   }

  public renderPlatforms() {

    return this.state.selectedSegments.map((pltfrm: any, i: any) => {
      if(pltfrm.ownedBy == '' || pltfrm.ownedBy ==  this.state.categoryId)
      return (
        <div className="listA" key={uuidv4()}>
            <div key={ this.state.categoryId+"div"}
              className="col-md-12 pl-0 pr-0">
              <input
                type="checkbox"
                key={ this.state.categoryId+pltfrm.segmentName}
                id={pltfrm.segmentName}
                checked={pltfrm.isSelected}
                value={pltfrm.segmentName}
                onChange={this.selectSegment.bind(this,i)}
              />
              <label htmlFor={pltfrm.segmentName}  className="col-12">{pltfrm.segmentName}</label>
            </div>
          </div>
       );
      else return null;
    });
  }

  render() {
    if(this.props.modalProps != null) {
      this.state.selectedSegments = this.props.modalProps.cynchSegments,
      this.state.categoryId = this.props.modalProps.categoryId
     }

    // let suggestionsListComponent;
    // if (this.state.showSuggestions && this.state.userInput) {
    //   if (this.state.filteredSuggestions.length) {
    //     suggestionsListComponent = (
    //       <ul className="suggestions maxSuggesionsHeight">
    //         {this.state.filteredSuggestions.map(
    //           (suggestion: any, index: any) => {
    //             let className;

    //             // Flag the active suggestion with a class
    //             if (index === this.state.activeSuggestion) {
    //               className = "suggestion-active";
    //             }

    //             return (
    //               <li
    //                 className={className}
    //                 key={suggestion}
    //                 onClick={this.onClick}
    //               >
    //                 {suggestion}
    //               </li>
    //             );
    //           }
    //         )}
    //       </ul>
    //     );
    //   } else {
    //     suggestionsListComponent = (
    //       <div className="no-suggestions">
    //         <em>No matching username found</em>
    //       </div>
    //     );
    //   }
    // }

    return (
      <Fragment>
        <div className="margin35 zindex1">
          <div className="platforms maxPlatformHeight">
            {this.renderPlatforms()}
          </div>
        </div>
        {/* <input
          className="inputTxtBox spacerR12"
          type="text"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.props.modalProps.categoryId}
        /> */}
        <div className="col-12 buttonPanel spaceBottom">
        <button
          type="button"
          className="btn btnDarkGray"
          data-dismiss="modal"
          onClick={this.onSave}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btnPrimary float-right"
          data-dismiss="modal"
          onClick={this.cancel}
        >
          Cancel
        </button>
        </div>
        {/* {suggestionsListComponent} */}
        
      </Fragment>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  return {
    modalProps: state.AdminCynchAttribCategoryState.hasOwnProperty("data") ? 
    state.AdminCynchAttribCategoryState.data: {categoryId:'',cynchSegments:[]}
    
  };
}

export default connect(
  mapStateToProps,
  (dispatch) => {
    return {
      
    };
  }
)(AutoCompleteInput);

interface IAutoCompleteProps extends React.FC<any> {
  suggestions?: any;
  setUserName?: any;
  categoryDetails?: any;
  saveContent?: any;
  cynchSegments?: any;
  history?: any;
  modalProps?: any;
}

 
