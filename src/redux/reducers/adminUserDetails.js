import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: '',
  user: null
};

export const adminUserDetails = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_USER_DETAILS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload
      };
    case actionTypes.ADMIN_USER_DETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
        user: null
      };
    case actionTypes.ADMIN_USER_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        errMess: action.error.message,
        user: null
      };
    case actionTypes.RESET_ADMIN_USER_DETAILS:
      return initialState
    default:
      return state;
  }
};