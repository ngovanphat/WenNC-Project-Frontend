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

const setLoginLocal = async (loginData) => {
  try {
    await localStorage.setItem('loginData', JSON.stringify(loginData));
  } catch (err) {
    console.log(err);
  }
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
          getLoginLocal();
          dispatch(setLoginState(data));
          alert("Log in successfully");
          return true;
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

// ----------------- Course -----------------------

// ------------------- New Courses ---------------------------

export const fetchNewestCourses = () => (dispatch) => {
  dispatch(newestCoursesLoading(true));

  return fetch(ApiURL + '/courses/new')
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
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

// ------------------- Single Course -------------------------------

export const fetchSingleCourse = (id) => (dispatch) => {
  dispatch(singleCourseLoading(true));

  return fetch(ApiURL + `/courses/${id}`)
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(course => {
      dispatch(addSingleCourse(course));
      dispatch(fetchSameCourses(course.category));
      dispatch(fetchAllComments(course._id));
    })
    .catch(error => dispatch(singleCourseFailed(error.message)));
}

export const singleCourseLoading = () => ({
  type: actionTypes.SINGLE_COURSE_LOADING
});

export const singleCourseFailed = (errmess) => ({
  type: actionTypes.SINGLE_COURSE_FAIL,
  payload: errmess
});

export const addSingleCourse = (course) => ({
  type: actionTypes.ADD_SINGLE_COURSE,
  payload: course
});

//--------------------- Same Category Course --------------------

export const fetchSameCourses = (category) => (dispatch) => {
  dispatch(sameCoursesLoading(true));

  return fetch(ApiURL + `/courses/byCategory/${category}`)
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(courses => dispatch(addSameCourses(courses)))
    .catch(error => dispatch(sameCoursesFailed(error.message)));
}

export const sameCoursesLoading = () => ({
  type: actionTypes.SAME_COURSES_LOADING
});

export const sameCoursesFailed = (errmess) => ({
  type: actionTypes.SAME_COURSES_FAIL,
  payload: errmess
});

export const addSameCourses = (course) => ({
  type: actionTypes.ADD_SAME_COURSES,
  payload: course
});

// ------------------- Most Viewed Courses ---------------------------

export const fetchMostViewedCourses = () => (dispatch) => {
  dispatch(mostViewedCoursesLoading(true));

  return fetch(ApiURL + '/courses/topView')
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(courses => dispatch(addMostViewedCourses(courses)))
    .catch(error => dispatch(mostViewedCoursesFailed(error.message)));
}

export const mostViewedCoursesLoading = () => ({
  type: actionTypes.MOST_VIEWED_COURSES_LOADING
});

export const mostViewedCoursesFailed = (errmess) => ({
  type: actionTypes.MOST_VIEWED_COURSES_FAIL,
  payload: errmess
});

export const addMostViewedCourses = (courses) => ({
  type: actionTypes.ADD_MOST_VIEWED_COURSES,
  payload: courses
});

// ---------------------- All Courses -----------------------

export const fetchAllCourses = () => (dispatch) => {
  dispatch(allCoursesLoading(true));

  return fetch(ApiURL + '/courses/all')
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
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
      if (response.ok) {
        console.log(response);
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
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

// ------------------ All Categories ------------------------

export const fetchAllCategories = () => (dispatch) => {
  dispatch(allCategoriesLoading(true));

  return fetch(ApiURL + '/categories')
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(categories => dispatch(addAllCategories(categories)))
    .catch(error => dispatch(allCategoriesFailed(error.message)));
}

export const allCategoriesLoading = () => ({
  type: actionTypes.ALL_CATEGORIES_LOADING
});

export const allCategoriesFailed = (errmess) => ({
  type: actionTypes.ALL_CATEGORIES_FAIL,
  payload: errmess
});

export const addAllCategories = (categories) => ({
  type: actionTypes.ADD_ALL_CATEGORIES,
  payload: categories
});

// -------------------- Single Category ----------------------

export const fetchSingleCategory = (categoryName) => (dispatch) => {
  dispatch(singleCategoryLoading(true));

  return fetch(ApiURL + `/categories/byName?categoryName=${categoryName}`)
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(category => dispatch(addSingleCategory(category)))
    .catch(error => dispatch(singleCategoryFailed(error.message)));
}

export const singleCategoryLoading = () => ({
  type: actionTypes.SINGLE_CATEGORY_LOADING
});

export const singleCategoryFailed = (errmess) => ({
  type: actionTypes.SINGLE_CATEGORY_FAIL,
  payload: errmess
});

export const addSingleCategory = (category) => ({
  type: actionTypes.ADD_SINGLE_CATEGORY,
  payload: category
});

// ------------------- Comment ------------------------

export const fetchAllComments = (id) => (dispatch) => {
  dispatch(allCommentsLoading(true));

  return fetch(ApiURL + `/feedbacks/${id}`)
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addAllComments(comments)))
    .catch(error => dispatch(allCommentsFailed(error.message)));
}

export const allCommentsLoading = () => ({
  type: actionTypes.ALL_COMMENTS_LOADING
});

export const allCommentsFailed = (errmess) => ({
  type: actionTypes.ALL_COMMENTS_FAIL,
  payload: errmess
});

export const addAllComments = (comments) => ({
  type: actionTypes.ADD_ALL_COMMENTS,
  payload: comments
});

//-------------- User --------------------------

// ------------------- User Profile -------------------------

const getLoginLocal = () => {
  const loginData = localStorage.getItem('loginData');
  return JSON.parse(loginData).accessToken;
};

export const fetchUserProfile = () => (dispatch) => {
  dispatch(userProfileLoading(true));

  return fetch(ApiURL + `/users/me`, {
    headers: {  // these could be different for your API call
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(user => {
      dispatch(addUserProfile(user));
    })
    .catch(error => dispatch(userProfileFailed(error.message)));
}

export const userProfileLoading = () => ({
  type: actionTypes.USER_PROFILE_LOADING
});

export const userProfileFailed = (errmess) => ({
  type: actionTypes.USER_PROFILE_FAIL,
  payload: errmess
});

export const addUserProfile = (course) => ({
  type: actionTypes.ADD_USER_PROFILE,
  payload: course
});