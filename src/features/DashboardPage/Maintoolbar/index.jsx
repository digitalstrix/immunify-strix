import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { Box, makeStyles, TextField, MenuItem, Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import Breadcrumb from "./Breadcrumb";
import { GRANULARITY_OPTIONS } from '../../../constants/dashboarConstants';
import {
  selectGranularity,
  selectStatsLoadingStatus,
  selectUser
} from '../selector';
import { setGranularity, getCenterStats } from  '../dashboardSlice';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Index = () => {
  const classes = useStyles();
  const granularity = useSelector(selectGranularity);
  const dispatch = useDispatch();
  const statsLoadingStatus = useSelector(selectStatsLoadingStatus);
  const { vacId } = useSelector(selectUser);

  useEffect(() => {
    if (statsLoadingStatus === 'idle' || statsLoadingStatus === 'failed') {
      dispatch(getCenterStats({ vacId }));
    }
  }, [statsLoadingStatus, vacId, dispatch]);

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          <Breadcrumb />
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-select-currency"
              select
              value={granularity}
              onChange={({ target: { value }}) => {
                // console.log(value);
                dispatch(setGranularity(value));
              }}
              variant="outlined"
              notched={null}
              size="small"
              InputProps={{
                // disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EventOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            >
              {GRANULARITY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
