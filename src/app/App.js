import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';

// import CurrentTeam from '../components/CurrentTeam/CurrentTeam';
import DraftPage from '../components/DraftPage/DraftPage';
// import DraftHistory from '../components/DraftHistory/DraftHistory';
import SavedTeamPage from '../components/SavedTeamPage/SavedTeamPage';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
// import Player from '../components/Player/Player';
// import PlayerList from '../components/PlayerList/PlayerList';

import './App.css';

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/draftpage', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state={
    authed: false,
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/' exact component={DraftPage} />
                  <PrivateRoute
                    path='/draftpage'
                    authed={this.state.authed}
                    component={DraftPage}
                  />
                  <PrivateRoute
                    path="/savedteampage"
                    authed={this.state.authed}
                    component={SavedTeamPage}
                  />
                  <PublicRoute
                    path='/register'
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PublicRoute
                    path='/login'
                    authed={this.state.authed}
                    component={Login}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
