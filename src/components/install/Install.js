import React from 'react';
import {
  Heading,
  Block,
  Code,
  Paragraph
} from 'reakit';
import {
 Grid
} from 'react-styled-flexboxgrid';

import AuthUserContext from '../AuthUserContext';
import withAuthorization from '../withAuthorization';
import generateHook from '../../generateHook';

const INSTALL_URL = 'https://us-central1-pushmood-app.cloudfunctions.net/install';

const InstallPage = () =>
  <div>
    <Grid container>
      <Heading>Installation</Heading>
      <Block maxWidth="400px">
        <Paragraph>Pushmood is installed <strong>per-repository</strong>.</Paragraph>
      </Block>
      
      <Heading as="h2">Automatic install (very easy)</Heading>
      <Block maxWidth="400px">
        <Paragraph>Copy the code below and paste it into your terminal.</Paragraph>
      </Block>
      <Code block marginTop="2em" whiteSpace="nowrap" overflowX="auto">
        <AuthUserContext.Consumer>
  {authUser => `curl "${INSTALL_URL}?userId=${authUser.uid}" -so .git/hooks/pre-push && chmod +x .git/hooks/pre-push`}
        </AuthUserContext.Consumer>
      </Code>

      <Heading as="h2" marginTop="2em">Manual install (also quite easy)</Heading>
      <Block maxWidth="400px">
        <Paragraph>Copy the code below and store it in a file called <Code>pre-push</Code> inside your <Code>.git/hooks</Code> folder.</Paragraph>
        <Paragraph>Next, run <Code>chmod +x .git/hooks/pre-push</Code> and you're done!</Paragraph>
      </Block>
      <Code block marginTop="2em">
        <AuthUserContext.Consumer>
          {authUser => generateHook(authUser.uid)}
        </AuthUserContext.Consumer>
      </Code>
    </Grid>
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(InstallPage);
