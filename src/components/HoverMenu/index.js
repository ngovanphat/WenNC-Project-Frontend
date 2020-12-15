import React from "react";
import { Popover, MenuItem, Typography} from "@material-ui/core";
import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonText: {
        fontSize: 14
    }
}));

function HoverMenu() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Typography
        className={classes.buttonText}
        aria-owns={anchorEl ? "hover-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        Category
      </Typography>
      <Popover
        id="hover-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onExit = {handleClose}
      >
        <MenuItem onClick={handleClose}>Web Development</MenuItem>
        <MenuItem onClick={handleClose}>Mobile Development</MenuItem>
      </Popover>
    </div>
  );
}

export default HoverMenu;