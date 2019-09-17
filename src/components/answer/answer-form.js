import React from "react";
import { Button, Form } from "semantic-ui-react";

export default (props) => {
    const buttonText = 'Link answer to Question';
    return(
      <React.Fragment>
        <Form>
          <Form.Field>
            <label> Answer</label>
            <input  value={props.answer.name} />
          </Form.Field>
          <Button primary> Submit</Button>
          <Button secondary> {buttonText} </Button>
        </Form>
        {props.children}
      </React.Fragment>
      );
}
