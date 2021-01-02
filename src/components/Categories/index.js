import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Hidden, Card, CardHeader } from '@material-ui/core';

import CourseList from './CoursesList';


import { fetchAllCourses } from '../../redux/actions'; 

const mapStateToProps = state => {
  return {
      allCourses: state.allCourses
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllCourses: () => {dispatch(fetchAllCourses())}
});


class Categories extends Component {

  componentDidMount(){
    this.props.fetchAllCourses();
  }


  render(){
    return (
      <Grid>
        <Grid item container>
          <Grid item />
          <Grid item xs={4} style={{ marginLeft: 30, marginTop: 50 }}>
            <Typography variant="h4" style={{ fontWeight: '700' }}>Categories</Typography>
          </Grid>
          <Grid />
        </Grid>
        <Grid item container>
          <Grid item xs={4} style={{ marginLeft: 30, marginTop: 50 }}>
            <Typography variant="h5" style={{ fontWeight: '700' }}>All topics</Typography>
          </Grid>
          <Grid item container spacing={2} direction="row" style={{ marginTop: 5, marginLeft: 20 }}>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={1} sm={2} md={0}></Grid>
              <Grid item xs={1} sm={2} md={0}></Grid>
            </Hidden>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={1} sm={2} md={0}></Grid>
              <Grid item xs={1} sm={2} md={0}></Grid>
            </Hidden>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={5} sm={4}>
                <Card variant="outlined" >
                  <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
                </Card >
              </Grid>
            </Hidden>
          </Grid>
          <Grid item container spacing={2} direction="row" style={{ marginTop: 5, marginLeft: 20 }}>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={1} sm={2} md={0}></Grid>
              <Grid item xs={1} sm={2} md={0}></Grid>
            </Hidden>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={1} sm={2} md={0}></Grid>
              <Grid item xs={1} sm={2} md={0}></Grid>
            </Hidden>
            <Grid item xs={5} sm={4} md={2}>
              <Card variant="outlined" >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card >
            </Grid>
            <Hidden only={['md', 'lg']}>
              <Grid item xs={5} sm={4}>
                <Card variant="outlined" >
                  <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
                </Card >
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item container style={{ marginTop: 50, marginLeft: 20 }}>
          <Grid item xs={4} style={{ marginBottom: 20 }}>
            <Typography variant="h5" style={{ fontWeight: '700' }}>All development courses</Typography>
          </Grid>
          <CourseList 
                courses={this.props.allCourses.courses}
                isLoading={this.props.allCourses.isLoading}
                errMess={this.props.allCourses.errMess}
          />
        </Grid>
      </Grid>
    );
  }


}



export default connect(mapStateToProps, mapDispatchToProps)(Categories);