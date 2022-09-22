import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import MainDialog from "../../../../common/components/Admin/Dialog";
import AddVaccineCenterDialog from "../AddVaccineCenterDialog";
import { notify } from '../../../../utils/commonUtils';
import { selectCenterRegStatus, selectCenterRegError } from '../selector';
import { getMainCenters } from '../vacCenterSlice';

const CENTER_CREATED_SUCCEESFULLY_MSG = 'Center Created Successfully!';
const CENTER_CREATION_FAILED_MSG = 'Center Creation Failed!';

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const centerRegStatus = useSelector(selectCenterRegStatus);
  const centerRegError = useSelector(selectCenterRegError);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (centerRegStatus === 'succeeded') {
      notify(enqueueSnackbar, CENTER_CREATED_SUCCEESFULLY_MSG);
      setOpen(false);
    } else if (centerRegStatus === 'failed') {
      notify(enqueueSnackbar, centerRegError || CENTER_CREATION_FAILED_MSG, 'error');
    }
  }, [centerRegStatus, centerRegError, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getMainCenters({
      country: '',
      state: '',
      status: '',
      vacName: '',
      vacType: ''
    }));
  }, [dispatch]);

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
          <Box p={1}>
            <MainDialog
              btnlabel="Register New Center"
              dialogtitle="Register New Vaccination Center"
              isiconbtn={false}
              dialogcontent={<AddVaccineCenterDialog handleClose={() => setOpen(false)} dialogactiontitle={'Register'} disableAction={centerRegStatus === 'loading'}/>}
              maxWidth="md"
              open={open}
              handleClose={() => setOpen(false)}
              handleOpen={() => setOpen(true)}
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
            />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
