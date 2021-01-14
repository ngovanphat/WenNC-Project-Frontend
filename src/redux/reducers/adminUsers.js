import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: false,
  error: null,
  users: [],
  sortColumn: 'none',
  search: '',
  page: 0,
  perPage: 5,
  totalUsers: 0,
  chosenIndex:-1,
};

export const adminUsers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_USERS_STATE:
      return {
        ...state,
        isLoading: false,
        error: null,
        users: action.payload,
        page: action.page,
        totalUsers: action.totalUsers
      };
    case actionTypes.ADMIN_USERS_LOADING:
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
    case actionTypes.ADD_NEW_USER:
      return {
        ...state,
        isLoading: false,
        error: null,
        users: state.users,
        totalUsers: action.totalUsers,
      }
    case actionTypes.ADMIN_USERS_CHANGE_PERPAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        perPage: action.payload,
      }
    case actionTypes.ADMIN_USERS_FETCH_PAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        users: [].concat(state.users, action.payload),
        page: action.page,
      }
    case actionTypes.ADMIN_USERS_CHANGE_PAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        page: action.page,
      }
    case actionTypes.ADMIN_USERS_ON_CHOOSE:
      return {
        ...state,
        chosenIndex:action.index,
      }
    case actionTypes.ADMIN_USERS_CHANGE_CHOSEN:
      return {
        ...state,
        users:state.users.map((content, i) => i === state.chosenIndex+(state.page*state.perPage) ? action.user
        : content
        )
      }
    case actionTypes.ADMIN_USER_DELETE:
      return {
        ...state,
        users:state.users.splice(state.chosenIndex+(state.page*state.perPage),1),
        chosenIndex:-1
      }
    default:
      return state;
  }
};