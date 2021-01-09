import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, colors, ListItem, makeStyles } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Colors } from "../../../helpers/colors";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.grey,
    fontWeight: 16,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: Colors.primary,
    "& $title": {
      fontWeight: 16,
    },
    "& $icon": {
      color: Colors.primary,
    },
  },
}));

const NavItem = (props) => {
  const classes = useStyles();
  const ItemIcon = props.icon;

  return (
    <ListItem
      className={clsx(classes.item, props.className)}
      disableGutters
      key={props.id}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={props.href}
      >
        <ItemIcon className={clsx(classes.icon, props.icon)} size="20" />
        <span className={classes.title}>{props.title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
