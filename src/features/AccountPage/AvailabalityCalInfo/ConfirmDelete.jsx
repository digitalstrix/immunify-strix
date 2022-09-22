import { Button, Grid, Box, Typography } from "@material-ui/core";
import {
  DialogActions,
  DialogContent,
} from "../../../common/components/Admin/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { deleteDoctorSessions } from "./availabilityCalendarSlice";
import { selectDeleteSessionStatus } from "./selector";

const ConfirmDeleteDialog = ({ onClose, doctorId, data }) => {
  const dispatch = useDispatch();
  const deleteSessionStatus = useSelector(selectDeleteSessionStatus);
  return (
    <>
      <DialogContent>
        <Box p={3}>
          <Grid container row spacing={3}>
            <Grid item xs={12}>
              <Typography>
                After deleting the session, you will not receive any
                appointments for this session time period. Are you sure you want
                to delete?
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="contained"
          style={
            deleteSessionStatus === "loading"
              ? {}
              : {
                  backgroundColor: "#bd1a33",
                }
          }
          disabled={deleteSessionStatus === "loading"}
          onClick={() => {
            dispatch(
              deleteDoctorSessions({
                ...data,
                doctorId,
                status: "DELETED",
              })
            );
          }}
        >
          {deleteSessionStatus === "loading" ? "Deleting.." : "Delete"}
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmDeleteDialog;
