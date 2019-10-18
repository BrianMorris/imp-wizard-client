import React from 'react';
import Cookie from 'js-cookie';
import { Router, navigate} from "@reach/router";
import { Grid } from "semantic-ui-react";
import AppNav from "./app_nav";
import { Questions } from "../components/question/questions";
import { QuestionManager } from "../components/question/question_manager";
import { ImportManager } from "../components/import/import_manager";
import { GroupManager } from "../components/group/group_manager";
import { Support } from "../components/support";
import { Home } from "../components/home";
import { Login } from '../components/login/login';


export class PrivateRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token:null,
      logged_in:false
    }
  }

  componentDidMount() {
    this.verifyLogin();
  }

  componentWillUpdate() {
    if(!this.state.session_token) {
      this.verifyLogin();
    }
  }

  verifyLogin() {
    const session_token = Cookie.get('session_token');
    if(session_token) {
      this.setState({session_token})
    this.handleLogin();
    }
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
    if(!this.state.session_token) {
      return <Login />
    }
    return (
      <React.Fragment>
        <AppNav handleLogin={this.handleLogin} handleLogout={this.handleLogout} logged_in={this.state.logged_in} />
        <Grid centered columns={3}>
          <Grid.Column width={12}>
              <Router>
                <Home path="/" name="home" />
                <Questions path="questions" name="questions" />
                <QuestionManager path="questionmanager/:id" name="questionmanager" />
                <ImportManager path="imports" name="imports" />
                <GroupManager path="groups" name="groups" />
                <Support path="support" name="support" />
              </Router>
         </Grid.Column>
        </Grid>

      </React.Fragment>
    )
  }
}