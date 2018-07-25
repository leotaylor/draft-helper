import React from 'react';

import './Te.css';

// import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class TE extends React.Component {

  draftClickEvent = () => {
    this.props.draftPlayer(this.props.details);
  }

  myTeamClickEvent = () => {
    this.props.myPlayer(this.props.details);
  }

  render () {
    const {details} = this.props;
    return (
      <tr>
        <th scope="row"></th>
        <td className="text-left">{details.displayName}</td>
        <td className="text-left">{details.team}</td>
        <td><button className="btn-xs btn-danger" onClick={this.draftClickEvent}>Drafted</button></td>
        <td><button className="btn-xs btn-success" onClick={this.myTeamClickEvent}>My Team</button></td>
      </tr>
    );
  }
}

export default TE;
