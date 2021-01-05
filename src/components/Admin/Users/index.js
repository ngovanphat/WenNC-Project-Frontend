import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const rows = [
  { id: 1, email: "123@gmail.com", fullname: "abc", role: "STUDENT", banned: true },
];

export default function DataTable() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const tableRef = React.createRef();
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    document.title = "Users"
  }, []);
  return (
    <div style={{ height: '80%', width: '100%' }}>
      <MaterialTable
          columns={[
            { field: 'id', title: 'ID'},
            { field: 'email', title: 'Email'},
            { field: 'fullname', title: 'Fullname'},
            {
              field: 'role',
              title: 'Role',
            },
            {
              field: 'banned',
              title: 'Status',
              width: 100
            },
          ]}
          data={rows}
          title="Users"
          tableRef={tableRef}
          actions={[
            {
              icon: 'refresh',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => tableRef.current && tableRef.current.onQueryChange(),
            }
          ]}
        />
    </div>
  );
}