import React, { useState } from 'react';
import { List, Grid, Typography, ListItem, Hidden, Collapse, FormGroup, ListItemText, Divider, Container, Checkbox, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Rating, Pagination } from '@material-ui/lab';

import CourseTile from './CourseTile';

function CourseList(props) {
  const [state, setState] = useState({
    openRating: false,
    openPrice: false,
    valueRating: 5,
    desc: 1
  });

  const handleChange = (event) => {
    if (event.target.name === "rating")
      setState({ ...state, valueRating: +event.target.value });
    else {
      setState({ ...state, desc: +event.target.value });
    }
  };

  const handleRating = () => {
    setState({ ...state, openRating: !state.openRating })
  }

  const handlePrice = () => {
    setState({ ...state, openPrice: !state.openPrice })
  }


  if (props.isLoading) {
    return (
      <Grid container>
        <Grid item row xs={12}>
          <Typography variant="h4">Loading....</Typography>
        </Grid>
      </Grid>
    );
  }
  else if (props.errMess) {
    return (
      <Grid container>
        <Grid item row xs={12}>
          <Typography variant="h4">{props.errMess}</Typography>
        </Grid>
      </Grid>
    );
  }
  else {
    const courseList = props.courses.docs
      .filter(course => (course.points >= state.valueRating && course.points < state.valueRating + 1))
      .sort(function (a, b) {
        return state.desc === 1 ? a.price - b.price : (b.price - a.price);
      });
    return (
      <Grid container>
        <Hidden only={['xs', 'sm']}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <Divider />
            <ListItem button onClick={handleRating}>
              <ListItemText primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>Ratings</Typography>} style={{ marginRight: 150 }} />
              {state.openRating ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={state.openRating} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="rating" name="rating" value={state.valueRating} onChange={handleChange}>
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Rating name="read-only" value={5} readOnly size="small" />
                      </Container>
                    } control={<Radio />} value={5} />
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Rating name="read-only" value={4} readOnly size="small" />
                      </Container>
                    } control={<Radio />} value={4} />
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Rating name="read-only" value={3} readOnly size="small" />
                      </Container>
                    } control={<Radio />} value={3} />
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Rating name="read-only" value={2} readOnly size="small" />
                      </Container>
                    } control={<Radio />} value={2} />
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Rating name="read-only" value={1} readOnly size="small" />
                      </Container>
                    } control={<Radio />} value={1} />
                  </RadioGroup>
                </FormControl>
              </List>
            </Collapse>
            <Divider />
            <ListItem button onClick={handlePrice}>
              <ListItemText primary={<Typography variant="h6" style={{ fontWeight: 'bold' }}>Price</Typography>} style={{ marginRight: 150 }} />
              {state.openPrice ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={state.openPrice} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="rating" name="price" value={state.desc} onChange={handleChange}>
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Typography variant="p">Ascending</Typography>
                      </Container>
                    } control={<Radio />} value={1} />
                    <FormControlLabel label={
                      <Container disableGutters style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}>
                        <Typography variant="p">Descending</Typography>
                      </Container>
                    } control={<Radio />} value={-1} />
                  </RadioGroup>
                </FormControl>
              </List>
            </Collapse>
            <Divider />
          </List>
        </Hidden>
        <Grid xs={12} sm={8} style={{ marginLeft: 20 }}>
          <List>
            {courseList.map((course) =>
              <CourseTile
                key={course._id}
                _id={course._id}
                imageUrl={course.thumnail}
                title={course.title}
                description={course.shortDescription}
                lecturer={course.leturer}
                rating={course.points}
                price={course.price}
                actualPrice={course.actualPrice}
              />
            )}
          </List>
          {courseList.length !== 0 ?
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination page={1} count={Math.ceil(courseList.length / 10)} />
            </Grid>
            :
            <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              We do not have any course for your requirement
            </Grid>
          }

        </Grid>
      </Grid>
    );

  }
}

export default CourseList;