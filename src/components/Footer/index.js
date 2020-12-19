import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Link } from "@material-ui/core";
import { SearchIcon }  from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  style: {
    background: '#005580',
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 22,
    fontWeight: 550,
  },
  column: {
    display: 'flex',
    alignItems: 'left'
  },
  columnItem: {
      fontSize: 14,
      marginTop: 15
  },
  row: {
      marginTop: 30,
      marginLeft: 30,
      marginRight: 20,
      marginBottom: 30
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid container>
        <Grid container className={classes.row}> 
            <Grid direction="column" xs={12} sm={3} className={classes.column}>
                <Typography variant="h5">Contact Us</Typography>
                <Typography className={classes.columnItem}><Link href="#">Ngô Văn Phát</Link></Typography>
                <Typography className={classes.columnItem}><Link href="#">Lê Minh Quân</Link></Typography>
                <Typography className={classes.columnItem}><Link href="#">Trương Thuận Nam</Link></Typography>
            </Grid>
        </Grid>
        <Grid container className={classes.row}> 
            <Grid direction="row" xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h4">Online Academic</Typography>
                <Typography className={classes.columnItem}>2020 Devteam, Inc</Typography>
            </Grid>
        </Grid>
        
    </Grid>
  )
}

export default Footer;