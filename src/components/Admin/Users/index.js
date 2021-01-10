import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../helpers/colors';
import {fetchAdminUsers } from '../../../redux/actions';
import { connect } from 'react-redux';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
const mapStateToProps=state =>{
  return {
    adminUsers:state.adminUsers
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAdminUsers: () => { dispatch(fetchAdminUsers()) },
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
const rows = [
  {
    'avatar':
      'https://i.pinimg.com/originals/6c/ce/de/6ccede86e8a11d520f5e7a3386d46ff0.jpg',
    'description': '',
    'banned': false,
    'role': 'ADMIN',
    'favorite_list': [],
    'join_list': [],
    'course_list': [],
    '_id': '5fd1f1228a416421304cf7de',
    'email': '123@gmail.com',
    'fullname': 'abc',
    'createdAt': '2020-12-10T09:57:54.770Z',
  },
  {
    'avatar': 'https://i.imgur.com/Xp51vdM.png',
    'description': '',
    'banned': true,
    'role': 'STUDENT',
    'favorite_list': [
      '5fd3257dd530df1a6054ba25',
      '5fd3257dd530df1a6054ba25',
      '5fd3257dd530df1a6054ba25',
    ],
    'join_list': ['5fd3257dd530df1a6054ba25'],
    'course_list': [],
    '_id': '5fd218f53b505b0cc80cabd6',
    'email': '12345@gmail.com',
    'fullname': '123456',
    'createdAt': '2020-12-10T12:47:49.519Z',
  },
];

function DataTable(props) {
  const tableRef = React.createRef();
  const history = useHistory();

  useEffect(() => {
    document.title = 'Users';
    fetchAdminUsers(props.adminUsers.page,props.adminUsers.perPage);
  }, []);
  return (
    <div style={{ height: '80%', width: '100%' }}>
      <MaterialTable
        columns={[
          {
            field: '_id',
            title: 'ID',
            cellStyle: {
              maxWidth: '10vh', whiteSpace: 'pre-wrap', overflowWrap: 'break-word'
            },
            headerStyle: {
              maxWidth: '10vh',
            },
          },
          {
            field: 'email', title: 'Email',
            cellStyle: {
              maxWidth: '10vh', whiteSpace: 'pre-wrap', overflowWrap: 'break-word'
            },
            headerStyle: {
              maxWidth: '10vh',
            },
          },
          { field: 'fullname', title: 'Fullname' },
          {
            field: 'role',
            title: 'Role',
          },
          {
            field: 'banned',
            title: 'Status',
            render: (rowData) =>
              rowData.banned ? (
                <CancelIcon style={{ color: red[500] }} />
              ) : (
                  <CheckCircleIcon style={{ color: green[500] }} />
                ),
          },
        ]}
        data={props.adminUsers.users}
        title="Users"
        tableRef={tableRef}
        options={{
          exportButton: true,
          sorting: true,
          actionsColumnIndex: -1,
          initialPage:props.adminUsers.page,
          pageSize:props.adminUsers.perPage,
          exportAllData:true,
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => { } /* tableRef.current && tableRef.current.onQueryChange() */,
          },
          () => ({
            icon: () => <InfoOutlinedIcon style={{ color: Colors.primary }} />,
            iconProps: { style: { color: '#005580' } },
            tooltip: 'Details',
            onClick: (event, rowData) =>
              history.push(`/admin/users/${rowData._id}`, { datas: rowData }),
          }),
        ]}
      />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(DataTable);