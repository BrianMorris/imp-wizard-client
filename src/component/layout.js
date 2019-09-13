import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { Router } from "@reach/router";
import AppNav from "./app-nav";
import Questions from "./questions";
import QuestionManager from "./question-manager";
import Importfields from "./importfield";
import Linkage from "./linkage";
import Support from "./support";
import Home from "./home";


class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppNav />
        <Grid centered columns={3}>
          <Grid.Column>
              <Router>
                <Home path="/" name="home" />
                <Questions path="questions" name="questions" />
                <QuestionManager path="questionmanager/:id" name="questionmanager" />
                <Importfields path="importfields" name="importfields" />
                <Linkage path="linkage" name="linkage" />
                <Support path="support" name="support" />
              </Router>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Layout;