import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Box, Grid, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DialogContent, DialogActions } from '../../../../../common/components/Admin/Dialog';
import { generateQrCodes } from '../../mangeCardsSlice';

const QRCODE_COUNT_OPTIONS = [
  100,
  200,
  500,
  1000
];

const GenerateQRCodeDialog = (props) => {

  const [count, setCount] = useState(QRCODE_COUNT_OPTIONS[0]);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={4}>
            <Grid container row justify="center" spacing={3}>
              <Grid item xs={8}>
                {/* <TextField
                  id="qrcode_count"
                  label="Generate QR Codes"
                  placeholder="Number Of QR Codes to Generate"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  disabled={false}
                  required
                  fullWidth
                /> */}
                <Autocomplete
                  id="qr_code_count_select"
                  options={QRCODE_COUNT_OPTIONS}
                  getOptionLabel={(option) => `${option}`}
                  fullWidth
                  disableClearable
                  value={count}               
                  onChange={(e, value) => setCount(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}                      
                      label="Generate QR Codes"
                      placeholder="Number Of QR Codes to Generate"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => props.handleClose()}
          disabled={false}
          color="primary"
          variant="outlined"
        >
          Close 
        </Button>
        <Button
          autoFocus
          onClick={() => {

            const payload = {
              vacId: props.data.id,
              quantity: count
            }

            dispatch(generateQrCodes(payload)); 

            // const payload = generateRegisterVacCenterPayload(inputs, checks);
            // console.log(payload);
            // if (validateRegVacCenterPayload(payload, checks)) {
            //   console.log('validation success');
            //   console.log(JSON.stringify(payload, null, 2));
            //   if (props.data) {
            //     dispatch(updateVacCenter(payload));
            //   } else {
            //     dispatch(registerVacCenter(payload));
            //   }              
            // } else {
            //   setErrors(generateVacCenterRegFormErrors(inputs, checks));
            // }
          }}
          type='button'
          disabled={props.disableAction}
          color="primary"
          variant="contained"
        >
          {props.dialogactiontitle}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default GenerateQRCodeDialog;
