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
    margin: "1%",
    minWidth: 120,
  },
};

const useStyles = makeStyles(styles);
function EditPanel({ handleSave, status }) {
  const [isBanned, setisBanned] = useState(status);
  const [error, setError] = useState([null, null]);//[errorType,errorMsg]
  const [passwords, setPasswords] = useState(['', '']);//[pass,reEnterPass]
  const handleCheckPassword = async () => {
    if (passwords[0] === passwords[1] && error[0] !== 'input') {
      handleSave(error[1]);
    } else {

      //call api here

      //error happened
      if (false) {
        await setError(['data', 'abc']);
        handleSave(error[1]);
      }
    }
    setError([null, null]);
    setPasswords(['', '']);
  }
  const handleReenter = (event) => {
    if (event.target.value !== passwords[0]) {
      setError(['input', 'Not match with new password']);
    } else {
      setError([null, null]);
    }
    setPasswords([passwords[0], event.target.value]);
  }
  const handleInput = (event) => {
    if (event.target.value !== passwords[1]) {
      setError(['input', 'Not match with new password']);
    } else {
      setError([null, null]);
    }
    setPasswords([event.target.value, passwords[1]])
  }
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
            onChange={(event) => { handleInput(event) }}
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
            onChange={(event) => { handleReenter(event) }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Status
        </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={isBanned}
              onChange={(event) => { setisBanned(event.target.value) }}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={true}>Banned</MenuItem>
              <MenuItem value={false}>Not Banned</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.actions} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleCheckPassword}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EditPanel;
