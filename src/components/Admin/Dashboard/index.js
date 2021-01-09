import React, { useState, useEffect } from "react";
import { Button, Card, CardActions, CardContent, Grid, makeStyles, Typography } from "@material-ui/core";
import styled from "styled-components";

const styles = {
  root:{ 
    height: '100%', 
    width: '100%', 
    overflow:'auto', 
    marginRight:'10px', 
    marginLeft:'10px',
    padding:'1% 0 '
  },
  gridItem: {
    padding: "1% !important",
  },
  gridContainer:{
    margin: "1% -1% !important"
  }
};
const useStyles = makeStyles(styles);
const Dashboard = () => {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Dashboard"
  }, []);
  return (
    <div className={classes.root}>
      <Grid container  className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Weekly Visits
              </Typography>
              <Typography variant="body2" component="p">
                200
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Details</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Weekly Visits
              </Typography>
              <Typography variant="body2" component="p">
                200
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Weekly Visits
              </Typography>
              <Typography variant="body2" component="p">
                200
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
