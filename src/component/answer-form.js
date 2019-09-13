import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import Importfields from "./importfield";

export default (props) => {
  console.log('pop', props);
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
