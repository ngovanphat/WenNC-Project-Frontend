import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography} from '@material-ui/core';

import CourseList from './CoursesList';
import CategoriesList from './CategoriesList';


import { fetchAllCourses, fetchAllCategories } from '../../redux/actions'; 

const mapStateToProps = state => {
  return {
      allCourses: state.allCourses,
      allCategories: state.allCategories
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllCourses: () => {dispatch(fetchAllCourses())},
  fetchAllCategories: () => {dispatch(fetchAllCategories())}
});


class Categories extends Component {

  componentDidMount(){
    this.props.fetchAllCourses();
    this.props.fetchAllCategories();
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
          <Grid item xs={4} style={{ marginLeft: 20, marginTop: 50 }}>
            <Typography variant="h5" style={{ fontWeight: '700' }}>All topics</Typography>
          </Grid>
          <CategoriesList 
                categories={this.props.allCategories.categories}
                isLoading={this.props.allCategories.isLoading}
                errMess={this.props.allCategories.errMess}
          /> 
        </Grid>
        <Grid  container style={{ marginTop: 50, marginLeft: 20 }}>
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