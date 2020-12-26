import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import Home from "../Home";
import Login from "../Login";
import Signup from "../Signup";
import Footer from "../Footer";
import Categories from "../Categories";
import Dashboard from "../Admin/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminLayout from "../../layouts/AdminLayout";
import Users from "../Admin/Users";
import CourseList from "../CoursesList";
import MyCourseList from "../MyCourseList";
import MyFavoriteList from "../MyFavoriteList";
import CourseDetail from "../CourseDetail";
import Profile from "../Profile";

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
              <Route exact path="/">
                {/* <Categories /> */}
                <Profile />
                {/* <CourseDetail /> */}
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
