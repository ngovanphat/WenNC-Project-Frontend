/*

    This file create a action to call reducer
    for each reducer create a group of action: User, Course, Category, Feedback, Video, Filter, Search

    

*/
import * as actionTypes from './actionTypes';
import { ApiURL } from '../helpers/baseUrl';

// this is what our action should look like which dispatches the "payload" to reducer
const setLoginState = (loginData) => {
  return {
    type: actionTypes.SET_LOGIN_STATE,
    payload: loginData,
  };
};

export const login = (loginInput) => {
    const { username, password } = loginInput;
    return (dispatch) => {  // don't forget to use dispatch here!
      return fetch(ApiURL + '/auth', {
        method: 'POST',
        headers: {  // these could be different for your API call
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInput),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.authenticated === true) { // response success checking logic could differ
            const data = { ...json, userId: username };
            setLoginLocal(data); // storing in local storage for next launch
            dispatch(setLoginState(data));
          } else {
            alert('Login Failed Username or Password is incorrect');
          }
        })
        .catch((err) => {
          alert('Login Failed Some error occured, please retry');
          console.log(err);
        });
    };
  };

  const setLoginLocal = async (loginData) => {
    try {
      await localStorage.setItem('loginData', JSON.stringify(loginData));
    } catch (err) {
      console.log(err);
    }
  };