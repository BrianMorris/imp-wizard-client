import React from "react";
import { Icon, Header, List } from "semantic-ui-react";

export const Question = (props) => {
  return (
    <List>
      <List.Item>
        <Header>
          <Icon name="question circle outline" />
          {props.question.name}
          {props.children}
        </Header>
      </List.Item>
      <List.Item>Description: {props.question.description}</List.Item>
      {props.hide_group ? null : (
      <List.Item>
        Group: {props.question.group.name}
      </List.Item>
      )}
    </List>
  );
}