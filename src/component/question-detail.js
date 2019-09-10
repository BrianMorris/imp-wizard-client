import React from "react";
import {Form, Button, Header } from "semantic-ui-react";

class QuestionDetail extends React.Component {
  render() {
    let parentButton = null;
    if(this.props.has_parent) {
      parentButton = <div>
          <Header>Parent question info...</Header>
          <Button>Parent Question</Button>
        </div>
    }
    return (
      <React.Fragment>
        <Form>
          <Form.Field>
            <label> question </label>
            <input  value={this.props.question.name} />
          </Form.Field>
          <Form.Field>
            <label> description </label>
            <input  value={this.props.question.description} />
          </Form.Field>
          <Form.Field>
            <label> group </label>
            <input  list='groups' value={this.props.question.group.name} />
              <datalist id='groups'>
                <option value='Parts'></option>
                <option value='Customers'></option>
                <option value='Vendors'></option>
              </datalist>
          </Form.Field>
          <Form.Field>
            <label> sort order </label>
            <input  value={this.props.question.sort_order} />
          </Form.Field>
          <Form.Field>
            <label> Parent Question </label>
            <input placeholder='N/A' />
          </Form.Field>
          <Button primary> Submit</Button>
          {parentButton}
        </Form>
      </React.Fragment>
    );
  }
}

export default QuestionDetail;