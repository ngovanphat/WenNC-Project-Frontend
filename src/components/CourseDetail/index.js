import React, { Component } from 'react';
import { Grid, Typography, List, Button, Paper, ListItem, Avatar, LinearProgress } from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';
import Image from 'material-ui-image';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UpdateIcon from '@material-ui/icons/Update';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import VideoList from './VideoList';
import CommentList from './CommentList';
import SameCourseList from './SameCourseList';

import { fetchSingleCourse } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    singleCourse: state.singleCourse,
    sameCourses: state.sameCourses,
    allComments: state.allComments
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSingleCourse: (id) => { dispatch(fetchSingleCourse(id)) }
});

class CourseDetail extends Component {

  componentDidMount() {
    this.props.fetchSingleCourse(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchSingleCourse(this.props.match.params.id);
    }
  }

  countRatingStar(comments, value) {
    let sum = 0;
    comments.forEach(comment => {
      if (comment.rating === value) sum = sum + 1;
    });
    return sum;
  }

  render() {
    const course = this.props.singleCourse.course;
    if (this.props.singleCourse.isLoading) {
      return (
        <Grid container alignItems="center">
          <Grid item row xs={12} >
            <Typography variant="h4">Loading....</Typography>
          </Grid>
        </Grid>
      );
    }
    else if (this.props.singleCourse.errMess) {
      return (
        <Grid container alignItems="center">
          <Grid item row xs={12}>
            <Typography variant="h4">{this.props.singleCourse.errMess}</Typography>
          </Grid>
        </Grid>
      );
    }
    else {
      return (
        <Grid container>
          <Grid container style={{ backgroundColor: '#1e1e1c' }}>
            <Grid container style={{ marginTop: 40, marginBottom: 40 }}>
              <Grid xs={1} />
              <Grid item xs={7}>
                <List >
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: 'bold',
                      fontSize: 28,
                      color: 'white'
                    }}>
                    {course.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    style={{
                      color: 'white',
                      fontSize: 18,
                      marginTop: 10
                    }}>
                    {course.shortDescription}
                  </Typography>

                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 5,
                    marginBottom: 5
                  }}>
                    <Typography variant="subtitle2" style={{ color: 'gold', marginRight: 10 }}>{course.points}</Typography>
                    <Rating value={course.points} precision={0.1} readOnly size="small" style={{ paddingTop: 2, paddingBottom: 2 }} />
                  </Grid>

                  <Typography variant="caption" style={{ fontSize: 14, color: 'white' }}>Created by {course.leturer.fullname}</Typography>

                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    marginTop: 5
                  }}>
                    <UpdateIcon style={{ marginRight: 10 }} />
                    <Typography variant="caption" >Last updated {course.last_updated}</Typography>
                  </Grid>

                  <Grid item container style={{ color: 'white', marginTop: 20, display: 'flex' }}>
                    <Button variant="outlined" color="inherit" endIcon={<FavoriteBorderIcon />} style={{ marginRight: 10 }}>Wishlist</Button>
                  </Grid>

                </List>
              </Grid>
              <Grid xs={3} style={{ marginLeft: 23 }}>
                <Image
                  imageStyle={{
                    height: 200
                  }}
                  style={{
                    padding: 0
                  }}
                  animationDuration
                  src={course.thumnail}
                />
              </Grid>
              <Grid xs={1} />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 20 }}>
            <Grid xs={1} />
            <Grid item xs={7} style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold'
                }}
              >Course content</Typography>
              <Typography variant="caption" style={{ marginTop: 30, marginBottom: 5, color: 'grey' }}>{course.videos.length} videos</Typography>
              <Paper style={{ color: 'white' }} variant="outlined">
                <VideoList videos={course.videos} courseId={course._id} />
              </Paper>
              {/*------------------Description---------------------*/}
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold', marginTop: 20
                }}
              >Description</Typography>
              <Typography variant="p" style={{ marginTop: 20 }}>
                {course.description}
              </Typography>

              {/*------------------Lecturer---------------------*/}
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  marginTop: 20
                }}
              >Instructor</Typography>

              <Grid container style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'column'

              }}>
                <Typography variant="h6" color="primary" style={{ fontWeight: 'bold' }}>{course.leturer.fullname}</Typography>
                <Grid container style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'row'
                }}>
                  <Avatar alt={course.leturer.fullname} src={course.leturer.avatar} style={{ width: 120, height: 120, marginRight: 10 }} />
                  <Grid item style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20
                  }}>
                    <Grid item style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                      <PlayCircleFilledIcon style={{ width: 20, height: 20, marginRight: 10, color: 'orange' }} />
                      <Typography variant="subtitle2" style={{ color: 'orange' }}>{course.leturer.course_list.length} courses</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Typography variant="p" variantMapping="p" style={{ marginTop: 20 }}>
                  {course.leturer.description}
                </Typography>
              </Grid>

              {/*------------------Rating---------------------*/}
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  marginTop: 20
                }}
              >Student feedback</Typography>

              <Grid container style={{ marginTop: 20 }}>
                <Grid xs={2} style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}>
                  <Typography variant="h2" style={{ color: 'orange', fontWeight: 'bold' }}>{course.points}</Typography>
                  <Rating value={course.points} precision={0.1} readOnly />
                  <Typography variant="subtitle2" style={{ color: 'orange', fontWeight: 'bold' }}>Course Rating</Typography>
                </Grid>
                <Grid xs={9} style={{
                  marginLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <LinearProgress variant="buffer" value={this.countRatingStar(this.props.allComments.comments, 5) * 100 / this.props.allComments.totalDocs} style={{ height: 10, width: 450, marginRight: 10 }} />
                    <Rating value={5} readOnly size="small" />
                    <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>{this.countRatingStar(this.props.allComments.comments, 5) * 100 / this.props.allComments.totalDocs}%</Typography>
                  </Grid>
                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <LinearProgress variant="buffer" value={this.countRatingStar(this.props.allComments.comments, 4) * 100 / this.props.allComments.totalDocs} style={{ height: 10, width: 450, marginRight: 10 }} />
                    <Rating value={4} readOnly size="small" />
                    <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>{this.countRatingStar(this.props.allComments.comments, 4) * 100 / this.props.allComments.totalDocs}%</Typography>
                  </Grid>
                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <LinearProgress variant="buffer" value={this.countRatingStar(this.props.allComments.comments, 3) * 100 / this.props.allComments.totalDocs} style={{ height: 10, width: 450, marginRight: 10 }} />
                    <Rating value={3} readOnly size="small" />
                    <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>{this.countRatingStar(this.props.allComments.comments, 3) * 100 / this.props.allComments.totalDocs}%</Typography>
                  </Grid>
                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <LinearProgress variant="buffer" value={this.countRatingStar(this.props.allComments.comments, 2) * 100 / this.props.allComments.totalDocs} style={{ height: 10, width: 450, marginRight: 10 }} />
                    <Rating value={2} readOnly size="small" />
                    <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>{this.countRatingStar(this.props.allComments.comments, 2) * 100 / this.props.allComments.totalDocs}%</Typography>
                  </Grid>
                  <Grid item style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <LinearProgress variant="buffer" value={this.countRatingStar(this.props.allComments.comments, 1) * 100 / this.props.allComments.totalDocs} style={{ height: 10, width: 450, marginRight: 10 }} />
                    <Rating value={1} readOnly size="small" />
                    <Typography color="primary" variant="caption" style={{ fontSize: 14, marginLeft: 10 }}>{this.countRatingStar(this.props.allComments.comments, 1) * 100 / this.props.allComments.totalDocs}%</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/*------------------Review---------------------*/}
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  marginTop: 20
                }}
              >Reviews</Typography>
              <Grid container style={{ marginTop: 20 }}>
                <CommentList
                  comments={this.props.allComments.comments}
                  isLoading={this.props.allComments.isLoading}
                  errMess={this.props.allComments.errMess}
                />
                <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination count={this.props.allComments.totalPages} page={1} />
                </Grid>
              </Grid>
              {/*------------------More Courses---------------------*/}
              <Typography
                variant="h5"
                style={{
                  fontWeight: 'bold',
                  marginTop: 20
                }}
              >More Courses of {course.category}</Typography>

              <Grid container style={{ marginTop: 20, marginBottom: 50, display: 'flex', justifyContent: 'space-between' }}>
                <SameCourseList
                  courses={this.props.sameCourses.courses}
                  isLoading={this.props.sameCourses.isLoading}
                  errMess={this.props.sameCourses.errMess}
                />
              </Grid>

            </Grid>
            <Grid item xs={3} style={{ marginLeft: 10, position: 'absolute', right: 100, bottom: 80 }}>
              <Paper >
                <Grid container style={{ padding: 10 }}>
                  <Grid container style={{
                    paddingTop: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'stretch'
                  }}>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>${course.price}</Typography>
                    <Typography variant="p" style={{ color: 'grey', marginLeft: 10, textDecoration: 'line-through' }}>${course.actualPrice}</Typography>
                    <Typography variant="h6" style={{ marginLeft: 10 }}>{100 - Math.ceil(course.price * 100 / course.actualPrice)}% off</Typography>
                  </Grid>

                  <Button variant="contained" fullWidth color="secondary" style={{ marginTop: 20, height: 50, fontWeight: 'bold' }}>
                    Join course
                  </Button>
                  <Button variant="outlined" fullWidth color="primary" style={{ marginTop: 5, height: 50, fontWeight: 'bold' }}>
                    Follow now
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs={1} />
          </Grid>
        </Grid>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseDetail));