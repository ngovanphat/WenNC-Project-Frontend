import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  courses: []
};

export const mostViewedCourses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MOST_VIEWED_COURSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload
      };
    case actionTypes.MOST_VIEWED_COURSES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        courses: []
      };
    case actionTypes.MOST_VIEWED_COURSES_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        courses: []
      };
    default:
      return state;
  }
};