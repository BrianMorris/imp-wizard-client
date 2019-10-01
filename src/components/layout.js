import React from "react";
import { Grid } from "semantic-ui-react";
import { Router } from "@reach/router";
import AppNav from "./app_nav";
import Questions from "./question/questions";
import QuestionManager from "./question/question_manager";
import ImportManager from "./import/import_manager";
import GroupManager from "./group/group_manager";
import Linkage from "./linkage";
import Support from "./support";
import Home from "./home";


class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppNav />
        <Grid centered columns={3}>
          <Grid.Column width={12}>
              <Router>
                <Home path="/" name="home" />
                <Questions path="questions" name="questions" />
                <QuestionManager path="questionmanager/:id" name="questionmanager" />
                <ImportManager path="imports" name="imports" />
                <GroupManager path="groups" name="groups" />
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