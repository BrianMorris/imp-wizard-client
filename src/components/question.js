import React from "react";
import { Icon, Header, List } from "semantic-ui-react";
import Answers from "./answers";

function Question(props) {
  return (
    <List>
      <List.Item>
        <Header>
          <Icon name="question circle outline" />
          {props.question.name}
        </Header>
      </List.Item>
      <List.Item>{props.question.description}</List.Item>
      {props.question.answers ? (
        <List.Item>
          <Answers answers={props.question.answers} question={props.question} onAnswerSubmit={props.onAnswerSubmit} />
        </List.Item>
      ) : (
        ""
      )}
    </List>
  );
}

export default Question;
