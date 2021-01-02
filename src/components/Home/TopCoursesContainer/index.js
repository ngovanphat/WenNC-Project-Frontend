import React from 'react';
import { Grid, Typography, Link, GridList, GridListTile } from '@material-ui/core';
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

  console.log(props);
  const courseList = props.newestCourses.map((course) => {
    return (
      <GridListTile key={course._id} cols={1}>
        <CourseCard  data={course} />
      </GridListTile>
    );
  });

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
      <Grid container>
        <Grid xs={1} />
        <GridList cellHeight={380}  cols={5} xs={10} style={{marginLeft: 20}}>
          {courseList}
        </GridList>
        <Grid xs={1} />
      </Grid>  
     </Grid>
  )
}

export default TopCoursesContainer;