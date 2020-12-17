import React from 'react';
import { Grid } from '@material-ui/core';
import CarouselSlide from '../Carousel'

const Home = () => {
  return (
    <Grid item container>
      <Grid item />
      <Grid item xs={12}>
        <CarouselSlide />
      </Grid>
      <Grid />
    </Grid>
  );
}

export default Home;