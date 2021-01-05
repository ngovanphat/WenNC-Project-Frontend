import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  category: null
};

export const singleCategory = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SINGLE_CATEGORY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        category: action.payload
      };
    case actionTypes.SINGLE_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        category: null
      };
    case actionTypes.SINGLE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        category: null
      };
    default:
      return state;
  }
};