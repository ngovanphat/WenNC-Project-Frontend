import * as actionTypes from '../actionTypes';
const initialState = {
  isChecking: false,
  error: null,
  check: false
};

export const adminCheck = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_CHECK_STATE:
      return {
        ...state,
        isChecking: false,
        error: null,
        check: action.payload
      };
    case actionTypes.ADMIN_CHECKING:
      return {
        ...state,
        isChecking: true,
        error: null,
        check: state.check
      };
    case actionTypes.ADMIN_CHECK_FAILED:
      return {
        ...state,
        isChecking: false,
        error: action.payload,
        check: false
      };
    default:
      return state;
  }
};