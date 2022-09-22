import React from "react";
import { Modal, IconButton, Box, Grid } from "@material-ui/core";
import QrReader from "react-qr-reader";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
}));

const QrReaderComponent = ({
  isOpen,
  closeAction,
  handleError,
  handleScan,
  delay = 300,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <IconButton aria-label="close" onClick={closeAction}>
          <CloseIcon color="primary" />
        </IconButton>
      </Grid>
      <QrReader
        delay={delay}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeAction}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default QrReaderComponent;
