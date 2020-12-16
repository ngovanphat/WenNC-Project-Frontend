// import React from 'react';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import HomeIcon from '@material-ui/icons/Home';
// import SearchIcon from '@material-ui/icons/Search';
// import Button from '@material-ui/core/Button';

// import HoverMenu from '../HoverMenu';

// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1
//   },
//   titleLogo: {
//     marginLeft: theme.spacing(2)
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   buttonLogin: {
//     marginRight: theme.spacing(1)
//   },
//   buttonSignup: {
//     marginRight: theme.spacing(1)
//   }
// }));

// const Header = () => {
//   const classes = useStyles();
//   return (
//     <div className={classes.grow}>
//       <AppBar position="static" color="inherit">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//           >
//             <HomeIcon />
//             <Typography className={classes.titleLogo}>Online Academy</Typography>
//           </IconButton>
//           <HoverMenu />
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div>
//           <div className={classes.grow} />
//           <div className={classes.buttonGroup}>
//             <Button variant="contained" className={classes.buttonLogin} color="primary">Log in</Button>
//             <Button variant="outlined" color="primary">Sign up</Button>
//           </div>

//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
// export default Header

// import React from 'react';
// import { AppBar, Toolbar, Typography } from "@material-ui/core";
// import { makeStyles } from '@material-ui/styles';
// import HomeIcon from '@material-ui/icons/Home';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  style: {
    background: '#2E3B55',
  },
  title: {
    flexGrow: 1,
  },
  textField: {
    width: 300,
  },
  logInButton: {
    fontSize: 15,
    marginRight: theme.spacing(2),
  },
  signUpButton: {
    background: 'white',
    color: '#2E3B55',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.8),
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.style}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link href="#" onClick={preventDefault} style={{ textDecoration: 'none' }} color="inherit">
              Online Academy
            </Link>
          </Typography>
          <TextField className={classes.textField}
            placeholder="What do you want to learn?"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Typography className={classes.logInButton}>
            <Link href="#" onClick={preventDefault} color="inherit">
              Log in
            </Link>
          </Typography>
          <Button className={classes.signUpButton}>Join for Free</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;