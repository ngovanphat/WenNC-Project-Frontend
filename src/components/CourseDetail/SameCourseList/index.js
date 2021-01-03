import React from 'react';
import { GridList, Grid } from '@material-ui/core';
import CourseCard from '../../Home/TopCoursesContainer/CourseCard';


export default function SameCourseList(props){

    const courseList = props.courses.map((course) => {
        return (
            <Grid style={{padding: 8}}>
                <CourseCard data={course} />
            </Grid>
        );
    })

    return (
        <GridList cellHeight={380} cols={3}>
            {courseList}
        </GridList>
    )
}