import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  categories: []
};

export const hotCategories = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_HOT_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        categories: action.payload
      };
    case actionTypes.HOT_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        categories: []
      };
    case actionTypes.HOT_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        categories: []
      };
    default:
      return state;
  }
};