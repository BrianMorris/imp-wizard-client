import React from "react";
import { Header } from "semantic-ui-react";
import Importfields from "./importfields";

class Answer extends React.Component {
  render() {
    let arrImportfields = this.props.getAnswerImportfields(this.props.answer.id);


    return(
      <React.Fragment>
        <Header>{this.props.answer.name}</Header>
        <Importfields  arrImportfields={arrImportfields}/>
      </React.Fragment>
      );
  }
}

export default Answer;