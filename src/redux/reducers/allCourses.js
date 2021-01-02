import * as actionTypes from '../actionTypes';
const initialState = {
    isLoading: true,
    errMess: null,
    courses: []
};




export const allCourses = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_ALL_COURSES:
            return {...state, 
                    isLoading: false,
                    errMess: null,
                    courses: action.payload.docs
            };
        case actionTypes.ALL_COURSES_LOADING:
            return {
                    ...state,
                    isLoading: true,
                    errMess: null,
                    courses: []
            };
        case actionTypes.ALL_COURSES_FAIL:
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