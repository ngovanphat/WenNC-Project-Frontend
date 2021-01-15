import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import NavItem from "./item";
import SubjectIcon from '@material-ui/icons/Subject';
import SecurityIcon from "@material-ui/icons/Security";
import SettingsIcon from "@material-ui/icons/Settings";
import FeedbackIcon from '@material-ui/icons/Feedback';
import CategoryIcon from '@material-ui/icons/Category';
import { useDispatch, useSelector } from "react-redux";

String.prototype.capitalizeFirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
const items = [
  {
    href: "/admin/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: PeopleAltIcon,
    title: "Users",
  },
  {
    href: "/admin/courses",
    icon: SubjectIcon,
    title: "Courses",
  },
  {
    href: "/admin/categories",
    icon: CategoryIcon,
    title: "Categories",
  },
  {
    href: "/admin/account",
    icon: SecurityIcon,
    title: "Account",
  },
  {
    href: "/admin/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const SideNavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const userProfile= useSelector(state=>state.userProfile);
  const dispatch = useDispatch();
  console.log(userProfile.user);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={userProfile.user?userProfile.user.user.avatar:''}
          to="/admin/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {userProfile.user?userProfile.user.user.fullname:'Username'}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {userProfile.user?userProfile.user.user.role.capitalizeFirst():'Admin'}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.href}
              id={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};
SideNavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

SideNavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};
export default SideNavBar;
