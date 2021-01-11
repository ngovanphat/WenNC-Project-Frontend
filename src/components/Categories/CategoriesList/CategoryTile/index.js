import React from 'react';
import { Card, CardHeader, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
function CategoryTile(props) {
  const path = "/categories/" + props.title;
  return (
    <Link underline='none' component={RouterLink} to={path}>
      <Grid style={{ padding: 8 }}>
        <Card variant="outlined" >
          <CardHeader title={props.title} style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
        </Card >
      </Grid>
    </Link>

  );
}

export default CategoryTile;