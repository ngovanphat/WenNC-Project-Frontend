import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Chip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
const rows = [
  {
    id: 1,
    title: 'abc',
    lecturer: 'abc',
    numberOfFeedback: 5,
    numberOfStudent: 5,
    last_updated: new Date('1999/3/1'),
    category: 'Mobile Development',
  },
];

export default function CoursesTable() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const tableRef = React.createRef();
  const history = useHistory();
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    document.title = 'Courses';
  }, []);
  return (
    <div style={{ height: '100%', width: '100%', overflow:'auto', marginRight:'10px', marginLeft:'10px'}}>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'id', align: 'left', sorting:false },
          { title: 'Title', field: 'title', align: 'left' },
          { title: 'Lecturer', field: 'lecturer', align: 'left' },
          {
            title: 'Feedbacks',
            field: 'numberOfFeedback',
            align: 'left',
            type: 'numeric',
          },
          {
            title: 'Students',
            field: 'numberOfStudent',
            align: 'left',
            type: 'numeric',
          },
          {
            title: 'Last Updated',
            align: 'left',
            field: 'last_updated',
            type: 'date',
          },
          {
            title: 'Category',
            align: 'left',
            field: 'category',
            render: (rowData) => <Chip label={rowData.category} />,
          },
        ]}
        data={
          /* (query) =>
          new Promise((resolve, reject) => {
            let url = 'https://localhost:3001/api/v1/users/admin-manage/all';
            url += 'per_page=' + query.pageSize;
            url += '&page=' + (query.page + 1);
            fetch(url)
              .then((response) => response.json())
              .then((result) => {
                resolve({
                  data: result.docs,
                  page: result.page - 1,
                  totalCount: result.totalDocs,
                });
              });
          }) */
          rows
        }
        title="Courses"
        tableRef={tableRef}

        options={{
          exportButton: true,
          sorting:true,
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () =>{}
          },
          ()=>({
            icon:()=><InfoOutlinedIcon/>,
            iconProps: {style:{color:'#005580'}},
            tooltip:'Details',
            onClick: (event, rowData) => history.push(`/admin/courses/${rowData.id}`, {datas:rowData}) 
          })
        ]}
      />
    </div>
  );
}
