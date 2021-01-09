import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Hidden,
  Avatar,
  Popper,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from 'react-router-dom';
import HoverMenu from './HoverMenu';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme) => ({
  style: {
    background: '#005580',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 22,
    fontWeight: 550,
  },
  textField: {
    width: '100%',
    color: 'white',
    background: 'white',
  },
  logInButton: {
    fontSize: 15,
    marginLeft: theme.spacing(18),
    marginTop: theme.spacing(1),
  },
  signUpButton: {
    marginLeft: theme.spacing(10),
    background: 'white',
    color: '#005580',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.8),
    },
  },
  avatar: {
    marginLeft: theme.spacing(35),
    cursor: 'pointer',
  },
  resize: {
    padding: theme.spacing(1),
    fontSize: 13,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  function TopRightContainer() {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn && props.user !== null) {
      return (
        <Grid container lg={1} md={2} alignItems="center" justify="center">
          {props.isAdmin ? (
            <Grid item md={1}>
              <Hidden only={['sm', 'xs']}>
                <NavLink
                  to="/admin"
                  style={{ textDecoration: 'none', color: '#00f' }}>
                  <Button className={classes.signUpButton}>Admin Panel</Button>
                </NavLink>{' '}
              </Hidden>
            </Grid>
          ) : null}
          <Grid item md={4}>
            <Hidden only={['sm', 'xs']}>
              <UserMenu avatar={props.user.user.avatar} />
            </Hidden>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container lg={3} md={5}>
        <Grid item md={4}>
          <Hidden only={['sm', 'xs']}>
            <Typography className={classes.logInButton}>
              <NavLink
                to="/login"
                style={{ textDecoration: 'none', color: '#fff' }}>
                Login
              </NavLink>
            </Typography>
          </Hidden>
        </Grid>
        <Grid item md={8}>
          <Hidden only={['sm', 'xs']}>
            <NavLink
              to="/signup"
              style={{ textDecoration: 'none', color: '#00f' }}>
              <Button className={classes.signUpButton}>Join for Free</Button>
            </NavLink>
          </Hidden>
        </Grid>
      </Grid>
    );
  }

  function handleSearch(query) {
    console.log(query);
  }
  return (
    <Grid container xs={12}>
      <AppBar position="static" className={classes.style}>
        <Toolbar>
          <Grid item md={2} sm={12}>
            <Typography variant="h5" className={classes.title}>
              <NavLink to="/" style={{ textDecoration: 'none', color: '#fff' }}>
                Online Academic
              </NavLink>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Hidden only={['sm', 'xs']}>
              <HoverMenu categories={props.allCategories} />
            </Hidden>
          </Grid>
          <Grid item md={5}>
            <Hidden only={['sm', 'xs']}>
              <Autocomplete
                freeSolo
                disableClearable
                id="free-solo-2-demo"
                options={props.allCategories.map((category) => category.title)}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      label="Search"
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        startAdornment: (
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        ),
                      }}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  );
                }}
              />
            </Hidden>
          </Grid>
          <TopRightContainer />
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;
