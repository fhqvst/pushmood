import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, injectGlobal, css } from 'reakit';
import defaultTheme from 'reakit-theme-default';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignupPage from './auth/Signup';
import SigninPage from './auth/Signin';
import ForgotPage from './auth/Forgot';
import AccountPage from './user/Account';
import InstallPage from './install/Install';
import QuestionsPage from './questions/Questions';
import AnswersPage from './answers/Answers';
import Footer from './Footer';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600');
  @import url('https://fonts.googleapis.com/css?family=Overpass+Mono:400,600');

  body {
    font-family: 'Overpass Mono', sans-serif;
    margin: 0;
    color: #414141;
  }

  a,
  a:visited {
    text-decoration: none;
  }
`;

const theme = {
  ...defaultTheme,

  palette: {
    ...defaultTheme.palette,
    secondary: ["#F4AD1F", "#F9BD43", "#FCCA67", "#FFDC96", "#FFE8BF"],
  },

  Button: css`
    ${defaultTheme.Button};
    font-weight: bold;
    padding-left: 1.5em;
    padding-right: 1.5em;

    svg {
      margin-right: 1em;
    }

    transition: 50ms;
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(.95);
    }
  `,

  Input: css`
    ${defaultTheme.Input};
    border: 2px solid ${defaultTheme.palette.border}
  `,

  Table: css`
    ${defaultTheme.Table};
    border: none;

    th {
      background-color: unset;
    }
    th:first-child {
      text-align: left;
    }

    th:not(:first-child),
    td:not(:first-child) {
      text-align: center;   
    }
  `,

  Field: css`
    ${defaultTheme.Field};
    & + & {
      margin-top: 1em;
    }
  `,

  Heading: css`
    ${defaultTheme.Heading};
    color: #444;
    font-weight: 600;

    h1& {
      font-size: 1.5em;
    }
    h2& {
      font-size: 1.2em;
    }
    h3& {
      font-size: 1em;
    }
    h4& {
      font-size: 0.8em;
    }
    h5& {
      font-size: 0.7em;
    }
    h6& {
      font-size: 0.625em;
    }
  `,

  Paragraph: css`
    ${defaultTheme.Paragraph};
    color: #444;
  `,

  flexboxgrid: {
    container: {
      sm: 48,
      md: 48,
      lg: 48
    }
  },


};

const App = () =>
  <Provider theme={theme}>
      <Router>
        <div>
          <Navigation />
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGNUP} component={() => <SignupPage />} />
          <Route exact path={routes.SIGNIN} component={() => <SigninPage />} />
          <Route exact path={routes.FORGOT} component={() => <ForgotPage />} />
          <Route exact path={routes.QUESTIONS} component={() => <QuestionsPage />} />
          <Route exact path={routes.ANSWERS} component={() => <AnswersPage />} />
          <Route exact path={routes.INSTALL} component={() => <InstallPage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Footer />
        </div>
      </Router>
  </Provider>

export default withAuthentication(App);
