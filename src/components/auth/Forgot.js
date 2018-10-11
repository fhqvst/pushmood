import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Link as A,
  Paragraph,
  Card,
  Field,
  Input,
  Label,
  Button
} from 'reakit';

import {
  Grid,
  Row
} from 'react-styled-flexboxgrid';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const ForgotPage = () =>
  <Grid container>
    <Row style={{ flexDirection: 'column', textAlign: 'center' }}>
      <Heading>Forgot your password?</Heading>
      <Paragraph>Don't worry, you'll have it back in no time.</Paragraph>
    </Row>
    <PasswordForgotForm />
  </Grid>
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.reset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error
    } = this.state;

    const isInvalid = email === '';

    return (
      <Card gutter="1em" palette="grayscale" tone={6} width="100%" marginTop="2em">
        <form>
          {error && (
            <Card gutter="1em" palette="danger" tone={7}>
              <div>
              {error.message}
              </div>
            </Card>
          )}
          <Field>
            <Label>Email</Label>
            <Input
              value={this.state.email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              placeholder="Email Address"
            />
          </Field>
          <Field>
            <Button type="submit" disabled={isInvalid}>Reset Password</Button>
          </Field>
        </form>
      </Card>
    );
  }
}

const PasswordForgetLink = () =>
  <Paragraph>
    <A as={Link} to={routes.FORGOT}>Forgot Password?</A>
  </Paragraph>

export default ForgotPage;

export {
  PasswordForgotForm,
  PasswordForgetLink,
};
