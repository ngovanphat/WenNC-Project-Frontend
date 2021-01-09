import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login,checkAdmin } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();
  let history = useHistory();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const res = await dispatch(login({ 'email': email, 'password': password }));
    dispatch(checkAdmin());
    if (res == true) history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" style={{color: "#005580"}}>
          Log in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            error={!!errors.email}
            inputRef={register({
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
            onInput={(e) => setEmail(e.target.value)}
          />
          <Typography variant="caption" style={{ color: '#f00' }}>{errors.email && "Invalid email address"}</Typography>
          <TextField
            variant="outlined"
            margin="normal"
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
          <Typography variant="caption" style={{ color: '#f00' }}>{errors.password && "Password is required and at least 8 characters"}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: '#005580', color: 'white'}}
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink
                to="/forgotpassword"
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#005580",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                to="/signup"
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#005580",
                  textDecoration: "none",
                }}
              >
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
