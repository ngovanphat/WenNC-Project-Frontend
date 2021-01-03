import React from 'react';
import { Grid, Typography,  GridList, GridListTile} from '@material-ui/core';

import CategoryTile from './CategoryTile';

function CategoriesList(props) {

    const categoriesList = props.categories.map((category) => {
        return (
          <CategoryTile
            key={category._id}
            title={category.title}
          />
        );
      });


      if (props.isLoading) {
        return (
          <Grid container>
            <Grid item row xs={12}>
              <Typography variant="h4">Loading....</Typography>
            </Grid>
          </Grid>
        );
      }
      else if (props.errMess) {
        return (
          <Grid container>
            <Grid item row xs={12}>
              <Typography variant="h4">{props.errMess}</Typography>
            </Grid>
          </Grid>
        );
      }
    else  
        return (
            <Grid container >
                <GridList cellHeight={380}  cols={5} xs={10} style={{marginLeft: 15}}>
                    {categoriesList}
                </GridList>
            </Grid>
        );
}


export default CategoriesList;