import React from "react";
import { Label, Icon, Header, List } from "semantic-ui-react";

export const Question = (props) => {
  return (
    <List>
      <List.Item>
        <Header>
          <Label style={{'marginRight':'1.5em'}} circular color="black">
          <Icon size="big" name="question circle outline" /> 
            {props.question.id}
          </Label>
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