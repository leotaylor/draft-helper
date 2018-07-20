import React from 'react';

import './Rb.css';

class RB extends React.Component {

  draftClickEvent = () => {
    this.props.draftPlayer(this.props.details.playerId);
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

export default RB;
