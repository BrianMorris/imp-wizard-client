import React from "react";
import { Router, navigate } from "@reach/router";
import "semantic-ui-css/semantic.min.css";
import Cookie from 'js-cookie';
import { Grid } from "semantic-ui-react";
import "./App.css";
import AppNav from "./components/app_nav";
import { Login } from "./components/login/login.js";
import { PrivateRoutes } from './helpers/privateRoutes.js'


class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      logged_in:false
    };
  }

  handleLogin = () => {
    this.toggleLogin(true); 
  }

  handleLogout = () => {
    this.toggleLogin(false);
    Cookie.remove('session_token');
    navigate('/login');
  }

  toggleLogin(value) {
    this.setState({
      logged_in: value
    });
  }

  render() {
    return (
      <React.Fragment>
        <AppNav handleLogin={this.handleLogin} handleLogout={this.handleLogout} logged_in={this.state.logged_in} />
        <Grid centered columns={3}>
          <Grid.Column width={12}>
              <Router>
                <Login path="login" name="login" />
                <PrivateRoutes handleLogin={this.handleLogin} path='/*' />
              </Router>
          </Grid.Column>
        </Grid>

      </React.Fragment>
    );
  }
}

export default App;