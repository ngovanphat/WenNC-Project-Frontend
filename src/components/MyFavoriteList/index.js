import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import MyFavoriteCard from './MyFavoriteCard';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    paddingTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  showMore: {
    textDecoration: 'none',
    color: '#005580',
    '&:hover': {
      color: fade(theme.palette.info.light, 1),
    }
  }
}));

const myCoursesList = [
  {
    title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
    points: 4.5,
    leturer: 'Andrew Garfield',
    category: 'Mobile Development',
    description:
      'Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team.',
    thumbnail: 'https://source.unsplash.com/random',
  },
  {
    title: 'The Complete 2020 Flutter Development Bootcamp with Dart',
    points: 4.8,
    leturer: 'Andrew Garfield',
    category: 'Mobile Development',
    description:
      'Welcome to the Complete Flutter App Development Bootcamp with Dart - created in collaboration with the Google Flutter team.',
    thumbnail: 'https://source.unsplash.com/random',
  },
];

export default function MyCourseList(props) {
  const classes = useStyles();

  function Body() {
    const len = props.user.user.favorite_list.length;
    if (len == 0) {
      return <Grid container>
        <Typography variant="h7" align="left" color="black">
          Your list is empty.
          <NavLink to='/categories' style={{ textDecoration: 'none', marginLeft: 5 }} className={classes.showMore}>
            Browse more courses now.
          </NavLink>
        </Typography>
      </Grid>;
    }
    return <Grid container spacing={2}>
      {props.user.user.favorite_list.map((course) => (
        <MyFavoriteCard key={course.title} course={course} />
      ))}
    </Grid>;
  }

  function Paging() {
    const len = props.user.user.favorite_list.length;
    if (len == 0) { 
      return <Grid item xs={12}>
        </Grid>;
     }
    return <Grid item xs={12}>
      <Pagination count={props.user.user.favorite_list.length} shape="rounded" size="large" />
    </Grid>;
  }

  return (
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography variant="h6" align="left" color="textSecondary">
            Wish list
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* <Grid container spacing={2}>
          {myCoursesList.map((course) => (
            <MyFavoriteCard key={course.title} course={course} />
          ))}
        </Grid> */}
        <Body />
      </Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '5vh' }}
      >
        {/* <Grid item xs={12}>
          <Pagination count={10} shape="rounded" size="large" />
        </Grid> */}
        <Paging />
      </Grid>
    </main>
  );
}