import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { Box, Grid } from "@material-ui/core";
import Dialog from "../../../common/components/Dialog";
import DialogContent from "./ChildGrowthDialogContent";

import {
  selectChildren,
  selectGrowthInputs,
  selectAddGrowthStatus,
} from "../selector";

import { addChildGrowthInfo, getGrowthInfo } from "../growthSlice";

const GROWTH_UPDATE_SUCCESS_MSG = "Growth Details Updated Successfully!";
const GROWTH_UPDATE_FAILED_MSG = "Growth Details Updating Failed!";
const Childgrowthtoolbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const inputs = useSelector(selectGrowthInputs);
  const [child] = useSelector(selectChildren);
  const growthAddStatus = useSelector(selectAddGrowthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (growthAddStatus === "succeeded") {
      enqueueSnackbar(GROWTH_UPDATE_SUCCESS_MSG, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setOpen(false);
      dispatch(getGrowthInfo({ childId: child.id }));
    }

    if (growthAddStatus === "failed") {
      enqueueSnackbar(GROWTH_UPDATE_FAILED_MSG, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  }, [growthAddStatus, child, enqueueSnackbar, dispatch]);

  return (
    <div>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Box display="flex" justifyContent="flex-end">
          <Dialog
            isiconbtn={false}
            disableOpenAction={!child}
            btnlabel="Add Growth Info"
            dialogactiontitle="Update"
            dialogtitle="Child Growth Information"
            dialogcontent={<DialogContent />}
            dialogCloseAction={() => setOpen(false)}
            dialogOpenAction={() => setOpen(true)}
            dialogaction={() => {
              if (growthAddStatus !== "loading") {
                dispatch(
                  addChildGrowthInfo({
                    ...inputs,
                    date: new Date(),
                    childId: child.id,
                  })
                );
              }
            }}
            maxWidth="sm"
            open={open}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default Childgrowthtoolbar;
