import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../../AddCourse/ImageUpload';
import { connect } from 'react-redux';
import { updateUserProfile, updateUserPassword, fetchUserProfile } from '../../../redux/actions';

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: () => { dispatch(fetchUserProfile()) },
  updateUserProfile: (input) => { dispatch(updateUserProfile(input)) },
  updateUserPassword: (input) => { dispatch(updateUserPassword(input)) }
})

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      newPassword: "",
      currentPassword: "",
      retypePassword: ""
    }
  }

  componentDidMount() {
    this.setState({
      fullname: this.props.userProfile.user.user.fullname,
      email: this.props.userProfile.user.user.email
    })
  }

  handleAcountInfoClick = async (e) => {
    e.preventDefault();
    if (this.state.fullname == "" || !(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(this.state.fullname)))
      alert("Please input valid full name")
    else if (this.state.email == "" || !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)))
      alert("Please input valid email")
    else
      await this.props.updateUserProfile({ 'fullname': this.state.fullname, 'email': this.state.email });
  }

  handlePasswordClick = async (e) => {
    e.preventDefault();
    if (this.state.currentPassword == "")
      alert("Please input valid current password")
    else if (this.state.newPassword == "")
      alert("Please input valid new password")
    else if (this.state.retypePassword == "")
      alert("Please input valid retype password")
    else if (this.state.retypePassword.localeCompare(this.state.newPassword) !== 0)
      alert("Please retype the same new password")
    else
      await this.props.updateUserPassword({ 'password': this.state.newPassword, 'currentPassword': this.state.currentPassword });
  }

  render() {
    if (this.props.userProfile.isLoading) {
      return (
        <Grid container alignItems="center">
          <Grid item row xs={12} >
            <Typography variant="h4">Loading....</Typography>
          </Grid>
        </Grid>
      );
    }
    else if (this.props.userProfile.errMess) {
      return (
        <Grid container alignItems="center">
          <Grid item row xs={12}>
            <Typography variant="h4">{this.props.userProfile.errMess}</Typography>
          </Grid>
        </Grid>
      );
    }
    else {
      const theme = createMuiTheme();

      return (
        <div>
          <Container maxWidth="md" style={{
            backgroundColor: "white",
            padding: theme.spacing(4, 4),
            marginTop: 40,
            marginBottom: 15,
            height: '75vh'
          }}>
            <Typography style={{
              fontFamily: "Arial",
              fontSize: 22,
              fontWeight: 550,
              marginBottom: 20
            }} align="start" color="textPrimary">
              Update Account
          </Typography>
            <Grid container direction="column" alignItems="center" justify="center" xs={12}>
              <Grid item container direction="row" spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    label="Full name"
                    name="fullName"
                    id="fullName"
                    defaultValue={this.state.fullname}
                    variant="outlined"
                    fullWidth
                    onInput={(e) => this.setState({
                      ...this.state,
                      fullname: e.target.value
                    })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    defaultValue={this.state.email}
                    variant="outlined"
                    fullWidth
                    
                    // error={!!errors.email}
                    // inputRef={register({
                    //   pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    // })}
                    onInput={(e) => this.setState({
                      ...this.state,
                      email: e.target.value
                    })}
                  />
                </Grid>
              </Grid>
              <Grid item container direction="column" alignItems="flex-start" xs={12}>
                <Button variant="outlined" align="start" style={{
                  marginTop: 25,
                  borderColor: "#005580",
                  color: '#005580'
                }} onClick={(e) => this.handleAcountInfoClick(e)}>
                  Save
              </Button>
              </Grid>
              <List style={{
                marginTop: 15,
                width: '100%',
                maxWidth: 'xs',
                backgroundColor: theme.palette.background.paper,
              }}>
                <Divider />
              </List>
              <Grid item container direction="column" alignItems="flex-start" xs={12}>
                <Typography style={{
                  marginBottom: 10, paddingTop: 10,
                  fontFamily: "Arial",
                  fontSize: 15,
                  fontWeight: 550,
                }} color="textPrimary">
                  Profile photo
              </Typography>
              </Grid>
              <Grid item container direction="row" xs={12}>
                <Grid item container direction="column" alignItems="flex-start" xs={2}>
                  {/* <Avatar variant="rounded" src={props.user.user.avatar} style={{ width: theme.spacing(15), height: theme.spacing(15)}} /> */}
                  <Container style={{ paddingLeft: 0 }}>
                    <ImageUpload />
                  </Container>
                </Grid>
                <Grid item container direction="column" alignItems="flex-start" xs={10}>
                  <Button variant="outlined" align="start" style={{
                    marginBottom: 10,
                    borderColor: "#005580",
                    color: '#005580'
                  }}>
                    Save
                </Button>
                  <Typography variant="h7" color="textSecondary">
                    Maximum size of 1MB. JPG, GIF, or PNG.
                </Typography>
                </Grid>
              </Grid>
              <List style={{
                marginTop: 15,
                width: '100%',
                maxWidth: 'xs',
                backgroundColor: theme.palette.background.paper,
              }}>
                <Divider />
              </List>
              <Grid item container direction="column" alignItems="flex-start" xs={12}>
                <Typography style={{
                  paddingTop: 10,
                  fontFamily: "Arial",
                  fontSize: 15,
                  fontWeight: 550,
                }} color="textPrimary">
                  Password
              </Typography>
              </Grid>
              <Grid item container direction="row" spacing={3} style={{ marginTop: 10 }}>
                <Grid item xs={4}>
                  <TextField
                    label="Current password"
                    name="currentPassword"
                    id="currentPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onInput={(e) => this.setState({
                      ...this.state,
                      currentPassword: e.target.value
                    })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="New password"
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onInput={(e) => this.setState({
                      ...this.state,
                      newPassword: e.target.value
                    })}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Retype password"
                    name="retypePassword"
                    id="retypePassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onInput={(e) => this.setState({
                      ...this.state,
                      retypePassword: e.target.value
                    })}
                  />
                </Grid>
              </Grid>
              <Grid item container direction="column" alignItems="flex-start" xs={12}>
                <Button variant="outlined" align="start" style={{
                  marginTop: 25,
                  borderColor: "#005580",
                  color: '#005580'
                }} onClick={(e) => this.handlePasswordClick(e)}>
                  Change password
              </Button>
              </Grid>
            </Grid>
          </Container>
        </div >
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);