import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player/lazy';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import VideoList from '../CourseDetail/VideoList';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    marginTop: 20,
    marginBottom: 30,
    paddingLeft: 12,
    paddingRight: 12
  },
  home: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: 550,
    marginTop: 40,
    marginLeft: 20
  },
  title: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 2,
    marginLeft: 20
  },
  video: {
    display: 'flex',
    justifyContent: 'center',
    height: '65vh'
  }
}));

export default function VideoPlayer() {
  const classes = useStyles();
  const course = useSelector(state => state.singleCourse.course);
  const path = useRouteMatch();
  const video = (course.videos.filter((video) => video._id === path.params.videoid))[0];
  return (
    <main>
      <Grid container>
        <Grid xs={7}>
          <Container maxWidth="lg" className={classes.heroContent}>
            <div className={classes.video}>
              <ReactPlayer
                width='95%'
                height='95%'
                controls
                url={video.link}
                onReady={() => console.log('onReady callback')}
                onStart={() => console.log('onStart callback')}
                onPause={() => console.log('onPause callback')}
                onEnded={() => console.log('onEnded callback')}
                onError={() => console.log('onError callback')}
              />
            </div>
            <Grid container spacing={1} xs={12}>
              <Grid item xs={6}>
                <Typography className={classes.title} align="start" color="textPrimary">
                  {video.title}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid xs={5}>
          <Container style={{ marginTop: 15, padding: 0 }} maxWidth="lg">
            <Typography align="start" variant="h6" style={{ fontWeight: 500, fontSize: 24 }}>
              <Link href="#" onClick={(event) => event.preventDefault()} style={{ textDecoration: "none", color: "black" }}>
                {course.title}
              </Link>
            </Typography>
          </Container>
          <Paper style={{ color: 'white', marginRight: 20, marginTop: 20 }} variant="outlined">
            <VideoList videos={course.videos} courseId={course._id} />
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
};