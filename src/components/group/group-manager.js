import React from "react";
import { List, Segment, Header } from 'semantic-ui-react';
import API from "../../service/api";
import GroupForm from './group-form';
class GroupManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      description: '',
      groups: []
    }
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = () => {
    API.Group.get().then(
      result => {
        console.log('re', result);
        this.setState({
          groups: result
        })
      },
      error => {

      }
    ) 
  }

  onSubmit = () => {
    const {name, description} = this.state;
    console.log('submitted');
    API.Group.create({
       name, description
    }).then(
      result => {
        console.log('resssult', result);
        this.resetForms();
        this.getGroups();
      },
      error => {

      }
    )
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
    })
  }

  
  resetForms() {
    this.setState({
      name:'',
      description:''
    });
  }

  render() {
    const groupForm = (
      <GroupForm 
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        name={this.state.name}
        description={this.state.description}
      />
    );
    const groups = this.state.groups.map((group) => {
      return (
       <List.Item key={group.id} id={group.id} onClick={this.expandImporttype}>
          <List.Content>
            <List.Header>{group.name}</List.Header>
          </List.Content>
          <List.Description>
            {group.description}
          </List.Description>
        </List.Item>
      );
    });

    return (
      <Segment>
        <Header> 
          manage groups
        </Header>
        {groupForm}
        <List divided relaxed>
          {groups}
        </List>

      </Segment>
    );
  }
}

export default GroupManager;