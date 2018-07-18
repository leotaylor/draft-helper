import React from 'react';

import './Wr.css';

import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class WR extends React.Component {
  state = {
    players: [],
  }

  componentDidMount () {
    footballNerdRequest.getRankings()
      .then((players) => {
        this.setState({players: players.data.DraftRankings});
      })
      .catch((err) => {
        console.error('error with RB get requests', err);
      });
  }

  render () {
    const playerComponent = this.state.players.map((player) => {
      if (player.position === 'WR') {
        return (
          <li className='row' key={player.playerId}>
            <p>{player.displayName} {player.team}</p>
            <button className="btn btn-danger">Drafted</button>
            <button className="btn btn-success">Mine</button>
          </li>
        );
      }
    });
    return (
      <div className="WR">
        <h1>Wide Receiver</h1>
        {playerComponent}
      </div>
    );
  }
}

export default WR;
