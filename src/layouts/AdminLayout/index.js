import React, { useState } from "react";
import { Breadcrumbs, Grid, Link, makeStyles, Typography } from "@material-ui/core";
import {Link as RouterLink, useLocation} from "react-router-dom"
import Header from "./Header";
import styled from "styled-components";
import SideNavBar from "./SideNavBar";
import { Colors } from "../../helpers/colors"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Container = styled.div`
  backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
`;
function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (s) {
    return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
  })
}
const breadcrumbNameMap = {
  "admin": "Home",
  "courses": "Courses",
  "users": "Users",
  "account": "Account",
  "settings": "Settings",
  "dashboard":"Dashboard"
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflowX: "hidden",  
    overflowY:"auto",
    height: "100%",
    paddingTop: "1vh",
    paddingBottom:"1vh",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflowX:"hidden",    
    background: Colors.white,
    marginLeft: "0.5%",
    marginRight: "1%",
    [theme.breakpoints.down("md")]: {
      width:"98vw"
    },
  },
  breadcrumbs: {
    display: "flex",
    flex: "1 1 auto",
    overflowX:"hidden",    
    background: Colors.white,
    marginLeft: "1%",
    marginRight: "1%",
    marginBottom: "1%"
  },
  container: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    overflowY:"auto",
  }
}));

const AdminLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  let location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x!=="admin"?x:null)

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container className={classes.container}>
      <Header onMobileNavOpen={() => setMobileNavOpen(true)}/>
      <SideNavBar onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}/>
      
      <div className={classes.wrapper}>
      <Breadcrumbs aria-label='Breadcrumb' className={classes.breadcrumbs}>
      <Link color='inherit' component={RouterLink} to='/admin/dashboard'>
        Home
      </Link>
      {
      pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        return last ? (
          <Typography color='textPrimary' key={to}>
            {toTitleCase(value)}
          </Typography>
        ) : (
          <Link color='inherit' component={RouterLink} to={'/admin'+to} key={to}>
            {toTitleCase(value)}
          </Link>
        )
      })}
    </Breadcrumbs>
        <div className={classes.contentContainer}>
            {children}
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminLayout;
