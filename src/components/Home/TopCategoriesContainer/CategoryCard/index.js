import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const TitleStyled = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minHeight: 350
  },
  title: {
    color: 'black',
    fontWeight: 600,
    fontSize: 18,
  },
});

export default function CourseCard(props) {
  const classes = useStyles();
  const path = "/categories/" + props.data.title;
  return (

    <Card className={classes.root}>
      <Link underline='none' component={RouterLink} to={path}>
        <CardActionArea>
          <CardMedia
            square
            component="img"
            alt={props.data.title}
            height="300"
            image="https://c8.alamy.com/comp/PF46Y1/desktop-source-code-and-technology-background-developer-or-programer-with-coding-and-programming-wallpaper-by-computer-language-and-source-code-com-PF46Y1.jpg"
          />
          <CardContent>
            <Typography className={classes.title}>
              <TitleStyled>
                {props.data.title}
              </TitleStyled>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
