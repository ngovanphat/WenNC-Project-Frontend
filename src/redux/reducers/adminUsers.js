import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  error: null,
  users: [],
  sortColumn:'none',
  search:'',
  page:1,
  perPage:5,
  totalUsers:0,
};

export const adminUsers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_USERS_STATE:
      return {
        ...state,
        isLoading: false,
        error:null,
        users:action.payload,
        page:action.page,
        totalUsers:action.totalUsers
      };
    case actionTypes.ADMIN_USERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error:null,
      };
    case actionTypes.ALL_COURSES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.ADD_NEW_USER:
        return{
            ...state,
            isLoading:false,
            error:null,
            users:[...state.users,action.payload]
        }
    case actionTypes.ADMIN_USERS_CHANGE_PERPAGE:
        return{
            ...state,
            isLoading:false,
            error:null,
            perPage:action.payload,
        }
    default:
      return state;
  }
};