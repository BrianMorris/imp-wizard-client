import React from 'react';
import Cookie from 'js-cookie';
import { navigate } from '@reach/router';
import { Form, Header, Segment, Button, Grid} from 'semantic-ui-react';
import { API } from '../../service/api';

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
        if(result !== null) {
          if(result.error) {
            this.handleUnsuccessfulLogin(result.error);
          }
          else if (result.session_token){
            this.handleSuccessfulLogin(result);
          }
        }
      },
      error => {
        this.handleUnsuccessfulLogin('invalid login', error);
      }
    )
  }
  handleUnsuccessfulLogin(message, error) {
    this.setState({
      errors: [message]
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
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center'>
              LOCATE Admin Wizard  
            </Header>
          <Segment>
            {errorSegment}
            <Form size='large' onSubmit={this.handleLogin}>
              <Form.Input 
                fluid 
                icon="building" 
                iconPosition="left" 
                placeholder="Company" 
                name='subdomain' 
                onChange={this.onChange} 
                value={this.state.subdomain} 
              />
              <Form.Input 
                fluid 
                icon="user" 
                iconPosition="left" 
                placeholder="E-mail address" 
                name='email' 
                onChange={this.onChange} 
                value={this.state.email} 
              />
              <Form.Input 
                fluid 
                icon="lock" 
                iconPosition="left" 
                placeholder="Password" 
                type="password" 
                name='password'
                onChange={this.onChange} 
                value={this.state.password} 
              />
              <Button.Group fluid>
                <Button type='submit' name='submit' disabled={!this.state.changed} primary> Login </Button>
                <Button.Or />
                <Button name='forgot' onClick={(e) => e.preventDefault()} >Forgot Password?</Button>
              </Button.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}