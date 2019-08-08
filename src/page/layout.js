import React from "react";
import { Router } from "@reach/router";
import Home from "./home";
import GroupQuestion from "./group-question";
import AppNav from "../component/app-nav";
import { Container } from "semantic-ui-react";

function Layout() {
  return (
    <React.Fragment>
      <AppNav />
      <Container>
        <Router>
          <Home path="/" name="home" />
          <GroupQuestion path="/group/:groupId/question/:questionId" name="group-question" />
        </Router>
      </Container>
    </React.Fragment>
  );
}

export default Layout;
