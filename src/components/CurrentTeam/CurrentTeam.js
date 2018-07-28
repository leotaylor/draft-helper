import React from 'react';

import './CurrentTeam.css';

class CurrentTeam extends React.Component {

  render () {
    const details = this.props.details;
    return (
      <tr>
        <th scope="row"></th>
        <td className="text-left">{details.displayName}</td>
        <td className="text-center">{details.position}</td>
        <td>{details.team}</td>
      </tr>
    );
  }
}

export default CurrentTeam;
