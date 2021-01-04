import React from 'react';
import { List, Grid, ListItem } from '@material-ui/core';
import CommentTile from './CommentTile';

export default function CommentList(props) {
  const commentList = props.comments.map((comment) => {
    return (
      <ListItem>
        <CommentTile userName={comment.user.fullname}
          avatarUrl={comment.user.avatar}
          last_updated={comment.last_updated}
          comment={comment.title}
          rating={comment.rating}
        />
      </ListItem>
    );
  })

  return (
    <List >
      {commentList}
    </List>
  )
}