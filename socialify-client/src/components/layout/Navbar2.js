import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//MUI Stuff
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//MUI Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//Redux stuff
import { connect } from 'react-redux';
import { colors } from "@material-ui/core";

const styles = (theme) => ({
    paper: {
        background: '#2196f31a',
        padding: 20,
        position: "absolute",
        top: 76,
        left: 150
    }
})

class Navbar2 extends Component {
    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location },
            loading,
            authenticated
        }
        } = this.props;

        return (
            <Toolbar className="nav-container">

                {authenticated ? (
                    <Fragment>
                        <Grid container spacing={6}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    Hey {handle}, Welcome Back.
                                </Paper>
                            </Grid>
                        </Grid>
                    </Fragment>
                ) : (
                        <Fragment>
                            <div></div>
                        </Fragment>
                    )}


            </Toolbar>

        );
    }
}

Navbar2.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    userHandle: PropTypes.string.isRequired,


}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    user: state.user

})

export default connect(mapStateToProps)(withStyles(styles)(Navbar2));
