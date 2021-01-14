import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Button,
  Chip,
  colors,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Collapse,
  Snackbar,
} from '@material-ui/core';
import styled from 'styled-components';
import { Redirect, useHistory, useParams, withRouter } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditPanel from './EditPanel';
import MuiAlert from '@material-ui/lab/Alert';
import { Skeleton } from '@material-ui/lab';
import { AdminUserDetailsChange,AdminUserDetailsLocalUpdate }from '../../../redux/actions';
import { connect } from 'react-redux';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// eslint-disable-next-line no-extend-native
String.prototype.firstLetterCapitalize = function () {
  return this.charAt(0) + this.slice(1).toLowerCase();
};

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
    adminUserDetails:state.adminUserDetails
  }
}
const mapDispatchToProps = (dispatch) => ({
  AdminUserDetailsChange: (currentUser,changedFields)=>{
    dispatch(AdminUserDetailsChange(currentUser,changedFields));
  },
  AdminUserDetailsLocalUpdate:(currentUser,changedFields) =>{
    dispatch(AdminUserDetailsLocalUpdate(currentUser,changedFields));
  }
})

const styles = {
  root: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    minHeight: '80vh',
    padding: '0 1% 1% 1%  !important',
  },
  gridItem: {
    padding: '0 1% 1% 1%  !important',
  },
  mainInfoDetails: {
    minHeight: '70vh',
    paddingBottom:"5%"
  },
  actions: {
    display: 'flex',
  },
  button: {
    margin: '1%',
  },
  content: {
    paddingLeft: '1%',
  },
  price: {
    textDecorationLine: 'line-through',
    paddingLeft: '1%',
    color: '#808080',
  },
  avatar: {
    marginTop: '2%',
    marginBottom: '2%',
    minWidth: 150,
    minHeight: 150,
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  edit: {
    transitionDuration: '0.3s',
  },
};

const useStyles = makeStyles(styles);
const UserDetails = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [save, setSave] = useState(['', null]);
  const noticeRef = useRef(false);
  const user = props.history.location.state.datas;
  let { id } = useParams();
  const handleSaveInfo = async (error,changedFields) => {
    if (error !== null) {
      setSave(['error', error]);
    } else {
      await props.AdminUserDetailsChange(user,changedFields);
      //props.AdminUserDetailsLocalUpdate(user,changedFields);
    }
  };
  const handleClose = (event, reason) => {
    /* if (reason === 'clickaway') {
      return;
    } */
    setSave(['', null]);
    setEditing(false);
  };
  useEffect(() => {
    document.title = 'User Details';
  }, []);
  useEffect(() => {
    if(noticeRef){
      
      if(props.adminUserDetails.errMess===''  && props.adminUserDetails.isLoading!==true){
        setSave(['success', 'Successfully Saved']);      noticeRef.current=false;

      }else if(props.adminUserDetails.isLoading!==true)  {setSave(['error', props.adminUserDetails.errMess]);      noticeRef.current=false;
    }
    }else noticeRef.current=true;
  }, [props.adminUserDetails.errMess])
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.mainInfoDetails}>
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>

        {user ? (
          <Grid container>
            <Grid
              item
              xs={12}
              md={3}
              align="center"
              justify="center"
              alignItems="center">
              <Avatar
                alt="Avatar"
                className={classes.avatar}
                src={user.avatar}
              />
            </Grid>
            <Grid item xs={8}>
              <div>
                <Typography variant="h6" display="inline" gutterBottom>
                  Id :
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.content}
                  display="inline">
                  {user._id}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" display="inline" gutterBottom>
                  Join Date :
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.content}
                  display="inline">
                  {new Date(user.createdAt).toUTCString()}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" display="inline" gutterBottom>
                  Full Name :
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.content}
                  display="inline">
                  {user.fullname}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" display="inline" gutterBottom>
                  Role :
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.content}
                  display="inline">
                  {user.role.firstLetterCapitalize()}
                </Typography>
              </div>
              <div>
                <Typography variant="h6" display="inline" gutterBottom>
                  Email :
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.content}
                  display="inline">
                  {user.email}
                </Typography>
              </div>

              <Typography variant="h6">Description:</Typography>
              <Typography variant="body1" style={{ marginBottom: '1%',minHeight:"5%" }}>
                {user.description}
              </Typography>

              <div className={classes.status}>
                <Typography variant="h6" display="inline" gutterBottom>
                  Status :
                </Typography>
                <Typography variant="body1" display="inline">
                  {user.banned ? (
                    <CancelIcon style={{ color: colors.red[500] }} />
                  ) : (
                      <CheckCircleIcon style={{ color: colors.green[500] }} />
                    )}
                </Typography>
              </div>
              {props.userProfile.user!==null?<Collapse in={editing} className={classes.edit}>
                <EditPanel
                  handleSave={handleSaveInfo}
                  status={user._id!==props.userProfile.user.user._id?user.banned:null}
                  role = {user._id!==props.userProfile.user.user._id?user.role:null}
                  ></EditPanel>
              </Collapse>:<Redirect to='/'/>}
            </Grid>
          </Grid>
        ) : (
            <Skeleton variant="rect"></Skeleton>
          )}
      </Grid>
      <Grid item xs={12} className={classes.actions} justify="flex-end">
        <Button
          variant="contained"
          style={{
            backgroundColor: colors.lightGreen[600],
            borderColor: colors.lightGreen[600],
          }}
          className={classes.button}>
          Export to CSV
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: colors.green[500],
            borderColor: colors.green[500],
          }}
          className={classes.button}
          onClick={() => setEditing(true)}>
          Update
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: colors.red[500],
            borderColor: colors.red[500],
          }}
          className={classes.button}>
          Delete
        </Button>
      </Grid>
      <div>
        <Snackbar
          open={save[0] === '' ? false : true}
          autoHideDuration={2000}
          onClose={handleClose}>
          {save[0] === 'success' ? (
            <Alert severity="success">{save[1]}</Alert>
          ) : save[0] === 'error' ? (
            <Alert severity="error">{save[1]}</Alert>
          ) : null}
        </Snackbar>
      </div>
    </Grid>
  );
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserDetails));
