import React from "react";
import { Segment, Dropdown, Form, Button, Header } from "semantic-ui-react";
import API from "../../service/api";
import ParentChildLinkForm from './parent_child_link_form';

class QuestionCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      group_id: '',
      parent_answer_id: null,
      sort_order: '',
      groupDropdownOptions: [],
      changed: false,
    }
  }

  updateParentAnswer = (answer_id) => {
    this.setState({
      parent_answer_id: answer_id
    });
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
  }
  
  getGroups() {
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
    API.Question.create({
      group_id: this.state.group_id,
      name: this.state.name,
      description: this.state.description,
      parent_answer_id: this.state.parent_answer_id,
      sort_order: this.state.sort_order
    }).then(
      result => {
        this.props.reset();
      },
      error => {
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
        <Segment>
          <ParentChildLinkForm 
            updateParentAnswer={this.updateParentAnswer}  
            questions={this.props.questions} 
            onChange={() => this.setState({changed: true})}
          />
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label='Question' onChange={this.onChange} name='name' value={this.state.name} />
            <Form.Input label='Description' onChange={this.onChange} name='description' value={this.state.description} />
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
        </Segment>
      </React.Fragment>
    );
  }
}

export default QuestionCreateForm;