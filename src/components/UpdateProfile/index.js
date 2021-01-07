import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../AddCourse/ImageUpload';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: "white",
    padding: theme.spacing(4, 4),
    marginTop: 40,
    marginBottom: 15,
    height: '75vh'
  },
  title: {
    fontFamily: "Arial",
    fontSize: 22,
    fontWeight: 550,
    marginBottom: 20
  },
  label: {
    paddingTop: 10,
    fontFamily: "Arial",
    fontSize: 15,
    fontWeight: 550,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  avatarUpload: {
    paddingLeft: 0
  },
  button: {
    marginTop: 25,
    borderColor: "#005580",
    color: '#005580'
  },
  uploadButton: {
    marginBottom: 10,
    borderColor: "#005580",
    color: '#005580'
  },
  list: {
    marginTop: 15,
    width: '100%',
    maxWidth: 'xs',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UpdateProfile(props) {
  const classes = useStyles();

  return (
    <main>
      <Container maxWidth="md" className={classes.heroContent}>
        <Typography className={classes.title} align="start" color="textPrimary">
          Account Settings
        </Typography>
        <Grid container direction="column" alignItems="center" justify="center" xs={12}>
          <Grid item container direction="row" spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Full name"
                defaultValue={props.user.user.fullname}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                defaultValue={props.user.user.email}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="flex-start" xs={12}>
            <Button variant="outlined" align="start" className={classes.button}>
              Save
            </Button>
          </Grid>
          <List className={classes.list}>
            <Divider />
          </List>
          <Grid item container direction="column" alignItems="flex-start" xs={12}>
            <Typography className={classes.label} style={{marginBottom: 10}} color="textPrimary">
              Profile photo
            </Typography>
          </Grid>
          <Grid item container direction="row" xs={12}>
            <Grid item container direction="column" alignItems="flex-start" xs={2}>
              {/* <Avatar variant="rounded" src={props.user.user.avatar} className={classes.avatar} /> */}
              <Container className={classes.avatarUpload}>
                <ImageUpload />
              </Container>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start" xs={10}>
              <Button variant="outlined" align="start" className={classes.uploadButton}>
                Save
              </Button>
              <Typography variant="h7" color="textSecondary">
                Maximum size of 1MB. JPG, GIF, or PNG.
              </Typography>
            </Grid>
          </Grid>
          <List className={classes.list}>
            <Divider />
          </List>
          <Grid item container direction="column" alignItems="flex-start" xs={12}>
            <Typography className={classes.label} color="textPrimary">
              Password
            </Typography>
          </Grid>
          <Grid item container direction="row" spacing={3} style={{ marginTop: 10 }}>
            <Grid item xs={4}>
              <TextField
                label="Current password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="New password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Retype password"
                type="password"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="flex-start" xs={12}>
            <Button variant="outlined" align="start" className={classes.button}>
              Change password
            </Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}