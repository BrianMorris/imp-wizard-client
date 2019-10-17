import React from "react";
import { Menu} from "semantic-ui-react";
import { navigate } from "@reach/router";
// import API from "../service/api";

class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImports:false
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
    return (
      <Menu pointing secondary>
        <Menu.Item header>LIZARD</Menu.Item>
        <Menu.Item onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Menu.Item>

        <Menu.Item
          onClick={() => {
              navigate("/questions");
          }}
        >
          Questions
        </Menu.Item>
        
        <Menu.Item
          onClick={() => {
            navigate("/imports");
          }}
        >
            Imports
        </Menu.Item>
        
          <Menu.Item
            onClick={() => {
                navigate("/groups");
            }}
          >
            Groups
          </Menu.Item>
          
        <Menu.Item
          onClick={() => {
              navigate("/support");
          }}
        >
          Support
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