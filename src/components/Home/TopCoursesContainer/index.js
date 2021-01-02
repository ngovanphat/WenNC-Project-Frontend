import React from 'react';
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
  const preventDefault = (event) => event.preventDefault();

  console.log(props);
  const courseList = props.newestCourses.map((course) => {
    return (
      <GridListTile key={course._id} cols={1}>
        <CourseCard  data={course} />
      </GridListTile>
    );
  });

  if(props.newestCoursesLoading) {
    return (
      <Grid container>
          <Grid item row xs={12}>
              <Typography variant="h4">Loading....</Typography>
          </Grid>
      </Grid>
    );
    }
    else if (props.newestCoursesErrMess) {
        return (
            <Grid container>
                <Grid item row xs={12}>
                    <Typography variant="h4">{props.newestCoursesErrMess}</Typography>
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
              <Link href="#" onClick={preventDefault} style={{ textDecoration: 'none', color: 'grey', marginRight: 20 }} className={classes.showMore}>
                Explore more
              </Link>
            </Typography>
          </Grid>
          <Grid container>
            <GridList cellHeight={380}  cols={5} xs={10} style={{marginLeft: 20}}>
              {courseList}
            </GridList>
          </Grid>  
        </Grid>
      )
}

export default TopCoursesContainer;