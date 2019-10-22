import React from "react";
import { Menu, Label } from "semantic-ui-react";
import { navigate } from "@reach/router";
import { API } from "../service/api.js";
import UserContext from '../userContext.js';

class AppNav extends React.Component {
  static contextType = UserContext

  constructor(props) {
    super(props);

    this.state = {
      activeImports:false,
      company:''
    }
  }

  handleLogin = () => {
    if(this.props.logged_in) {
      this.props.handleLogout();
    }
    else {
      navigate('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeImports: nextProps.completedImport
    });
  }

  render() {
    const companyName = this.context && this.context.company ? '| ' + this.context.company : null; 
    const importLabel = this.state.activeImports ? <Label id="import-label" circular color="green" empty key="green" /> : null;

    return (
      <Menu pointing secondary>
        <Menu.Item header>LIZARD {companyName}</Menu.Item>
        <Menu.Item
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            API.Question.resetAll().then(function() {
              alert("SUCCESS!");
            });
          }}
        >
          Reset All
        </Menu.Item>

        <Menu.Item
          onClick={() => {
              navigate("/import");
          }}
        >
            Import
            {importLabel}
        </Menu.Item>

        <Menu.Item
          name="login"
          position="right"
          onClick={this.handleLogin}
        >
          {this.props.logged_in ? 'logout' : 'login'}  
        </Menu.Item>
      </Menu>
    );
  }
}

export default AppNav;
