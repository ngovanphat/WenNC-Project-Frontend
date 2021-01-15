import * as actionTypes from '../actionTypes';
const initialState = {
  isLoading: false,
  error: null,
  categories: [],
  sortColumn: 'none',
  search: '',
  page: 0,
  perPage: 5,
  totalCategories: 0,
  chosenIndex:-1,
};

export const adminCategories = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_CATEGORIES_STATE:
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: action.payload,
        page: action.page,
        totalCategories: action.totalCategories
      };
    case actionTypes.ADMIN_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.ADMIN_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.ADD_NEW_CATEGORY:
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: [].concat(state.categories, action.category),
        totalCategories: state.totalCategories+1,
      }
    case actionTypes.ADMIN_CATEGORIES_FETCH_ALL:{
      return {
        ...state,
        isLoading: false,
        error: null,
        categories: action.categories,
        page: 1 ,
        totalCategories: action.totalCategories
      }
    }
    case actionTypes.ADMIN_CATEGORIES_CHANGE_PERPAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        perPage: action.perPage,
      }
    case actionTypes.ADMIN_CATEGORIES_CHANGE_PAGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        page: action.page,
      }
    case actionTypes.ADMIN_CATEGORIES_ON_CHOOSE:
      return {
        ...state,
        chosenIndex:action.index,
      }
    case actionTypes.ADMIN_CATEGORIES_CHANGE_CHOSEN:
      return {
        ...state,
        categories:state.categories.map((content, i) => i === state.chosenIndex+((state.page-1)*state.perPage) ? action.category
        : content
        )
      }
    case actionTypes.ADMIN_CATEGORIES_DELETE:
      console.log("state.chosenIndex+(state.page*state.perPage) "+ (state.chosenIndex+((state.page-1)*state.perPage)) );
      const newList=state.categories.filter((function(value, index, arr){ 
        return index!==state.chosenIndex+((state.page-1)*state.perPage);
      }));
      return {
        ...state,
        categories:newList,
        chosenIndex:-1,
        totalCategories:state.totalCategories-1,
        page:1
      }
    default:
      return state;
  }
};