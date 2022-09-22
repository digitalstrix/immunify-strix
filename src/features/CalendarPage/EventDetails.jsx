import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Table from "../../common/components/Table";
import { generateTableDataRows } from "../../utils/calenderUtils";
import moment from "moment";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
  open,
  closeAction,
  deleteAction,
  updateAction,
  selectedEvent,
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (selectedEvent && Object.keys(selectedEvent).length > 0) {
      setData({
        ...selectedEvent,
        fromDate: moment(`${selectedEvent.fromDate} ${selectedEvent.fromTime}`)
          .format("YYYY-MM-DD hh:mm:ss")
          .toString(),
        toDate: moment(`${selectedEvent.toDate} ${selectedEvent.toTime}`)
          .format("YYYY-MM-DD hh:mm:ss")
          .toString(),
      });
    }
  }, [selectedEvent]);

  return (
    <div>
      <Dialog
        onClose={closeAction}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="customized-dialog-title" onClose={closeAction}>
          Event Details
        </DialogTitle>
        <DialogContent dividers>
          <Table
            title="Card Information"
            columns={[
              {
                field: "thead",
                headerStyle: { display: "none" },
                cellStyle: { fontWeight: "bold" },
              },
              { field: "tdata", headerStyle: { display: "none" } },
            ]}
            data={
              Object.keys(data).length > 0 ? generateTableDataRows(data) : {}
            }
            options={{
              search: false,
              pageSize: 8,
              paging: false,
              toolbar: false,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={deleteAction}
            color="primary"
            variant="outlined"
          >
            Delete
          </Button>
          <Button
            autoFocus
            onClick={updateAction}
            color="primary"
            variant="contained"
          >
            Update / Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
