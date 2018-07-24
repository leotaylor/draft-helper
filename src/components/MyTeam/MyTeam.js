import React from 'react';

import './MyTeam.css';

class MyTeam extends React.Component {

  render () {
    const {teamDetails, players} = this.props;
    const playerComponent = players
      .map(player => teamDetails.players.includes(player.playerId)
        ? (
          <tr key={player.playerId}>
            <td>{player.displayName}</td>
          </tr>
        )
        : null
      );
    return (
      playerComponent
    );
  }
};

export default MyTeam;
