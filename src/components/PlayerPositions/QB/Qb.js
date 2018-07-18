import React from 'react';

import './Qb.css';

import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class QB extends React.Component {
  state = {
    players: [],
  }

  componentDidMount () {
    footballNerdRequest.getRankings()
      .then((players) => {
        this.setState({players: players.data.DraftRankings});
      })
      .catch((err) => {
        console.error('error with QB get requests', err);
      });
  }

  render () {
    const playerComponent = this.state.players.map((player) => {
      if (player.position === 'QB') {
        // return (
        //   <li className='row' key={player.playerId}>
        //     <div className="col-xs-12">
        //       <p>{player.displayName} {player.team}</p>
        //       <button className="btn-xs btn-danger">Drafted</button>
        //       <button className="btn-xs btn-success">Mine</button>
        //     </div>
        //   </li>
        // );
        return (
          <tr key={player.playerId}>
            <th scope="row"></th>
            <td>{player.displayName}</td>
            <td>{player.team}</td>
            <td><button className="btn-xs btn-danger">Drafted</button></td>
            <td><button className="btn-xs btn-success">My Team</button></td>
          </tr>
        );
      }
    });
    return (
      <div className="QB">
        <h1>Quarter Back</h1>
        <table className="table">
          <tbody>
            {playerComponent}
          </tbody>
        </table>
      </div>
    );
  }
}

export default QB;
