import React from 'react';
import authRequest from '../../firebaseRequests/auth';
import myTeamRequest from '../../firebaseRequests/myTeamRequest';

import './SavedTeamPage.css';

class SavedTeamPage extends React.Component {

  state = {
    myTeam: [],
  }

  componentDidMount () {
    myTeamRequest
      .getRequest(authRequest.getUid())
      .then((myTeam) => {
        this.setState({myTeam});
      })
      .catch((err) => {
        console.error('error with myTeam get request FB', err);
      });
  }

  render () {
    const myTeamComponents = this.state.myTeam.map((team) => {
      return (
        <tr key={team.playerId}>
          <th scope="row">{team.myTeamName}</th>
          <td>{team.displayName}</td>
        </tr>
      );
    });
    return (
      <div className="SavedTeamPage">
        <h1>Saved Team Page</h1>
        <div className="col-sm-2">
          <table className="table">
            <tbody>
              {myTeamComponents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SavedTeamPage;
