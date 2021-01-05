import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

function VideoTile(props) {
  return (
    <Grid container style={{ padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <PlayCircleFilledIcon color="primary" style={{ marginRight: 10 }} size="small" />
        <Link underline='none' component={RouterLink} to={`/courses/${props.data.course}/${props.data._id}?link=${props.data.link}&title=${props.data.title}`}>{props.data.title}</Link>
      </Grid>
      <Typography variant="caption" style={{ color: 'grey' }}>{props.data.length}</Typography>
    </Grid>
  );
}

export default VideoTile;