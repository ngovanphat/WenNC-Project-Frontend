import React, { useEffect } from 'react';

import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { fetchAdminUsers, changeAdminUsersPage, changeAdminUsersPerPage, onChooseAdminUser } from '../../../redux/actions';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../helpers/colors';
import { TablePagination } from '@material-ui/core';

/* const mapStateToProps = (state) => {
  return {
    adminUsers: state.adminUsers,
  };
}; */
const mapStateToProps = state => {
  return {
    adminUsers: state.adminUsers
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchAdminUsers: (page, pageSize) => {
    dispatch(fetchAdminUsers(page, pageSize));
  },
  changeAdminUsersPage: (curPage, nextPage, perPage, existedInState) => {
    dispatch(changeAdminUsersPage(curPage, nextPage, perPage, existedInState));
  },
  changeAdminUsersPerPage: (perPage) => {
    dispatch(changeAdminUsersPerPage(perPage));
  },
  onChooseAdminUser:(index)=>{
    dispatch(onChooseAdminUser(index));
  }
});
function UsersTable(props) {
  const tableRef = React.useRef();
  const history = useHistory();
  var prevPage = props.adminUsers.page;
  //on users update
  useEffect(() => {
    /* console.log('New value', adminUsers.users)  */
    if (tableRef.current !== null) {
      tableRef.current.onQueryChange();
    }
    return () => {
      /* 
       console.log('Prev value', adminUsers.users)  */
    };
  }, [props.adminUsers.isLoading]);
  return (
    <MaterialTable
      columns={[
        {
          field: '_id',
          title: 'ID',
          cellStyle: {/* 
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word' */
          },
          headerStyle: {
          },
          searchable: false,
        },
        {
          field: 'email',
          title: 'Email',
          cellStyle: {/* 
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word', */
          },
          headerStyle: {
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
      data={query =>
        new Promise((resolve, reject) => {
          const firstIndex = (props.adminUsers.page - 1) * props.adminUsers.perPage;
          const lastIndex = props.adminUsers.page * props.adminUsers.perPage;
          resolve({
            data: props.adminUsers.users.slice(firstIndex, lastIndex),
            page: props.adminUsers.page - 1,
            totalCount: props.adminUsers.totalUsers,
          });
        })
      }
      title="Users"
      tableRef={tableRef}
      options={{
        exportButton: true,
        sorting: true,
        actionsColumnIndex: -1,
        pageSize: props.adminUsers.perPage,
        exportAllData: true,
      }}
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => {
            console.log('refreshing...');
            tableRef.current.onQueryChange()
          }
        },
        () => ({
          icon: () => <InfoOutlinedIcon style={{ color: Colors.primary }} />,
          iconProps: { style: { color: '#005580' } },
          tooltip: 'Details',
          onClick: (event, rowData) =>{
            console.log(rowData);
            props.onChooseAdminUser(rowData.tableData.id);
            history.push(`/admin/users/${rowData._id}`, { datas: rowData })
          },
        }),
      ]}
      isLoading={props.adminUsers.isLoading}
      components={{
        Pagination: (componentProps) => <TablePagination
          {...componentProps}
          count={props.adminUsers.totalUsers}
          page={props.adminUsers.page - 1}
          rowsPerPage={props.adminUsers.perPage}
          onChangePage={(evt, page) => {
            const curPage = props.adminUsers.page;
            const nxtPage = page + 1;
            const firstIndexOfNext = (nxtPage - 1) * props.adminUsers.perPage;//to be clearer
            if (prevPage !== nxtPage) {
              prevPage = nxtPage;
              console.log(props.adminUsers.users[firstIndexOfNext]);
              props.changeAdminUsersPage(curPage, nxtPage, props.adminUsers.perPage, typeof props.adminUsers.users[firstIndexOfNext] !== 'undefined');
              tableRef.current.onQueryChange();
            }
          }}
          onChangeRowsPerPage={(event) => { 
            //reset all state,fetch again from page 1
            props.changeAdminUsersPerPage(event.target.value); 
            tableRef.current.onQueryChange(); 
          }}
        />
      }}
    />
  );
}

export default connect(null, mapDispatchToProps)(UsersTable);
