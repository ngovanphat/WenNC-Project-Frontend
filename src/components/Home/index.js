import React from 'react';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CarouselSlide from './Carousel'
import TopCoursesContainer from './TopCoursesContainer';
import TopCategoriesContainer from './TopCategoriesContainer';

const Home = () => {
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
        <TopCoursesContainer label={'NEWEST COURSE'}></TopCoursesContainer>
      </Grid>
      <Grid item container style={{marginTop: 50}}>
        <TopCoursesContainer label={'MOST VIEWED COURSE'}></TopCoursesContainer>
      </Grid>
      <Divider style={{marginTop: 40}}></Divider>
      <Grid item container style={{marginTop: 30}}>
        <TopCategoriesContainer label={'TOP CATEGORIES'}></TopCategoriesContainer>
      </Grid>
    </Grid>
  );
}

export default Home;