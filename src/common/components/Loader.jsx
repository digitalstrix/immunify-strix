import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, LinearProgress } from '@material-ui/core';

// const select

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Loader = ({ height = '90vh'}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height }}>
            <CircularProgress />
        </div>
    )
}

export const LinearProgressIndicator = () => {
    const classes = useStyles();
    const loading = useSelector(state => state.common.loading);

    return (
        <div className={classes.root}>
            { loading ? <LinearProgress color="secondary"/> : null }
        </div>
    );    
};

export default Loader;
