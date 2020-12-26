import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


function VideoTile(props) {
    return(
        <Grid container style={{padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Grid item style={{display: 'flex', alignItems: 'center'}}>
                <PlayCircleFilledIcon color="primary" style={{marginRight: 10}} size="small"/>
                <Link href="#" >{props.videoTitle}</Link>
            </Grid>
            <Typography variant="caption" style={{color: 'grey'}}>{props.videoTime}</Typography>
        </Grid>
    );
}

export default VideoTile;