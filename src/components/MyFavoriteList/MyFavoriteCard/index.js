import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../redux/actions';

const TitleStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const DescriptionStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const useStyles = makeStyles({
  title: {
    fontFamily: "Arial",
    fontWeight: 500,
    color: '#0088cc'
  },
  category: {
    color: '#005580',
    fontWeight: 600,
  },
  rating: {
    color: '#e6ac00',
    fontWeight: 700,
    fontSize: 15,
  },
  ratingCount: {
    fontWeight: 500,
    fontSize: 15,
  },
  resumeButton: {
    marginTop: 10,
    borderColor: "#005580",
    color: '#005580'
  },
  removeButton: {
    marginTop: 10,
    marginLeft: 10,
    borderColor: "red",
    color: 'red'
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function MyFavoriteCard(props) {
  const classes = useStyles();
  const { course, user } = props;
  const path = "/courses/" + course._id;
  const preventDefault = (event) => event.preventDefault();

  const dispatch = useDispatch();
  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(removeFromWishlist({ 'userId': user.user._id, 'courseId': course._id }));
  };

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              <Link underline='none' style={{ color: '#005580' }} className={classes.title} component={RouterLink} to={path}>
                <TitleStyled>
                  {course.title}
                </TitleStyled>
              </Link>
            </Typography>
            <Grid container direction="row" style={{ marginTop: 10 }}>
              <Grid item container>
                <Typography variant="subtitle2" color="textSecondary" style={{ flexGrow: 1 }}>
                  {/* {course.leturer} */}
                  Ngô Văn Phát
                </Typography>
                <Typography variant="subtitle2">
                  <Link component={RouterLink} to={`/categories/${course.category}`} style={{ textDecoration: 'none' }} className={classes.category}>
                    {course.category}
                  </Link>
                </Typography>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item>
                  <Rating name="half-rating" defaultValue={course.points} precision={0.5} size="small" readOnly style={{ marginTop: 1 }} />
                </Grid>
                <Grid item>
                  <Typography className={classes.rating}>5</Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" className={classes.ratingCount}>500,000 ratings</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" style={{ marginTop: 10 }}>
              <DescriptionStyled>
                {course.description}
              </DescriptionStyled>
            </Typography>
            <Button variant="outlined" className={classes.resumeButton}>
              <Link underline='none' style={{ color: '#005580' }} component={RouterLink} to={path}>
                Go to course
              </Link>
            </Button>
            <Button onClick={(e) => onClick(e)} variant="outlined" className={classes.removeButton}>
              Remove
            </Button>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia className={classes.cardMedia} image={course.thumnail} />
        </Hidden>
      </Card>
    </Grid>
  );
}

MyFavoriteCard.propTypes = {
  course: PropTypes.object,
};