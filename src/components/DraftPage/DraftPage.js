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
import Buttons from '../../components/buttons/buttons';

class DraftPage extends React.Component {

  state = {
    players: [],
    drafted: [],
    myTeam: [],
    draftOrder: 0,
    tiers: [],
  }

  // Drafts Players into Draft History Div, adds draftorder number to player, and removes player from positions div.
  draftPlayer = (key) => {
    const draftMe = [...this.state.drafted];
    const draftOrder = this.state.draftOrder;
    key.indexNumber = draftOrder + 1;
    draftMe.push(key);
    this.setState({
      drafted: draftMe,
      draftOrder: draftOrder + 1,
    });
    const filterd = this.state.players.filter(guy => guy.playerId !== key.playerId);
    this.setState({players: filterd});
  }

  // Drafts Player into Current Team (myteam) div
  myPlayer = (key) => {
    this.draftPlayer(key);
    const myPlayer = [...this.state.myTeam];
    myPlayer.push(key);
    this.setState({myTeam: myPlayer});
  }

  unDraftPlayer = (key) => {
    // Add players back to position group containers.
    const players = [...this.state.players];
    const draftOrder = this.state.draftOrder;
    key.indexNumber = draftOrder - 1;
    players.splice(key.overallRank, 0, key);
    this.setState({
      players: players,
      draftOrder: draftOrder - 1,
    });
    // Removes Players from Draft History and My Team Containers.
    const filtered = this.state.drafted.filter(guy => guy.playerId !== key.playerId);
    const filterMyTeam = this.state.myTeam.filter(guy => guy.playerId !== key.playerId);
    this.setState({
      drafted: filtered,
      myTeam: filterMyTeam,
    });
  }
  // Ver 2.0 move players up in list
  moveUp = (key) => {
    let players = [...this.state.players];
    const originalIndex = players.indexOf(key);
    if (originalIndex > 0) {
      const newIndex = originalIndex - 1;
      players.splice(originalIndex, 1);
      players.splice(newIndex, 0, key);
    }
    players = players.map(function (player, index) { player.overallRank = index + 1; return player;  });
    this.setState({ players: players });
  }

  moveDown = (key) => {
    let players = [...this.state.players];
    const originalIndex = players.indexOf(key);
    if (originalIndex > 0 || originalIndex <= players.length) {
      const newIndex = originalIndex + 1;
      players.splice(originalIndex, 1);
      players.splice(newIndex, 0, key);
    }
    players = players.map(function (player, index) { player.overallRank = index + 1; return player;  });
    this.setState({ players: players });
  }

  // On Button Click from My Team div, takes data from temp state, grab playerIds, and posts playerIds to firebase with default 'My Team' name, then directs to myteams page.
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

  // 2 API Requests, rankings request , then tiers request, then set both states with returned data arrays, runs the tierClasses function on completion.
  async componentDidMount () {
    const rankingRequest = footballNerdRequest.getRankings();
    const tierRequest = footballNerdRequest.getTiers();
    const data = await Promise.all([rankingRequest, tierRequest ]).catch(error => console.error({error}));
    const players = data[0].data.DraftRankings;
    const tiers = data[1].data;
    this.setState({players, tiers}, () => this.tierClasses());
  }

  // returning classNames for color coding players based on tier group.
  tierClasses = () => {
    const playerArray = this.state.players;
    const tierArray = this.state.tiers;
    const tierPlayers = playerArray.map((player) => {
      player.tier = '';
      tierArray.map((tier) => { // eslint-disable-line array-callback-return
        if (tier.playerId === player.playerId && tier.tier === '1') {
          player.tier = 'tierOne';
        } else
        if (tier.playerId === player.playerId && tier.tier === '2') {
          player.tier = 'tierTwo';
        } else
        if (tier.playerId === player.playerId && tier.tier === '3') {
          player.tier = 'tierThree';
        } else
        if (tier.playerId === player.playerId && tier.tier === '4') {
          player.tier = 'tierFour';
        } else
        if (tier.playerId === player.playerId && tier.tier === '5') {
          player.tier = 'tierFour';
        } else
        if (tier.playerId === player.playerId && tier.tier === '6') {
          player.tier = 'tierFive';
        } else
        if (tier.playerId === player.playerId && tier.tier === '7') {
          player.tier = 'tierFive';
        } else return null;
      });
      return player;
    });
    this.setState({players: tierPlayers});
  }

  render () {
    // Sort Players by overall rank for proper undo button functioning
    const copyPlayers = [...this.state.players];
    const sortedPlayers = copyPlayers.sort((a,b) => {
      return a.overallRank - b.overallRank;
    });

    const wrComponents = sortedPlayers.map((player) => {
      if (player.position === 'WR') {
        return (
          <WR
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
            tierClasses={player.tier}
          />
        );
      } else return null;
    });

    const rbComponents = sortedPlayers.map((player) => {
      if (player.position === 'RB') {
        return (
          <RB
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
            tierClasses={player.tier}
            moveUp={this.moveUp}
            moveDown={this.moveDown}
          />
        );
      } else return null;
    });
    const qbComponents = sortedPlayers.map((player) => {
      if (player.position === 'QB') {
        return (
          <QB
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
            tierClasses={player.tier}
          />
        );
      } else return null;
    });
    const teComponents = sortedPlayers.map((player) => {
      if (player.position === 'TE') {
        return (
          <TE
            key={player.playerId}
            details={player}
            draftPlayer={this.draftPlayer}
            myPlayer={this.myPlayer}
            tierClasses={player.tier}
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

    // Used in ternary below for show/hide save team button in my team.
    const teamIds = (this.state.myTeam);
    const teamExists = teamIds.length > 0;

    // Used for undo button.
    const buttonComponent = () => {
      const player = this.state.drafted[this.state.drafted.length - 1];
      if (this.state.drafted.length > 0) {
        return (
          <Buttons
            key={player.playerId}
            details={player}
            unDraftPlayer={this.unDraftPlayer}
          />
        );
      }
    };

    return (
      <div className="DraftPage">
        <div>
          {buttonComponent()}
          <div className="col-sm-12">
            <div className="col-sm-3">
              <div className="DraftedGroup">
                <h1>Draft History</h1>
                <table className="table">
                  <tbody>
                    {draftHistoryComponents.reverse()}
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
                    {currentTeamComponent.reverse()}
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
