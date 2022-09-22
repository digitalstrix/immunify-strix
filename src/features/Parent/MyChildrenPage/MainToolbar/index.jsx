import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Grid, Button } from "@material-ui/core";
import Dialog from "../../../../common/components/Admin/Dialog";
import AddChild from "../AddChild";
import {
  selectAddChildStatus,
  selectAddChildError,
} from "../AddChild/selector";
import { useSelector } from "react-redux";
import { notify } from "../../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const Index = (props) => {
  const ADD_CHILD_SUCCEESFUL_MSG = "Child Added Successfully!";
  const ADD_CHILD_FAILURE_MSG = "Child Adding Failed!";
  const { enqueueSnackbar } = useSnackbar();
  const addingStatus = useSelector(selectAddChildStatus);
  const addingError = useSelector(selectAddChildError);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (addingStatus === "succeeded") {
      setOpenDialog(false);
      notify(enqueueSnackbar, ADD_CHILD_SUCCEESFUL_MSG);
    } else if (addingStatus === "failed") {
      setOpenDialog(false);
      notify(enqueueSnackbar, ADD_CHILD_FAILURE_MSG, "error");
    }
  }, [addingStatus, addingError, enqueueSnackbar]);

  return (
    <div>
      <Dialog
        tooltip="Add Child"
        dialogtitle="Add New Child"
        dialogcontent={<AddChild />}
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="flex-start">
          {props.breadcrumb}
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Add New Child
          </Button>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
