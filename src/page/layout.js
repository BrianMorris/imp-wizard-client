import React from "react";
import { Router } from "@reach/router";
import Home from "./home";
import AppNav from "../component/app-nav";
import { Container } from "semantic-ui-react";

function Layout() {
  return (
    <React.Fragment>
      <AppNav />
      <Container>
        <Router>
          <Home path="/" name="home" />
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default Layout;
