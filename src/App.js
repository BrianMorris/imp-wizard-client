import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Router } from "@reach/router";
import Login from "./page/login";
import Layout from "./page/layout";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Login path="/login" />
          <Layout path="/*" />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
