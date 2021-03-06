import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Link, GridList, GridListTile } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import CourseCard from './CourseCard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    margin: 20,
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

  const courseList = props.courses.map((course) => {
    return (
      <GridListTile key={course._id} cols={1}>
        <CourseCard data={course} />
      </GridListTile>
    );
  });

  if (props.coursesLoading) {
    return (
      <Grid container>
        <Grid item row xs={12}>
          <Typography variant="h4">Loading....</Typography>
        </Grid>
      </Grid>
    );
  }
  else if (props.coursesErrMess) {
    return (
      <Grid container>
        <Grid item row xs={12}>
          <Typography variant="h4">{props.coursesErrMess}</Typography>
        </Grid>
      </Grid>
    );
  }
  else
    return (
      <Grid container direction="column" spacing={2}>
        <Grid className={classes.wrapper} container>
          <Typography className={classes.lable}>{props.label}</Typography>
          <Typography>
            <Link component={RouterLink} to='/categories' style={{ textDecoration: 'none', marginRight: 20 }} className={classes.showMore}>
              Explore more
            </Link>
          </Typography>
        </Grid>
        <Grid container>
          <GridList cellHeight={380} cols={5} xs={10} style={{ marginLeft: 20 }}>
            {courseList}
          </GridList>
        </Grid>
      </Grid>
    )
}

export default TopCoursesContainer;