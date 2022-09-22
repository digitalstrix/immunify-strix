import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import MainDialog from "../../../../common/components/Admin/Dialog";
import AddSheduleDialog from "../AllShedules/AddSheduleDialog";
import { selectScheduleCreateStatus } from '../selector';
import { notify } from '../../../../utils/commonUtils';

const SCHEDULE_CREATION_SUCCESS_MSG = "Schedule Created Successfully!";
const SCHEDULE_CREATION_FAILURE_MSG = "Schedule Creation Failed!";


const Index = () => {
  const { enqueueSnackbar } = useSnackbar();  
  const [open, setOpen] = useState(false);
  const scheduleCreateStatus = useSelector(selectScheduleCreateStatus);

  useEffect(() => {
    if (scheduleCreateStatus === 'succeeded') {
      notify(enqueueSnackbar, SCHEDULE_CREATION_SUCCESS_MSG);
      setOpen(false);
    } else if (scheduleCreateStatus === 'failed') {
      notify(enqueueSnackbar, SCHEDULE_CREATION_FAILURE_MSG, 'error');
    }
  }, [scheduleCreateStatus, enqueueSnackbar]);

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
              open={open}
              isiconbtn={false}
              btnlabel="Create New Schedule"
              dialogtitle="Create New Schedule"
              dialogcontent={<AddSheduleDialog dialogactiontitle="Create Schedule" handleClose={() => setOpen(false)} disableAction={scheduleCreateStatus === 'loading'}/>}
              handleOpen={() => setOpen(true)}
              handleClose={() => setOpen(false)}              
              maxWidth="md"
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
