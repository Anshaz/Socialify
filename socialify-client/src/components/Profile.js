import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import moment from "moment";
import EditDetails from './EditDetails';

//MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import TodayIcon from '@material-ui/icons/Today';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

const WhiteOnBlueTooltip = withStyles({
    tooltip: {
        color: "white",
        backgroundColor: "#2196f3"
    }
})(Tooltip);

const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'

        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        //sending files to the server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location },
            loading,
            authenticated
        }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        <input type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange} />
                        <WhiteOnBlueTooltip title="Change Your Profile Picture" placement="bottom">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <AddAPhotoIcon color="primary" />
                            </IconButton>
                        </WhiteOnBlueTooltip>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`}
                            color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" />
                                <span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '} {website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <TodayIcon color="primary" /> {' '}
                        <span>Joined: {moment(createdAt).format('MMM YYYY')}</span>

                    </div>
                    <WhiteOnBlueTooltip title="Logout" placement="bottom">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary"></KeyboardReturn>
                        </IconButton>
                    </WhiteOnBlueTooltip>
                    <EditDetails />
                </div >
            </Paper >
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, please login again!
                </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                    </Button>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Sign Up
                    </Button>
                    </div>
                </Paper>
            )) : (<p>loading ...</p>)

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
