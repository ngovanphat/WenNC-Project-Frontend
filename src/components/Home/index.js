import React, {Component} from 'react';
import { connect } from 'react-redux';


import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CarouselSlide from './Carousel'
import TopCoursesContainer from './TopCoursesContainer';
import TopCategoriesContainer from './TopCategoriesContainer';

import { fetchNewestCourses, fetchHotCategories } from '../../redux/actions'; 

const mapStateToProps = state => {
  return {
      newestCourses: state.newestCourses,
      hotCategories: state.hotCategories
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNewestCourses: () => {dispatch(fetchNewestCourses())},
  fetchHotCategories: () => {dispatch(fetchHotCategories())}
});


class  Home extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchNewestCourses();
    this.props.fetchHotCategories();
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
        <Grid container style={{width: '100%', display: 'flex', alignItems: 'center'}}>
          <Grid xs={1} />
          <Grid xs={10}>
            <TopCoursesContainer 
            label={'NEWEST COURSE'} 
            newestCourses={this.props.newestCourses.courses}
            newestCoursesLoading={this.props.newestCourses.isLoading}
            newestCoursesErrMess={this.props.newestCourses.errMess} 
            />
          </Grid>
          <Grid xs={1} />
        </Grid>
        <Grid container style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: 40}}>
          <Grid xs={1} />
          <Grid xs={10}>
            <TopCoursesContainer 
            label={'MOST VIEWED COURSE'} 
            newestCourses={this.props.newestCourses.courses}
            newestCoursesLoading={this.props.newestCourses.isLoading}
            newestCoursesErrMess={this.props.newestCourses.errMess} 
            />
          </Grid>
          <Grid xs={1} />
        </Grid>
        <Divider style={{ marginTop: 40 }}></Divider>
        <Grid item container style={{ marginTop: 20 }}>
          <Grid xs={1} />
          <Grid xs={10}>
          <TopCategoriesContainer 
            label={'TOP CATEGORIES'} 
            hotCategories={this.props.hotCategories.categories}
            hotCategoriesLoading={this.props.hotCategories.isLoading}
            hotCategoriesErrMess={this.props.hotCategories.errMess}
          />
          </Grid>
          <Grid xs={1} />
        </Grid>
      </Grid>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);