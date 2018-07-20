import React from 'react';

import './DraftHistory.css';

// class DraftHistory extends React.Component {
//   renderHistory = (key) => {
//     const player = this.props.players.find(x => x.playerId === key);
//     return (
//       <li
//         key={key}
//         className="text-left"
//       >
//         <div>{player.displayName}</div>
//       </li>
//     );
//   }

//   render () {
//     const playerIds = Object.keys(this.props.players);
//     return (
//       <div className="DraftHistory">
//         <h1>Draft History</h1>
//         <ul>
//           {playerIds.map(this.renderHistory)}
//         </ul>
//       </div>
//     );
//   }
// }

class DraftHistory extends React.Component {
  render () {
    return (
      <div className="DraftHistory">
        <h1>Draft History</h1>
      </div>
    );
  }
}

export default DraftHistory;
