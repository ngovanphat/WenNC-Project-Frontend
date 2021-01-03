import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  course: null
};

export const singleCourse = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SINGLE_COURSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        course: action.payload
      };
    case actionTypes.SINGLE_COURSE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        course: null
      };
    case actionTypes.SINGLE_COURSE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        course: null
      };
    default:
      return state;
  }
};