import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';
import './App.css';

import DraftPage from '../components/DraftPage/DraftPage';
import SavedTeamPage from '../components/SavedTeamPage/SavedTeamPage';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

import fbConnection from '../firebaseRequests/connection';
fbConnection();

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

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  logout = () => {
    this.setState({authed: false});
  }

  render () {
    const authentication = this.state.authed;
    const trueStuff = authentication === true;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar authed={this.state.authed} logout={this.logout}/>
            <div>
              <div className="row">
                <Switch>
                  {
                    trueStuff ? (
                      <Route path="/" exact component={DraftPage} />
                    ) : (
                      <Route path="/" exact component={Login} />
                    )
                  }
                  <PrivateRoute
                    path='/draftpage'
                    authed={this.state.authed}
                    component={DraftPage}
                  />
                  <PrivateRoute
                    path="/myteams"
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
