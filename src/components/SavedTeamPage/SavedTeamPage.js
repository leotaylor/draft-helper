import React from 'react';
import authRequest from '../../firebaseRequests/auth';
import myTeamRequest from '../../firebaseRequests/myTeamRequest';
import footballNerdRequest from '../../footballApiRequests/footballNerdRequest';
import teamRequests from '../../firebaseRequests/myTeamRequest';

import MyTeam from '../MyTeam/MyTeam';

import './SavedTeamPage.css';

class SavedTeamPage extends React.Component {
  state = {
    players: [],
    myTeams: [],
    showForm: '',
  }

  async componentDidMount () {
    const teamRequest = myTeamRequest.getRequest(authRequest.getUid());
    const rankingRequest = footballNerdRequest.getRankings();
    const data = await Promise.all([teamRequest, rankingRequest]).catch(error => console.log({error}));
    const myTeams = data[0];
    const players = data[1].data.DraftRankings;
    this.setState({myTeams, players});
  }

  changeNameClick = (e) => {
    const showForm = e.target.id;
    this.setState({showForm: showForm});
  }

  submitName = (e) => {
    const newName = e.target.value;
    const teamId = this.state.showForm;
    if (e.key === 'Enter') {
      const foundTeam = this.state.myTeams.find((team) => {
        return team.id === teamId;
      });
      foundTeam.myTeamName = newName;
      teamRequests
        .putRequest(teamId, foundTeam)
        .then(() => {
          this.setState({showForm: ''});
        })
        .catch((err) => {
          console.error('error with put request', err);
        });
    }
  }

  deleteTeamClick = (e) => {
    const firebaseId = e.target.id;
    teamRequests
      .deleteRequest(firebaseId)
      .then(() => {
        this.componentDidMount();
      })
      .catch((err) => {
        console.error('error with delete request', err);
      });
  }

  render () {
    const {myTeams, players, showForm} = this.state;
    const buttonComponent = (id, team) => {
      if (showForm !== id) {
        return (
          <th scope="row" className="btn btn-success btn-block text-center saveButton" id={id} onClick={this.changeNameClick}>{team.myTeamName}</th>
        );
      } else {
        return (
          <td>
            <input type="text" className="form-control" id={id} onKeyPress={this.submitName} placeholder="New Team Name" aria-describedby="basic-addon1"/>
          </td>
        );
      }
    };

    const savedTeamComponent = myTeams.map(team => {
      return (
        <div className="col-sm-3 text-center savedTeam" key={team.id}>
          <table className="table">
            <thead>
              <tr>
                {buttonComponent(team.id, team)}
              </tr>
            </thead>
            <tbody>
              <MyTeam
                teamDetails={team}
                players={players}
              />
              <tr>
                <td className="btn btn-danger deleteButton" id={team.id} onClick={this.deleteTeamClick}>Delete Team</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
    return (
      <div className="SavedTeamPage">
        <h1>My Drafted Teams</h1>
        {savedTeamComponent}
      </div>
    );
  }
}

export default SavedTeamPage;
