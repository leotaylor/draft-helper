import React from 'react';

import './Wr.css';

// import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class WR extends React.Component {

  render () {
    const {details} = this.props;
    return (
      <tr>
        <th scope="row" key={details.playerId}></th>
        <td>{details.displayName}</td>
        <td>{details.team}</td>
        <td><button className="btn-xs btn-danger">Drafted</button></td>
        <td><button className="btn-xs btn-success">My Team</button></td>
      </tr>
    );
  }
}

// class WR extends React.Component {
//   state = {
//     players: [],
//   }

//   componentDidMount () {
//     footballNerdRequest.getRankings()
//       .then((players) => {
//         this.setState({players: players.data.DraftRankings});
//       })
//       .catch((err) => {
//         console.error('error with WR get requests', err);
//       });
//   }

//   draftClickEvent = (e) => {
//     const playerId = e.target.id;
//     console.log('playerID?', playerId);
//   }

//   render () {
//     const playerComponent = this.state.players.map((player) => {
//       if (player.position === 'WR') {
//         return (
//           <tr key={player.playerId}>
//             <td>{player.displayName}</td>
//             <td>{player.team}</td>
//             <td><button className="btn-xs btn-danger" id={player.playerId} onClick={this.draftClickEvent}>Drafted</button></td>
//             <td><button className="btn-xs btn-success">My Team</button></td>
//           </tr>
//         );
//       }
//     });
//     return (
// <div className="WR">
//   <h1>Wide Receiver</h1>
//   <table className="table">
//     <tbody>
//       {playerComponent}
//     </tbody>
//   </table>
// </div>
//     );
//   }
// }

export default WR;
