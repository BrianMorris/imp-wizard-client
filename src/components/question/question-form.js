import React from "react";
import {Dropdown, Form, Button, Header } from "semantic-ui-react";
import API from "../../service/api";

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.question.name,
      description: this.props.question.description || '',
      group_id: this.props.question.group.id,
      sort_order: this.props.question.sort_order,
      groupDropdownOptions: [],
      changed: false
    }
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      changed: true
    })
  }

  onDropdownChange = (e, data) => {
    const {name, value} = data;
    this.setState({
      [name]: value,
      changed: true
    })
  }

  componentDidMount() {
    API.Group.get().then(
      result => {
        this.mapGroupOptions(result);
      },
      error => {

      }
    )
  }

  mapGroupOptions(groups) {
    const mappedGroups = groups.map((group) => {
      group.key = group.id;
      group.text = group.name;
      group.active = null;
      group.value = group.id;
      return group;
    })

    this.setState({
      groupDropdownOptions: mappedGroups
    });
  }

 handleSubmit = (e) => {
    API.Question.updateQuestion({
      question_id: this.props.question.id,
      group_id: this.state.group_id,
      name: this.state.name,
      description: this.state.description,
      sort_order: this.state.sort_order
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

    let parentButton = null;
    if(this.props.has_parent) {
      parentButton = <div>
          <Header>Parent question info...</Header>
          <Button>Parent Question</Button>
        </div>
    }

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label='question' onChange={this.onChange} name='name' value={this.state.name} />
          <Form.Input label='description' onChange={this.onChange} name='description' value={this.state.description} />
          <Form.Group width='16'>
            <Form.Field width='12'>
              <label> Group </label>
              <Dropdown 
                onChange={this.onDropdownChange } 
                name='group_id'
                search 
                selection 
                value={this.state.group_id}
                options={this.state.groupDropdownOptions} 
                />
            </Form.Field>
            <Form.Input width='4' label='Sort Order' onChange={this.onChange} type="number" name='sort_order' min="1" value={this.state.sort_order} />
          </Form.Group>
          {/* <Form.Field>
            <label> Parent Question </label>
            <input placeholder='N/A' />
          </Form.Field> */}
          <Button disabled={!this.state.changed} primary> Submit</Button>
          {/* {parentButton} */}
        </Form>
      </React.Fragment>
    );
  }
}

export default QuestionForm ;