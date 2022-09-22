import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { selectTradenameApproveStatus, selectTradenameRejectStatus } from "../../TradenameListPage/selector";
import { notify } from "../../../../../utils/commonUtils";

const APPROVE_TRADENAME_SUCCESSFUL_MSG = "Tradename approved successfully!";
const APPROVE_TRADENAME_FAILURE_MSG = "Failed to approve Tradename!";
const REJECT_TRADENAME_SUCCESSFUL_MSG = "Tradename rejected successfully!";
const REJECT_TRADENAME_FAILURE_MSG = "Failed to reject Tradename!";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();

  const approveTradenameStatus = useSelector(selectTradenameApproveStatus);
  const rejectTradenameStatus = useSelector(selectTradenameRejectStatus);

  useEffect(() => {
    console.log('approve st', approveTradenameStatus)
    if (approveTradenameStatus === 'succeeded') {
      notify(enqueueSnackbar, APPROVE_TRADENAME_SUCCESSFUL_MSG);
    } else if (approveTradenameStatus === 'failed') {
      notify(enqueueSnackbar, APPROVE_TRADENAME_FAILURE_MSG, 'error');
    }
  }, [approveTradenameStatus, enqueueSnackbar])

  useEffect(() => {
    console.log('reject st', rejectTradenameStatus)

    if (rejectTradenameStatus === 'succeeded') {
      notify(enqueueSnackbar, REJECT_TRADENAME_SUCCESSFUL_MSG);
    } else if (rejectTradenameStatus === "failed") {
      notify(enqueueSnackbar, REJECT_TRADENAME_FAILURE_MSG, "error");
    }
  }, [rejectTradenameStatus, enqueueSnackbar])
  return (
    <div>
      <Grid container direction='row' justify='space-between' alignItems='center'>
        <Box display='flex' justifyContent='flex-start'>
          <Breadcrumb />
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
