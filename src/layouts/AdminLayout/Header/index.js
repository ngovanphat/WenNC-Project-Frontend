import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Avatar, Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { Colors } from "../../../helpers/colors";
import { logOut,resetUserProfile,resetAdminCheck } from "../../../redux/actions";
const useStyles = makeStyles(() => ({
  root: {
    background: Colors.primary
  },
  logo: {
    color: Colors.white,
    background: Colors.primary,
  },
}));

const mapStateToProps=state =>{
  return {
    login:state.login
  }
}

const mapDispatchToProps = (dispatch) => ({
  logOut: () => { dispatch(logOut()) },
  resetUserProfile:()=>{dispatch(resetUserProfile())},
  resetAdminCheck:()=>{dispatch(resetAdminCheck())},

});

const Header = ({ className, onMobileNavOpen, logOut, resetUserProfile, resetAdminCheck, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const history=useHistory();
  const handleLogout= async()=>{
  
      console.log("pressed");
      await logOut();
      await resetUserProfile();
      await resetAdminCheck();
      history.push('/');
  }
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }} />
        </Typography> 
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit"onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};
Header.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  logOut: PropTypes.func,
  resetUserProfile: PropTypes.func,
  resetAdminCheck: PropTypes.func
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);
