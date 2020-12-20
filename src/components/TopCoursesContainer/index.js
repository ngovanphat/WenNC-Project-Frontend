import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import CourseCard from './CourseCard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '83%',
    margin: '0 auto',
    alignItems: 'center',
    justify: 'center'
  },
  lable: {
    flexGrow: '1',
    fontSize: 25,
    fontWeight: 700
  },
  showMore: {
    textDecoration: 'none',
    color: '#005580',
    '&:hover': {
      color: fade(theme.palette.info.light, 1),
    }
  }
}));

const TopCoursesContainer = (props) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid className={classes.wrapper} item container>
        <Typography className={classes.lable}>{props.label}</Typography>
        <Typography>
          <Link href="#" onClick={preventDefault} style={{ textDecoration: 'none' }} className={classes.showMore}>
            Explore more
          </Link>
        </Typography>
      </Grid>
      <Grid item container spacing={2} direction="row">
        <Grid item xs={2} md={1}></Grid>
        <Grid item xs={4} sm={5} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={4} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={0} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={0} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={0} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={2} md={1}></Grid>
      </Grid>
      <Grid item container spacing={2} direction="row">
        <Grid item xs={2} md={1}></Grid>
        <Grid item xs={4} sm={5} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={4} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={0} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={0} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={0} md={2}>
          <CourseCard></CourseCard>
        </Grid>
        <Grid item xs={2} md={1}></Grid>
      </Grid>
    </Grid>
  )
}

export default TopCoursesContainer;