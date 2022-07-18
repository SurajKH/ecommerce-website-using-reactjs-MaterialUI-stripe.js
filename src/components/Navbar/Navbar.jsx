//we are considering builiding a mobile responsive website
import React from "react";
import { AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography, Icon } from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import { ClassNames } from "@emotion/react";
import logo from '../../assets/commerce.png';
import useStyles from "./styles";
import {Link,useLocation} from "react-router-dom";

const Navbar = ({totalItems}) =>
{
    const classes=useStyles();
    const location=useLocation();
    
    return (
        <div>
          <AppBar position="fixed" className={ClassNames.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className="">
                    <img src={logo}  height="25px" className={classes.image} />
                    {/* Commerce.js */}
                </Typography>
                <Typography variant="h5"  align="center">E-Commerce Shopping Website </Typography>
                <div className={classes.grow} />
                {location.pathname === '/' && (
                <div className={classes.button}>
                {/* <Link to="/cart">go to cart</Link> */}
                    <IconButton component={Link} to="/cart" aria-label="Show Cart Items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                           <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div> ) }
            </Toolbar>
          </AppBar>
        </div>
    )
}
export default Navbar;