import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import Login from "../Login";
import Signup from "../Signup";
import Footer from "../Footer";
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
import Courses from "../Admin/Courses";
import CourseDetails from "../Admin/CourseDetails";
import Dashboard from "../Admin/Dashboard";
import Account from "../Admin/Account";
import SingleCategory from "../SingleCategory";
import MyCourseList from "../MyCourseList";
import MyFavoriteList from "../MyFavoriteList";

import { fetchUserProfile } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    loginReducer: state.loginReducer,
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => { dispatch(fetchUserProfile()) }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    return (
      <div>
        <Router>
          <CssBaseline />
          <Grid container direction="column" style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            height: "100vh",
            gridTemplateAreas: `"header" 
                         "main" 
                       "footer"`,
          }}>
            <Grid item xs>
              <Header
                isLoggedIn={this.props.loginReducer.isLoggedIn}
                user={this.props.userProfile.user}
              />
            </Grid>
            <Grid item>
              <Switch>
                <Route path="/admin/:path?" >
                  <AdminLayout>
                    <Switch>
                      <Route exact path="/admin/dashboard">
                        <Dashboard />
                      </Route>
                      <Route exact path="/admin/courses">
                        <Courses />
                      </Route>
                      <Route exact path="/admin/courses/:id">
                        <CourseDetails />
                      </Route>
                      <Route exact path="/admin/users">
                        <Users />
                      </Route>
                      <Route exact path="/admin/account">
                        <Account />
                      </Route>
                      <Route exact path="/admin/settings">
                        <Account />
                      </Route>
                    </Switch>
                  </AdminLayout>
                  <Redirect from="/admin" to="/admin/dashboard" />
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
                <Route exact path="/myCourses">
                  <MyCourseList />
                </Route>
                <Route exact path="/wishList">
                  <MyFavoriteList />
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
                <Footer item />
              </Grid>
            ) : null}
          </Grid>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
