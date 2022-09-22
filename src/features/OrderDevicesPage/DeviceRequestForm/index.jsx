import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSnackbar } from "notistack";

import { selectCreateOrderStatus } from '../selector';
import { orderDevices } from '../orderDevicesSlice';
import { notify } from '../../../utils/commonUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const DEVICE_TYPES = ["QR Code Readers", "QR Code Printers", "Cards"];

const ORDER_SUBMISSION_SUCCESS_MSG = "Order Submitted Successfully!";
const ORDER_SUBMISSION_ERROR_MSG = "Order Submission Failed. Please try again in 30 seconds!";

const Index = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const [errors, setErrors] = useState({ type: null });
  
  const createOrderStatus =  useSelector(selectCreateOrderStatus);
  const dispatch = useDispatch();  

  useEffect(() => { 
    if (createOrderStatus === 'succeeded') {
      notify(enqueueSnackbar, ORDER_SUBMISSION_SUCCESS_MSG);
      setType('');
      setQuantity(1);
      setNote('');
    } else if (createOrderStatus === 'failed') {
      notify(enqueueSnackbar, ORDER_SUBMISSION_ERROR_MSG, 'error');
    }
  }, [createOrderStatus, enqueueSnackbar]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Box mt={1}>
          <Paper elevation={3}>
            <Box p={3}>
              <form noValidate autoComplete="off">
                <Grid container row xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={DEVICE_TYPES}
                      getOptionLabel={(option) => option}
                      onChange={(event, option) => {
                        setErrors({ type: null });
                        setType(option);
                      }}
                      value={type}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select order device type"
                          variant="outlined"
                          error={!!errors.type}
                          helperText={errors.type}
                          required
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Number of devices"
                      variant="outlined"
                      type="number"
                      value={quantity}
                      onChange={({ target: { value }}) => {
                        if (value && value <= 0) {
                          setQuantity(1);
                        } else {
                          setQuantity(value);
                        }
                      }}
                      onBlur={() => {
                        if (!quantity) {
                          setQuantity(1);
                        }
                      }}
                      error={!!errors.quantity}
                      helperText={errors.quantity}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="notes"
                      label="Notes"
                      variant="outlined"
                      type="number"
                      value={note}
                      onChange={({ target: { value }}) => {
                        setNote(value);
                      }}
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (type && createOrderStatus !== 'loading') {
                          dispatch(orderDevices({
                            note,
                            quantity,
                            type
                          }));
                        } else {
                          setErrors({ type: 'Device type is required' });
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Index;
