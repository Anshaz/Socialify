import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import PostScream from './PostScream';
//MUI Stuff
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppIcon from "../images/logo.png";
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <img src={AppIcon} alt="logo" />
          {authenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>
            </Fragment>
          ) : (
              <Fragment>
                <Button color="default" component={Link} to="/Login">
                  Login
          </Button>
                <Button color="default" component={Link} to="/">
                  Home
          </Button>
                <Button color="default" component={Link} to="/signup">
                  Signup
          </Button>
              </Fragment>
            )}

        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
