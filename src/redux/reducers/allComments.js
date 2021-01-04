import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: true,
  errMess: null,
  comments: [],
  totalDocs: 0, 
  totalPages: 0
};

export const allComments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALL_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload.docs,
        totalDocs: action.payload.totalDocs,
        totalPages: action.payload.totalPages
      };
    case actionTypes.ALL_COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        comments: [],
        totalDocs: 0,
        totalPages: 0
      };
    case actionTypes.ALL_COMMENTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
        totalDocs: 0,
        totalPages: 0
      };
    default:
      return state;
  }
};