import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-material-ui-carousel';
import CarouselItem from './CarouselItem';

const useStyles = makeStyles((theme) => ({
  carousel: {
  }
}));

const CarouselSlide = (props) => {
  const classes = useStyles();

  // var items = [
  //   {
  //     name: "Random Name #1",
  //     description: "Probably the most random thing you have ever seen!"
  //   },
  //   {
  //     name: "Random Name #2",
  //     description: "Hello World!"
  //   }
  // ]

  if (props.coursesLoading) {
    return (
      <Carousel className={classes.carousel}>
        <Typography variant="h4">Loading....</Typography>
      </Carousel>
    );
  }
  else if (props.coursesErrMess) {
    return (
      <Carousel className={classes.carousel}>
        <Typography variant="h4">{props.coursesErrMess}</Typography>
      </Carousel>
    );
  }
  else {
    return (
      <Carousel className={classes.carousel}>
        {
          props.courses.map((course) => <CarouselItem key={course._id} item={course} />)
          // items.map((item, i) => <CarouselItem key={i} item={item} />)
        }
      </Carousel>
    )
  }
}

export default CarouselSlide;