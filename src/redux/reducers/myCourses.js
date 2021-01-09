import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  courses: []
};

export const myCourses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MY_COURSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload
      };
    case actionTypes.MY_COURSES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        courses: []
      };
    case actionTypes.MY_COURSES_FAIL:
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