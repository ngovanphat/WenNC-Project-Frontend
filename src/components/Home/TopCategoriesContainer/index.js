import React from 'react';
import { Grid, Typography, Hidden, Link } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import CategoryCard from './CategoryCard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '83%',
    margin: '0 auto',
    alignItems: 'center',
    justify: 'center'
  },
  lable: {
    flexGrow: '1',
    fontSize: 25,
    fontWeight: 700
  },
  showMore: {
    textDecoration: 'none',
    color: '#005580',
    '&:hover': {
      color: fade(theme.palette.info.light, 1),
    }
  }
}));

const TopCategoriesContainer = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid className={classes.wrapper} item container>
        <Typography className={classes.lable}>{props.label}</Typography>
        <Typography>
          <Link href="#" onClick={(event) => event.preventDefault()} style={{ textDecoration: 'none' }} className={classes.showMore}>
            Explore more
          </Link>
        </Typography>
      </Grid>
      <Grid item container spacing={2} direction="row">
        <Grid item xs={1} sm={2} md={1}></Grid>
        <Grid item xs={5} sm={4} md={2}>
          <CategoryCard></CategoryCard>
        </Grid>
        <Grid item xs={5} sm={4} md={2}>
          <CategoryCard></CategoryCard>
        </Grid>
        <Hidden only={['md', 'lg']}>
          <Grid item xs={1} sm={2} md={0}></Grid>
          <Grid item xs={1} sm={2} md={0}></Grid>
        </Hidden>
        <Grid item xs={5} sm={4} md={2}>
          <CategoryCard></CategoryCard>
        </Grid>
        <Grid item xs={5} sm={4} md={2}>
          <CategoryCard></CategoryCard>
        </Grid>
        <Hidden only={['md', 'lg']}>
          <Grid item xs={1} sm={2} md={0}></Grid>
          <Grid item xs={1} sm={2} md={0}></Grid>
        </Hidden>
        <Grid item xs={5} sm={4} md={2}>
          <CategoryCard></CategoryCard>
        </Grid>
        <Hidden only={['md', 'lg']}>
          <Grid item xs={5} sm={4}>
            <CategoryCard></CategoryCard>
          </Grid>
        </Hidden>
        <Grid item xs={1}></Grid>
      </Grid>
    </Grid>
  )
}

export default TopCategoriesContainer;