import React, { useEffect, useCallback, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from "@material-ui/icons/Send";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from "../../../../../../common/components/Admin/Dialog";
import { Autocomplete } from "@material-ui/lab";
import { selectCountries, selectImageUrl, selectLoading } from '../../selector';
import { selectUser } from "../../../../../User/selector";
import {
  sendForAllAsync,
  sendToAllCountryAsync,
  sendToParentAsync,
  draftMessagesAsync,
  uploadImageAsync
} from '../../userEngagementSlice';


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

export default function ApproveEmail(data) {

  const rowData = data.data;
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const [uType, setuType] = React.useState(rowData.usersType ? rowData.usersType : '');
  const [pType, setpType] = React.useState(rowData.parentSubscriptionPlan ? rowData.parentSubscriptionPlan : null);
  const [psType, setpsType] = React.useState(rowData.parentSubCategory ? rowData.parentSubCategory : null);

  const dispatch = useDispatch();

  const countryList = useSelector((state) => selectCountries(state));

  const country = countryList.map((o => ({lable: o.countryName, value: o.id})));
  const [subject, setSubject] = useState(rowData.subject ? rowData.subject : null);
  const [message, setMessage] = useState(rowData.message ? rowData.message : null);
  const [image, setImage] = useState(rowData.image ? rowData.image : null);
  const [countryId, setCountryId] = useState(rowData.countryId ? rowData.countryId : null);
  const [ageFromMonth, setAgeFromMonth] = useState(rowData.ageFromMonth ? rowData.ageFromMonth : null);
  const [ageToMonth, setAgeToMonth] = useState(rowData.ageToMonth ? rowData.ageToMonth : null);
  const [days, setDays] = useState(rowData.days ? rowData.days : null);

  const [selectedFile, setSelectedFile] = useState(null);
  const imageUrl = useSelector((state) => selectImageUrl(state));
  const isLoadin = useSelector((state) => selectLoading(state));

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleAllSend = useCallback(
    (info) => {
      dispatch(sendForAllAsync(info))
    },
    [dispatch],
  )

  const handleAllCountrySend = useCallback(
    (info) => {
      dispatch(sendToAllCountryAsync(info))
    },
    [dispatch],
  )

  const handleParentSend = useCallback(
    (info) => {
      dispatch(sendToParentAsync(info))
    },
    [dispatch],
  )

  const imageUpload = useCallback(
    (info) => {
      dispatch(uploadImageAsync(info))
    },
    [dispatch],
  )

  useEffect(() => {
		async function fetchMyAPI() {
      const data = new FormData();
    if (selectedFile) {

      data.append(
        'profileImage',
        selectedFile,
        selectedFile.name
      )
      imageUpload(data);
    }
    }

    fetchMyAPI()
	}, [selectedFile])

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  id="usertype"
                  options={userType}
                  getOptionLabel={(option) => option.title}
                  fullWidth
                  size="small"
                  onChange={(event, value) => setuType(value.title)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select User Type"
                      variant="outlined"
                    />
                  )}
									defaultValue={{title: uType}}
                />
              </Grid>
              {uType === "PARENTS" ? (
                <Grid item xs={12}>
                  <Autocomplete
                    id="parentCategory"
                    options={parentCategory}
                    getOptionLabel={(option) => option.title}
                    fullWidth
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Parent Category"
                        variant="outlined"
                      />
                    )}
                    onChange={(event, value) => setpType(value.title)}
										defaultValue={{title: pType}}
                  />
                </Grid>
              ) : null}
              {(pType !== null && pType !== '') ? (
                <Grid item xs={12}>
                  <Autocomplete
                    id="parentSubCategory"
                    options={parentSubCategory}
                    getOptionLabel={(option) => option.title}
                    fullWidth
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Parent sub Category"
                        variant="outlined"
                      />
                    )}
                    onChange={(event, value) => setpsType(value?.value)}
										defaultValue={{title: psType}}
                  />
                </Grid>
              ): null}

              {(psType !== null && psType === 'With premium expiration within') ? (
                <Grid item xs={12}>
                  <TextField
                    id="days"
                    label="Days"
                    variant="outlined"
                    size="small"
                    name="name"
                    type="text"
										value={days}
                    required
                    fullWidth
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  />
                </Grid>
              ) : (psType !== null && psType === 'With Premium already Expired') ? (
                <Grid item xs={12}>
                  <TextField
                    id="days"
                    label="Days"
                    variant="outlined"
                    size="small"
                    name="name"
                    type="text"
										value={days}
                    required
                    fullWidth
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  />
                </Grid>
              ) : (psType !== null && psType === 'With Childern') ? (
                    <>
                <Grid item xs={12}>
                  <TextField
                    id="ageFromMonth"
                    label="Age from month"
                    variant="outlined"
                    size="small"
                    name="name"
                    type="text"
                    required
										value={ageFromMonth}
                    fullWidth
                    onChange={(e) => setAgeFromMonth(parseInt(e.target.value))}
                  />
                      </Grid>
                      <Grid item xs={12}>
                  <TextField
                    id="ageToMonth"
                    label="Age to month"
                    variant="outlined"
                    size="small"
                    name="name"
                    type="text"
										value={ageToMonth}
                    required
                    fullWidth
                    onChange={(e) => setAgeToMonth(e.target.value)}
                  />
                </Grid>
                    </>
              ) : null}
              
              <Grid item xs={12}>
                <TextField
                  id="subject"
                  label="Subject"
                  variant="outlined"
                  size="small"
                  name="name"
                  type="text"
									value={subject}
                  required
                  fullWidth
                  onChange = {(e) => setSubject(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  label="Type your message"
                  variant="outlined"
                  multiline
                  rows={4}
                  size="small"
                  name="message"
                  type="text"
									value={message}
                  required
                  fullWidth
                  onChange = {(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="image"
                  variant="outlined"
                  size="small"
                  name="name"
                  type="file"
                  required
                  fullWidth
                  onChange = {(e) => {
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                    />
                  }
                  label="For specific country"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: state.checkedA ? "block" : "none" }}
              >
                <Autocomplete
                  id="combo-box-demo"
                  options={country}
                  getOptionLabel={(option) => option.lable}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Select country" variant="outlined" />}
                  onChange={(event, value) => {setCountryId(value.value)}}
									defaultValue={{value: countryId}}
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" endIcon={<SendIcon />}
          disabled = {
            !subject ||
            !message ||
            isLoadin === 'loading'
          }
          onClick={() => {
            if (countryId && uType !== 'PARENTS') {
              handleAllCountrySend({
								messageId: rowData.id,
                usersType: uType,
                messageType: 'EMAIL',
                message,
                image: imageUrl ? imageUrl : image,
                parentSubscriptionPlan: pType,
                parentSubCategory: psType,
                ageFromMonth,
                ageToMonth,
                days,
                mode: 'SENT',
                countryId,
                subject,
              })
            } else if (!countryId && uType !== 'PARENTS') {
              handleAllSend({
								messageId: rowData.id,
                usersType: uType,
                messageType: 'EMAIL',
                message,
                image: imageUrl ? imageUrl : image,
                parentSubscriptionPlan: pType,
                parentSubCategory: psType,
                ageFromMonth,
                ageToMonth,
                days,
                mode: 'SENT',
                subject,
              })
            } else if (uType === 'PARENTS') {
              handleParentSend({
								messageId: rowData.id,
                usersType: uType,
                messageType: 'EMAIL',
                message,
                image: imageUrl ? imageUrl : image,
                parentSubscriptionPlan: pType,
                parentSubCategory: psType,
                ageFromMonth,
                ageToMonth,
                days,
                mode: 'SENT',
                countryId,
                subject,
              })
            }
          }}
        >
          Approve & Send
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

const userType = [
  { title: "ALL" },
  { title: "PARENTS" },
  { title: "DOCTORS" },
  { title: "VACCENTERS" },
  // { title: "INDIVIDUAL" },
];

const parentCategory = [
  { title: "FREEPLAN" },
  { title: "PREMIUMPLAN" },
  { title: "EXPIRED" },
  { title: "QR" },
];

// don't change this titles
const parentSubCategory = [
  { title: "With No profile pictures", value: "With No profile pictures" },
  // { title: "With no Milestone Updates", value: "With no Milestoe Updates" },
  { title: "With no Growth updates", value: "With no Growth updates" },
  { title: "With premium expiration within", value: "With premium expiration within"  },
  { title: "With Premium already Expired", value: "With Premium already Expired" },
  { title: "No children", value: "No childern" },
  { title: "With children", value: "With Childern" },
]
