import React, {useState, useCallback, useMemo, useEffect} from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Switch,
  FormHelperText
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {Alert} from '@material-ui/lab'
import {useSelector, useDispatch} from 'react-redux';
import {
  DialogContent,
  DialogActions,
} from "../../../../common/components/Admin/Dialog";
import * as validationUtils from '../../../../utils/validationUtils';
import { selectUser } from "../../../User/selector";
import { Autocomplete } from "@material-ui/lab";
import {addAdminUserAsync} from '../userManagementSlice';
import {selectCountries, selectUsersIsLoading, selectAddedUsers, selectIsLoadingAdminAdd} from '../selector';

export default function Index() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    checkedA: true,
  });
  const countryList = useSelector((state) => selectCountries(state));
  const country = countryList.map((value => ({lable: value.countryName, value: value.id})))


  const [userGroups, setUserGroups] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [status, setStatus] = useState(null);
  const [countryId, setCountryId] = useState(null);

  
  const selectedUser = useSelector((state) => selectUser(state));

  const permissionGroups = selectedUser?.permissionGroups?.map((data => ({lable: data.name, value: data.id})));
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const formReset = () => {
      setUserGroups([]);
      setFirstName(null);
      setCountryId(null);
      setLastName(null);
      setEmail(null);
      setStatus(null);
  };

  const addUsersHandlers = useCallback((info) => {
    dispatch(addAdminUserAsync(info));
    formReset();
  }, [dispatch]);

  const isValidEmail = useMemo(() => {
    return validationUtils.email_validation(email);
  }, [email]);
  const loadAdd = useSelector((state) => selectIsLoadingAdminAdd(state));

  return (
    <React.Fragment>
      <DialogContent dividers>
        {(loadAdd === 'succeeded') && (
          <Alert onClose={() => {}} severity="success">Registration successfull!</Alert>
        )}
        {(loadAdd === 'failed') && (
          <Alert onClose={() => {}} severity="error">Registration failed!</Alert>
        )}
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="fname"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  name="fname"
                  type="text"
                  required
                  fullWidth
                  onChange = {(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lname"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  name="lname"
                  type="text"
                  required
                  fullWidth
                  onChange = {(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="contact"
                  label="Contact"
                  variant="outlined"
                  size="small"
                  name="contact"
                  type="text"
                  required
                  fullWidth
                  onChange = {(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  name="email"
                  type="email"
                  required
                  fullWidth
                  onChange = {(e) => setEmail(e.target.value)}
                />
                {!isValidEmail && email && (
                  <FormHelperText
                    error={true}
                  >
                    Email is not valid
                  </FormHelperText>
                )}
              </Grid>
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
                  onChange={(event, value) => {setUserGroups(value)}}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Autocomplete
                  id="combo-box-demo"
                  options={country}
                  getOptionLabel={(option) => option.lable}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Select country" variant="outlined" />}
                  onChange={(event, value) => {setCountryId(value.value)}}
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
          startIcon={<AddIcon />}
          disabled={
            !firstName ||
            !lastName ||
            !email ||
            !isValidEmail ||
            !countryId ||
            !contact ||
            userGroups.length === 0
          }

          onClick={() => {
            addUsersHandlers({
              userType: 'ADMIN',
              portalType: 'IMM',
              firstName,
              lastName,
              email,
              username: email,
              contactNumber: contact,
              contact,
              country: countryId,
              userGroups,
              address1: 'address1',
              address2: 'address2',
              city: 'city',
              createdBy: selectedUser.personId,
              status: state ? 'ACTIVE' : 'INACTIVE',
            })
          }}
        >
          Add
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

const userType = [
  { title: "All" },
  { title: "Parents" },
  { title: "Doctors" },
  { title: "Vac Centers" },
];
