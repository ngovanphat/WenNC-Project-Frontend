import React, { useEffect } from "react";
import { Avatar, Button, Chip, colors, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import VideoList from "./VideoList"
import { Link } from 'react-router-dom';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    backgroundColor: "#fafafa"
  },
  gridItem: {
    padding: "0 1% 1% 1%  !important",
  },
  mainInfo: {
    minHeight: "70vh",
    padding: "1%"
  },
  mainInfoDetails: {
    minHeight: "70vh"
  },
  actions: {
    display: "flex"
  },
  button: {
    margin: "1%"
  },
  sideInfo: {
    minHeight: "35vh",
    padding: "1% 2%"
  },
  lecturerInfo: {
    minHeight: "30vh",
    padding: "1%"
  },
  italicText: {
    fontStyle: 'italic'
  },
  content: {
    paddingLeft: "1%"
  },
  price: {
    textDecorationLine: 'line-through',
    paddingLeft: "1%",
    color: "#808080"
  },
  avatar: {
    width: "15%",
    height: "15%"
  }
};
const courseInfo = {
  "_id": "5fd326f8851a412c881d7906",
  "points": 4.8,
  "numberOfFeedback": null,
  "numberOfStudent": 3,
  "thumnail": "https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i",
  "last_updated": 1607673590218,
  "videos": [
    {
      "_id": "5ff3d8047f52572370b7cb5d",
      "title": "Course Introduction",
      "length": "3:20",
      "link": "https://www.youtube.com/watch?v=lEHM9HZf0IA",
      "course": "5fd326f8851a412c881d7906",
      "createdAt": "2021-01-05T03:07:48.212Z",
      "updatedAt": "2021-01-05T03:07:48.212Z",
      "__v": 0
    },
    {
      "_id": "5ff3d86fd663fa3520c0279c",
      "title": "Course Overview",
      "length": "3:20",
      "link": "https://www.youtube.com/watch?v=lEHM9HZf0IA",
      "course": "5fd326f8851a412c881d7906",
      "createdAt": "2021-01-05T03:09:35.614Z",
      "updatedAt": "2021-01-05T03:09:35.614Z",
      "__v": 0
    },
    {
      "_id": "5ff4202042e9ec0024b2ede5",
      "title": "How to get help",
      "length": "4:20",
      "link": "https://www.youtube.com/watch?v=9BKGNJyrB5o",
      "course": "5fd326f8851a412c881d7906",
      "createdAt": "2021-01-05T08:15:28.789Z",
      "updatedAt": "2021-01-05T08:15:28.789Z",
      "__v": 0
    }
  ],
  "title": "Flutter & Dart - The Complete Guide [2020 Edition]",
  "category": "Mobile Development",
  "leturer": {
    "_id": "5fd23cc653f29b3850b48c57",
    "avatar": "https://i.imgur.com/Xp51vdM.png",
    "description": "",
    "course_list": [
      "5fd47265b531a72b30c59ca4",
      "5fd3257dd530df1a6054ba25",
      "5fd326f8851a412c881d7906",
      "5fd32ba9851a412c881d7907",
      "5fd32bf5851a412c881d7908",
      "5fd32c43851a412c881d7909",
      "5fd32c82851a412c881d790a",
      "5fd32cf1851a412c881d790b",
      "5fd32d43851a412c881d790c",
      "5fd32d80851a412c881d790d",
      "5fd32dc3851a412c881d790e",
      "5fd32dc3851a412c881d790f",
      "5fd32f17851a412c881d7910",
      "5fd32f17851a412c881d7911",
      "5fd32f17851a412c881d7912",
      "5fd32f17851a412c881d7913",
      "5fd32f17851a412c881d7914",
      "5fd32f17851a412c881d7915",
      "5fd32f17851a412c881d7916",
      "5fd32f17851a412c881d7917",
      "5fd32f17851a412c881d7918",
      "5fd32f17851a412c881d7919",
      "5fd70615157fa61072b2ca98",
      "5fd7058071d6871ecc5922dd"
    ],
    "fullname": "Ngô Văn Phát"
  },
  "price": 11.99,
  "actualPrice": 129.99,
  "description": "The entire course was completely re-recorded and updated - it's totally up-to-date with the latest version of Flutter!",
  "__v": 0,
  "shortDecription": null,
  "isDone": false
}

const useStyles = makeStyles(styles);
export default function CourseDetails() {
  const classes = useStyles();
  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    document.title = "Course Details"
  }, []);
  return (
    <Grid container className={classes.root}>
      <Grid container xs={12} md={8} className={classes.gridContainer}>
        <Grid item xs={12} className={classes.gridItem}>
          <Paper className={classes.mainInfo}>
            <Grid container direction="row-reverse">
              <Grid item xs={12} className={classes.mainInfoDetails}>
                <Typography variant="h4" gutterBottom>
                  {courseInfo.title}
                </Typography>

                <Divider />
                <Typography variant="subtitle1" className={classes.italicText} gutterBottom>
                  Last updated: {new Date(courseInfo.last_updated).toTimeString()} by {courseInfo.leturer.fullname}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Id: {id}
                </Typography>
                <Typography variant="h5" paragraph="true" >
                  Description
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {courseInfo.description}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Videos
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <VideoList videos={courseInfo.videos} courseId={courseInfo._id} />
                </Typography>
              </Grid>
              <Grid item xs={5} className={classes.actions} justify="flex-end">
                <Button variant="contained" color="primary" className={classes.button} onClick={() => { history.push(`/courses/${courseInfo._id}`) }}>User View</Button>
                <Button variant="contained" color="primary" className={classes.button}>Update</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sm={12} md={4} xs={4} className={classes.gridContainer}>
        <Grid item xs={12} className={classes.gridItem}>
          <Paper className={classes.sideInfo}>
            <Typography variant="h6" gutterBottom>
              Category
          </Typography>
            <Typography variant="body1" gutterBottom>
              <Chip label={courseInfo.category}></Chip>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Score
          </Typography>
            <Typography variant="body1" className={classes.content} gutterBottom>
              {courseInfo.points}
            </Typography>
            <div>
              <Typography variant="h6" display="inline" gutterBottom >
                Number of Feedbacks :
          </Typography>
              <Typography variant="body1" className={classes.content} display="inline">{courseInfo.numberOfFeedback}</Typography>
            </div>
            <div>
              <Typography variant="h6" display="inline" gutterBottom>
                Number of Students :
            </Typography>
              <Typography variant="body1" className={classes.content} display="inline">{courseInfo.numberOfStudent}</Typography>
            </div>
            <div>
              <Typography variant="h6" display="inline" gutterBottom>
                Price:
            </Typography>
              <Typography variant="body1" className={classes.price} display="inline">{courseInfo.actualPrice}</Typography>
              <Typography variant="body1" className={classes.content} display="inline">{courseInfo.price}</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Paper className={classes.lecturerInfo}>
            <Grid container align="center" justify="center" alignItems="center">
              <Grid item xs={12}>
                <Avatar alt="Avatar" className={classes.avatar} src={courseInfo.leturer.avatar} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.content}>{courseInfo.leturer.fullname}</Typography>
              </Grid>
            </Grid>
            <Typography variant="body1" className={classes.content}>{courseInfo.leturer.description} abcd</Typography>

          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

