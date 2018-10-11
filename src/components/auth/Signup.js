import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Field,
  Label,
  Input,
  Heading,
  Paragraph,
  Button,
  Link as A,
  Card
} from 'reakit';

import {
  Grid,
  Row
} from 'react-styled-flexboxgrid';

import * as routes from '../../constants/routes';
import { auth, db } from '../../firebase';

const SignupPage = ({ history }) =>
  <div>
    <Grid container>
      <Row style={{ flexDirection: 'column', textAlign: 'center' }}>
        <Heading>Sign Up</Heading>
        <Paragraph>Welcome to the team. You'll love it here. <br/> Pinky promise.</Paragraph>
      </Row>
      <Card gutter="1em" palette="grayscale" tone={6} width="100%" marginTop="2em">
        <SignupForm history={history} />
      </Card>
    </Grid>
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.signup(email, password)
      .then(authUser => {
        db.createUser(authUser.user.uid, username, email)
          .then((res) => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.QUESTIONS);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      password,
      confirmPassword,
      error,
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Field>
          <Label>Username</Label>
          <Input
            type="text"
            value={username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Field>
        <Field>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={e => this.setState({ confirmPassword: e.target.value })}
          />
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={isInvalid}
          >
            Sign Up
          </Button>
        </Field>

        <div>
          {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignupLink = () =>
  <Paragraph>
    <A as={Link} to={routes.SIGNUP}>Sign Up</A>
  </Paragraph>

export default withRouter(SignupPage);

export {
  SignupForm,
  SignupLink,
};
