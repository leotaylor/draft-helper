import React from 'react';

import './Qb.css';

class QB extends React.Component {

  draftClickEvent = () => {
    this.props.draftPlayer(this.props.details);
  }

  myTeamClickEvent = () => {
    this.props.myPlayer(this.props.details);
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
      </tr>
    );
  }
}

export default QB;
// Parent Component is DraftPage.
