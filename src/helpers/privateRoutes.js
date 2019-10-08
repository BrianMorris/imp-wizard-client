import React from 'react';
import { navigate } from '@reach/router';
import Cookie from 'js-cookie';
import Questions from "../components/question/questions";
import QuestionManager from "../components/question/question_manager";
import ImportManager from "../components/import/import_manager";
import GroupManager from "../components/group/group_manager";
import Linkage from "../components/linkage";
import Support from "../components/support";
import Home from "../components/home";
import { Router } from "@reach/router";
import { Login } from '../components/login/login';


export class PrivateRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token:null
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

  verifyLogin(result) {
    const session_token = Cookie.get('session_token');
    if(session_token) {
      this.setState({session_token})
    this.props.handleLogin();
    }
  }

  render() {
    if(!this.state.session_token) {
      return <Login />
    }
    return (
        <Router>
          <Home path="/" name="home" />
          <Questions path="questions" name="questions" />
          <QuestionManager path="questionmanager/:id" name="questionmanager" />
          <ImportManager path="imports" name="imports" />
          <GroupManager path="groups" name="groups" />
          <Linkage path="linkage" name="linkage" />
          <Support path="support" name="support" />
        </Router>
    )
    // this.props.children;
  }
}