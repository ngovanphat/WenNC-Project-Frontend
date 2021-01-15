import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAdminCategory } from '../../../redux/actions';

const useStyles = makeStyles({
  form: {
    width: '30vw',
    padding: '2%',
  },
  actions: {
    display: 'flex',
  },
});

function AddCategory({handleFinishAddCategory}) {
  const classes = useStyles();
  const [error, setError] = useState([null, null]); //[errorType,errorMsg]
  const [title, setTitle] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    if(title!==""){
      const res = await dispatch(addAdminCategory({ title, }));
      if (res) {
          handleFinishAddCategory(res);
      }
    }
  };


  return (
    <form className={classes.form} id="login" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Add New Category
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
              <TextField
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Category Name"
                autoFocus
                value={title}
                error={!!errors.title}
                inputRef={register({
                  required: true,
                  maxLength: {
                    value: 50
                  }
                })}
                onInput={(e) => setTitle(e.target.value)}
              />
        </Grid>
        <Typography variant="caption" style={{ color: '#f00',marginLeft:"1vw"}}>{errors.title && "Invalid category name"}</Typography>
        <Grid item xs={12} className={classes.actions} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit">
            Add Category
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddCategory;
