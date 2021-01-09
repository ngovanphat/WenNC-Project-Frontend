/*

    With child reducer, need to declare in this file, after that we add this to combileReducers

*/

import { combineReducers } from "redux";
import { loginReducer } from './login';
import { newestCourses } from './newestCourses';
import { mostViewedCourses } from './mostViewedCourses';
import { allCourses } from './allCourses';
import { singleCourse } from './singleCourse';
import { sameCourses } from './sameCourses';
import { hotCategories } from './hotCategories';
import { allCategories } from './allCategories';
import { singleCategory } from './singleCategory';
import { allComments } from './allComments';
import { userProfile } from './userProfile';
import { myCourses } from './myCourses';
import { myWishlist } from './myWishlist';
import { adminCheck } from './adminCheck';
export default combineReducers({ loginReducer, newestCourses, mostViewedCourses, allCourses, singleCourse, sameCourses, hotCategories, allCategories, singleCategory, allComments, userProfile, myCourses, myWishlist, adminCheck });
