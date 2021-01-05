import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import styled from "styled-components";
import { useParams } from "react-router-dom";
const CourseDetails = () => {
  let { id } = useParams();
  useEffect(() => {
    document.title = "Course Details"
  }, []);
  return <div><h1>{id}</h1></div>;
};

export default CourseDetails;
