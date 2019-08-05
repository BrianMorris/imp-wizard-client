import React from "react";
import { Menu } from "semantic-ui-react";
import { navigate } from "@reach/router";

function AppNav() {
  return (
    <Menu pointing secondary>
      <Menu.Item header>LOCATE Implementation Wizard</Menu.Item>
      <Menu.Item
        onClick={() => {
          navigate("/");
        }}
      >
        Home
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

export default AppNav;
