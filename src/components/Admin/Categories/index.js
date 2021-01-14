import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from '@material-ui/core/colors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../helpers/colors';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const rows = [
  {
    '_id': '5fd31da383d7e81ec468547d',
    'title': 'Mobile Development',
    'count': 0,
  },
  {
    '_id': '5fd31dab83d7e81ec468547e',
    'title': 'Web Development',
    'count': 21,
  },
];
const Categories = () => {
  const tableRef = React.createRef();
  const history = useHistory();

  useEffect(() => {
    document.title = 'Categories';
  }, []);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

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
            title: 'Total Courses',
            type: 'number',
          },
        ]}
        data={rows}
        title="Categories"
        tableRef={tableRef}
        options={{
          exportButton: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => { } /* tableRef.current && tableRef.current.onQueryChange() */,
          },
          {
            icon: 'add',
            tooltip: 'Add new Category',
            isFreeAction: true,
            onClick: () => { },
          },
          (rowData) => {
            return rowData.count === 0 ? {
              icon: 'delete',
              tooltip: 'Delete',
              onClick: (event, rowData) => setOpenDeleteDialog(true)
            } : {
                icon: 'delete',
                disabled: true,
                onClick: (event, rowData) => setOpenDeleteDialog(true)
              };
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
            This Category will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseDeleteDialog} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;
