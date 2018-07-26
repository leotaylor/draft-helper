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

// class SaveButton extends React.Component {
//   render () {
//     const myTeam = this.props;
//     if (myTeam > 0) {
//       return (
//         <button className="btn btn-danger" onClick={this.saveTeam}>Save My Team</button>
//       );
//     } else return null;
//   }
// }

export default CurrentTeam;
