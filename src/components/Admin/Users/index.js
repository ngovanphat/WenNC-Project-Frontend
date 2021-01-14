import React, { useEffect, useState } from 'react';
import { fetchAdminUsers, changeAdminUsersPage } from '../../../redux/actions';
import { connect, useSelector } from 'react-redux';
import UsersTable from './UsersTable';
import { Drawer } from '@material-ui/core';
import addUser from './AddUser';
import AddUser from './AddUser';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const mapStateToProps = state => {
  return {
    adminUsers: state.adminUsers
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAdminUsers: (page, pageSize) => { dispatch(fetchAdminUsers(page, pageSize)) },
  changeAdminUsersPage: (curPage, nextPage, perPage) => { dispatch(changeAdminUsersPage(curPage, nextPage, perPage)) }
});

//if using search bar,onSearchChange use diffirent reducer(searchAdminUsers) with diffirent table 
/* if(searchPhrase!== undefined && searchPhrase !== null){
  //todo update api for search
} */

//export : 
//call api to get all data
//const data =[all data]
//export in csv(another package)

//sort:
//update api
//sort use another reducer

function AdminUsers(props) {
  const [isAddingUser,setIsAddingUser] = useState(false);
  //component did mount
  useEffect(() => {
    document.title = 'Users';
    if (props.adminUsers.totalUsers <= 0)
      props.fetchAdminUsers(1, props.adminUsers.perPage);
  }, []);

  return (
    <div style={{ height: '80%', width: '100%' }}>
      <UsersTable ></UsersTable>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);