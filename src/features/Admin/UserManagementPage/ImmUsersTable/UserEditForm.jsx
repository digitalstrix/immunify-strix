/* eslint-disable array-callback-return */
import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Switch,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import { Autocomplete } from "@material-ui/lab";
import { selectUser } from "../../../User/selector";
import Remove from "../../../../assets/icons/Remove.svg";
import {updateAdminUserAsync} from '../userManagementSlice';
import {selectIsLoadingAdminUpdate} from '../selector';

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

export default function UserEditForm(data) {
  const dispatch = useDispatch();
  const arrayOfGroup = [];

  const { data : rowData } = data;

  const [state, setState] = React.useState({
    checkedA: rowData?.status === "ACTIVE" ? true : false,
  });

  const [status, setStatus] = useState(rowData?.status);

  const selectedUser = useSelector((state) => selectUser(state));

  const permissionGroups = selectedUser?.permissionGroups?.map((data => ({lable: data.name, value: data.id})));

  useMemo(() => {
    permissionGroups && permissionGroups?.forEach((data) => {
      rowData?.groups && rowData?.groups?.forEach((value) => {
        if (data.lable === value) {
          arrayOfGroup.push(data);
        }
      });
    });
  }, [permissionGroups, rowData?.groups]);

  const [groups, setGroups] = useState(arrayOfGroup);
	const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleUpdate = useCallback((info) => {
    dispatch(updateAdminUserAsync(info))
  }, [dispatch]);

  const loadUpdate = useSelector((state) => selectIsLoadingAdminUpdate(state));

	return (
    <React.Fragment>
      <DialogContent dividers>
        <div>
        {(loadUpdate === 'succeeded') && (
          <Alert onClose={() => {}} severity="success">Update successfull!</Alert>
        )}
        {(loadUpdate === 'failed') && (
          <Alert onClose={() => {}} severity="error">Update failed!</Alert>
        )}
      </div>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  size="small"
                  options={permissionGroups}
                  getOptionLabel={(option) => option.lable}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="User Groups"
                      required
                    />
                  )}
                  value={groups}
                  onChange={(event, value) => {setGroups(value)}}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Inactive</Grid>
                    <Grid item>
                      <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </Grid>
                    <Grid item>Active</Grid>
                  </Grid>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<SendIcon />}
          disabled={false}
          onClick={() => {
            handleUpdate({
              createdBy: selectedUser.personId,
              personId: rowData.personId,
              authUserId: rowData.authUserId,
              status: state?.checkedA ? 'ACTIVE' : 'INACTIVE',
              userGroups: groups,
            });
					}}
        >
          Update
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
