import React from "react";
import {Dropdown, Form, Button } from "semantic-ui-react";
import ParentChildLinkForm from './parent_child_link_form';
import { API } from "../../service/api";
import { errorHandler } from "../../service/errorHandler";

class QuestionUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.question.name,
      description: this.props.question.description || '',
      group_id: this.props.question.group.id,
      parent_answer_id: null,
      sort_order: this.props.question.sort_order,
      groupDropdownOptions: [],
      eligibleParentQuestions: [],
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
    this.getGroups();
    this.seedEligibleParentQuestions();
  }

  getGroups() {
    API.Group.get().then(
      result => {
        this.mapGroupOptions(result);
      },
      error => {
        errorHandler(error);
      }
    )
  }

  seedEligibleParentQuestions() {
    const group_id = this.props.question.group_id;
    API.Question.get({group_id}).then(
      result => {
        const eligibleQuestions = result.filter((question) => question.id !== this.props.question.id);
        this.setState({
          eligibleParentQuestions: eligibleQuestions 
        })
      },
      error => {
        errorHandler(error);
      }
    );
  }

  updateParentAnswer = (answer_id) => {
    this.setState({
      parent_answer_id: answer_id
    });
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
    API.Question.update({
      question_id: this.props.question.id,
      group_id: this.state.group_id,
      name: this.state.name,
      parent_answer_id: this.state.parent_answer_id,
      description: this.state.description,
      sort_order: this.state.sort_order
    }).then(
      result => {
        this.props.reset();
      },
      error => {
        errorHandler(error);
      }
    )
 }
  

  render() {
    return (
      <React.Fragment>
        <ParentChildLinkForm 
          question={this.props.question}
          updateParentAnswer={this.updateParentAnswer}  
          questions={this.state.eligibleParentQuestions} 
          onChange={() => this.setState({changed: true})}
        />
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
          <Button disabled={!this.state.changed} primary> Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default QuestionUpdateForm;