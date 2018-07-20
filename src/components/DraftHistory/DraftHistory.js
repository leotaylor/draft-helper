import React from 'react';

import './DraftHistory.css';

class DraftHistory extends React.Component {

  renderHistory = (obj) => {
    // const player = this.props.find(x => x.playerId === key);
    return (
      <li
        key={obj.id}
        className="text-left"
      >
        <div>{obj.displayName}</div>
      </li>
    );
  }

  render () {
    const playerIds = this.props.players;
    console.log('playerIds:', playerIds);
    return (
      <div className="DraftHistory">
        <h1>Draft History</h1>
        <ul>
          {/* {playerIds.map(this.renderHistory)} */}
          {/* {playerIds.displayName} */}
        </ul>
      </div>
    );
  }
}

// class DraftHistory extends React.Component {
//   render () {
//     return (
//       <div className="DraftHistory">
//         <h1>Draft History</h1>
//       </div>
//     );
//   }
// }

export default DraftHistory;
