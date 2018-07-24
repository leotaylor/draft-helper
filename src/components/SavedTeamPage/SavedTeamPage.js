import React from 'react';
import authRequest from '../../firebaseRequests/auth';
import myTeamRequest from '../../firebaseRequests/myTeamRequest';
import footballNerdRequest from '../../footballApiRequests/footballNerdRequest';

import MyTeam from '../MyTeam/MyTeam';

import './SavedTeamPage.css';

// class SavedTeamPage extends React.Component {
//   state = {
//     players: [],
//     myTeams: [],
//   }

//   async componentDidMount () {
//     const teamRequest = myTeamRequest.getRequest(authRequest.getUid());
//     const rankingRequest = footballNerdRequest.getRankings();
//     const data = await Promise.all([teamRequest, rankingRequest]).catch(error => console.log({error}));
//     const myTeams = data[0];
//     const players = data[1].data.DraftRankings;
//     this.setState({myTeams, players});
//   }

//   render () {
//     const {myTeams, players} = this.state;
//     const savedTeamComponent = myTeams.map(team => {
//       console.log({team});
//       return (
//         <MyTeam
//           key={team.id}
//           teamDetails={team}
//           players={players}
//         />
//       );
//     });
//     return (
//       <div className="SavedTeamPage">
//         <h1>Saved Team Page</h1>
//         <div className="col-sm-4">
//           <table className="table">
//             <tbody>
//               {savedTeamComponent}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default SavedTeamPage;

class SavedTeamPage extends React.Component {
  state = {
    players: [],
    myTeams: [],
  }

  async componentDidMount () {
    const teamRequest = myTeamRequest.getRequest(authRequest.getUid());
    const rankingRequest = footballNerdRequest.getRankings();
    const data = await Promise.all([teamRequest, rankingRequest]).catch(error => console.log({error}));
    const myTeams = data[0];
    const players = data[1].data.DraftRankings;
    this.setState({myTeams, players});
  }

  render () {
    const {myTeams, players} = this.state;
    const savedTeamComponent = myTeams.map(team => {
      return (
        <table
          key={team.id}
        >
          <thead>
            <tr>
              <th scope="row">{team.myTeamName} <button onClick={this.changeName}>Edit Team Name</button></th>
            </tr>
          </thead>
          <tbody>
            <MyTeam
              teamDetails={team}
              players={players}
            />
          </tbody>
        </table>
      );
    });
    return (
      <div className="SavedTeamPage">
        <h1>Saved Team Page</h1>
        <div className="col-sm-4">
          {savedTeamComponent}
        </div>
      </div>
    );
  }
}

export default SavedTeamPage;
