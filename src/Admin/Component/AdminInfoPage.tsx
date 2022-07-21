/* eslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
 
class AdminInfoPage extends React.Component<IAdminInfoPage, {}> {
  private adminPanelList: any;

  constructor(props: any) {
    super(props);
     this.adminPanelList = [
      {
        title: 'R.E.D. UI Jira',
        path: 'https://reqcentral.com/secure/RapidBoard.jspa?rapidView=1173&projectKey=RED&view=planning&issueLimit=100',
        id: 'Jira'
      },
      {
        title: 'Confluence Page',
        path: 'https://reqcentral.com/wiki/display/REDUI',
        id: 'confluencePage'
      },
      {
        title: 'DM&T Wiki',
        path: 'https://dmt.rogers.com/xwiki/bin/view/Portfolios/MBU/REDUI',
        id: 'wiki'
      },
    ];
  }
 
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  public render() {
    return (
      <main role="main" className="container-fluid">
        <div className="row fixed-header-top ml-0 mr-0">
          <div className="col-12">
            <h3 className="mb-sm-4 mb-4">System Information</h3>
            <div className="row-flex mb-4 spaceTop">
              <ul>
                {this.adminPanelList.map((row: any, idx: any) => {
                  return (
                    <li id={row.id} key={row.title}>
                      <a
                        href={row.path} target="_blank"
                      >
                        {' '}
                        {row.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    errorMessage: state.showErrorBoxState.errorMessage
  };
}

export default connect(
  mapStateToProps,
  dispatch => {
    return {
 
    };
  }
)(AdminInfoPage);

interface IAdminInfoPage extends React.FC<any> {
 
  errorMessage: any;
  history: any;
}
