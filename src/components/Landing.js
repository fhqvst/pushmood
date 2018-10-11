import React from 'react';

import {
  Link as RouterLink
} from 'react-router-dom';
import * as routes from '../constants/routes';

import {
  Heading,
  Paragraph,
  Button,
  Code,
  styled
} from 'reakit';

import {
  Grid,
  Row,
  Col
} from 'react-styled-flexboxgrid';

import splash from './splash.svg';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const Splash = styled.img`
  width: 100%;
  margin-top: 2em;
`;

const Usp = styled(Col)`
  margin-top: 2em;
  text-align: center;
`;

const Usps = styled(Row)`
  background: white;
  margin-top: -8em;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const LandingPage = () =>
<Wrapper>
    <Grid container>
      <Row>
        <Col xs={12} style={{ textAlign: 'center' }}>
          <Heading>Get to know your coding habits</Heading>
          <Paragraph fontSize="1.2em">One <Code>git push</Code> at a time</Paragraph>
          <RouterLink to={routes.SIGNIN}>
            <Button palette="secondary" marginTop="1em">
              Get Started
            </Button>
          </RouterLink>
        </Col>
      </Row>
      <Row center="xs" style={{ position: 'relative', zIndex: -1 }}>
        <Col xs={8}>
          <Splash src={splash} />
        </Col>
      </Row>
      <Usps>
        <Usp xs={12} md={4}>
          <Heading as="h2">What is it?</Heading>
          <Paragraph>
            Configure a set of questions, and you'll be asked one of them each time you run <Code>git push</Code>.
          </Paragraph>
        </Usp>
        <Usp xs={12} md={4}>
          <Heading as="h2">How do I use it?</Heading>
          <Paragraph>
            You place a tiny shell script inside your <Code>.git/hooks</Code> folder.
          </Paragraph>
        </Usp>
        <Usp xs={12} md={4}>
          <Heading as="h2">Pricing?</Heading>
          <Paragraph>
            None. It is free to use for anyone.
          </Paragraph>
        </Usp>
      </Usps>
    </Grid>
  </Wrapper>

export default LandingPage;
