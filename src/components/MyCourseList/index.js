import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import MyCourseCard from './MyCourseCard';
import { NavLink } from 'react-router-dom';
import { fetchMyCourses } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    myCourses: state.myCourses
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMyCourses: () => { dispatch(fetchMyCourses()) },
});

class MyCourseList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMyCourses();
  }

  render() {
    if (this.props.myCourses.isLoading) {
      return (
        <Grid container>
          <Grid item row xs={12}>
            <Typography variant="h4">Loading....</Typography>
          </Grid>
        </Grid>
      )
    }
    else if (this.props.myCourses.errMess) {
      return (
        <Grid container>
          <Grid item row xs={12}>
            <Typography variant="h4">{this.props.myCourses.errMess}</Typography>
          </Grid>
        </Grid>
      );
    }
    else {
      const len = this.props.myCourses.courses.join_list.length;
      if (len == 0) {
        return <main>
          <div style={{ marginTop: 30 }}>
            <Container maxWidth="md">
              <Typography variant="h6" align="left" color="textSecondary">
                My courses
              </Typography>
            </Container>
          </div>
          <Container style={{ paddingTop: 5, paddingBottom: 4 }} maxWidth="md">
            <Grid container>
              <Typography variant="h7" align="left" color="black">
                You haven't joined any courses yet.
                <NavLink to='/categories' style={{ textDecoration: 'none', marginLeft: 5, color: '#005580' }} >
                  Browse more courses now.
                </NavLink>
              </Typography>
            </Grid>
          </Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '5vh' }}
          >
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </main>
      }
      return <main>
        <div style={{ marginTop: 30 }}>
          <Container maxWidth="md">
            <Typography variant="h6" align="left" color="textSecondary">
              My courses
            </Typography>
          </Container>
        </div>
        <Container style={{ paddingTop: 5, paddingBottom: 4 }} maxWidth="md">
          <Grid container spacing={2}>
            {this.props.myCourses.courses.join_list.map((course) => (
              <MyCourseCard key={course.title} course={course} />
            ))}
          </Grid>
        </Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '5vh' }}
        >
          <Grid item xs={12}>
            <Pagination count={this.props.myCourses.courses.join_list.length} shape="rounded" size="large" />
          </Grid>
        </Grid>
      </main>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourseList);