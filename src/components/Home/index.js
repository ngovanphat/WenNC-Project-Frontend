import React, {Component} from 'react';
import { connect } from 'react-redux';


import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CarouselSlide from './Carousel'
import TopCoursesContainer from './TopCoursesContainer';
import TopCategoriesContainer from './TopCategoriesContainer';

import { fetchNewestCourses } from '../../redux/actions'; 

const mapStateToProps = state => {
  return {
      newestCourses: state.newestCourses
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNewestCourses: () => {dispatch(fetchNewestCourses())},
});


class  Home extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchNewestCourses();
  }

  
  render() {
    return (
      <Grid>
        <Grid item container>
          <Grid item />
          <Grid item xs={12}>
            <CarouselSlide />
          </Grid>
          <Grid />
        </Grid>
        <Grid item container>
          <TopCoursesContainer 
          label={'NEWEST COURSE'} 
          newestCourses={this.props.newestCourses.courses}
          newestCoursesLoading={this.props.newestCourses.isLoading}
          newestCoursesErrMess={this.props.newestCourses.errMess} 
          />
        </Grid>
        <Grid item container style={{ marginTop: 50 }}>
          <TopCoursesContainer 
          label={'MOST VIEWED COURSE'}
          newestCourses={this.props.newestCourses.courses}
          newestCoursesLoading={this.props.newestCourses.isLoading}
          newestCoursesErrMess={this.props.newestCourses.errMess} 
          />
        </Grid>
        <Divider style={{ marginTop: 40 }}></Divider>
        <Grid item container style={{ marginTop: 30 }}>
          <TopCategoriesContainer label={'TOP CATEGORIES'}></TopCategoriesContainer>
        </Grid>
      </Grid>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);