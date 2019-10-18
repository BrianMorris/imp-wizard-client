import React from "react";
import Cookie from 'js-cookie';
import { navigate } from "@reach/router";
import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { API } from "../../service/api.js";
import { errorHandler } from "../../service/errorHandler.js";
import UserContext from '../../userContext.js';

export class Login extends React.Component {
  static contextType = UserContext
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
        errorHandler(error);
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
    this.context.setCompany(this.state.subdomain);
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
          <Header as="h2" textAlign="center">
            LOCATE Implementation Wizard
          </Header>
          {errorSegment}
          <Form size="large" onSubmit={this.handleLogin}>
            <Segment>
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
             <Button.Group fluid >
                <Button type='submit' name='submit' disabled={!this.state.changed} primary> Login </Button>
                <Button.Or />
                <Button name='forgot' onClick={(e) => e.preventDefault()} >Forgot Password?</Button>
              </Button.Group>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
