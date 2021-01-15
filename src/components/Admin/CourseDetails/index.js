import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Chip,
  colors,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import VideoList from './VideoList';
import { Link } from 'react-router-dom';
import NumberFormatCustom from './NumberFormatCustom';
import {
  AdminCourseDetailsChange,
  setAdminCourseDetails,
} from '../../../redux/actions';
import { Alert, Skeleton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';

function isObjectEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

const styles = {
  root: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    backgroundColor: '#fafafa',
  },
  gridItem: {
    padding: '0 1% 1% 1%  !important',
  },
  mainInfo: {
    minHeight: '70%',
    padding: '1%',
  },
  mainInfoDetails: {
    minHeight: '70vh',
  },
  actions: {
    display: 'flex',
  },
  button: {
    margin: '1%',
  },
  sideInfo: {
    minHeight: '35vh',
    padding: '1% 2%',
  },
  lecturerInfo: {
    minHeight: '30vh',
    padding: '1%',
  },
  italicText: {
    fontStyle: 'italic',
  },
  content: {
    paddingLeft: '1%',
  },
  price: {
    textDecorationLine: 'line-through',
    paddingLeft: '1%',
    color: '#808080',
  },
  avatar: {
    width: '15%',
    height: '15%',
  },
  input: {
    margin: '3%',
  },
};
const useStyles = makeStyles(styles);
const CourseDetails = (props) => {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();
  console.log(props.history.location.state.datas)
  const adminCourseDetails = useSelector((state) => state.adminCourseDetails);
  const dispatch = useDispatch();
  const [error, setError] = useState([null, null]);
  const [values, setValues] = React.useState({
    //discounted price
    price: adminCourseDetails.course.price,
    //crossed out price
    actualPrice: adminCourseDetails.course.actualPrice,
  });
  useEffect(() => {
    document.title = 'Course Details';
    dispatch(setAdminCourseDetails(props.history.location.state.datas));
  }, []);
  useEffect(() => {
    if (adminCourseDetails.errMess !== null) {
      setError(['error', 'Internal Error']);
    }
  }, [adminCourseDetails.errMess]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    let changedFields = {};
    if (values.price > values.actualPrice) {
      return setError([
        'error',
        'Discounted Price must be higher than Original Price',
      ]);
    }
    if (values.price !== adminCourseDetails.course.price) {
      changedFields.price = values.price;
    }
    if (values.actualPrice !== adminCourseDetails.course.actualPrice) {
      changedFields.actualPrice = values.actualPrice;
    }
    if (isObjectEmpty(changedFields)) return;
    dispatch(AdminCourseDetailsChange(adminCourseDetails.course, changedFields));
    /* if(adminCourseDetails.errMess===null)
      setError(['success','Updated Successfully']);
    else setError(['error','Internal Error']); */
  };
  const handleClose = (event, reason) => {
    /* if (reason === 'clickaway') {
      return;
    } */
    setError([null, null]);
  };
  return (
    <div>{console.log("adminCourseDetails",adminCourseDetails)}
      {adminCourseDetails !== null &&adminCourseDetails.course!==null ? (
        <Grid container className={classes.root}>
          <Grid container xs={12} md={8} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.mainInfo}>
                <Grid container direction="row-reverse">
                  <Grid item xs={12} className={classes.mainInfoDetails}>
                    <Typography variant="h4" gutterBottom>
                      {adminCourseDetails.course.title}
                    </Typography>

                    <Divider />
                    <Typography
                      variant="subtitle1"
                      className={classes.italicText}
                      gutterBottom>
                      Last updated:{' '}
                      {new Date(adminCourseDetails.course.last_updated).toTimeString()} by{' '}
                      {adminCourseDetails.course.leturer.fullname}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Id: {id}
                    </Typography>
                    <Typography variant="h5" paragraph="true">
                      Description
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {adminCourseDetails.course.description}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Videos
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <VideoList
                        videos={adminCourseDetails.course.videos}
                        courseId={adminCourseDetails.course._id}
                      />
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                      Edit Course
                    </Typography>
                    <Grid item xs={11} md={5}>
                      <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Original Price"
                        value={values.actualPrice}
                        onChange={handleChange}
                        name="actualPrice"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                    <Grid item xs={11} md={5}>
                      <TextField
                        variant="outlined"
                        className={classes.input}
                        label="Discounted Price"
                        value={values.price}
                        onChange={handleChange}
                        name="price"
                        id="formatted-numberformat-input"
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    className={classes.actions}
                    justify="flex-end">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: colors.lightGreen[600],
                        borderColor: colors.lightGreen[600],
                      }}
                      className={classes.button}
                      onClick={() => {
                        history.push(`/courses/${adminCourseDetails.course._id}`);
                      }}>
                      User View
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleSubmit}>
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            sm={12}
            md={4}
            xs={4}
            className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.sideInfo}>
                <Typography variant="h6" gutterBottom>
                  Category
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Chip label={adminCourseDetails.course.category}></Chip>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Score
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.content}
                  gutterBottom>
                  {adminCourseDetails.course.points} / 5
                </Typography>
                <div>
                  <Typography variant="h6" display="inline" gutterBottom>
                    Number of Feedbacks :
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.content}
                    display="inline">
                    {adminCourseDetails.course.numberOfFeedback}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" display="inline" gutterBottom>
                    Number of Students :
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.content}
                    display="inline">
                    {adminCourseDetails.course.numberOfStudent}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" display="inline" gutterBottom>
                    Price:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.price}
                    display="inline">
                    {adminCourseDetails.course.actualPrice}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.content}
                    display="inline">
                    {adminCourseDetails.course.price}
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={classes.lecturerInfo}>
                <Grid
                  container
                  align="center"
                  justify="center"
                  alignItems="center">
                  <Grid item xs={12}>
                    <Avatar
                      alt="Avatar"
                      className={classes.avatar}
                      src={adminCourseDetails.course.leturer.avatar}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" className={classes.content}>
                      {adminCourseDetails.course.leturer.fullname}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" className={classes.content}>
                  {adminCourseDetails.course.leturer.description} 
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Snackbar
            open={error[0] === null ? false : true}
            autoHideDuration={2000}
            onClose={handleClose}>
            {error[0] !== null ? (
              <Alert severity={error[0]}>{error[1]}</Alert>
            ) : null}
          </Snackbar>
        </Grid>
      ) : (
        <Skeleton variant="rect"></Skeleton>
      )}
    </div>
  );
};

export default withRouter(CourseDetails);
