import React from 'react';
import Cookie from 'js-cookie';
import { navigate } from '@reach/router';
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import API from '../../service/api';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subdomain: '',
      email: '',
      password: '',
      errors: [],
      changed: false
    }
  }

  componentDidMount() {
    this.setState({
      errors: []
    });
  }
  
  handleLogin = () => {
    // handle logic for validating login for admin. 
    const {subdomain, email, password} = this.state;
    API.User.login({subdomain, email, password}).then(
      result => {
        if(result.error) {
          this.handleUnsuccessfulLogin(result.error);
        }
        else if (result.session_token){
          this.handleSuccessfulLogin(result);
        }
      },
      error => {
        this.handleUnsuccessfulLogin('invalid login');
      }
    )
  }
  handleUnsuccessfulLogin(error) {
    console.log('login err', error);
    let errorArr = this.state.errors;
    errorArr.push(error);
    this.setState({
      errors: errorArr 
    });
  }

  handleSuccessfulLogin(result) {
    Cookie.set('session_token', result.session_token);
    navigate("/");
  }

  onChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      changed: true
    })
  } 

  render() {
    let errorSegment = null
    if(this.state.errors) {
      errorSegment = this.state.errors.map((error, index) => {
        return (
          <Segment className='warning' key={index} >
          {error}
        </Segment>
        );
     });
    }

    return (
      <Segment>
        <Header textAlign='center'>
          Login
        </Header>
        {errorSegment}
        <Form onSubmit={this.handleLogin}>
          <Form.Field>
            <Form.Input label='Subdomain' name='subdomain' onChange={this.onChange} value={this.state.subdomain}  />
          </Form.Field>
          <Form.Field>
            <Form.Input label='Email' name='email' onChange={this.onChange} value={this.state.email}  />
          </Form.Field>
          <Form.Field>
            <Form.Input label='Password' name='password' type='password' onChange={this.onChange} value={this.state.password}  />
          </Form.Field>
          <Button disabled={!this.state.changed} primary> Login </Button>
        </Form>
      </Segment>
    );
  }
}