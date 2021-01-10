import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  user: null
};

export const userProfile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_PROFILE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: action.payload
      };
    case actionTypes.USER_PROFILE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        user: null
      };
    case actionTypes.USER_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: null
      };
    case actionTypes.RESET_USER_PROFILE:
      return initialState
    default:
      return state;
  }
};