import React from "react";
import { Icon, Header, List } from "semantic-ui-react";

function Question(props) {
  console.log('single qu', props)
  return (
    <List>
      <List.Item>
        <Header>
          <Icon name="question circle outline" />
          {props.question.name}
        </Header>
      </List.Item>
      <List.Item>Description: {props.question.description}</List.Item>
      <List.Item>
        Group: {props.question.group.name}
      </List.Item>
    </List>
  );
}

export default Question;