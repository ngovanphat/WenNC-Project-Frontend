import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Grid } from '@material-ui/core';
import Header from '../Header';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Footer from '../Footer';

const App = () => {
  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </Router>
  )
}

export default App;