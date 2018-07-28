import React from 'react';

import './Wr.css';

class WR extends React.Component {

  draftClickEvent = () => {
    this.props.draftPlayer(this.props.details);
  }

  myTeamClickEvent = () => {
    this.props.myPlayer(this.props.details);
  }

  render () {
    const {details, tierClass} = this.props;

    return (
      <tr className={tierClass}>
        <th scope="row"></th>
        <td className="text-left">{details.overallRank}</td>
        <td className="text-left">{details.displayName}</td>
        <td className="text-left">{details.team}</td>
        <td><button className="btn-xs btn-danger" onClick={this.draftClickEvent}>Drafted</button></td>
        <td><button className="btn-xs btn-success" onClick={this.myTeamClickEvent}>Mine</button></td>
      </tr>
    );
  }
}

export default WR;
