import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: '',
  course: null
};

export const adminCourseDetails = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_COURSE_DETAILS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        course: action.payload
      };
    case actionTypes.ADMIN_COURSE_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        course: null
      };
    case actionTypes.ADMIN_COURSE_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        errMess: action.error.message,
        course: null
      };
    case actionTypes.RESET_ADMIN_COURSE_DETAILS:
      return initialState
    default:
      return state;
  }
};