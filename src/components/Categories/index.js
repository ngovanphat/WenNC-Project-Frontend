import React from 'react';
import { Grid, Typography, Hidden, Card, CardHeader, List, ListItem, Collapse, ListItemText, Divider } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const Categories = () => {
  const [openRating, setOpenRating] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
  const handleClickRating = () => {
    setOpenRating(!openRating);
  };
  const handleClickPrice = () => {
    setOpenPrice(!openPrice);
  };

  return (
    <Grid>
      <Grid item container>
        <Grid item />
        <Grid item xs={4} style={{ marginLeft: 30, marginTop: 50 }}>
          <Typography variant="h4" style={{ fontWeight: '700' }}>Categories</Typography>
        </Grid>
        <Grid />
      </Grid>
      <Grid item container>
        <Grid item xs={4} style={{ marginLeft: 30, marginTop: 50 }}>
          <Typography variant="h5" style={{ fontWeight: '700' }}>All Topic</Typography>
        </Grid>
        <Grid item container spacing={2} direction="row" style={{ marginTop: 5, marginLeft: 20 }}>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Hidden only={['md', 'lg']}>
            <Grid item xs={1} sm={2} md={0}></Grid>
            <Grid item xs={1} sm={2} md={0}></Grid>
          </Hidden>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Hidden only={['md', 'lg']}>
            <Grid item xs={1} sm={2} md={0}></Grid>
            <Grid item xs={1} sm={2} md={0}></Grid>
          </Hidden>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Hidden only={['md', 'lg']}>
            <Grid item xs={5} sm={4}>
              <Card >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card>
            </Grid>
          </Hidden>
        </Grid>
        <Grid item container spacing={2} direction="row" style={{ marginTop: 5, marginLeft: 20 }}>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Hidden only={['md', 'lg']}>
            <Grid item xs={1} sm={2} md={0}></Grid>
            <Grid item xs={1} sm={2} md={0}></Grid>
          </Hidden>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Hidden only={['md', 'lg']}>
            <Grid item xs={1} sm={2} md={0}></Grid>
            <Grid item xs={1} sm={2} md={0}></Grid>
          </Hidden>
          <Grid item xs={5} sm={4} md={2}>
            <Card >
              <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card>
          </Grid>
          <Hidden only={['md', 'lg']}>
            <Grid item xs={5} sm={4}>
              <Card >
                <CardHeader title="Web Development" style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
              </Card>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: 50, marginLeft: 20 }}>
        <Grid item xs={4}>
          <Typography variant="h5" style={{ fontWeight: '700' }}>All Development Courses</Typography>
        </Grid>
        <Grid container>
          <Hidden only={['xs', 'sm']}>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Divider />
              <ListItem button onClick={handleClickRating}>
                <ListItemText primary="Rating" style={{ marginRight: 70, textAlign: 'left', fontWeight: '500', fontSize: 20 }} />
                {openRating ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openRating} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <List >
                    <ListItemText primary=" 5 Star" />
                    <ListItemText primary=" 4 Star" />
                    <ListItemText primary=" 3 Star" />
                    <ListItemText primary=" 2 Star" />
                    <ListItemText primary=" 1 Star" />
                  </List>
                </List>
              </Collapse>
              <Divider />
              <ListItem button onClick={handleClickPrice}>
                <ListItemText primary="Price" style={{ marginRight: 70, textAlign: 'left', fontWeight: '500', fontSize: 20 }} />
                {openPrice ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openPrice} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button>
                    <ListItemText primary="Paid" />
                    <ListItemText primary="Free" />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Categories;