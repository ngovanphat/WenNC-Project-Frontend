import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const TitleStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    minHeight: 350
  },
  title: {
    color: 'black',
    fontWeight: 600,
    fontSize: 18,
  },
});

export default function CourseCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          square
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
        />
        <CardContent>
          <Typography className={classes.title}>
            <TitleStyled>
              Web Development
            </TitleStyled>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
