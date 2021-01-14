/*

    This file create a action to call reducer
    for each reducer create a group of action: User, Course, Category, Feedback, Video, Filter, Search

*/

import * as actionTypes from './actionTypes';
import { ApiURL } from '../helpers/baseUrl';
import UserDetails from '../components/Admin/UserDetails';
const axios = require('axios').default;

// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: actionTypes.SET_LOGIN_STATE,
    payload: loginData,
    isLoggedIn: loginData !== null ? true : false,
  };
};

const setLoginLocal = async (loginData) => {
  try {
    await localStorage.setItem('loginData', JSON.stringify(loginData));
  } catch (err) {
    console.log(err);
  }
};

const removeLoginLocal = async () => {
  try {
    await localStorage.removeItem('loginData');
    return null;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

export const login = (loginInput) => {
  const { email, password } = loginInput;
  return (dispatch) => {
    // don't forget to use dispatch here!
    return fetch(ApiURL + '/auth', {
      method: 'POST',
      headers: {
        // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInput),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.authenticated === true) {
          // response success checking logic could differ
          const data = { ...json, isLoggedIn: true, userId: email };
          setLoginLocal(data); // storing in local storage for next launch
          dispatch(setLoginState(data));
          dispatch(fetchUserProfile());
          return true;
        } else {
          alert('Login Failed! Username or Password is incorrect');
        }
      })
      .catch((err) => {
        alert('Login Failed! Some error occured, please retry');
        console.log(err);
      });
  };
};

export const signup = (signupInput) => {
  const { fullname, email, password } = signupInput;
  const role = 'STUDENT';
  const o = {
    fullname,
    email,
    password,
    role,
  };
  console.log(o);
  return fetch(ApiURL + '/users', {
    method: 'POST',
    headers: {
      // these could be different for your API call
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(o),
  })
    .then((response) => {
      if (response.status === 201) {
        // response success checking logic could differ
        alert('Sign up successfully');
        return true;
      } else {
        alert('Something failed');
        return false;
      }
    })
    .catch((err) => {
      alert('Some error occured, please retry');
      console.log(err);
    });
};

export const logOut = () => (dispatch) => {
  removeLoginLocal();
  dispatch(setLogout());
  dispatch(resetUserProfile());
};

const setLogout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
// ----------------- Course -----------------------

// ------------------- New Courses ---------------------------

export const fetchNewestCourses = () => (dispatch) => {
  dispatch(newestCoursesLoading(true));

  return fetch(ApiURL + '/courses/new')
    .then(
      (response) => {
        if (response.ok) {
          console.log(response);
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((courses) => dispatch(addNewestCourses(courses)))
    .catch((error) => dispatch(newestCoursesFailed(error.message)));
};

export const newestCoursesLoading = () => ({
  type: actionTypes.NEWEST_COURSES_LOADING,
});

export const newestCoursesFailed = (errmess) => ({
  type: actionTypes.NEWEST_COURSES_FAIL,
  payload: errmess,
});

export const addNewestCourses = (courses) => ({
  type: actionTypes.ADD_NEWEST_COURSES,
  payload: courses,
});

// ------------------- Single Course -------------------------------

export const fetchSingleCourse = (id) => (dispatch) => {
  dispatch(singleCourseLoading(true));

  return fetch(ApiURL + `/courses/${id}`)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((course) => {
      dispatch(addSingleCourse(course));
      dispatch(fetchSameCourses(course.category));
      dispatch(fetchAllComments(course._id));
    })
    .catch((error) => dispatch(singleCourseFailed(error.message)));
};

export const addCourse = (courseData) => {
  return (dispatch) => {
    // don't forget to use dispatch here!
    return fetch(ApiURL + '/courses/add', {
      method: 'POST',
      headers: {
        // these could be different for your API call
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getLoginLocal(),
      },
      body: JSON.stringify(courseData),
    })
      .then((response) => {
        if (response.status === 201) {
          alert('Course uploaded successfully');
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .catch((err) => {
        alert('Course uploaded Failed! Some error occured, please retry');
        console.log(err);
      });
  };
};

export const singleCourseLoading = () => ({
  type: actionTypes.SINGLE_COURSE_LOADING,
});

export const singleCourseFailed = (errmess) => ({
  type: actionTypes.SINGLE_COURSE_FAIL,
  payload: errmess,
});

export const addSingleCourse = (course) => ({
  type: actionTypes.ADD_SINGLE_COURSE,
  payload: course,
});

//--------------------- Same Category Course --------------------

export const fetchSameCourses = (category) => (dispatch) => {
  dispatch(sameCoursesLoading(true));

  return fetch(ApiURL + `/courses/byCategory/${category}`)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((courses) => dispatch(addSameCourses(courses)))
    .catch((error) => dispatch(sameCoursesFailed(error.message)));
};

export const sameCoursesLoading = () => ({
  type: actionTypes.SAME_COURSES_LOADING,
});

export const sameCoursesFailed = (errmess) => ({
  type: actionTypes.SAME_COURSES_FAIL,
  payload: errmess,
});

export const addSameCourses = (course) => ({
  type: actionTypes.ADD_SAME_COURSES,
  payload: course,
});

// ------------------- Most Viewed Courses ---------------------------

export const fetchMostViewedCourses = () => (dispatch) => {
  dispatch(mostViewedCoursesLoading(true));

  return fetch(ApiURL + '/courses/topView')
    .then(
      (response) => {
        if (response.ok) {
          console.log(response);
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((courses) => dispatch(addMostViewedCourses(courses)))
    .catch((error) => dispatch(mostViewedCoursesFailed(error.message)));
};

export const mostViewedCoursesLoading = () => ({
  type: actionTypes.MOST_VIEWED_COURSES_LOADING,
});

export const mostViewedCoursesFailed = (errmess) => ({
  type: actionTypes.MOST_VIEWED_COURSES_FAIL,
  payload: errmess,
});

export const addMostViewedCourses = (courses) => ({
  type: actionTypes.ADD_MOST_VIEWED_COURSES,
  payload: courses,
});

// ---------------------- All Courses -----------------------

export const fetchAllCourses = (page = 1, pageCount = 10) => (dispatch) => {
  dispatch(allCoursesLoading(true));

  return fetch(ApiURL + `/courses/all?page=${page}&size=${pageCount}`)
    .then(
      (response) => {
        if (response.ok) {
          console.log(response);
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((courses) => dispatch(addAllCourses(courses)))
    .catch((error) => dispatch(allCoursesFailed(error.message)));
};

export const allCoursesLoading = () => ({
  type: actionTypes.ALL_COURSES_LOADING,
});

export const allCoursesFailed = (errmess) => ({
  type: actionTypes.ALL_COURSES_FAIL,
  payload: errmess,
});

export const addAllCourses = (courses) => ({
  type: actionTypes.ADD_ALL_COURSES,
  payload: courses,
});

//-------------- Category --------------------------

// -------------------Hot Category -------------------------

export const fetchHotCategories = () => (dispatch) => {
  dispatch(hotCategoriesLoading(true));

  return fetch(ApiURL + '/categories/hot')
    .then(
      (response) => {
        if (response.ok) {
          console.log(response);
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((categories) => dispatch(addHotCategories(categories)))
    .catch((error) => dispatch(hotCategoriesFailed(error.message)));
};

export const hotCategoriesLoading = () => ({
  type: actionTypes.HOT_CATEGORIES_LOADING,
});

export const hotCategoriesFailed = (errmess) => ({
  type: actionTypes.HOT_CATEGORIES_FAIL,
  payload: errmess,
});

export const addHotCategories = (categories) => ({
  type: actionTypes.ADD_HOT_CATEGORIES,
  payload: categories,
});

// ------------------ All Categories ------------------------

export const fetchAllCategories = () => (dispatch) => {
  dispatch(allCategoriesLoading(true));

  return fetch(ApiURL + '/categories')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((categories) => dispatch(addAllCategories(categories)))
    .catch((error) => dispatch(allCategoriesFailed(error.message)));
};

export const allCategoriesLoading = () => ({
  type: actionTypes.ALL_CATEGORIES_LOADING,
});

export const allCategoriesFailed = (errmess) => ({
  type: actionTypes.ALL_CATEGORIES_FAIL,
  payload: errmess,
});

export const addAllCategories = (categories) => ({
  type: actionTypes.ADD_ALL_CATEGORIES,
  payload: categories,
});

// -------------------- Single Category ----------------------

export const fetchSingleCategory = (categoryName) => (dispatch) => {
  dispatch(singleCategoryLoading(true));

  return fetch(ApiURL + `/categories/byName?categoryName=${categoryName}`)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((category) => dispatch(addSingleCategory(category)))
    .catch((error) => dispatch(singleCategoryFailed(error.message)));
};

export const singleCategoryLoading = () => ({
  type: actionTypes.SINGLE_CATEGORY_LOADING,
});

export const singleCategoryFailed = (errmess) => ({
  type: actionTypes.SINGLE_CATEGORY_FAIL,
  payload: errmess,
});

export const addSingleCategory = (category) => ({
  type: actionTypes.ADD_SINGLE_CATEGORY,
  payload: category,
});

// ---------------------Video -----------------------

export const addVideo = (video) => (dispatch) => {
  return axios({
    method: 'post',
    url: ApiURL + '/videos/',
    headers: {
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
    data: video,
  })
    .then(
      (response) => {
        if (response.status === 201) {
          alert('Create video successfully');
          dispatch(pushVideo(response.data));
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .catch((error) => console.log(error));
};

export const pushVideo = (video) => ({
  type: actionTypes.PUSH_VIDEO,
  payload: video,
});

// ------------------- Comment ------------------------

export const fetchAllComments = (id) => (dispatch) => {
  dispatch(allCommentsLoading(true));

  return fetch(ApiURL + `/feedbacks/${id}`)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addAllComments(comments)))
    .catch((error) => dispatch(allCommentsFailed(error.message)));
};

export const addFeedback = (feedback) => (dispatch) => {
  console.log(feedback);

  return axios({
    method: 'post',
    url: ApiURL + '/feedbacks/',
    headers: {
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
    data: feedback,
  })
    .then(
      (response) => {
        if (response.status === 200) {
          alert('Create feedback successfully');
          dispatch(pushComment(response.data));
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .catch((error) => console.log(error));
};

export const allCommentsLoading = () => ({
  type: actionTypes.ALL_COMMENTS_LOADING,
});

export const allCommentsFailed = (errmess) => ({
  type: actionTypes.ALL_COMMENTS_FAIL,
  payload: errmess,
});

export const addAllComments = (comments) => ({
  type: actionTypes.ADD_ALL_COMMENTS,
  payload: comments,
});

export const pushComment = (comment) => ({
  type: actionTypes.PUSH_COMMENT,
  payload: comment,
});
//-------------- User --------------------------

// ------------------- User Profile -------------------------

const getLoginLocal = () => {
  const loginData = localStorage.getItem('loginData');
  return loginData ? JSON.parse(loginData).accessToken : null;
};

export const fetchUserProfile = () => (dispatch) => {
  dispatch(userProfileLoading(true));

  return fetch(ApiURL + `/users/me`, {
    headers: {
      // these could be different for your API call
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((user) => {
      dispatch(addUserProfile(user));
    })
    .catch((error) => dispatch(userProfileFailed(error.message)));
};

export const userProfileLoading = () => ({
  type: actionTypes.USER_PROFILE_LOADING,
});

export const userProfileFailed = (errmess) => ({
  type: actionTypes.USER_PROFILE_FAIL,
  payload: errmess,
});

export const addUserProfile = (course) => ({
  type: actionTypes.ADD_USER_PROFILE,
  payload: course,
});

export const resetUserProfile = () => ({
  type: actionTypes.RESET_USER_PROFILE,
});

export const updateUserProfile = (input) => {
  console.log(input)
  const { fullname, email } = input;
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: ApiURL + '/users/me',
      headers: {
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
      data: {
        fullname: fullname,
        email: email,
      },
    })
      .then(
        (response) => {
          if (response.status == 200) {
            alert('Update profile successfully');
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .catch((error) => dispatch(userProfileFailed(error.message)));
  };
};

export const updateUserPassword = (input) => {
  const { password, currentPassword } = input;
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: ApiURL + '/users/me',
      headers: {
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
      data: {
        password: password,
        currentPassword: currentPassword,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          alert('Update profile successfully');
        } else {
          alert(response.json().error);
        }
      })
      .catch(() => alert('Current password is not correct'));
  };
};

// ------------------- My Courses -------------------------

export const fetchMyCourses = () => (dispatch) => {
  dispatch(myCoursesLoading(true));

  return fetch(ApiURL + `/users/getJoinCourse`, {
    headers: {
      // these could be different for your API call
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          console.log(response);
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((courses) => {
      dispatch(addMyCourses(courses));
    })
    .catch((error) => dispatch(myCoursesFailed(error.message)));
};

export const joinCourse = (input) => {
  const { userId, courseId } = input;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: ApiURL + '/users/joinCourse',
      headers: {
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
      data: {
        userId: userId,
        courseId: courseId,
      },
    })
      .then(
        (response) => {
          if (response.status == 200) {
            alert('Join course successfully');
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((_) => {
        dispatch(fetchMyCourses());
      })
      .catch((error) => dispatch(myCoursesFailed(error.message)));
  };
};

export const myCoursesLoading = () => ({
  type: actionTypes.MY_COURSES_LOADING,
});

export const myCoursesFailed = (errmess) => ({
  type: actionTypes.MY_COURSES_FAIL,
  payload: errmess,
});

export const addMyCourses = (course) => ({
  type: actionTypes.ADD_MY_COURSES,
  payload: course,
});

// ------------------- My Wishlist -------------------------

export const fetchMyWishlist = () => (dispatch) => {
  dispatch(myWishlistLoading(true));

  return fetch(ApiURL + `/users/getFavoriteCourse`, {
    headers: {
      // these could be different for your API call
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((courses) => {
      dispatch(addMyWishlist(courses));
    })
    .catch((error) => dispatch(myWishlistFailed(error.message)));
};

export const addToWishlist = (input) => {
  const { userId, courseId } = input;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: ApiURL + '/users/addFavoriteCourse',
      headers: {
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
      data: {
        userId: userId,
        courseId: courseId,
      },
    })
      .then(
        (response) => {
          if (response.status == 200) {
            alert('Add to wishlist successfully');
            console.log(response);
            return response;
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((_) => {
        dispatch(fetchMyWishlist());
      })
      .catch((error) => dispatch(myWishlistFailed(error.message)));
  };
};

export const removeFromWishlist = (input) => {
  const { userId, courseId } = input;
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: ApiURL + '/users/removeFavoriteCourse',
      headers: {
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
      data: {
        userId: userId,
        courseId: courseId,
      },
    })
      .then(
        (response) => {
          if (response.status == 200) {
            alert('Remove from wishlist successfully');
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((_) => {
        dispatch(fetchMyWishlist());
      })
      .catch((error) => dispatch(myWishlistFailed(error.message)));
  };
};

export const myWishlistLoading = () => ({
  type: actionTypes.MY_WISHLIST_LOADING,
});

export const myWishlistFailed = (errmess) => ({
  type: actionTypes.MY_WISHLIST_FAIL,
  payload: errmess,
});

export const addMyWishlist = (course) => ({
  type: actionTypes.ADD_MY_WISHLIST,
  payload: course,
});

//------------------------- Admin Check --------------------
export const checkAdmin = () => (dispatch) => {
  dispatch(adminChecking(true));
  return fetch(ApiURL + '/auth/adminCheck', {
    headers: {
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((isAdmin) => {
      dispatch(setAdminCheckState(isAdmin.authenticated));
    })
    .catch((error) => dispatch(adminCheckFailed(error.message)));
};

export const adminChecking = () => ({
  type: actionTypes.ADMIN_CHECKING,
});
export const adminCheckFailed = (error) => ({
  type: actionTypes.ADMIN_CHECK_FAILED,
  payload: error,
});
export const setAdminCheckState = (adminCheck) => {
  return {
    type: actionTypes.SET_ADMIN_CHECK_STATE,
    payload: adminCheck,
  };
};
export const resetAdminCheck = () => {
  return {
    type: actionTypes.SET_ADMIN_CHECK_STATE,
    payload: false,
  };
};

//------------------------- Admin Users --------------------
export const fetchAdminUsers = (page, pageSize) => async (dispatch) => {
  dispatch(AdminUsersLoading(true));
  console.log('fetching data... ' + page);
  fetch(
    ApiURL +
      `/users/admin-manage/all?page=${encodeURIComponent(
        page
      )}&pageCount=${encodeURIComponent(pageSize)}`,
    {
      headers: {
        // these could be different for your API call
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
    }
  )
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((users) => {
      dispatch(setAdminUsers(users));
    })
    .catch((error) => dispatch(AdminUsersFailed(error.message)));
};
export const fetchAllAdminUsers = (pageSize) => async (dispatch) => {
  dispatch(AdminUsersLoading(true));
  console.log('fetching all data... ' );
  fetch(
    ApiURL +
      `/users/admin-manage/all?page=1&pageCount=${encodeURIComponent(pageSize)}`,
    {
      headers: {
        // these could be different for your API call
        Accept: 'application/json',
        'x-access-token': getLoginLocal(),
      },
    }
  )
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((users) => {
      fetch(
        ApiURL +
          `/users/admin-manage/all?pageCount=${encodeURIComponent(users.totalDocs)}`,
        {
          headers: {
            Accept: 'application/json',
            'x-access-token': getLoginLocal(),
          },
        }
      )
        .then(
          (response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error(
                'Error ' + response.status + ': ' + response.statusText
              );
              error.response = response;
              throw error;
            }
          },
          (error) => {
            var errmess = new Error(error.message);
            throw errmess;
          }
        )
        .then((response) => response.json())
        .then((users) => {
          dispatch(setAllAdminUsers(users));
        })
        .catch((error) => dispatch(AdminUsersFailed(error.message)));
    })
    .catch((error) => dispatch(AdminUsersFailed(error.message)));
  
};
export const addAdminUsers = (input) => {
  return (dispatch) => {
    return fetch(ApiURL + '/users/admin-manage',{
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getLoginLocal(),
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
        fullname: input.fullname,
        ...(input.role !== null ? { role: input.role } : {}),
      }),
    }
      
       )
       .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
      ))
      .then(
        // Both fetching and parsing succeeded!
        ({ status, json }) => {
        if (status === 201) {
          // response success checking logic could differ
          alert('Add User Successfully');
          return true;
        } else {
          alert("Error"+json.error);
          throw new Error(json.error);
        }
      })
      .catch((err) => {dispatch(AdminUsersFailed(err.message))
        console.log(err);
        return false;
      });
  };
};

export const removeAdminUser = (id) => (dispatch) => {
  return axios({
    method: 'delete',
    url: ApiURL + '/users/admin-manage/' + id,
    headers: {
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
  })
    .then(
      (response) => {
        if (response.status === 200) {
          alert('Remove from wishlist successfully');
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .catch((error) => dispatch(AdminUsersFailed(error.message)));
};
export const changeAdminUsersPage = (
  curPage,
  newPage,
  pageSize,
  existedInState
) => async (dispatch) => {
  dispatch(AdminUsersLoading(true));
  console.log(
    ' curpage ' + curPage + ' newpage ' + newPage + ' existed' + existedInState
  );
  if (curPage >= newPage || existedInState) {
    return dispatch(updateLocalAdminUsersPage(newPage));
  } else {
    if(newPage-curPage>1)
     {
       return await dispatch(fetchAllAdminUsers(pageSize));
     }return fetch(
      ApiURL +
        `/users/admin-manage/all?page=${encodeURIComponent(
          newPage
        )}&pageCount=${encodeURIComponent(pageSize)}`,
      {
        headers: {
          Accept: 'application/json',
          'x-access-token': getLoginLocal(),
        },
      }
    )
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              'Error ' + response.status + ': ' + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((users) => {
        console.log(users.page);
        dispatch(fetchAdminUsersPage(users.docs, users.page));
      })
      .catch((error) => dispatch(AdminUsersFailed(error.message)));
  }
};

export const AdminUsersLoading = () => ({
  type: actionTypes.ADMIN_USERS_LOADING,
});

export const AdminUsersFailed = (errmess) => ({
  type: actionTypes.ADMIN_USERS_FAIL,
  payload: errmess,
});
export const setAdminUsers = (users) => ({
  type: actionTypes.SET_ADMIN_USERS_STATE,
  payload: users.docs,
  page: users.page,
  totalUsers: users.totalDocs,
});

const setAllAdminUsers= (users) => ({
  type: actionTypes.ADMIN_USERS_FETCH_ALL,
  users: users.docs,
  totalUsers: users.totalDocs,
});
export const addNewUser = (user) => ({
  type: actionTypes.ADD_NEW_USER,
  user: user,
});
const fetchAdminUsersPage = (user, page) => ({
  type: actionTypes.ADMIN_USERS_FETCH_PAGE,
  payload: user,
  page: page,
});
export const updateLocalAdminUsersPage = (nextPage) => ({
  type: actionTypes.ADMIN_USERS_CHANGE_PAGE,
  page: nextPage,
});
export const changeAdminUsersPerPage = (perPage) => ({
  type: actionTypes.ADMIN_USERS_CHANGE_PERPAGE,
  payload: perPage,
});
export const onChooseAdminUser = (index) => ({
  type: actionTypes.ADMIN_USERS_ON_CHOOSE,
  index: index,
});
//---------Admin User Details---------------------------------
const AdminUserDetailsLoading = () => ({
  type: actionTypes.ADMIN_USER_DETAILS_LOADING,
});
export const AdminUserDetailsError = (error) => ({
  type: actionTypes.ADMIN_USER_DETAILS_ERROR,
  error: error,
});
export const AdminUserDetailsChange = (currentUser, changedFields) => (
  dispatch
) => {
  dispatch(AdminUserDetailsLoading(true));
  return axios({
    method: 'patch',
    url: ApiURL + '/users/admin-manage/' + currentUser._id,
    headers: {
      Accept: 'application/json',
      'x-access-token': getLoginLocal(),
    },
    data: {
      ...(changedFields.banned !== null
        ? { banned: changedFields.banned }
        : {}),
      ...(changedFields.role ? { role: changedFields.role } : {}),
      ...(changedFields.password ? { password: changedFields.password } : {}),
    },
  })
    .then(
      (response) => {
        if (response.status === 200) {
          dispatch(AdminUserDetailsLocalUpdate(currentUser, changedFields));
          dispatch({
            type: actionTypes.RESET_ADMIN_USER_DETAILS,
          });
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .catch((error) => dispatch(AdminUserDetailsError(error)));
};
export const AdminUserDetailsLocalUpdate = (currentUser, changedFields) => (
  dispatch
) => {
  let updatedUser = currentUser;
  if (changedFields.banned !== null) {
    updatedUser.banned = changedFields.banned;
  }
  if (changedFields.role) {
    updatedUser.role = changedFields.role;
  }
  if (changedFields.password) updatedUser.password = changedFields.password;
  dispatch({
    type: actionTypes.ADMIN_USERS_CHANGE_CHOSEN,
    user: updatedUser,
  });
};
