import React from 'react';
import { Grid } from '@material-ui/core';

const Home = () => {
    return (<Grid item container>
        <Grid item xs={0} sm={2} />
        <Grid item xs={12} sm={8}>
        <h1>This is our contentThis is our contentThis is our contentThis is our contentThis is our contentThis is our contentThis is our contentThis is our contentThis is our contentThis is our content</h1>
        </Grid>
        <Grid item xs={0} sm={2} /> 
      </Grid>
     );
}

export default Home;