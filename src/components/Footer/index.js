import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Hidden, Link, Divider } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  style: {
    background: '#e6e6e6',
    minHeight: '8vh',
    marginTop: '20px'
  },
  copyrights: {
    fontSize: 15,
  },
  title: {
    fontFamily: 'Arial',
    color: '#333333',
    fontSize: 23,
    fontWeight: 500,
    marginTop: 10,
    marginLeft: 30,
  },
}));

const Footer = (props) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  let location = useLocation();
  if (location.pathname.indexOf('/admin') > -1) {
    return null;
  }
  return (
    <Grid container className={classes.style}>
      <Grid container>
        <Grid item xs={1}>
          {' '}
        </Grid>{' '}
        <Grid
          item
          container
          xs={5}
          md={2}
          style={{
            marginTop: 9,
          }}>
          <Link
            href="#"
            onClick={preventDefault}
            style={{
              textDecoration: 'none',
              color: '#4d4d4d',
            }}>
            <FacebookIcon fontSize="large" />
          </Link>{' '}
          <Link
            href="#"
            onClick={preventDefault}
            style={{
              textDecoration: 'none',
              color: '#4d4d4d',
            }}>
            <InstagramIcon fontSize="large" />
          </Link>{' '}
          <Link
            href="#"
            onClick={preventDefault}
            style={{
              textDecoration: 'none',
              color: '#4d4d4d',
            }}>
            <TwitterIcon fontSize="large" />
          </Link>{' '}
          <Link
            href="#"
            onClick={preventDefault}
            style={{
              textDecoration: 'none',
              color: '#4d4d4d',
            }}>
            <LinkedInIcon fontSize="large" />
          </Link>{' '}
        </Grid>{' '}
        <Grid item xs={2} sm={3} md={2}>
          {' '}
        </Grid>{' '}
        <Grid item xs={0} md={5}>
          <Hidden only={['sm', 'xs']}>
            <Typography className={classes.title}> Online Academic </Typography>{' '}
          </Hidden>{' '}
        </Grid>{' '}
        <Grid
          item
          xs={4}
          sm={3}
          md={2}
          style={{
            marginTop: 15,
          }}>
          <Typography className={classes.copyrights} color="textSecondary">
            © 2020 Devteam, Inc{' '}
          </Typography>{' '}
        </Grid>{' '}
      </Grid>{' '}
    </Grid>
  );
};

export default Footer;
