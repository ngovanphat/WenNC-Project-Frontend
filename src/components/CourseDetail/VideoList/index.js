import React from 'react';
import { List, ListItem } from '@material-ui/core';
import VideoTile from './VideoTile';

export default function VideoList(props) {
  const videoList = props.videos.map((video) => {
    return (
        <ListItem>
            <VideoTile data={video}/>
        </ListItem>
    );
  })

  return (
    <List >
      {videoList}
    </List>
  )
}