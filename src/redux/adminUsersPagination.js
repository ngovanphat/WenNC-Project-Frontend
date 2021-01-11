import { createPaginator } from './../../pagination-lib/createPaginator';
const axios = require('axios').default;

export const ELEMENTS_PER_PAGE = 15;

const getUsersPage= async(page,ELEMENTS_PER_PAGE,filter, searchPhrase)=>{
    if(searchPhrase!== undefined && searchPhrase !== null){
        //todo update api for search
    }else{

    }
    return axios({
        method: 'get',
        url: ApiURL + '/admin/users/all',
        headers: {
          Accept: 'application/json',
          'x-access-token': getLoginLocal(),
        },
        params:{
            page:page,
            pageCount:ELEMENTS_PER_PAGE,

        }
      })
        .then(response => {
          if (response.status === 200) {
            alert("Add to wishlist successfully");
          }
          else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          }
        )
        .catch(error => {});
}

const callUsersApi = (page, requestParams) => {
  const { searchPhrase,filter } = requestParams;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const serverResponse = getUsersPage(page, ELEMENTS_PER_PAGE, searchPhrase,filter);
      resolve(serverResponse);
    }, 1000);
  });
};


const searchParamsInitState = { searchPhrase: '' };

//default config below
const config = {
  refreshResultInBackground: true,
  timeToRefresh: 1000, //[ms]
  searchHistoryLength: 5,//max pages to save
  elementsPerPage: ELEMENTS_PER_PAGE
};

const UsersPaginator = createPaginator(
  'standard',
  callUsersApi,
  config,
  searchParamsInitState
);

export const paginatorStoreName = UsersPaginator.storeName;

//export used methods
export const loadUsersPage = UsersPaginator.requestPage;
export const examsPaginatorReducers = UsersPaginator.reducers;
export const examsStoreName = UsersPaginator.storeName;
export const updateSearchParams = UsersPaginator.updateSearchParams;

export const setCurrentPage = UsersPaginator.setCurrentPage;
export const getCurrentPage = UsersPaginator.selectors.getCurrentPage;

//selectors:
export const getTotalElements = UsersPaginator.selectors.getTotalElements;
export const getPage = UsersPaginator.selectors.getPage;
export const getSearchParams = UsersPaginator.selectors.getSearchParams;