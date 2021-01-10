import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(35),
    cursor: 'pointer'
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
    width: 180
  },
}))(MenuItem);

export default function UserMenu(props) {
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
<<<<<<< HEAD
      <Avatar src={props.user.avatar} onClick={handleClick} className={classes.avatar}/>
=======
      <Avatar src={props.avatar} onClick={handleClick} className={classes.avatar} />
>>>>>>> acf2e13fefa07793fe60a8872da65db5a0d8d0a8
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={handleClose}
        >
          <NavLink to="/profile" style={{ textDecoration: 'none', color: "#000", fontWeight: 'bold' }}>
            <ListItemText primary="Profile" />
          </NavLink>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleClose}
        >
          <NavLink to="/myCourses" style={{ textDecoration: 'none', color: "#000", fontWeight: 'bold' }}>
            <ListItemText primary="My Courses" />
          </NavLink>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={handleClose}
        >
          <NavLink to="/wishList" style={{ textDecoration: 'none', color: "#000", fontWeight: 'bold' }}>
            <ListItemText primary="Wishlist" />
          </NavLink>
        </StyledMenuItem>
        { props.user.role === "LECTURER" ?
        <StyledMenuItem
          onClick={handleClose}
        >
          <NavLink to="/addCourse" style={{ textDecoration: 'none', color: "#000", fontWeight: 'bold' }}>
            <ListItemText primary="Add Course" />
          </NavLink>
        </StyledMenuItem> : <div></div>
        }
      </StyledMenu>
      
        <StyledMenuItem
          onClick={handleClose}
        ></StyledMenuItem>
    </div>
  );
}
