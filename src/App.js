import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Router } from "@reach/router";
import { Login } from "./components/page/login.js";
import { PrivateRoutes } from "./helpers/privateRoutes.js";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Login path="/login" />
          <PrivateRoutes path="/*" />
        </Router> 
      </React.Fragment>
    );
  }
}

export default App;
