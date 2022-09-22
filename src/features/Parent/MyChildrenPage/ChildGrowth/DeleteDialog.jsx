import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectGrowthInfoDeletingStatus } from "./selector";
import { deleteChildGrowthInfo } from "./ParentSideChildGrowthSlice";

const DeleteDialog = ({ data }) => {
  const dispatch = useDispatch();
  const loadingState = useSelector(selectGrowthInfoDeletingStatus);

  return (
    <div>
      <Box mx={3}>
        <DialogContent>
          <Card>
            <form action="">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography id="input-slider" gutterBottom>
                    Confirm Deleting Growth Record
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Divider />
                <Grid item xs={12}>
                  <DialogActions>
                    <Button
                      disabled={loadingState === "loading"}
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        dispatch(deleteChildGrowthInfo(data));
                      }}
                      style={
                        loadingState !== "loading"
                          ? { backgroundColor: "#c41a1a" }
                          : {}
                      }
                    >
                      {loadingState === "loading" ? "Deleting..." : "Delete"}
                    </Button>
                  </DialogActions>
                </Grid>
              </Box>
            </form>
          </Card>
        </DialogContent>
      </Box>
    </div>
  );
};

export default DeleteDialog;
