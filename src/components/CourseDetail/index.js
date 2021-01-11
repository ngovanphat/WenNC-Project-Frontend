import React, { Component } from 'react';
import { Grid, Typography, List, Button, Paper, TextField, Avatar, LinearProgress, Modal } from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';
import Image from 'material-ui-image';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import UpdateIcon from '@material-ui/icons/Update';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import VideoList from './VideoList';
import CommentList from './CommentList';
import SameCourseList from './SameCourseList';

import { addFeedback, addVideo ,fetchSingleCourse, joinCourse, addToWishlist, fetchMyWishlist, fetchMyCourses, removeFromWishlist, fetchAllCourses } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    myWishlist: state.myWishlist,
    myCourses: state.myCourses,
    singleCourse: state.singleCourse,
    sameCourses: state.sameCourses,
    allComments: state.allComments,
    userProfile: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMyWishlist: () => { dispatch(fetchMyWishlist()) },
  fetchMyCourses: () => { dispatch(fetchMyCourses()) },
  fetchSingleCourse: (id) => { dispatch(fetchSingleCourse(id)) },
  joinCourse: (input) => { dispatch(joinCourse(input)) },
  addToWishlist: (input) => { dispatch(addToWishlist(input)) },
  removeFromWishlist: (input) => { dispatch(removeFromWishlist(input)) },
  addFeedback: (feedback) => { dispatch(addFeedback(feedback))},
  addVideo: (video) => {dispatch(addVideo(video))},
});

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      rating: 5,
      comment: '',
      openModal: false,
      videoUrl: '',
      videoLength: '',
      videoTitle: ''
    }
  }

  handleOpenModal() {
    this.setState({
      ...this.state,
      openModal: true
    })
  }
  handleCloseModal() {
    this.setState({
      ...this.state,
      openModal: false
    })
  }

  componentDidMount() {
    this.props.fetchMyWishlist();
    this.props.fetchMyCourses();
    this.props.fetchSingleCourse(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchSingleCourse(this.props.match.params.id);
    }
  }

  handleClick = async (e) => {
    e.preventDefault();
    await this.props.joinCourse({ 'userId': this.props.userProfile.user.user._id, 'courseId': this.props.match.params.id });
  };

  handlePress = async (e) => {
    e.preventDefault();
    await this.props.addToWishlist({ 'userId': this.props.userProfile.user.user._id, 'courseId': this.props.match.params.id });
  };

  handleRemovePress = async (e) => {
    e.preventDefault();
    await this.props.removeFromWishlist({ 'userId': this.props.userProfile.user.user._id, 'courseId': this.props.match.params.id });
  };

  notifyLogin = async (e) => {
    e.preventDefault();
    alert("Please login!");
  }

  countRatingStar(comments, value) {
    let sum = 0;
    comments.forEach(comment => {
      if (comment.rating === value) sum = sum + 1;
    });
    return sum;
  }

  checkIsInWishlist() {
    if (this.props.myWishlist.errMess) {
      return -1;
    }
    let favorite_list = this.props.myWishlist.courses.favorite_list;
    for (let i = 0; i < favorite_list.length; i++) {
      if (favorite_list[i]._id == this.props.match.params.id)
        return 1;
    }
    return 0;
  }

  renderWishlistButton() {
    let isFavorited = this.checkIsInWishlist();
    if (isFavorited == 1) {
      return (
        <Button onClick={(e) => this.handleRemovePress(e)} variant="outlined" color="inherit" endIcon={<FavoriteIcon style={{ color: 'red' }} />} style={{ marginRight: 10 }}>Wishlist</Button>
      )
    }
    else if (isFavorited == 0) {
      return (
        <Button onClick={(e) => this.handlePress(e)} variant="outlined" color="inherit" endIcon={<FavoriteBorderIcon />} style={{ marginRight: 10 }}>Wishlist</Button>
      );
    }
    return (
      <Button onClick={(e) => this.notifyLogin(e)} variant="outlined" color="inherit" endIcon={<FavoriteBorderIcon />} style={{ marginRight: 10 }}>Wishlist</Button>
    )
  }

  checkIsJoined() {
    if (this.props.myCourses.errMess) {
      return -1;
    }
    let join_list = this.props.myCourses.courses.join_list;
    for (let i = 0; i < join_list.length; i++) {
      if (join_list[i]._id == this.props.match.params.id)
        return 1;
    }
    return 0;
  }

  renderJoinCourseMenu() {
    const course = this.props.singleCourse.course;
    let isJoined = this.checkIsJoined();
    if (isJoined == 1) {
      return (
        <Grid item xs={3} style={{ marginLeft: 10, position: 'absolute', right: 100, bottom: 120, width: '100%' }}>
          <Paper >
            <Grid container style={{ padding: 10 }}>
              <Grid container style={{
                paddingTop: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'stretch'
              }}>
                <Typography variant="p" style={{ color: 'textSecondary', marginLeft: 10 }}>Browse recently launched courses and see what's new in your favorite subjects.</Typography>
              </Grid>
              <Button variant="outlined" fullWidth style={{ marginTop: 10, height: 50, fontWeight: 'bold', borderColor: "#005580", color: '#005580' }}>
                <NavLink to='/categories' style={{ textDecoration: 'none', marginLeft: 5, color: '#005580' }} >
                  Explore new courses
                </NavLink>
              </Button>
            </Grid>
          </Paper>
        </Grid>
      )
    }
    else if (isJoined == 0) {
      return (
        <Grid item xs={3} style={{ marginLeft: 10, position: 'absolute', right: 100, bottom: 120, width: '100%' }}>
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
              <Button onClick={(e) => this.handleClick(e)} variant="contained" fullWidth color="secondary" style={{ marginTop: 20, height: 50, fontWeight: 'bold' }}>
                Join course
              </Button>
              <Button variant="outlined" fullWidth color="primary" style={{ marginTop: 5, height: 50, fontWeight: 'bold' }}>
                Follow now
            </Button>
            </Grid>
          </Paper>
        </Grid>
      );
    }
    return (
      <Grid item xs={3} style={{ marginLeft: 10, position: 'absolute', right: 100, bottom: 120 }}>
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
            <Button onClick={(e) => this.notifyLogin(e)} variant="contained" fullWidth color="secondary" style={{ marginTop: 20, height: 50, fontWeight: 'bold' }}>
              Join course
            </Button>
            <Button variant="outlined" fullWidth color="primary" style={{ marginTop: 5, height: 50, fontWeight: 'bold' }}>
              Follow now
            </Button>
          </Grid>
        </Paper>
      </Grid>
    )
  }



  render() {
    const course = this.props.singleCourse.course;
    if (this.props.singleCourse.isLoading || this.props.myWishlist.isLoading || this.props.myCourses.isLoading) {
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
      let date = new Date(course.last_updated);
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
                    <Typography variant="caption" >Last updated {date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Typography>
                  </Grid>

                  <Grid item container style={{ color: 'white', marginTop: 20, display: 'flex' }}>
                    {this.renderWishlistButton()}
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
              <Grid container style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="caption" style={{ marginTop: 30, marginBottom: 5, color: 'grey' }}>{course.videos.length} videos</Typography>
                {
                  !this.props.userProfile.user ?  <div></div> : course.leturer._id === this.props.userProfile.user.user._id ? 
                  <div>
                  <Button  variant="outlined"  color="primary" onClick={() => {
                      this.handleOpenModal();
                      console.log(this.state.openModal)
                  }}>
                    Upload Video
                  </Button> 
                  <Modal
                    open={this.state.openModal}
                    onClose={() => this.handleCloseModal()}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <Paper style={{width: 400, position: 'absolute', top: 250, left: 500, border: 'none'}}>
                      <Grid style={{padding: 20}}>
                        <Typography variant="h6">Video URL:</Typography>
                        <Grid xs={10} style={{marginLeft: 20, display: 'flex', flexDirection: 'column'}}>
                          <TextField
                            id="filled-full-width"
                            margin="normal"
                            placeholder="Video title"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={this.state.videoTitle}
                            onChange={(e) => this.setState({...this.state, videoTitle: e.target.value})}
                          />
                           <TextField
                            id="filled-full-width"
                            margin="normal"
                            placeholder="Video URL"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={this.state.videoUrl}
                            onChange={(e) => this.setState({...this.state, videoUrl: e.target.value})}
                          />
                          <TextField
                            id="filled-full-width"
                            margin="normal"
                            placeholder="Video Length"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={this.state.videoLength}
                            onChange={(e) => this.setState({...this.state, videoLength: e.target.value})}
                          />
                          <Grid container xs={12} style={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}>
                            <Button style={{backgroundColor: '#005580', color: 'white' }} variant="contained" onClick={() => {
                               this.props.addVideo({
                                title: this.state.videoTitle,
                                length:  this.state.videoLength,
                                course: course._id,
                                link: this.state.videoUrl
                              })
                              this.handleCloseModal();
                            }}>
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                      
                      </Grid>
                      
                      </Paper>
                  </Modal>
                  </div>
                  : 
                  <div></div>
                }
              </Grid>
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
                <Grid xs={6}>
                  <td dangerouslySetInnerHTML={{__html: course.description}} />
                </Grid>
                
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
                
                {
                  this.props.userProfile.user ? 
                  <Grid xs={12} style={{display: 'flex', flexDirection: 'row'}}>
                  
                    <Grid item xs={1}>
                      <Avatar alt={this.props.userProfile.user.user.fullname} src={this.props.userProfile.user.user.avatar} style={{ width: 60, height: 60, marginRight: 10 }} />
                    </Grid> 
                    <Grid xs={10} style={{marginLeft: 20, display: 'flex', flexDirection: 'column'}}>
                      <Rating value={this.state.rating} onChange={(e) => this.setState({...this.state, rating: e.target.value})}/>
                      <TextField
                        id="filled-full-width"
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={this.state.comment}
                        onChange={(e) => this.setState({...this.state, comment: e.target.value})}
                      />
                      <Grid container xs={12} style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                        <Button style={{backgroundColor: '#005580', color: 'white' }} variant="contained" onClick={() => {
                          
                          if(this.checkIsJoined()){
                            this.props.addFeedback({
                              title: this.state.comment,
                              rating:  this.state.rating,
                              course: course._id,
                              userId: this.props.userProfile.user.user._id
                            })
                          }
                          else {
                            alert("Join course to comment");
                          }
                        }}>
                          Comment
                        </Button>
                      </Grid>
                    </Grid>
                    
                   </Grid> : <div></div>
                }
                {
                  (this.props.allComments.isLoading || this.props.allComments.errMess || this.props.allComments.comments.length === 0) ? 
                  <div></div> :
                  <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Pagination count={this.props.allComments.totalPages} page={1} />
                  </Grid>
                }
               
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
            {/* <Grid item xs={3} style={{ marginLeft: 10, position: 'absolute', right: 100, bottom: 80, width: '100%' }}>
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
                  <Button onClick={(e) => this.handleClick(e)} variant="contained" fullWidth color="secondary" style={{ marginTop: 20, height: 50, fontWeight: 'bold' }}>
                    Join course
                  </Button>
                  <Button variant="outlined" fullWidth color="primary" style={{ marginTop: 5, height: 50, fontWeight: 'bold' }}>
                    Follow now
                  </Button>
                </Grid>
              </Paper>
            </Grid> */}
            {this.renderJoinCourseMenu()}
            <Grid xs={1} />
          </Grid>
        </Grid>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseDetail));