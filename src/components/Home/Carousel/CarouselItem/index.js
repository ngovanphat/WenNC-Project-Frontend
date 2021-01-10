import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core'
import { Grid, Typography, Avatar, Button, Card, Hidden, CardContent } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Image from 'material-ui-image'

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 400,
    borderRadius: 0,
    background: 'linear-gradient(to right, #006699, black)'
  },
  category: {
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
  },
  title: {
    color: 'white',
    fontWeight: 700,
    fontSize: 28,
  },
  rating: {
    color: '#e6ac00',
    fontWeight: 700,
    fontSize: 15,
  },
  ratingCount: {
    color: 'white',
    fontWeight: 500,
    fontSize: 15,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginTop: 7,
  },
  enrollButton: {
    width: 160,
    height: 60,
    background: 'white',
    fontWeight: 600,
    fontSize: 18,
    textTransform: 'none',
    borderColor: "#005580",
    color: '#005580',
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.8),
      color: '#005580'
    },
  },
  card: {
    height: 200,
    width: 300,
  },
  cardContent: {
    color: 'black',
    fontWeight: 700,
    fontSize: 25,
  }
}));

const CarouselItem = (props) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const path = "/courses/" + props.item._id;

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item container direction="column" xs={7}>
          <Grid item style={{ marginTop: 55 }}>
            <Typography>
              <Link href="#" onClick={preventDefault} className={classes.category}>
                {props.item.category}
              </Link>
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 30 }}>
            <Typography className={classes.title}>
              {props.item.title}
            </Typography>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item>
              <Rating value={props.item.points} size="small" readOnly style={{ marginTop: 1 }} />
            </Grid>
            <Grid item>
              <Typography className={classes.rating}>{props.item.points}</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.ratingCount}>500,000 ratings</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={1} style={{ marginTop: 6 }}>
            <Hidden only={["sm", "xs"]}>
              <Grid item>
                <Avatar src="https://i.pinimg.com/originals/6c/ce/de/6ccede86e8a11d520f5e7a3386d46ff0.jpg" className={classes.avatar} />
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  <Link href="#" onClick={preventDefault} style={{ textDecoration: 'none' }} className={classes.ratingCount}>
                    {props.item.leturer.fullname}
                  </Link>
                </Typography>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item style={{ marginTop: 50 }}>
            <Link underline='none' component={RouterLink} to={path}>
              <Button className={classes.enrollButton}>Go to course</Button>
            </Link>
          </Grid>
        </Grid>
        <Hidden only={["sm", "xs"]}>
          <Grid item xs={3} style={{ marginTop: 55, marginLeft: 55 }}>
            <Card style={{ width: 300 }}>
              <Card className={classes.card}>
                <Image imageStyle={{ height: 200 }} src={props.item.thumnail} />
              </Card>
              <CardContent>
                <Grid container style={{ marginLeft: 60, marginTop: 10 }}>
                  <Grid item>
                    <Typography className={classes.cardContent}>
                      ${props.item.price}
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: 7, marginLeft: 10, textDecoration: 'line-through' }}>
                    <Typography>
                      ${props.item.actualPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </Paper>
  )
}

export default CarouselItem;