/*

    With child reducer, need to declare in this file, after that we add this to combileReducers

*/

import { combineReducers } from "redux";
import { loginReducer } from './login';
import { newestCourses } from './newestCourses';
import { allCourses } from './allCourses';
import { hotCategories } from './hotCategories';
import { allCategories } from './allCategories';
export default combineReducers({ loginReducer, newestCourses, allCourses , hotCategories, allCategories });
