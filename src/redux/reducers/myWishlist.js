import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  courses: []
};

export const myWishlist = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MY_WISHLIST:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload
      };
    case actionTypes.MY_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        courses: []
      };
    case actionTypes.MY_WISHLIST_FAIL:
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