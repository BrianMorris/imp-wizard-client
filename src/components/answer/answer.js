import React from "react";
import { Header } from "semantic-ui-react";

class Answer extends React.Component {
  render() {

    return(
      <React.Fragment>
        <Header>{this.props.answer.name}</Header>
        {this.props.children}
      </React.Fragment>
      );
  }
}

export default Answer;