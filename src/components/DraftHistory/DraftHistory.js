import React from 'react';

import './DraftHistory.css';

class DraftHistory extends React.Component {

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

export default DraftHistory;
