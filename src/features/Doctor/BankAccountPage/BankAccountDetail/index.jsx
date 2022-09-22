import React from "react";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import TextField from "@material-ui/core/TextField";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

// const useStyles = makeStyles((theme) => ({}));

const Index = () => {
  //   const classes = useStyles();
  return (
    <form action="">
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container row spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="bank-name"
                  label="Bank Name"
                  value="BOC"
                  onChange={() => {}}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="branch"
                  label="Branch Name"
                  value="Colombo"
                  onChange={() => {}}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="bankaccount-numb"
                  label="Account Number"
                  value="93292329399"
                  onChange={() => {}}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="confirmbankaccount-numb"
                  label="Confirm Account Number"
                  value="93292329399"
                  onChange={() => {}}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="beneficiary-name"
                  label="Beneficiary Name"
                  value="Txfg"
                  onChange={() => {}}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="ifsc-code"
                  label="IFSC Code"
                  value="Txfg"
                  onChange={() => {}}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" size="small">
          Add Account
        </Button>
      </DialogActions>
    </form>
  );
};

export default Index;
