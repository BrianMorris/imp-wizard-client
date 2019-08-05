import React from "react";
import { Grid, Header, Form, Segment, Button, Message } from "semantic-ui-react";
import { navigate } from "@reach/router";

class Login extends React.Component {
  render() {
    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            LOCATE Implementation Wizard
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input fluid icon="building" iconPosition="left" placeholder="Company" />
              <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
              <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />

              <Button
                fluid
                size="large"
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>Forget Password? Click Here</Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Login;
