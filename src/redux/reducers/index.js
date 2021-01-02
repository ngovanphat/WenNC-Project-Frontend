/*

    With child reducer, need to declare in this file, after that we add this to combileReducers

*/

import { combineReducers } from "redux";
import { loginReducer } from './login';
import { newestCourses } from './newestCourses';
import { hotCategories } from './hotCategories';
export default combineReducers({ loginReducer, newestCourses, hotCategories });
