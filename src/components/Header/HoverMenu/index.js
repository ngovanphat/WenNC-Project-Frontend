import React from 'react';
import { NavLink } from 'react-router-dom';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
    width: 180
  },
}))(MenuItem);

export default function HoverMenu(props) {
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
        <NavLink to="/categories" style={{ textDecoration: 'none', color: "#005580", fontWeight: 'bold' }}>
          Categories
        </NavLink>
        <ExpandMoreIcon fontSize="small" style={{ marginLeft: 5 }} />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.categories ? props.categories.map(category =>
          <StyledMenuItem
            onClick={handleClose}
          >
            <NavLink to={`/categories/${category.title}`} style={{ textDecoration: 'none', color: "#000", fontWeight: 'bold' }}>
              <ListItemText primary={category.title} />
            </NavLink>
          </StyledMenuItem>
        )
          :
          <Grid
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="p">Loading...</Typography>
          </Grid>
        }
      </StyledMenu>
    </div>
  );
}
