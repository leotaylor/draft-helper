import React, { Component } from 'react';

import CurrentTeam from '../components/CurrentTeam/CurrentTeam';
import DraftPage from '../components/DraftPage/DraftPage';
import DraftHistory from '../components/DraftHistory/DraftHistory';
import SavedTeamPage from '../components/SavedTeamPage/SavedTeamPage';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Player from '../components/Player/Player';
import PlayerList from '../components/PlayerList/PlayerList';

import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navbar />
        <DraftHistory />
        <DraftPage />
        <SavedTeamPage />
        <Player />
        <PlayerList />
        <CurrentTeam />
        <Login />
        <Register />
      </div>
    );
  }
}

export default App;
