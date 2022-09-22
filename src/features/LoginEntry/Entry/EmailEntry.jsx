import React, {useEffect, useCallback, useState} from 'react'
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
import {Alert} from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from "@material-ui/icons/Send";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from '../../../common/components/Admin/Dialog';
import { Autocomplete } from "@material-ui/lab";
import {email_validation} from '../../../utils/validationUtils';
import {entryEmailAsync} from '../loginEntrySlice';

const countries = [
  {
    label: "Sri Lanka",
    value: 193,
  },
  {
    label: 'India',
    value: 92,
  }
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


export default function EmailEntry() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState(false);

  const deviceId = localStorage.getItem('deviceId');

  const hasErrors = (email_values) => {
    if (email_values && email_values !== '') {
      if (email_validation(email_values)) {
        setErrors(false);
      } else {
        setErrors(true);
      }
    } else {
      setErrors(false);
    }
  };

  const handleSubmit = useCallback((info) => {
    setEmail(null);
    setPassword(null);
    dispatch(entryEmailAsync(info));
  }, [dispatch]);

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={2}>
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
                    hasErrors(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {errors && (
                  <Alert onClose={() => {
                  }} severity="error">Email not valid</Alert>
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
            </Grid>
          </Box>
        </form>
      </DialogContent>

      <DialogActions>
        <Grid>
        <Button variant="outlined" color="secondary" endIcon={<SaveAltIcon /> }
          disabled = {
            !email || !password || errors || email == ''
          }
          onClick={() => {
            handleSubmit({
              email,
              username: email,
              password,
              deviceId,
            });
          }}
        >
          Login
        </Button>
        </Grid>
      </DialogActions>
      
    </React.Fragment>
  )
};
