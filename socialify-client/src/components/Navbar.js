import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
           <AppBar>
               <Toolbar className ="nav-container">
                   <Button color = "default" component ={Link} to="/Login">
                       Login</Button>
                   <Button color = "default" component ={Link} to="/">
                       Home</Button>
                   <Button color = "default" component ={Link} to ="/signup">
                       Signup</Button>
               </Toolbar>

           </AppBar>
        )
    }
}

export default Navbar;
