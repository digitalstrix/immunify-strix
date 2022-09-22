import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { getBankAccount, updateBankAccount } from "./bankAccountSlice.js";
import {
  getLoggedInDoctorId,
  selectBankAccount,
  getBankAccountError,
  getBankAccountStatus,
  getLoggedInDoctorUserName,
  getLoggedInDoctorEmail,
  getUpdateBankAccountError,
  getUpdateBankAccountStatus,
} from "./selector.js";
import { notify } from "../../../utils/commonUtils";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    margin: theme.spacing(2),
  },
  card: {
    minWidth: 275,
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Index = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const getError = useSelector(getBankAccountStatus);
  const getStatus = useSelector(getBankAccountError);

  const updateError = useSelector(getUpdateBankAccountError);
  const updateStatus = useSelector(getUpdateBankAccountStatus);

  const data = useSelector(selectBankAccount);
  const doctorId = useSelector(getLoggedInDoctorId);
  const doctorUserName = useSelector(getLoggedInDoctorUserName);
  const doctorEmail = useSelector(getLoggedInDoctorEmail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBankAccount(doctorId));
  }, [dispatch]);

  const GET_BANK_ACC_FAILURE_MSG = "Retrieving Bank Account Data Failed!";

  const UPDATE_BANK_ACC_SUCCESS_MSG = "Bank Account Updated Successfully!";
  const UPDATE_BANK_ACC_FAILURE_MSG = "Update Bank Account Failed!";

  useEffect(() => {
    if (updateStatus === "succeeded") {
      notify(enqueueSnackbar, UPDATE_BANK_ACC_SUCCESS_MSG);
    } else if (updateStatus === "failed") {
      notify(enqueueSnackbar, UPDATE_BANK_ACC_FAILURE_MSG, "error");
    }
  }, [updateStatus, updateError, enqueueSnackbar]);

  useEffect(() => {
    if (getStatus === "failed") {
      notify(enqueueSnackbar, GET_BANK_ACC_FAILURE_MSG, "error");
    }
    setBname(data.nameInBank);
    setAccNo(data.accountNo);
    setCaccNo(data.accountNo);
    setBranch(data.branch);
    setIfsc(data.ifscCode);
    setBankName(data.bankName);
  }, [getStatus, getError, enqueueSnackbar]);

  const [bname, setBname] = useState(null);
  const [accNo, setAccNo] = useState(null);
  const [cAccNo, setCaccNo] = useState(null);
  const [branch, setBranch] = useState(null);
  const [ifsc, setIfsc] = useState(null);
  const [bankName, setBankName] = useState(null);

  return (
    <div className={classes.root}>
      <form>
        <Grid container justify="center">
          <Card className={classes.card} mt={3}>
            <CardHeader
              title="Bank Account"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    id="Beneficiary Name"
                    name="bname"
                    label="Beneficiary Name"
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setBname(e.target.value)}
                    value={bname||""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Bank Account Number"
                    name="acc"
                    label="Bank Account Number"
                    required
                    variant="outlined"
                    margin="normal"
                    inputMode="numeric"
                    fullWidth
                    onChange={(e) => setAccNo(e.target.value)}
                    value={accNo||""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Confirm Bank Account Number"
                    name="cacc"
                    label="Confirm Bank Account Number"
                    variant="outlined"
                    margin="normal"
                    inputMode="numeric"
                    fullWidth
                    onChange={(e) => setCaccNo(e.target.value)}
                    value={cAccNo||""}
                    error={accNo !== cAccNo}
                    helperText={accNo !== cAccNo && "Account numbers doesn't match"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Bank Account Branch"
                    name="branch"
                    label="Bank Account Branch"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setBranch(e.target.value)}
                    value={branch||""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="IFSC Code"
                    name="ifsc"
                    label="IFSC Code"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setIfsc(e.target.value)}
                    value={ifsc||""}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Bank Name"
                    name="bankName"
                    label="Bank Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    onChange={(e) => setBankName(e.target.value)}
                    value={bankName||""}
                  />
                </Grid>
              </Grid>
            </CardContent>

            <React.Fragment>
              <Divider />
              <Box display="flex" justifyContent="end" m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    accNo !== cAccNo ||
                    accNo === "" ||
                    !accNo ||
                    bname === "" ||
                    !bname ||
                    branch === "" ||
                    !branch ||
                    ifsc === "" ||
                    !ifsc ||
                    bankName === "" ||
                    !bankName
                  }
                  onClick={() => {
                    dispatch(
                      updateBankAccount({
                        accNo,
                        bankName,
                        beneficiaryName: bname,
                        branch,
                        docEmail: doctorEmail,
                        docName: doctorUserName,
                        ifscCode: ifsc,
                        immId: doctorId,
                      })
                    );
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </React.Fragment>
          </Card>
        </Grid>
      </form>
    </div>
  );
};

export default Index;
