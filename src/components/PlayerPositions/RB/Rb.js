import React from 'react';

import './Rb.css';

// import footballNerdRequest from '../../../footballApiRequests/footballNerdRequest';

class RB extends React.Component {

  render () {
    const {details} = this.props;
    return (
      <tr>
        <th scope="row" key={details.playerId}></th>
        <td>{details.displayName}</td>
        <td>{details.team}</td>
        <td><button className="btn-xs btn-danger">Drafted</button></td>
        <td><button className="btn-xs btn-success">My Team</button></td>
      </tr>
    );
  }
}

export default RB;
