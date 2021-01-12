import * as actionTypes from '../actionTypes';

const getLoginData = () => {
  const loginData = localStorage.getItem('loginData');
  return loginData ? JSON.parse(loginData) : null;
};
const initialState = {
  isLoggedIn: false,
  userId: '',
  accessToken: '',
  refreshToken: ''
};

export const loginReducer = (state = getLoginData() ? getLoginData() : initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_STATE:
      return {
        ...state,
        ...action.payload, // this is what we expect to get back from API call and login page input
        isLoggedIn: true, // we set this as true on login
      };
    case actionTypes.LOGOUT:
      return initialState
    default:
      return state;
  }
};