import React from 'react';

import './Te.css';

// import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class TE extends React.Component {

  draftClickEvent = () => {
    // this.props.draftPlayer(this.props.details.playerId);
    console.log('id?', this.props.details.playerId);
  }

  render () {
    const {details} = this.props;
    return (
      <tr>
        <th scope="row"></th>
        <td className="text-left">{details.displayName}</td>
        <td className="text-left">{details.team}</td>
        <td><button className="btn-xs btn-danger" onClick={this.draftClickEvent}>Drafted</button></td>
        <td><button className="btn-xs btn-success">My Team</button></td>
      </tr>
    );
  }
}

// class TE extends React.Component {
//   state = {
//     players: [],
//   }

//   componentDidMount () {
//     footballNerdRequest.getRankings()
//       .then((players) => {
//         this.setState({players: players.data.DraftRankings});
//       })
//       .catch((err) => {
//         console.error('error with TE get requests', err);
//       });
//   }

//   draftClickEvent = (e) => {
//     const playerId = e.target.id;
//     console.log('playerID?', playerId);
//   }

//   render () {
//     const playerComponent = this.state.players.map((player) => {
//       if (player.position === 'TE') {
//         return (
//           <tr key={player.playerId}>
//             <th scope="row"></th>
//             <td>{player.displayName}</td>
//             <td>{player.team}</td>
//             <td><button className="btn-xs btn-danger" id={player.playerId} onClick={this.draftClickEvent}>Drafted</button></td>
//             <td><button className="btn-xs btn-success">My Team</button></td>
//           </tr>
//         );
//       }
//     });
//     return (
//       <div className="TE">
//         <h1>Tight End</h1>
//         <table className="table">
//           <tbody>
//             {playerComponent}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

export default TE;
