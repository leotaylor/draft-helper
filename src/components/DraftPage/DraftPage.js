import React from 'react';

import './DraftPage.css';
import footballNerdRequest from '../../footballApiRequests/footballNerdRequest';
import authResuests from '../../firebaseRequests/auth';
import myTeamRequest from '../../firebaseRequests/myTeamRequest';
import DraftHistory from '../../components/DraftHistory/DraftHistory';
import CurrentTeam from '../../components/CurrentTeam/CurrentTeam';
import WR from '../../components/PlayerPositions/WR/Wr';
import RB from '../../components/PlayerPositions/RB/Rb';
import QB from '../../components/PlayerPositions/QB/Qb';
import TE from '../../components/PlayerPositions/TE/Te';

class DraftPage extends React.Component {

  state = {
    players: [],
    drafted: [],
    myTeam: [],
  }

  draftPlayer = (key) => {
    const draftMe = [...this.state.drafted];
    draftMe.push(key);
    this.setState({drafted: draftMe.reverse()});
    const filterd = this.state.players.filter(guy => guy.playerId !== key.playerId);
    this.setState({players: filterd});
  }

  myPlayer = (key) => {
    this.draftPlayer(key);
    const myPlayer = [...this.state.myTeam];
    myPlayer.push(key);
    this.setState({myTeam: myPlayer.reverse()});
  }

  saveTeam = () => {
    const newTeam = {};
    const tempState = [...this.state.myTeam];
    newTeam.players = tempState.map((player) => {
      return (
        player.playerId
      );
    });
    newTeam.uid = authResuests.getUid();
    newTeam.myTeamName = 'My Team';
    myTeamRequest
      .postRequest(newTeam)
      .then(() => {
        this.props.history.push('/myteams');
      })
      .catch((err) => {
        console.error('error in order post', err);
      });
  }

  componentDidMount () {
    footballNerdRequest.getRankings()
      .then((players) => {
        this.setState({players: players.data.DraftRankings});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const wrComponents = this.state.players.map((player) => {
      if (player.position === 'WR') {
        return (
          <WR
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
          />
        );
      } else return null;
    });
    const rbComponents = this.state.players.map((player) => {
      if (player.position === 'RB') {
        return (
          <RB
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
          />
        );
      } else return null;
    });
    const qbComponents = this.state.players.map((player) => {
      if (player.position === 'QB') {
        return (
          <QB
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
          />
        );
      } else return null;
    });
    const teComponents = this.state.players.map((player) => {
      if (player.position === 'TE') {
        return (
          <TE
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
          />
        );
      } else return null;
    });
    const draftHistoryComponents = this.state.drafted.map((player) => {
      return (
        <DraftHistory
          key={player.playerId}
          details={player}
        />
      );
    });
    const currentTeamComponent = this.state.myTeam.map((player) => {
      return (
        <CurrentTeam
          key={player.playerId}
          details={player}
        />
      );
    });

    const teamIds = (this.state.myTeam);
    const teamExists = teamIds.length > 0;

    return (
      <div className="DraftPage">
        <div>
          <div className="col-sm-12">
            <div className="col-sm-3">
              <div className="DraftedGroup">
                <h1>Draft History</h1>
                <table className="table">
                  <tbody>
                    {draftHistoryComponents}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="PositionGroup">
                <h1>Running Back</h1>
                <table className="table">
                  <tbody>
                    {rbComponents}
                  </tbody>
                </table>
              </div>
              <div className="PositionGroup">
                <h1>Quarter Back</h1>
                <table className="table">
                  <tbody>
                    {qbComponents}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="PositionGroup">
                <h1>Wide Receiver</h1>
                <table className="table">
                  <tbody>
                    {wrComponents}
                  </tbody>
                </table>
              </div>
              <div className="PositionGroup">
                <h1>Tight End</h1>
                <table className="table">
                  <tbody>
                    {teComponents}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="DraftedGroup">
                <h1>My Team</h1>
                <table className="table">
                  <tbody>
                    {currentTeamComponent}
                  </tbody>
                </table>
                <div>
                  {
                    teamExists ? (
                      <button className="btn btn-danger" onClick={this.saveTeam}>Save My Team</button>
                    ) : (
                      <div>Add Players</div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DraftPage;
