import * as actionTypes from '../actionTypes';

const initialState = {
    userId: '',
    accessToken: '',
    refreshToken: ''
};


export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoggedIn: true, // we set this as true on login
      };
    default:
      return state;
  }
};