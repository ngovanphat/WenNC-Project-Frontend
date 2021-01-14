import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: false,
  error: null,
  courses: [],
  sortColumn: 'none',
  search: '',
  page: 0,
  perPage: 5,
  totalCourses: 0,
  chosenIndex:-1,
};

export const adminCourses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_COURSES_STATE:
      return {
        ...state,
        isLoading: false,
        error: null,
        courses: action.payload,
        page: action.page,
        totalcourses: action.totalCourses
      };
    case actionTypes.ADMIN_COURSES_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.ALL_COURSES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.ADD_NEW_COURSE:
      return {
        ...state,
        isLoading: false,
        error: null,
        courses: [].concat(state.courses, action.course),
        totalCourses: state.totalCourses+1,
      }
    case actionTypes.ADMIN_COURSES_FETCH_ALL:{
      return {
        ...state,
        isLoading: false,
        error: null,
        courses: action.courses,
        page: 1 ,
        totalCourses: action.totalCourses
      }
    }
    case actionTypes.ADMIN_COURSES_CHANGE_PERPAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        perPage: action.perPage,
      }
    case actionTypes.ADMIN_COURSES_CHANGE_PAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        page: action.page,
      }
    case actionTypes.ADMIN_COURSES_ON_CHOOSE:
      return {
        ...state,
        chosenIndex:action.index,
      }
    case actionTypes.ADMIN_COURSES_CHANGE_CHOSEN:
      return {
        ...state,
        courses:state.courses.map((content, i) => i === state.chosenIndex+((state.page-1)*state.perPage) ? action.course
        : content
        )
      }
    case actionTypes.ADMIN_COURSE_DELETE:
      console.log("state.chosenIndex+(state.page*state.perPage) "+ (state.chosenIndex+((state.page-1)*state.perPage)) );
      const newList=state.courses.filter((function(value, index, arr){ 
        return index!==state.chosenIndex+((state.page-1)*state.perPage);
      }));
      return {
        ...state,
        courses:newList,
        chosenIndex:-1,
        totalCourses:state.totalCourses-1,
        page:1
      }
    default:
      return state;
  }
};