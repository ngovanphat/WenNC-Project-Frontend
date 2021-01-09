import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import MyFavoriteCard from './MyFavoriteCard';
import { NavLink } from 'react-router-dom';
import { fetchMyWishlist } from '../../redux/actions';

const mapStateToProps = state => {
  return {
    myWishlist: state.myWishlist,
    userProfile: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchMyWishlist: () => { dispatch(fetchMyWishlist()) },
});

class MyFavoriteList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMyWishlist();
  }

  render() {
    if (this.props.myWishlist.isLoading) {
      return (
        <Grid container>
          <Grid item row xs={12}>
            <Typography variant="h4">Loading....</Typography>
          </Grid>
        </Grid>
      )
    }
    else if (this.props.myWishlist.errMess) {
      return (
        <Grid container>
          <Grid item row xs={12}>
            <Typography variant="h4">{this.props.myWishlist.errMess}</Typography>
          </Grid>
        </Grid>
      );
    }
    else {
      const len = this.props.myWishlist.courses.favorite_list.length;
      if (len == 0) {
        return <main>
          <div style={{ marginTop: 30 }}>
            <Container maxWidth="md">
              <Typography variant="h6" align="left" color="textSecondary">
                Wish list
              </Typography>
            </Container>
          </div>
          <Container style={{ paddingTop: 5, paddingBottom: 4 }} maxWidth="md">
            <Grid container>
              <Typography variant="h7" align="left" color="black">
                Your list is empty.
                <NavLink to='/categories' style={{ textDecoration: 'none', marginLeft: 5, color: '#005580' }} >
                  Browse more courses now.
                </NavLink>
              </Typography>
            </Grid>
          </Container>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '5vh' }}
          >
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </main>
      }
      return <main>
        <div style={{ marginTop: 30 }}>
          <Container maxWidth="md">
            <Typography variant="h6" align="left" color="textSecondary">
              Wish list
            </Typography>
          </Container>
        </div>
        <Container style={{ paddingTop: 5, paddingBottom: 4 }} maxWidth="md">
          <Grid container spacing={2}>
            {this.props.myWishlist.courses.favorite_list.map((course) => (
              <MyFavoriteCard key={course.title} course={course} user={this.props.userProfile.user} />
            ))}
          </Grid>
        </Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '5vh' }}
        >
          <Grid item xs={12} style={{ paddingTop: 10 }}>
            <Pagination count={this.props.myWishlist.courses.favorite_list.length} shape="rounded" size="large" />
          </Grid>
        </Grid>
      </main>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoriteList);

// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, fade } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Pagination from '@material-ui/lab/Pagination';
// import MyFavoriteCard from './MyFavoriteCard';
// import { NavLink } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   heroContent: {
//     paddingTop: theme.spacing(4),
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(4),
//   },
//   showMore: {
//     textDecoration: 'none',
//     color: '#005580',
//     '&:hover': {
//       color: fade(theme.palette.info.light, 1),
//     }
//   }
// }));

// export default function MyFavoriteList(props) {
//   const classes = useStyles();
//   console.log(props);

//   function Body() {
//     const len = props.courses.favorite_list.length;

//     if (len == 0) {
//       return <Grid container>
//         <Typography variant="h7" align="left" color="black">
//           Your list is empty.
//           <NavLink to='/categories' style={{ textDecoration: 'none', marginLeft: 5 }} className={classes.showMore}>
//             Browse more courses now.
//           </NavLink>
//         </Typography>
//       </Grid>;
//     }
//     return <Grid container spacing={2}>
//       {props.courses.favorite_list.map((course) => (
//         <MyFavoriteCard key={course.title} course={course} />
//       ))}
//     </Grid>;
//   }

//   function Paging() {
//     const len = props.courses.favorite_list.length;
//     if (len == 0) {
//       return <Grid item xs={12}>
//       </Grid>;
//     }
//     return <Grid item xs={12}>
//       <Pagination count={props.courses.favorite_list.length} shape="rounded" size="large" />
//     </Grid>;
//   }
//   if (props.coursesLoading) {
//     return (
//       <Grid container>
//         <Grid item row xs={12}>
//           <Typography variant="h4">Loading....</Typography>
//         </Grid>
//       </Grid>
//     );
//   }
//   else if (props.coursesErrMess) {
//     return (
//       <Grid container>
//         <Grid item row xs={12}>
//           <Typography variant="h4">{props.coursesErrMess}</Typography>
//         </Grid>
//       </Grid>
//     );
//   }
//   else {
//     return (
//       <main>
//         <div className={classes.heroContent}>
//           <Container maxWidth="md">
//             <Typography variant="h6" align="left" color="textSecondary">
//               Wish list
//           </Typography>
//           </Container>
//         </div>
//         <Container className={classes.cardGrid} maxWidth="md">
//           <Body />
//         </Container>
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//           style={{ minHeight: '5vh' }}
//         >
//           <Paging />
//         </Grid>
//       </main>
//     );
//   }
// }