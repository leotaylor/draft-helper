import React from 'react';

import './DraftPage.css';
import footballNerdRequest from '../../footballApiRequests/footballNerdRequest';

import DraftHistory from '../../components/DraftHistory/DraftHistory';
// import PlayerList from '../../components/PlayerList/PlayerList';
import CurrentTeam from '../../components/CurrentTeam/CurrentTeam';
import WR from '../../components/PlayerPositions/WR/Wr';
import RB from '../../components/PlayerPositions/RB/Rb';
import QB from '../../components/PlayerPositions/QB/Qb';
import TE from '../../components/PlayerPositions/TE/Te';

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
          <div className="col-sm-3"><RB /> <QB /></div>
          <div className="col-sm-3"><WR /> <TE /></div>
          <div className="col-sm-3"><CurrentTeam /></div>
        </div>
      </div>
    );
  }
}

export default DraftPage;
