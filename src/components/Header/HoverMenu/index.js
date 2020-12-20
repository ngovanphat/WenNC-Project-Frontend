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
