import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { Box, Grid, Button } from "@material-ui/core";

import Breadcrumb from "./Breadcrumb";
import MainDialog from "../../../../../common/components/Admin/Dialog";
import AddTradenameDialog from "../AddTradenameDialog";
import { selectTradenameAddStatus } from "../selector";
import { notify } from "../../../../../utils/commonUtils";

const ADD_NEW_TRADENAME_SUCCESSFUL_MSG = "Tradename added successfully!";
const ADD_NEW_TRADENAME_FAILURE_MSG = "Failed to add Tradename!";


const Index = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const addTradenameStatus = useSelector(selectTradenameAddStatus);


  useEffect(() => {
    if (addTradenameStatus === "succeeded") {
      notify(enqueueSnackbar, ADD_NEW_TRADENAME_SUCCESSFUL_MSG);
    } else if (addTradenameStatus === "failed") {
      notify(enqueueSnackbar, ADD_NEW_TRADENAME_FAILURE_MSG, "error");
    }
  }, [addTradenameStatus, enqueueSnackbar]);




  const dialogContent = () => {
    return <AddTradenameDialog dialogactiontitle='Add Tradename' handleClose={() => setOpen(false)} />;
  };

  return (
    <div>
      <Grid container direction='row' justify='space-between' alignItems='center'>
        <Box display='flex' justifyContent='flex-start'>
          <Breadcrumb />
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <MainDialog open={open} dialogtitle={"Add New Tradename"} dialogcontent={dialogContent()} handleOpen={() => setOpen(true)} handleClose={() => setOpen(false)} maxWidth='md' />
          <Box p={1}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setOpen(true);
              }}>
              Add New Tradename
            </Button>
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
