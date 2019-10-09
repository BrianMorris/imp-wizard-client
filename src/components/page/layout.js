import React from "react";
import { Router } from "@reach/router";
import Home from "./home";
import GroupQuestion from "./group-question";
import AppNav from "../app-nav";
import { Container } from "semantic-ui-react";
import Import from "./import";
import ImportFields from "./import-fields";


class Layout extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      completedImport: false
    }
  }
  updateImportState() {
    if(!this.state.completedImport) {
      this.setState({
        completedImport:true
      });
    }
  } 

  render() {
    return (
      <React.Fragment>
        <AppNav completedImport={this.state.completedImport}/>
        <Container>
          <Router>
            <Home path="/" name="home" completeImport={() => this.updateImportState()} />
            <GroupQuestion path="/group/:groupId/question/:questionId" name="group-question" />
            <Import path="/import" />
            <ImportFields path="/import/:group_id/activefields" />
          </Router>
        </Container>
      </React.Fragment>
    );
  }
}

export default Layout;
