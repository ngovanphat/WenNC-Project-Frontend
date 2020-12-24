import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import styled from 'styled-components';

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

export default function MyCourseCard(props) {
  const classes = useStyles();
  const { course } = props;

  return (
    <Grid item xs={12}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5" className={classes.title} paragraph>
                <TitleStyled>
                  {course.title}
                </TitleStyled>
              </Typography>
              <Grid container direction="row">
                <Grid item container>
                  <Typography variant="subtitle2" color="textSecondary" style={{ flexGrow: 1 }}>
                    {course.leturer}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.category}>
                    {course.category}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" color="textSecondary" paragraph>
                    Last accessed - {course.last_updated}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                <DescriptionStyled>
                  {course.description}
                </DescriptionStyled>
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={course.thumbnail} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

MyCourseCard.propTypes = {
  course: PropTypes.object,
};