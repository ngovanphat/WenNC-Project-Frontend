// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World</h1>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Grid } from '@material-ui/core';
import Header from '../Header';
import CarouselSlide from '../Carousel'

const App = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item />
        <Grid item xs={12}>
          <CarouselSlide />
        </Grid>
        <Grid />
      </Grid>
    </Grid>
  )
}

export default App;