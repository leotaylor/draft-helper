import React from 'react';

import './Rb.css';

class RB extends React.Component {

  draftClickEvent = () => {
    this.props.draftPlayer(this.props.details);
  }

  myTeamClickEvent = () => {
    this.props.myPlayer(this.props.details);
  }
  // Ver 2.0 move player up in list
  moveUpEvent = () => {
    this.props.moveUp(this.props.details);
  }

  render () {
    const {details, tierClasses} = this.props;
    return (
      <tr className={tierClasses}>
        <th scope="row"></th>
        <td className="text-left">{details.overallRank}</td>
        <td className="text-left">{details.displayName}</td>
        <td className="text-left">{details.team}</td>
        <td><button className="btn-xs btn-danger" onClick={this.draftClickEvent}>Drafted</button></td>
        <td><button className="btn-xs btn-success" onClick={this.myTeamClickEvent}>Mine</button></td>
        {/* Version 2.0 moveplayer up in list */}
        <td className="glyphicon glyphicon-arrow-up" onClick={this.moveUpEvent}></td>
        <td className="glyphicon glyphicon-arrow-down"></td>
      </tr>
    );
  }
}

export default RB;
