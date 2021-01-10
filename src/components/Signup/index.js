import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { signup } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function Signup() {
  const classes = useStyles();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const res = await signup({ fullname, email, password });
    if (res) history.push('/login')
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" style={{ color: '#005580' }}>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
            <Typography variant="caption" style={{ color: '#f00' }}>{errors.fullname && "Fullname is required and  maximum is 50 letters"}</Typography>
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
                onInput={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Typography variant="caption" style={{ color: '#f00' }}>{errors.email && "Invalid email address"}</Typography>
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
                  }
                })}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Typography variant="caption" style={{ color: '#f00' }}>{errors.password && "Password is required and at least 8 characters"}</Typography>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#005580', color: 'white' }}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to="/login" style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#005580',
                textDecoration: 'none'
              }}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Signup;