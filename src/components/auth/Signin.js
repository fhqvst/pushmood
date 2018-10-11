import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Field,
  Input,
  Label,
  Button,
  Heading,
  Paragraph,
  Card,
  Flex
} from 'reakit';
import { GitHub } from 'react-feather';
import {
  Grid,
  Row
} from 'react-styled-flexboxgrid';

import { PasswordForgetLink } from './Forgot';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SigninPage = ({ history }) =>
  <div>
    <Grid container>
      <Row style={{ flexDirection: 'column', textAlign: 'center' }}>
        <Heading>Welcome, Friend'o!</Heading>
        <Paragraph>
          Let's get your started.
        </Paragraph>
      </Row>
      <Card gutter="1em" palette="grayscale" tone={6} width="100%" marginTop="2em">
        <SigninForm history={history} />
        <PasswordForgetLink />
      </Card>
      <Flex column>
        <GithubButton history={history} />
      </Flex>
    </Grid>
  </div>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class GithubButton extends Component {
  render() {
    return (
      <Button palette="grayscale" tone={6} marginTop="1em" onClick={this.handleClick}>
        <GitHub /> Sign In with GitHub
      </Button>
    );
  }

  handleClick = (event) => {
    const {
      history,
    } = this.props;

    auth.signInWithGithub()
      .then(authUser => {
        history.push(routes.QUESTIONS);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }
}

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.signin(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.QUESTIONS);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
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
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Email Address"
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password"
          />
        </Field>
        <Field>
          <Button type="submit" disabled={isInvalid}>Sign In</Button>
        </Field>
      </form>
    );
  }
}

export default withRouter(SigninPage);

export {
  SigninForm,
}
