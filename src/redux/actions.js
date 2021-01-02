/*

    This file create a action to call reducer
    for each reducer create a group of action: User, Course, Category, Feedback, Video, Filter, Search

    

*/

import * as actionTypes from './actionTypes';
import { ApiURL } from '../helpers/baseUrl';

// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: actionTypes.SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const login = (loginInput) => {
    const { email, password } = loginInput;
    return (dispatch) => {  // don't forget to use dispatch here!
      return fetch(ApiURL + '/auth', {
        method: 'POST',
        headers: {  // these could be different for your API call
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.authenticated === true) { // response success checking logic could differ
            const data = { ...json, userId: email };
            setLoginLocal(data); // storing in local storage for next launch
            dispatch(setLoginState(data));
          } else {
            alert('Login Failed Username or Password is incorrect');
          }
        })
        .catch((err) => {
          alert('Login Failed Some error occured, please retry');
          console.log(err);
        });
    };
  };

export const signup = (signupInput) => {
  const { fullname, email, password } = signupInput;
  const role = "STUDENT";
  const o = {
    fullname, email, password, role
  }
  console.log(o);
  return fetch(ApiURL + '/users', {
    method: 'POST',
    headers: {  // these could be different for your API call
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(o),
  }).then((response) => {
      if (response.status === 201) { // response success checking logic could differ
      alert("Sign up successfully");
      return true;
    } else {
      alert('Something failed');
      return false;
    }
  }).catch((err) => {
    alert('Some error occured, please retry');
    console.log(err);
  });
}

const setLoginLocal = async (loginData) => {
  try {
    await localStorage.setItem('loginData', JSON.stringify(loginData));
  } catch (err) {
    console.log(err);
  }
};



// ----------------- Course -----------------------

// ------------------- New Courses ---------------------------

export const fetchNewestCourses = () => (dispatch) => {
  dispatch(newestCoursesLoading(true));

  return fetch(ApiURL + '/courses/new')
          .then(response => {
              if(response.ok){
                  console.log(response);
                  return response;
              }
              else {
                  var error = new Error('Error ' + response.status + ': ' + response.statusText);
                  error.response= response;
                  throw error;
              }
          },
              error => {
                  var errmess = new Error(error.message);
                  throw errmess;
              }
          )
          .then(response => response.json())
          .then(courses => dispatch(addNewestCourses(courses)))
          .catch(error => dispatch(newestCoursesFailed(error.message)));
}

export const newestCoursesLoading = () => ({
  type: actionTypes.NEWEST_COURSES_LOADING
});

export const newestCoursesFailed = (errmess) => ({
  type: actionTypes.NEWEST_COURSES_FAIL,
  payload: errmess
});

export const addNewestCourses = (courses) => ({
  type: actionTypes.ADD_NEWEST_COURSES,
  payload: courses
});

// ---------------------- All Courses -----------------------

export const fetchAllCourses = () => (dispatch) => {
  dispatch(allCoursesLoading(true));

  return fetch(ApiURL + '/courses/all')
          .then(response => {
              if(response.ok){
                  console.log(response);
                  return response;
              }
              else {
                  var error = new Error('Error ' + response.status + ': ' + response.statusText);
                  error.response= response;
                  throw error;
              }
          },
              error => {
                  var errmess = new Error(error.message);
                  throw errmess;
              }
          )
          .then(response => response.json())
          .then(courses => dispatch(addAllCourses(courses)))
          .catch(error => dispatch(allCoursesFailed(error.message)));
}

export const allCoursesLoading = () => ({
  type: actionTypes.ALL_COURSES_LOADING
});

export const allCoursesFailed = (errmess) => ({
  type: actionTypes.ALL_COURSES_FAIL,
  payload: errmess
});

export const addAllCourses = (courses) => ({
  type: actionTypes.ADD_ALL_COURSES,
  payload: courses
});

//-------------- Category --------------------------

// -------------------Hot Category -------------------------

export const fetchHotCategories = () => (dispatch) => {
  dispatch(hotCategoriesLoading(true));

  return fetch(ApiURL + '/categories/hot')
          .then(response => {
              if(response.ok){
                  console.log(response);
                  return response;
              }
              else {
                  var error = new Error('Error ' + response.status + ': ' + response.statusText);
                  error.response= response;
                  throw error;
              }
          },
              error => {
                  var errmess = new Error(error.message);
                  throw errmess;
              }
          )
          .then(response => response.json())
          .then(categories => dispatch(addHotCategories(categories)))
          .catch(error => dispatch(hotCategoriesFailed(error.message)));
}

export const hotCategoriesLoading = () => ({
  type: actionTypes.HOT_CATEGORIES_LOADING
});

export const hotCategoriesFailed = (errmess) => ({
  type: actionTypes.HOT_CATEGORIES_FAIL,
  payload: errmess
});

export const addHotCategories = (categories) => ({
  type: actionTypes.ADD_HOT_CATEGORIES,
  payload: categories
});