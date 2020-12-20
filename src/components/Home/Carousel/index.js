import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import CarouselItem from './CarouselItem';

const useStyles = makeStyles((theme) => ({
    carousel: {
    }
}));

const CarouselSlide = () => {
    const classes = useStyles();

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel className={classes.carousel}>
            {
                items.map((item, i) => <CarouselItem key={i} item={item} />)
            }
        </Carousel>
    )
}

export default CarouselSlide;