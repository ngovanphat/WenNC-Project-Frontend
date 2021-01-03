import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Hidden, Link, GridList, GridListTile } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import CategoryCard from './CategoryCard';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    margin: 20,
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

  const categoryList = props.hotCategories.map((category) => {
    return (
      <GridListTile key={category._id} cols={2}>
        <CategoryCard data={category} />
      </GridListTile>
    );
  });

  if (props.hotCategoriesLoading) {
    return (
      <Grid container>
        <Grid item row xs={12}>
          <Typography variant="h4">Loading....</Typography>
        </Grid>
      </Grid>
    );
  }
  else if (props.hotCategoriesErrMess) {
    return (
      <Grid container>
        <Grid item row xs={12}>
          <Typography variant="h4">{props.hotCategoriesErrMess}</Typography>
        </Grid>
      </Grid>
    );
  }
  else
    return (
      <Grid container direction="column" spacing={2}>
        <Grid className={classes.wrapper} item container>
          <Typography className={classes.lable}>{props.label}</Typography>
          <Typography>
            <Link component={RouterLink} to='/categories' style={{ textDecoration: 'none', color: 'grey', marginRight: 20 }} className={classes.showMore}>
              Explore more
              </Link>
          </Typography>
        </Grid>
        <Grid container>
          <GridList cellHeight={380} cols={5} xs={10} style={{ marginLeft: 20 }}>
            {categoryList}
          </GridList>
        </Grid>
      </Grid>
    );
}

export default TopCategoriesContainer;