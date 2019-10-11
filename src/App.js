import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Router } from "@reach/router";
import { Login } from "./components/page/login.js";
import { PrivateRoutes } from "./helpers/privateRoutes.js";
import { UserProvider } from '../src/userContext.js'

class App extends React.Component {
  setCompany = company => {
    this.setState({ company });
  }

  state = {
    company:'testing',
    setCompany: this.setCompany
  }
  
  render() {
    return (
      <React.Fragment>
        <UserProvider value={this.state}>
          <Router>
              <Login path="/login" />
              <PrivateRoutes path="/*" />
          </Router> 
        </UserProvider>
      </React.Fragment>
    );
  }
}

export default App;
