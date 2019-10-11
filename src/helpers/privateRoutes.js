import React from 'react';
import Cookie from 'js-cookie';
import { Router, navigate} from "@reach/router";
import { Grid } from "semantic-ui-react";
import AppNav from "../components/app-nav.js";
import Home from "../components/page/home.js";
import GroupQuestion from "../components/page/group-question.js";
import Import from "../components/page/import.js";
import ImportFields from "../components/page/import-fields.js";
import { Login } from '../components/page/login.js'


export class PrivateRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token:null,
      logged_in:false,
      completedImport: false
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

  updateImportState() {
    if(!this.state.completedImport) {
      this.setState({
        completedImport:true
      });
    }
  } 

  handleLogin = () => {
    this.toggleLogin(true); 
  }

  handleLogout = () => {
    // hit api with logout
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
      return <Login/>
    }
    return (
      <React.Fragment>
        <AppNav completedImport={this.state.completedImport} handleLogin={this.handleLogin} handleLogout={this.handleLogout} logged_in={this.state.logged_in} />
        <Grid centered columns={3}>
          <Grid.Column width={12}>
            <Router>
              <Home path="/" name="home" completeImport={() => this.updateImportState()} />
              <GroupQuestion path="/group/:groupId/question/:questionId" name="group-question" />
              <Import path="/import" />
              <ImportFields path="/import/:group_id/activefields" />
            </Router>
         </Grid.Column>
        </Grid>

      </React.Fragment>
    )
  }
}