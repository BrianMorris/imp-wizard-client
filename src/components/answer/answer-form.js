import React from "react";
import { Button, Form } from "semantic-ui-react";
import API from "../../service/api";

class AnswerForm extends React.Component{
    constructor(props) {
    super(props);

    this.state = {
      answer:this.props.answer.name,
      description: this.props.answer.description || '',
      sort_order: this.props.answer.sort_order,
      changed: false
    };
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      changed: true
    })
  }

  handleSubmit = (e) => {
    API.Answer.updateAnswer({
      answer_id: this.props.answer.id,
      name: this.state.answer,
      description: this.state.description,
      sort_order: this.state.sort_order,
    }).then(
      result => {
        this.props.reset();
      },
      error => {
        // handle errors better later
        console.log('err', error);
      }
    )
  }

  render() {
    const buttonText = 'Link answer to Question';
    return(
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='16'>
            <Form.Input width='12' onChange={this.onChange} label='Answer' name='answer' value={this.state.answer} />
            <Form.Input width='4' onChange={this.onChange} label="Sort Order" name="sort_order" type="number" min="1" value={this.state.sort_order}/>
          </Form.Group>
          <Form.Input onChange={this.onChange} label="description" name='description'  value={this.state.description} />
          <Button name='submit' disabled={!this.state.changed} primary> Submit</Button>
          <Button secondary> {buttonText} </Button>
        </Form>
        {this.props.children}
      </React.Fragment>
      );
  }
}

export default AnswerForm;