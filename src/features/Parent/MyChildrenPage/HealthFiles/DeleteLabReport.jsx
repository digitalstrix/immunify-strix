import React from "react";
import {
  Card,
  Button,
  Grid,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { selectDeletingStatus } from "./selector";
import { deleteLabRoportFile } from "./healthFilesSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dangerButton: {
    backgroundColor: "#B22222",
  },
}));

const DeleteHealthFile = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const status = useSelector(selectDeletingStatus);
  return (
    <div>
      <form action="">
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <Typography>Are you sure?</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            className={classes.dangerButton}
            variant="contained"
            size="small"
            color="secondary"
            disabled={status === "loading" ? true : false}
            onClick={() => {
              dispatch(deleteLabRoportFile({ id: data.id }));
            }}
          >
            {status === "loading" ? "Deleting.." : "Delete"}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DeleteHealthFile;
