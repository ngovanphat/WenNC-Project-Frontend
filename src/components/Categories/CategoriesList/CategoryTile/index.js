import React from 'react';
import {Card, CardHeader, Grid} from '@material-ui/core';


function CategoryTile(props){
    return (
        <Grid style={{padding:8}}>
            <Card variant="outlined" >
                <CardHeader title={props.title} style={{ textAlign: 'center', fontWeight: '700', color: '#0f7c90' }} disableTypography />
            </Card >
        </Grid>
       
    );
}

export default CategoryTile;