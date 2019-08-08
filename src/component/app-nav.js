import React from "react";
import { Menu } from "semantic-ui-react";
import { navigate } from "@reach/router";
import API from "../service/api";

class AppNav extends React.Component {
  render() {
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
