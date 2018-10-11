import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Heading,
  Button,
  Sidebar,
  Block,
  Backdrop,
  styled
} from 'reakit';
import { Grid, Row, Col } from 'react-styled-flexboxgrid';
import { User, LogOut, Menu } from 'react-feather';

import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
import { auth } from "../firebase";

const NavigationGrid = styled(Grid)`
  margin-top: 2em;
  margin-bottom: 2em;
  padding-top: 1em;
  padding-bottom: 1em;
`;

const Logo = styled(Heading)`
  position: relative;
  display: inline-block;
  // color: ${p => p.theme.palette.primary[0]};
  color: #ffc107;
  margin-bottom: 0;
  text-transform: lowercase;
  &&& {
    font-size: 20px;
  }

  &:after {
    display: block;
    content: ')';
    position: absolute;
    right: 17%;
    top: 50%;
    transform: rotate(90deg);
  }
`;

const IconButton = styled(Button).attrs({
  opaque: false
})`
  width: 2em;
  height: 2em;
  padding: 0;
  min-width: 0;
  text-align: center;
  margin: 0;

  svg {
    display: inline-block;
    margin-right: 0;
  }
`;

const SidebarNav = styled(Sidebar)`

  width: 80%;
  max-width: 12em;

  a, button {
    display: block;
    width: 100%;
    margin: 0;
  }

`;

const Navigation = () =>
    <NavigationGrid container>
      <Row center="xs">
        <Col xs={10} md={3}>
          <Link to={routes.LANDING}>
            <Logo>Pushmood</Logo>
          </Link>
        </Col>
        <Col xs={false} md={9}>
          <Row end="xs">
            <AuthUserContext.Consumer>
              { authUser => authUser ?
                  <NavigationoAuth /> :
                  <NavigationNonoAuth />
              }
            </AuthUserContext.Consumer>
          </Row>
        </Col>
        <Col md={false} xs={2}>
          <Sidebar.Container>
          {sidebar => (
            <Block>
              <IconButton opaque={false} as={Sidebar.Show} {...sidebar}>
                <Menu />
              </IconButton>
              <Backdrop fade as={Sidebar.Hide} {...sidebar} />
              <SidebarNav slide {...sidebar}>
                <AuthUserContext.Consumer>
                  { authUser => authUser ?
                      <NavigationoAuthMobile /> :
                      <NavigationNonoAuth />
                  }
                </AuthUserContext.Consumer>
              </SidebarNav>
            </Block>
          )}
        </Sidebar.Container>
        </Col>
      </Row>
    </NavigationGrid>

const NavButton = styled(Button)`
  padding-left: 1em;
  padding-right: 1em;

  &:hover,
  &:focus,
  .active & {
    box-shadow: none;
    color: ${p => p.theme.palette.primary[0]};
  }
`;

const NavItem = (props) =>
  <NavLink to={props.to} style={props.style}>
    <NavButton opaque={false} tone={4} palette="grayscale" padding={props.padding}>{props.children}</NavButton>
  </NavLink>

const NavigationoAuth = () =>
  <Fragment>
    <NavItem to={routes.QUESTIONS}>Questions</NavItem>
    <NavItem to={routes.ANSWERS}>Answers</NavItem>
    <NavItem to={routes.INSTALL} style={{ marginRight: '1em' }}>Install</NavItem>
    <NavItem to={routes.ACCOUNT}><User /></NavItem>
    <NavButton opaque={false} tone={4} palette="grayscale" onClick={auth.signout} padding="0"><LogOut /></NavButton>
  </Fragment>

const NavigationoAuthMobile = () =>
  <Fragment>
    <NavItem to={routes.QUESTIONS}>Questions</NavItem>
    <NavItem to={routes.ANSWERS}>Answers</NavItem>
    <NavItem to={routes.INSTALL}>Install</NavItem>
    <NavItem to={routes.ACCOUNT}>Account</NavItem>
    <NavButton opaque={false} tone={4} palette="grayscale" onClick={auth.signout} padding="0">Sign out</NavButton>
  </Fragment>


const NavigationNonoAuth = () =>
  <Fragment>
    <NavItem to={routes.SIGNIN}>Sign In</NavItem>
    <NavLink to={routes.SIGNUP} style={{ marginLeft: '1em' }}>
      <Button palette="primary">Sign Up</Button>
    </NavLink>
  </Fragment>

export default Navigation;
