import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import { makeStyles } from "@material-ui/core/styles";
import QrReader from "../../../common/components/QrReader";
import { fetchChild, initVaccination } from "../vaccinationSlice";
import { initGrowth } from "../growthSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "20vh",
  },
  paper: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
}));

const Qrinputfield = (props) => {
  const classes = useStyles(props);

  const [qrCodeValue, setQrCodeValue] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <QrReader
        isOpen={open}
        closeAction={() => setOpen(false)}
        handleError={() => {}}
        handleScan={(data) => {

          if (data !== null) {
            setOpen(false);
            dispatch(initVaccination());
            dispatch(initGrowth());
            dispatch(
              fetchChild({
                qrCode: data,
              })
            );
          }
        }}
      />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="row" spacing={2} xs={6}>
      <Paper className={classes.paper}>
        <Grid container direction='row' spacing={2}>

          <Grid item xs={8}>
            <TextField
              id="qrinputfield"
              label="TYPE QR CODE"
              variant="outlined"
              size="small"
              type="text"
              value={qrCodeValue}
              fullWidth
              onChange={(event) => {
                setQrCodeValue(event.target.value);
              }}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  if (qrCodeValue) {
                    dispatch(initVaccination({}));
                    dispatch(initGrowth());
                    dispatch(
                      fetchChild({
                        qrCode: qrCodeValue,
                      })
                    );
                  }
                }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              onClick={() => {
                if (qrCodeValue) {
                  dispatch(initVaccination({}));
                  dispatch(initGrowth());
                  dispatch(
                    fetchChild({
                      qrCode: qrCodeValue,
                    })
                  );
                }
              }}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">OR</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => setOpen(true)}
              startIcon={<CameraAltOutlinedIcon />}
            >
              Scan QR Code
            </Button>
          </Grid>
        </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Qrinputfield;
