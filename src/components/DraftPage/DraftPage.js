import React from 'react';

import './DraftPage.css';
import footballNerdRequest from '../../footballApiRequests/footballNerdRequest';

import DraftHistory from '../../components/DraftHistory/DraftHistory';
import PlayerList from '../../components/PlayerList/PlayerList';
import CurrentTeam from '../../components/CurrentTeam/CurrentTeam';

class DraftPage extends React.Component {
  componentDidMount () {
    footballNerdRequest.getRankings()
      .then((rankings) => {
        console.log('Player Rankings:', rankings);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    return (
      <div className="DraftPage">
        <h1>Draft Page</h1>
        <div className="col-sm-12">
          <div className="col-sm-3"><DraftHistory /></div>
          <div className="col-sm-3"><PlayerList /> <PlayerList /></div>
          <div className="col-sm-3"><PlayerList /> <PlayerList /></div>
          <div className="col-sm-3"><CurrentTeam /></div>
        </div>
      </div>
    );
  }
}

export default DraftPage;
