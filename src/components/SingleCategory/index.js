import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { withRouter } from 'react-router-dom';



import { fetchSingleCategory } from '../../redux/actions'; 
import CourseList from './CoursesList';

const mapStateToProps = state => {
  return {
      singleCategory: state.singleCategory
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSingleCategory: (categoryName) => {dispatch(fetchSingleCategory(categoryName))}
});

class SingleCategory extends Component {



  componentDidMount() {
    console.log(this.props.match.params.categoryName);
    this.props.fetchSingleCategory(this.props.match.params.categoryName);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchSingleCategory(this.props.match.params.categoryName);
    }
  }

  render() {
    return (
      <Grid>
        <Grid  container style={{ marginTop: 50, marginLeft: 20 }} column>
          <Grid item xs={12} style={{ marginBottom: 20, marginLeft: 20 }}>
            <Typography variant="h5" style={{ fontWeight: '700' }}>{this.props.match.params.categoryName} Courses</Typography>
          </Grid>
          <CourseList 
            isLoading={this.props.singleCategory.isLoading}
            errMess={this.props.singleCategory.errMess}
            courses={this.props.singleCategory.category}
          />
            
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCategory));