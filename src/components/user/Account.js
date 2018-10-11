import React from 'react';
import {
  Heading,
  Block
} from 'reakit';
import {
 Grid
} from 'react-styled-flexboxgrid';

import AuthUserContext from '../AuthUserContext';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from "../withAuthorization";

const AccountPage = () =>
  <div>
    <Grid container>
      <AuthUserContext.Consumer>
        {authUser =>
          <div>
            <Heading as="h1">Account</Heading>
            <Block marginTop="2em">
              <Heading as="h2">Change Password</Heading>
              <PasswordChangeForm />
            </Block>
          </div>
        }
      </AuthUserContext.Consumer>
    </Grid>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage)
