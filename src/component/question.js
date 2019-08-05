import React from "react";
import { List, Checkbox, Form } from "semantic-ui-react";

function Question(props) {
  const subQuestions = props.question.questions || [];
  return (
    <List.Item>
      <List.Icon name="question circle outline" />
      <List.Content>
        <List.Header>{props.question.name}</List.Header>
        <List.Description>{props.question.description}</List.Description>
        <List>
          {props.question.answers
            ? props.question.answers.map(function(answer, index) {
                return (
                  <List.Item key={index}>
                    <Form>
                      <Form.Field>
                        <Checkbox label={answer.name} radio={!props.question.multiple} />
                      </Form.Field>
                    </Form>
                  </List.Item>
                );
              })
            : ""}
        </List>
        <List.List>
          {subQuestions.map(function(subQuestion, index) {
            return <Question question={subQuestion} key={index} />;
          })}
        </List.List>
      </List.Content>
    </List.Item>
  );
}

export default Question;
