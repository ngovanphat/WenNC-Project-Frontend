import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  courses: []
};

export const sameCourses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SAME_COURSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload
      };
    case actionTypes.SAME_COURSES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        courses: []
      };
    case actionTypes.SAME_COURSES_FAIL:
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