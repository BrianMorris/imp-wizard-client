import React from "react";
import { Router } from "@reach/router";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Login } from "./components/login/login.js";
import { PrivateRoutes } from './helpers/privateRoutes.js'


class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Login path="login" name="login" />
          <PrivateRoutes path='/*' />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;