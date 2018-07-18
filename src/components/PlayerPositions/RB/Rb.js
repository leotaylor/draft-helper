import React from 'react';

import './Rb.css';

import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class RB extends React.Component {
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
      if (player.position === 'RB') {
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
          <table className="table table-hover table-condensed">
            <tbody>
              <tr>
                <th scope="row" key={player.playerId}></th>
                <td>{player.displayName}</td>
                <td>{player.team}</td>
                <td><button className="btn-xs btn-danger">Drafted</button></td>
                <td><button className="btn-xs btn-success">My Team</button></td>
              </tr>
            </tbody>
          </table>
        );
      }
    });
    return (
      <div className="RB">
        <h1>Running Back</h1>
        {playerComponent}
      </div>
    );
  }
}

export default RB;
