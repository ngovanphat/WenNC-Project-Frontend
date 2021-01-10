import React, { Component } from 'react';
import { Grid, Typography, TextField, InputAdornment, MenuItem, Select, Input, Button } from '@material-ui/core';
import { Editor } from "react-draft-wysiwyg";
import {connect } from 'react-redux';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ImageUpload from './ImageUpload';

import { addCourse } from '../../redux/actions';


const mapStateToProps = state => {
  return {
      userProfile: state.userProfile
  };
};
const mapDispatchToProps = (dispatch) => ({
  addCourse: (courseData) => {dispatch(addCourse(courseData))}
});

class AddCourse extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: 'Web Development',
      price: 0,
      avatar: '',
      shortDescription: '',
      description: ''
    }
    
  };


  render() {
    return (
      <Grid container style={{ marginTop: 20 }} row>
        <Grid xs={3} />
        <Grid container xs={6} style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography variant="h5" style={{ color: '#005580', textAlign: 'center', width: '100%', fontWeight: 'bold' }}>Course Overview</Typography>
          <Grid container xs={12} style={{ marginTop: 20 }}>
            <Grid container xs={12} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Grid xs={2}>
                <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold' }}>Title:</Typography>
              </Grid>
              <Grid xs={9} >
                <TextField
                  id="filled-full-width"
                  style={{ marginTop: 8, marginBottom: 8, width: 350 }}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.title}
                  onChange={(e) => this.setState({...this.state, title: e.target.value})}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}>
              <Grid xs={2}>
                <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold' }}>Category:</Typography>
              </Grid>
              <Grid xs={9} >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: 200 }}
                  value={this.state.category}
                  onChange={(e) => this.setState({...this.state, category: e.target.value})}
                >
                  <MenuItem value={"Web Development"}>Web Development</MenuItem>
                  <MenuItem value={"Mobile Development"}>Mobile Development</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container xs={12} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 40
            }}>
              <Grid xs={3}>
                <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold' }}>Price: </Typography>
              </Grid>
              <Grid xs={9} >
                <Input
                  id="standard-adornment-amount"
                  endAdornment={<InputAdornment position="end">$</InputAdornment>}
                  value={this.state.price}
                  onChange={(e) => this.setState({...this.state, price: +e.target.value})}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 40
            }}>
              <Grid xs={3}>
                <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold' }}>Course's Avatar:</Typography>
              </Grid>
              <Grid xs={9} >
                <ImageUpload cardName="Input Image" />
              </Grid>
            </Grid>
            <Grid container xs={12} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20
            }}>
              <Grid xs={3}>
                <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold' }}>Short Description:</Typography>
              </Grid>
              <Grid xs={9} >
                <TextField
                  id="filled-full-width"
                  style={{ marginTop: 8, marginBottom: 8, width: 350 }}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.shortDescription}
                  onChange={(e) => this.setState({...this.state, shortDescription: e.target.value})}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'space-between',
              marginTop: 40
            }}>
              <Grid xs={3}>
                <Typography variant="h6" style={{ color: 'grey', fontWeight: 'bold' }}>Description: </Typography>
              </Grid>
              <Grid xs={9} maxWidth={500} maxHeigth={300}>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorStyle={{ maxHeight: 300, height: 300, backgroundColor: '#fff' }}
                  editorState={this.state.description}
                  onEditorStateChange={(editorState) => this.setState({...this.state, description: ''})}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 40
            }}>
              <Button style={{backgroundColor: '#005580', color: 'white' }} variant="contained" onClick={() => {
                this.props.addCourse({
                  course: {...this.state, actualPrice: this.state.price,thumnail: 'https://img-a.udemycdn.com/course/240x135/625204_436a_3.jpg?ZYwrhKcAPP2L7bci3j4Gr-bcNPg90RLiZTSQzXa6TVG4RuKSM31MgU8rHkpde8Z56bXA7kGBw6UySf8SDUwmKhB61IvgYk7VkyA3VJjqTZD-D6mWA3emRK96scQIEos'},
                  userId: this.props.userProfile.user.user._id
                })
              }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={3} />
      </Grid>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCourse);