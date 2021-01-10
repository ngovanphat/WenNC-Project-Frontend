import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Chip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../helpers/colors';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
const rows = [
  {
    "_id": "5fd326f8851a412c881d7906",
    "points": 4.8,
    "numberOfFeedback": 3,
    "numberOfStudent": 1,
    "thumnail": "https://img-a.udemycdn.com/course/240x135/1708340_7108_4.jpg?6SU20jCZLkR4SlfMFGkKgB0yNTrq1fx3QYAzjOeROmHgiku19tGzpZqEZ85CfaB3X2Q-g1KgUIFBMBUFxD7FKzCEh7VqBQ-kvMk4tpRAqTWtyDt8GvGqs82XplyZI59i",
    "last_updated": 1607673590218,
    "videos": [
      "5ff3d8047f52572370b7cb5d",
      "5ff3d86fd663fa3520c0279c",
      "5ff4202042e9ec0024b2ede5"
    ],
    "title": "Flutter & Dart - The Complete Guide [2020 Edition]",
    "category": "Mobile Development",
    "leturer": {
      "_id": "5fd23cc653f29b3850b48c57",
      "avatar": "https://i.imgur.com/Xp51vdM.png",
      "description": "",
      "course_list": [
        "5fd47265b531a72b30c59ca4",
        "5fd3257dd530df1a6054ba25",
        "5fd326f8851a412c881d7906",
        "5fd32ba9851a412c881d7907",
        "5fd32bf5851a412c881d7908",
        "5fd32c43851a412c881d7909",
        "5fd32c82851a412c881d790a",
        "5fd32cf1851a412c881d790b",
        "5fd32d43851a412c881d790c",
        "5fd32d80851a412c881d790d",
        "5fd32dc3851a412c881d790e",
        "5fd32dc3851a412c881d790f",
        "5fd32f17851a412c881d7910",
        "5fd32f17851a412c881d7911",
        "5fd32f17851a412c881d7912",
        "5fd32f17851a412c881d7913",
        "5fd32f17851a412c881d7914",
        "5fd32f17851a412c881d7915",
        "5fd32f17851a412c881d7916",
        "5fd32f17851a412c881d7917",
        "5fd32f17851a412c881d7918",
        "5fd32f17851a412c881d7919",
        "5fd70615157fa61072b2ca98",
        "5fd7058071d6871ecc5922dd"
      ],
      "fullname": "Ngô Văn Phát"
    },
    "price": 11.99,
    "actualPrice": 129.99,
    "description": "The entire course was completely re-recorded and updated - it's totally up-to-date with the latest version of Flutter!",
    "__v": 0,
    "shortDecription": null,
    "isDone": false
  }
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
    <div style={{ height: '100%', width: '100%', overflow: 'auto', marginRight: '10px', marginLeft: '10px' }}>
      <MaterialTable
        columns={[
          {
            title: 'ID', field: '_id', align: 'left', sorting: false,
            cellStyle: {
              maxWidth: "20vh", whiteSpace: 'pre-wrap', overflowWrap: 'break-word'
            },
            headerStyle: {
              maxWidth: "20vh"
            }
          },
          { title: 'Title', field: 'title', align: 'left' },
          { title: 'Lecturer', field: 'leturer.fullname', align: 'left' },
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
          /* {
            field: 'isPublic',
            title: 'Status',
            render: rowData => rowData.isPublic?<CheckCircleIcon  style={{ color: green[500] }}/>:<CancelIcon style={{ color: red[500] }}/>
          }, */
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
          sorting: true,
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => { }
          },
          () => ({
            icon: () => <InfoOutlinedIcon style={{ color: Colors.primary }} />,
            iconProps: { style: { color: '#005580' } },
            tooltip: 'Details',
            onClick: (event, rowData) => history.push(`/admin/courses/${rowData._id}`, { datas: rowData })
          })
        ]}
      />
    </div>
  );
}
