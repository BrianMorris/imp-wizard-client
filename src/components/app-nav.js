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

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeImports: nextProps.completedImport
    });
  }
  render() {
    // adding a import label to notify user when there are valid imports available for download

    return (
      <Menu pointing secondary>
        <Menu.Item header>LIZARD</Menu.Item>
        <Menu.Item
          onClick={() => {
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
          name="logout"
          position="right"
          onClick={() => {
            navigate("/login");
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default AppNav;