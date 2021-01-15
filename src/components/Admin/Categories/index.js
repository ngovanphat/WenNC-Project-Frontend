import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../helpers/colors';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { colors, Drawer } from '@material-ui/core';
import { fetchAllAdminCategories,removeAdminCategory, changeAdminCategoriesPage,changeAdminCategoriesPerPage,onChooseAdminCategory,AdminCategoryDetailsChange} from '../../../redux/actions';
import AddCategory from './AddCategory';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};


const Categories = () => {
  const tableRef = React.createRef();
  const history = useHistory();
  const adminCategories = useSelector(state => state.adminCategories)
  const dispatch = useDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isAddingCategory,setIsAddingCategory] = useState(false);


  useEffect(() => {
    document.title = 'Categories';
    if(adminCategories.totalCategories===0) dispatch(fetchAllAdminCategories());

  }, []);

  useEffect(()=>{
    tableRef.current.onQueryChange();
  },[adminCategories.categories,adminCategories.page,adminCategories.perPage])

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleDelete=()=>{
    console.log(adminCategories.chosenIndex);
    //if(adminCategories.categories[adminCategories.chosenIndex].count<=0)
     // dispatch(removeAdminCategory(adminCategories.categories[adminCategories.chosenIndex]._id));
    setOpenDeleteDialog(false);
  }
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDrawerClose=(isSuccess)=>{
    setIsAddingCategory(false);
    if(isSuccess){
      tableRef.current.onQueryChange();
    }
  }
  return (
    <div style={{ height: '80%', width: '100%' }}>
      <MaterialTable
        columns={[
          {
            field: '_id',
            title: 'ID',
            cellStyle: {
              maxWidth: '10vh',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
            },
            headerStyle: {
              maxWidth: '10vh',
            },
            filtering :false,
            sorting:false
          },
          {
            field: 'title',
            title: 'Title',
            cellStyle: {
              maxWidth: '30vh',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
            },
            headerStyle: {
              maxWidth: '30vh',
            },
          },
          {
            field: 'count',
            title: 'Total Categories',
            type: 'number',
            filtering :false
          },
        ]}
        isLoading={adminCategories.isLoading}
        
        data={query =>
          new Promise((resolve, reject) => {
            const firstIndex = (adminCategories.page - 1) * adminCategories.perPage;
            const lastIndex = adminCategories.page * adminCategories.perPage;
            resolve({
              data: adminCategories.categories.slice(firstIndex, lastIndex),
              page: adminCategories.page-1,
              totalCount: adminCategories.totalCategories,
            });
          })}
        title="Categories"
        tableRef={tableRef}
        onChangePage={(page)=>{
          dispatch(changeAdminCategoriesPage(page+1));
          //tableRef.current&&tableRef.current.onQueryChange(); 
        }}
        onChangeRowsPerPage={async (perPage) => { 
          console.log(perPage);
          dispatch(changeAdminCategoriesPerPage(perPage)).then(
            tableRef.current.onQueryChange()); 
        }}
        /* 
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log("newData"+newData+" oldData "+oldData)
                if(newData.title===oldData.title)
                  return;
                const index = oldData.tableData.id;
                dispatch(AdminCategoryDetailsChange(oldData,newData))
                resolve();
              }, 5000)
            }),
        }} */
        options={{
          exportButton: true,
          sorting: true,
          actionsColumnIndex: -1,
          pageSize: adminCategories.perPage
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {dispatch(fetchAllAdminCategories()); }
          },
          {
            icon: 'add',
            tooltip: 'Add new Category',
            isFreeAction: true,
            onClick: () => {setIsAddingCategory(true) },
          },
          (rowData) => {
            return rowData.count === 0 ? {
              icon: 'delete',
            iconProps: { style: { color: colors.red } },
            tooltip: 'Delete Category',
            onClick: (event, rowData) =>{
              console.log(rowData);
              dispatch(onChooseAdminCategory(rowData.tableData.id));
              setOpenDeleteDialog(true);
            },
            } : {
                icon: 'delete',
                disabled: true,
                onClick: (event, rowData) => {}
              }
          },

        ]}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Category "{adminCategories.chosenIndex>-1?adminCategories.categories[adminCategories.chosenIndex+(adminCategories.page-1)*adminCategories.perPage].title:"Error"}" will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary" autoFocus>
            No
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer anchor='right' open={isAddingCategory} 
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}>
      <AddCategory handleFinishAddCategory={handleDrawerClose}/>
      </Drawer>
    </div>
  );
};

export default Categories;
