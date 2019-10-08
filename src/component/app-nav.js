import React from "react";
import { Menu, Label } from "semantic-ui-react";
import { navigate } from "@reach/router";
import API from "../service/api";

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
    const importLabel = this.state.activeImports ? <Label id="import-label" circular color="green" empty key="green" /> : null;

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
