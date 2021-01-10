import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  courses: [],
  sortColumn:'title',
  page:1,
  perRow:5,
  

};

export const adminCourses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COURSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload.docs
      };
    case actionTypes.ALL_COURSES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        courses: []
      };
    case actionTypes.ALL_COURSES_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        adminCourses: []
      };
    default:
      return state;
  }
};