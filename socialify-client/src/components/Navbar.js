import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
           <AppBar>
               <Toolbar className ="nav-container">
                   <Button color = "transparent" component ={Link} to="/Login">
                       Login</Button>
                   <Button color = "transparent" component ={Link} to="/">
                       Home</Button>
                   <Button color = "transparent" component ={Link} to ="/signup">
                       Signup</Button>
               </Toolbar>

           </AppBar>
        )
    }
}

export default Navbar;
