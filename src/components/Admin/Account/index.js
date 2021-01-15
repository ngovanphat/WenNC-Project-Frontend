import React, { Component, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { NavLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import EditAccount from './EditAccount';
const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => {
    dispatch(fetchUserProfile());
  },
});

const Account = (props) => {
  const userProfile=useSelector(state=>state.userProfile)
  useEffect(() => {
    document.title = 'Account';
    props.fetchUserProfile();
  }, []);
  if (userProfile.isLoading) {
    return (
      <Grid container alignItems="center">
        <Grid item row xs={12}>
          <Typography variant="h4">Loading....</Typography>
        </Grid>
      </Grid>
    );
  } else if (props.userProfile.errMess) {
    return (
      <Grid container alignItems="center">
        <Grid item row xs={12}>
          <Typography variant="h4">
            {props.userProfile.errMess}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    let date = new Date(props.userProfile.user.user.createdAt);
    const theme = createMuiTheme();

    return (
      <div style={{ height: '100%', width: '100%', overflow: 'auto', marginRight: '10px', marginLeft: '10px' }}>
        <Container
          maxWidth="lg"
          style={{
            backgroundColor: 'white',
            padding: theme.spacing(4, 4),
            marginTop: 40,
            marginBottom: 30,
          }}>
          <Typography
            style={{
              fontFamily: 'Arial',
              fontSize: 22,
              fontWeight: 550,
              marginBottom: 10,
            }}
            align="start"
            color="textPrimary">
            Profile
          </Typography>
          <Grid container direction="row">
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              xs={6}>
              <Grid item>
                <Avatar
                  src={props.userProfile.user.user.avatar}
                  style={{
                    marginTop: 10,
                    width: theme.spacing(20),
                    height: theme.spacing(20),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={6}>
              <List
                style={{
                  width: '100%',
                  maxWidth: 360,
                  backgroundColor: theme.palette.background.paper,
                }}>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Full name"
                    secondary={props.userProfile.user.user.fullname}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={props.userProfile.user.user.email}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Member since"
                    secondary={
                      date.getDate() +
                      '/' +
                      (date.getMonth() + 1) +
                      '/' +
                      date.getFullYear()
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}>
              <EditAccount></EditAccount>
          </Grid>
        </Container>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
