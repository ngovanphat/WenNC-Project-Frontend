import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAdminUsers } from '../../../redux/actions';

const useStyles = makeStyles({
  form: {
    width: '30vw',
    padding: '2%',
  },
  actions: {
    display: 'flex',
  },
});

function AddUser({handleFinishAddUser}) {
  const classes = useStyles();
  const [error, setError] = useState([null, null]); //[errorType,errorMsg]
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]=useState("STUDENT");
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const res = await dispatch(addAdminUsers({ fullname, email, password,role }));
    if (res) {
        handleFinishAddUser(res);
    }
  };


  return (
    <form className={classes.form} id="login" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                error={!!errors.email}
                inputRef={register({
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                onInput={(e) => setEmail(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                value={fullname}
                error={!!errors.fullname}
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 50
                  }
                })}
                onInput={(e) => setFullname(e.target.value)}
              />
        </Grid>
        <Grid item xs={12}>
        <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                error={!!errors.password}
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 8
                  },
                  maxLength:{
                      value:20
                  }
                })}
                onInput={(e) => setPassword(e.target.value)}
              />
        </Grid>
        <Grid item xs={12}>
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
            //value={passwords[1]}
            autoComplete="new-password"
            onChange={(event) => {
              //handleReenter(event);
            }}
            inputProps={{ maxLength: 20 }}
          />
          
        </Grid>
        <Grid item xs={12}>
        <FormControl className={classes.formControl}>
              <InputLabel
                shrink>
                Role
              </InputLabel>
              <Select
                value={role}
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
            </Grid>
        <Typography variant="caption" style={{ color: '#f00',marginLeft:"1vw"}}>{errors.email && "Invalid email address"}</Typography>
        <Grid item xs={12} className={classes.actions} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit">
            Add User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddUser;
