import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//Redux stuff
import { editUserDetails } from '../redux/actions/userActions';
import { connect } from 'react-redux';

//Dialog/MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right',
    }
});
const WhiteOnBlueTooltip = withStyles({
    tooltip: {
        color: "white",
        backgroundColor: "#2196f3"
    }
})(Tooltip);

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <WhiteOnBlueTooltip title="Edit Details" placement="bottom">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary">

                        </EditIcon>
                    </IconButton>
                </WhiteOnBlueTooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="Tell your friends about yourself"
                            className={classes.TextField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            placeholder="Mention your website link"
                            className={classes.TextField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth
                        /><TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where do you live?"
                            className={classes.TextField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="outlined" color="secondary">Cancel</Button>
                        <Button onClick={this.handleSubmit} variant="outlined" color="secondary">Submit</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
