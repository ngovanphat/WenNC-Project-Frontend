import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import Login from "../Login";
import Signup from "../Signup";
import Footer from "../Footer";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminLayout from "../../layouts/AdminLayout";

import Users from "../Admin/Users";
import Categories from "../Categories";
import CourseDetail from "../CourseDetail";
import Profile from "../Profile";
import Home from "../Home";
import UpdateProfile from "../UpdateProfile";
import AddCourse from "../AddCourse";
import VideoPlayer from "../VideoPlayer";
import SingleCategory from "../SingleCategory";

const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    //flexDirection: "column",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    height: "100vh",
    gridTemplateAreas: `"header" 
                         "main" 
                       "footer"`,
  },
  main: {
    //minHeight: "100vh",
    //marginBottom: "-8vh",
    //paddingBottom: "8vh",
  },
  footer: {
    //alignSelf: "flex-end",
    //marginTop: "auto",
  },
}));

const App = ({ location }) => {
  const classes = useStyles();

  return (
    <div>
      <Router>
        <CssBaseline />
        <Grid container direction="column" className={classes.root}>
          <Grid item xs>
            <Header />
          </Grid>
          <Grid item className={classes.main}>
            <Switch>
              <Route path="/admin/:path?" exact>
                <AdminLayout>
                  <Switch>
                    <Route exact path="/admin/dashboard">

                    </Route>
                    <Route exact path="/admin/users">
                      <Users />
                    </Route>
                  </Switch>
                </AdminLayout>
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/courses/:id" render={({ match, location }) => <CourseDetail match={match} />} />
              <Route exact path="/courses/:id/:videoid" >
                <VideoPlayer />
              </Route>
              <Route exact path="/categories" >
                <Categories />
              </Route>
              <Route exact path="/categories/:categoryName" render={({ match, location }) => <SingleCategory match={match} />} />
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/profile/update">
                <UpdateProfile />
              </Route>
              <Route exact path="/addCourse">
                <AddCourse />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Grid>
          {window.location.pathname.includes("/admin") !== -1 ? (
            <Grid item xs>
              <Footer item classname={classes.footer} />
            </Grid>
          ) : null}
        </Grid>
      </Router>
    </div>
  );
};

export default App;
