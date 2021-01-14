import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  makeStyles,
  TextField,
  Button,
  colors,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const styles = {
  root: {
    padding: '1%',
  },
  actions: {
    display: 'flex',
  },
  formControl: {
    margin: '1%',
    minWidth: 120,
  },
};
function isObjectEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
const useStyles = makeStyles(styles);
function EditPanel({ handleSave, status, role }) {
  const [isBanned, setisBanned] = useState(status);
  const [newRole, setRole] = useState(role);
  const [error, setError] = useState([null, null]); //[errorType,errorMsg]
  const [passwords, setPasswords] = useState(['', '']); //[pass,reEnterPass]
  const handleCheckNewInfo = async () => {
    if (error[0] !== 'input') {
      let changedFields={};
      console.log('status'+status+" isBanned "+isBanned);
      if (passwords[0] === passwords[1] &&passwords[0].length>=8) changedFields.password = passwords[0];
      if (status !== isBanned && status !== null)
        changedFields.banned = isBanned;
      if (newRole !== role && role !== null) changedFields.role = newRole;
      if(isObjectEmpty(changedFields)) return;
      handleSave(error[1], changedFields);
        
      if(isObjectEmpty(changedFields)&&passwords[0].length<8)
        return setError(['input', 'New Password must have more than 8 characters']);
      setError([null, null]);
      setPasswords(['', '']);
      
    }
  };
  const handleReenter = (event) => {
    if (event.target.value !== passwords[0]) {
      setError(['input', 'Not match with new password']);
    } else if (event.target.value.length < 8) {
      setError(['input', 'New Password must have more than 8 characters']);
    } else {
      setError([null, null]);
    }
    setPasswords([passwords[0], event.target.value]);
  };
  const handleInput = (event) => {
    if (event.target.value !== passwords[1]) {
      setError(['input', 'Not match with new password']);
    } else if (event.target.value.length < 8) {
      setError(['input', 'New Password must have more than 8 characters']);
    } else {
      setError([null, null]);
    }
    setPasswords([event.target.value, passwords[1]]);
  };
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" display="inline" gutterBottom>
            Change Password
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={passwords[0]}
            onChange={(event) => {
              handleInput(event);
            }}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            error={error[0] === 'input' ? true : false}
            helperText={error[1]}
            name="rePassword"
            label="Re-enter Password"
            type="password"
            id="rePassword"
            autoComplete="new-password"
            value={passwords[1]}
            onChange={(event) => {
              handleReenter(event);
            }}
            inputProps={{ maxLength: 20 }}
          />
        </Grid>
        <Grid item xs={12}>
          {status!==null ? (
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink>
                Status
              </InputLabel>
              <Select
                value={isBanned}
                onChange={(event) => {
                  setisBanned(event.target.value);
                }}
                displayEmpty
                className={classes.selectEmpty}>
                <MenuItem value={true}>Banned</MenuItem>
                <MenuItem value={false}>Not Banned</MenuItem>
              </Select>
            </FormControl>
          ) : null}
          {/* {role!==null ? (
            <FormControl className={classes.formControl}>
              <InputLabel
                shrink>
                Role
              </InputLabel>
              <Select
                value={newRole}
                onChange={(event) => {
                  setRole(event.target.value);
                }}
                displayEmpty
                className={classes.selectEmpty}>
                <MenuItem value={'STUDENT'}>Student</MenuItem>
                <MenuItem value={'LECTURER'}>Lecturer</MenuItem>
                <MenuItem value={'ADMIN'}>Admin</MenuItem>
              </Select>
            </FormControl>
          ) : null} */}
        </Grid>
        <Grid item xs={12} className={classes.actions} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleCheckNewInfo}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EditPanel;
