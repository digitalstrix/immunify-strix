import React, { useEffect, useCallback, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from "../../../common/components/Admin/Dialog";
import { Autocomplete } from "@material-ui/lab";

import {
  selectPasswordResetRequestStatus,
  selectPasswordResetRequestSuccessData,
  selectPasswordResetChangeStatus,
  selectPasswordResetChangeSuccessData,
} from "../selector";

import {
  passwordResetRequestAsync,
  passwordResetChangeAsync,
} from "../loginEntrySlice";
import { email_validation } from "../../../utils/validationUtils";

const countries = [
  {
    label: "Sri Lanka",
    value: 193,
  },
  {
    label: "India",
    value: 92,
  },
];

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
      },
      editor: {
        border: "1px solid gray",
      },
      editorContainer: {
        border: "1px solid gray",
      },
    },
  },
});

export default function OtpScreen() {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(null);
  const [errors, setErrors] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmpassword] = useState(null);
  // const entryData = useSelector((state) => selectEntryData(state));
  const deviceId = localStorage.getItem("deviceId");

  const passwordResetRequestStatus = useSelector((state) =>
    selectPasswordResetRequestStatus(state)
  );
  const passwordResetRequestSuccessData = useSelector((state) =>
    selectPasswordResetRequestSuccessData(state)
  );
  const passwordResetChangeStatus = useSelector((state) =>
    selectPasswordResetChangeStatus(state)
  );
  const passwordResetChangeSuccessData = useSelector((state) =>
    selectPasswordResetChangeSuccessData(state)
  );

  const hasErrors = (number) => {
    if (!number || (number && number.length !== 6)) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  };

  const hasErrorsEmail = (email_values) => {
    if (email_values && email_values !== "") {
      if (email_validation(email_values)) {
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(false);
    }
  };

  const resetRequestSubmit = useCallback(
    (info) => {
      dispatch(passwordResetRequestAsync(info));
    },
    [dispatch]
  );

  const resetChangeSubmit = useCallback(
    (info) => {
      dispatch(passwordResetChangeAsync(info));
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  name="email"
                  type="text"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    hasErrorsEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {error && (
                  <Alert onClose={() => {}} severity="error">
                    Email not valid
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<SaveAltIcon />}
          disabled={!email || error}
          onClick={() => {
            resetRequestSubmit({
              email,
              username: email,
            });
          }}
        >
          Get Reset Code
        </Button>
      </DialogActions>

      {passwordResetRequestStatus === "idle" &&
        passwordResetRequestSuccessData &&
        passwordResetRequestSuccessData?.authUserId && (
          <>
            <DialogContent dividers>
              <form noValidate autoComplete="off">
                <Box p={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        id="otp"
                        label="6 - digits otp"
                        variant="outlined"
                        size="small"
                        name="otp"
                        type="text"
                        required
                        fullWidth
                        onChange={(e) => {
                          setOtp(e.target.value);
                          hasErrors(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {errors && (
                        <Alert onClose={() => {}} severity="error">
                          Otp not valid
                        </Alert>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        size="small"
                        name="password"
                        type="text"
                        required
                        fullWidth
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {password && password.length < 6 && (
                        <Alert onClose={() => {}} severity="error">
                          Password not valid
                        </Alert>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="confirmpassword"
                        label="Confirm Password"
                        variant="outlined"
                        size="small"
                        name="confirmpassword"
                        type="text"
                        required
                        fullWidth
                        value={confirmpassword}
                        onChange={(e) => {
                          setConfirmpassword(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {confirmpassword !== password && (
                        <Alert onClose={() => {}} severity="error">
                          Confirm password is not equal
                        </Alert>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SaveAltIcon />}
                disabled={
                  !otp ||
                  errors ||
                  !password ||
                  !confirmpassword ||
                  (password && confirmpassword && password !== confirmpassword)
                }
                onClick={() => {
                  resetChangeSubmit({
                    otp,
                    authUserId: passwordResetRequestSuccessData?.authUserId,
                    password,
                    email,
                    username: email,
                  });
                }}
              >
                Reset Password
              </Button>
            </DialogActions>
          </>
        )}
    </React.Fragment>
  );
}
