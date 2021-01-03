import React from 'react';
import { Container, Grid, List, ListItemText, Typography, Divider } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


function CourseTile(props) {
  const path = "/courses/"+props._id;
  return (
    <Container>
      <Link style={{ textDecoration: 'none'}} component={RouterLink} to={path}>
      <Grid container>
        <Grid xs={2} sm={4}>
          <img
            src={props.imageUrl}
            alt={props.title}
            width={260}
            height={145}
          />
        </Grid>
        <Grid xs={4} sm={6}>
          <List disablePadding>
            <ListItemText primary={<Typography variant="h6" style={{ fontWeight: 'bold', color: 'black' }}>{props.title}</Typography>} />
            <ListItemText primary={<Typography variant="subtitle" style={{ fontSize: 16, color: 'black' }}>{props.description}</Typography>} />
            <ListItemText primary={<Typography variant="subtitle" style={{ fontSize: 14, color:'black' }} >{props.lecturer.fullname}</Typography>} />
            <ListItemText primary={
              <Container style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} disableGutters>
                <Typography variant="subtitle1" style={{ color: '#ffd700', fontWeight: 'bold', textAlign: 'center' }}>{props.rating}</Typography>
                <Rating name="read-only" value={props.rating} readOnly size="small" />
              </Container>} />
          </List>
        </Grid>
        <Grid xs={2}>
          <Container disableGutters style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            <Typography variant="subtitle1" style={{ textAlign: 'right', fontWeight: 'bold', color: 'black' }}>$ {props.price}</Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'right', color: '#ccc', textDecoration: 'line-through' }}>$ {props.actualPrice}</Typography>
          </Container>
        </Grid>
      </Grid>
      </Link>
      <Divider style={{ marginTop: 10 }} />
    </Container>
  );
}

export default CourseTile;