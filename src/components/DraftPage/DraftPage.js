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
// import Buttons from '../../components/buttons/buttons';

class DraftPage extends React.Component {

  state = {
    players: [],
    drafted: [],
    myTeam: [],
    draftOrder: 0,
    tiers: [],
  }

  draftPlayer = (key) => {
    const draftMe = [...this.state.drafted];
    // const players = this.state.players;
    // const index = draftMe.indexOf();
    // if (!index) {
    //   draftMe[index].drafted = this.state.draftOrder + 1;
    // }
    draftMe.push(key);
    this.setState({
      drafted: draftMe,
      // draftOrder: this.state.draftOrder + 1,
    });
    const filterd = this.state.players.filter(guy => guy.playerId !== key.playerId);
    this.setState({players: filterd});
  }

  myPlayer = (key) => {
    this.draftPlayer(key);
    const myPlayer = [...this.state.myTeam];
    myPlayer.push(key);
    this.setState({myTeam: myPlayer});
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

  // undoButton () {
  //   const drafted = this.state.drafted;
  // }

  // componentDidMount () {
  //   footballNerdRequest.getRankings()
  //     .then((players) => {
  //       this.setState({players: players.data.DraftRankings});
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  async componentDidMount () {
    const rankingRequest = footballNerdRequest.getRankings();
    const tierRequest = footballNerdRequest.getTiers();
    const data = await Promise.all([rankingRequest, tierRequest ]).catch(error => console.log({error}));
    // console.log({data});
    const players = data[0].data.DraftRankings;
    const tiers = data[1].data;
    this.setState({players, tiers}, () => this.tierClasses());
  }

  tierClasses = () => {
    const playerArray = this.state.players;
    const tierArray = this.state.tiers;
    const tierPlayers = playerArray.map((player) => {
      player.tier = '';
      tierArray.map((tier) => {
        if (tier.playerId === player.playerId && tier.tier === '1') {
          player.tier = 'tierOne';
        } else
        if (tier.playerId === player.playerId && tier.tier === '2') {
          player.tier = 'tierTwo';
        } else return null;
      });
      return player;
    });
    this.setState({players: tierPlayers});
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
            tierClasses={player.tier}
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
            tierClasses={player.tier}
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
            tierClasses={player.tier}
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
          // draftOrder={this.state.draftOrder}
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

    // const buttonComponent = <Buttons
    //   draftOrder={this.state.draftOrder}
    // />;

    const teamIds = (this.state.myTeam);
    const teamExists = teamIds.length > 0;

    return (
      <div className="DraftPage">
        <div>
          {/* {buttonComponent} */}
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
