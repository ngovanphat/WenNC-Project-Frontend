// import React from "react";
// import { Popover, MenuItem, Typography } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   buttonText: {
//     fontSize: 14
//   }
// }));

// function HoverMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const classes = useStyles();

//   function handleClick(event) {
//     if (anchorEl !== event.currentTarget) {
//       setAnchorEl(event.currentTarget);
//     }
//   }

//   function handleClose() {
//     setAnchorEl(null);
//   }

//   return (
//     <div>
//       <Typography
//         className={classes.buttonText}
//         aria-owns={anchorEl ? "hover-menu" : undefined}
//         aria-haspopup="true"
//         onClick={handleClick}
//       // onMouseOver={handleClick}
//       >
//         Category
//       </Typography>
//       <Popover
//         id="hover-menu"
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         onExit={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Web Development</MenuItem>
//         <MenuItem onClick={handleClose}>Mobile Development</MenuItem>
//       </Popover>
//     </div>
//   );
// }

// export default HoverMenu;

import React from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  button: {
    background: 'white',
    color: '#005580',
    fontWeight: 550,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.8),
    },
    borderBottom: 0,
  },
}));

const StyledMenu = withStyles({
  paper: {
    borderTop: 0,
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary,
    },
    width: 220
  },
}))(MenuItem);

export default function HoverMenu() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className={classes.button}
        onClick={handleClick}
      >
        Explore
        <ExpandMoreIcon fontSize="small" style={{ marginLeft: 5 }} />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={handleClose}
        >
          <ListItemText primary="Web Development" />
          <ListItemIcon>
            <ChevronRightIcon fontSize="small" style={{ marginLeft: 40 }} />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleClose}
        >
          <ListItemText primary="Mobile Development" />
          <ListItemIcon>
            <ChevronRightIcon fontSize="small" style={{ marginLeft: 40 }} />
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
