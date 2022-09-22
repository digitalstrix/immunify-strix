import React from "react";
import { Box, Grid, TextField } from "@material-ui/core";

const Generateqrcodedialog = () => {
  return (
    <form noValidate autoComplete="off">
      <Box p={4}>
        <Grid container row justify="center" spacing={3}>
          <Grid item xs={8}>
            <TextField
              id="qrcode_count"
              label="Generate QR Codes"
              placeholder="Number Of QR Codes to Generate"
              variant="outlined"
              type="number"
              InputLabelProps={{ shrink: true }}
              disabled={false}
              required
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Generateqrcodedialog;
