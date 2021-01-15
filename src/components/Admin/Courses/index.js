import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button, Chip, colors, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Redirect, useHistory } from 'react-router-dom';
import { Colors } from '../../../helpers/colors';
import { fetchAllAdminCourses,changeAdminCoursesPage,changeAdminCoursesPerPage, onChooseAdminCourse, removeAdminCourse, setAdminCourseDetails } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
export default function CoursesTable() {
  const tableRef = React.createRef();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const adminCourses = useSelector(state => state.adminCourses);
  const dispatch = useDispatch();
  
  var prevPage = adminCourses.page;
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete=()=>{
    console.log(adminCourses.chosenIndex);
    dispatch(removeAdminCourse(adminCourses.courses[adminCourses.chosenIndex]._id));
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.title = 'Courses';
    if(adminCourses.totalCourses===0) dispatch(fetchAllAdminCourses());
  }, []);
  useEffect(()=>{
    tableRef.current.onQueryChange();
  },[adminCourses.courses,adminCourses.page,adminCourses.perPage])

  useEffect(()=>{
    //if(adminCourses.error.inclues("Unauthorized"))
    if(adminCourses.error!==null&&adminCourses.error.inclues("Network"))
      return <Redirect to='/'/>
  },[adminCourses.error])
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
            },
            filtering:false
          },
          { title: 'Title', field: 'title', align: 'left' },
          { title: 'Lecturer', field: 'leturer.fullname', align: 'left' },
          {
            title: 'Feedbacks',
            field: 'numberOfFeedback',
            align: 'left',
            type: 'numeric',
            filtering:false
          },
          {
            title: 'Students',
            field: 'numberOfStudent',
            align: 'left',
            type: 'numeric',
            filtering:false
          },
          {
            title: 'Last Updated',
            align: 'left',
            field: 'last_updated',
            type: 'date',
            filtering:false
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
        isLoading={adminCourses.isLoading}
        
        data={query =>
          new Promise((resolve, reject) => {
            if(query.search.length>0){
              let searchCourses={};
              searchCourses.courses=adminCourses.courses.filter((i=>{
                console.log(query.search);
                return (typeof i.leturer.fullname == "string" && i.leturer.fullname.indexOf(query.search) > -1    )||(typeof i.category == "string" && i.category.indexOf(query.search) > -1 ) ;
              }));
              searchCourses.page=1;
              searchCourses.totalCourses=searchCourses.courses.length;
              const firstIndex = (searchCourses.page - 1) * adminCourses.perPage;
              const lastIndex = searchCourses.page * adminCourses.perPage;
              resolve({
                data: searchCourses.courses.slice(firstIndex, lastIndex),
                page: searchCourses.page-1,
                totalCount: searchCourses.totalCourses,
              });
            }else{
              const firstIndex = (adminCourses.page - 1) * adminCourses.perPage;
              const lastIndex = adminCourses.page * adminCourses.perPage;
              resolve({
                data: adminCourses.courses.slice(firstIndex, lastIndex),
                page: adminCourses.page-1,
                totalCount: adminCourses.totalCourses,
              });

            }
          })}
        title="Courses"
        tableRef={tableRef}
        onChangePage={(page)=>{
          dispatch(changeAdminCoursesPage(page+1));
          //tableRef.current&&tableRef.current.onQueryChange(); 
        }}
        onChangeRowsPerPage={async (perPage) => { 
          console.log(perPage);
          dispatch(changeAdminCoursesPerPage(perPage)).then(
            tableRef.current.onQueryChange()); 
        }}
        options={{
          exportButton: true,
          sorting: true,
          filtering: true,
          actionsColumnIndex: -1,
          pageSize: adminCourses.perPage
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {dispatch(fetchAllAdminCourses()); }
          },
          () => ({
            icon: () => <InfoOutlinedIcon style={{ color: Colors.primary }} />,
            iconProps: { style: { color: '#005580' } },
            tooltip: 'Details',
            onClick: (event, rowData) =>{
              dispatch(onChooseAdminCourse(rowData.tableData.id));
              dispatch(setAdminCourseDetails(rowData));
              history.push(`/admin/courses/${rowData._id}`, { datas: rowData })
            }
          }),
          () => ({
            icon: 'delete',
            iconProps: { style: { color: colors.red } },
            tooltip: 'Delete Course',
            onClick: (event, rowData) =>{
              console.log(rowData);
              dispatch(onChooseAdminCourse(rowData.tableData.id));
              setOpen(true);
            },
          }),
        ]}
        /* 
        components={{
          Pagination: (componentProps) => <TablePagination
            {...componentProps}
            count={adminCourses.totalCourses}
            page={adminCourses.page - 1}
            rowsPerPage={adminCourses.perPage}
            onChangePage={(evt, page) => {
              const curPage = adminCourses.page;
              const nxtPage = page + 1;
              console.log("nxtPage"+nxtPage);
              const firstIndexOfNext = (nxtPage - 1) * adminCourses.perPage;//split cal to be clearer
              if (prevPage !== nxtPage) {//
                prevPage = nxtPage;
                console.log(adminCourses.courses[firstIndexOfNext]);
                dispatch(changeAdminCoursesPage(page+1));
                tableRef.current.onQueryChange();
              }
            }}
            onChangeRowsPerPage={async (event) => { 
              //reset all state,fetch again from page 1
              dispatch(changeAdminCoursesPerPage(event.target.value)); 
              tableRef.current.onQueryChange(); 
            }}
          />
        }} */
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Course "{adminCourses.chosenIndex>-1?adminCourses.courses[adminCourses.chosenIndex+(adminCourses.page-1)*adminCourses.perPage].title:"Error"}" will be deleted.Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
