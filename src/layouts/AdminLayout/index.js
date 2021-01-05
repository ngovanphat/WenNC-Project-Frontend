import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Header from "./Header";
import styled from "styled-components";
import SideNavBar from "./SideNavBar";
import { Colors } from "../../helpers/colors"

const Container = styled.div`
  backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
`;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflowX: "hidden",  
    overflowY:"auto",
    height: "100%",
    paddingTop: 64,
    paddingBottom:64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflowX:"hidden",    
    background: Colors.white,
    marginLeft: 5,
    marginRight: 5
  },
  container: {
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    overflowY:"auto",
  }
}));

const AdminLayout = ({ children }) => {
  const classes = useStyles();
  //const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <Container className={classes.container}>
      <Header />
      <SideNavBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
            {children}
        </div>
      </div>
    </Container>
  );
};

export default AdminLayout;
