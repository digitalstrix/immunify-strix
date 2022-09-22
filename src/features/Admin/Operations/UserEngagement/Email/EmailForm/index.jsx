import React, { useEffect, useCallback, useState, useMemo } from "react";
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
import Remove from "../../../../../../assets/icons/Remove.svg";


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

export default function Index() {
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const [uType, setuType] = React.useState("");
  const [pType, setpType] = React.useState(null);
  const [psType, setpsType] = React.useState(null);

  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => selectUser(state));
  const countryList = useSelector((state) => selectCountries(state));

  const [selectedFile, setSelectedFile] = useState(null);
  const imageUrl = useSelector((state) => selectImageUrl(state));
  const isLoadin = useSelector((state) => selectLoading(state));

  const country = countryList.map((data => ({lable: data.countryName, value: data.id})))

  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [ageFromMonth, setAgeFromMonth] = useState(null);
  const [ageToMonth, setAgeToMonth] = useState(null);
  const [days, setDays] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [isCanSend, setIsCanSend] = useState(true);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const formReset = () => {
      setSubject(null);
      setMessage(null);
      setCountryId(null);
      setSelectedFile(null);
      setAgeFromMonth(null);
      setAgeToMonth(null);
      setDays(null);
  };

  const handleAllSend = useCallback(
    (info) => {
      dispatch(sendForAllAsync(info));
      formReset();
    },
    [dispatch],
  )

  const handleAllCountrySend = useCallback(
    (info) => {
      dispatch(sendToAllCountryAsync(info))
      formReset();
    },
    [dispatch],
  )

  const handleParentSend = useCallback(
    (info) => {
      dispatch(sendToParentAsync(info))
      formReset();
    },
    [dispatch],
  )

  const handleDraft = useCallback(
    (info) => {
      dispatch(draftMessagesAsync(info))
      formReset();
    },
    [dispatch],
  )

  const imageUpload = useCallback(
    (info) => {
      dispatch(uploadImageAsync(info))
    },
    [dispatch],
  )

  const RemoveIcon = (props) => (
    <img src={Remove} width="30" height="30" alt="child info icon" />
  );
  
  const selectSubCategoryList = (pType) => {
    if (pType === 'ALL') {
      return parentSubCategoryAll;
    } else if (pType === 'FREEPLAN' || pType === 'QR') {
      return parentSubCategoryFreeQr;
    } else if (pType === 'PREMIUMPLAN') {
      return parentSubCategoryPremium;
    } else if (pType === 'EXPIRED') {
      return parentSubCategoryEx;
    }
  }

  useMemo(() => {
    let length = 0;
    selectedUser?.my_group?.forEach((data) => {
      if (data.groupName === 'operations_user') {
        setIsCanSend(false);
      }
      ++length;
      if (length === selectedUser?.my_group?.length) {
        return true;
      }
    });
  }, [selectedUser]);

  useEffect(() => {
		async function fetchMyAPI() {
      const data = new FormData();
      let width = null;
      let height = null;
      if (selectedFile) {
        var reader = new FileReader();
          reader.onload = await async function (e) {
            var img = new Image();
            img.onload = await function() {
              width = img.width;
              height = img.height;
              setImgHeight(img.height);
              setImgWidth(img.width);
              if (width !== 600 || height !== 550) {
                setSelectedFile(null);
              } else {
                data.append(
                  'profileImage',
                  selectedFile,
                  selectedFile.name
                )
                imageUpload(data);
              }
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(selectedFile);
          
      }
    }

    fetchMyAPI()
	}, [selectedFile])

  useEffect(() => {
    if (uType !== 'PARENT') {
      setpType(null);
      setpsType(null);
    }
  }, [uType])

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
                    onChange={(event, value) => setpType(value?.value)}
                  />
                </Grid>
              ) : null}
              {(pType !== null && pType !== '') ? (
                <Grid item xs={12}>
                  <Autocomplete
                      id="parentSubCategory"
                      options={selectSubCategoryList(pType)}
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
                    required
                    fullWidth
                    onChange={(e) => setDays(e.target.value)}
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
                    required
                    fullWidth
                    onChange={(e) => setDays(e.target.value)}
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
                    fullWidth
                    onChange={(e) => setAgeFromMonth(e.target.value)}
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
                  required
                  fullWidth
                  inputProps={{ maxLength: 2500}}
                  onChange = {(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item xs={imgWidth ? 10 : 12} style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
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
                {(imgWidth || imgHeight) && (
                <Grid item xs={2} style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
                  <IconButton
                        disabled={false}
                        color="inherit"
                        onClick={() => {
                          setImgWidth(null);
                          setImgHeight(null);
                          setSelectedFile(null);
                        }}>
                      <RemoveIcon />
                  </IconButton>
                </Grid>
                )}
              <Grid item xs={12}>
                {((imgWidth && imgWidth !== 600) || (imgHeight &&imgHeight !== 550)) && (
                  <FormHelperText>
                    Acceptable Width : 600px height: 550px
                  </FormHelperText>
                )}
                {((imgWidth && imgWidth !== 600) || (imgHeight &&imgHeight !== 550)) && (
                  <Alert onClose={() => {
                    setImgWidth(null);
                    setImgHeight(null);
                    setSelectedFile(null);
                  }} severity="error">Image size is not acceptable!</Alert>
                )}
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
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" endIcon={<SaveAltIcon /> }
          disabled = {
            !subject ||
            !message ||
            (selectedFile && ((imgWidth && imgWidth !== 600) || (imgHeight &&imgHeight !== 550)) ) ||
            isLoadin === 'loading'
          }
          onClick={() => {
            handleDraft({
              usersType: uType,
              messageType: 'EMAIL',
              message,
              image: imageUrl,
              parentSubscriptionPlan: pType,
              parentSubCategory: psType,
              ageFromMonth,
              ageToMonth,
              days,
              mode: 'DRAFT',
              countryId,
              subject,
            })
          }}
        >
          Save as Draft
        </Button>
        {(isCanSend) && (
          <Button variant="contained" color="secondary" endIcon={<SendIcon />}
          disabled = {
            !subject ||
            !message ||
            (selectedFile && ((imgWidth && imgWidth !== 600) || (imgHeight &&imgHeight !== 550)) && imageUrl ) ||
            isLoadin === 'loading'
          }
          onClick={() => {
            if (countryId && uType !== 'PARENTS') {
              handleAllCountrySend({
                usersType: uType,
                messageType: 'EMAIL',
                message,
                image: imageUrl,
                parentSubscriptionPlan: pType,
                parentSubCategory: psType,
                ageFromMonth: parseInt(ageFromMonth),
                ageToMonth: parseInt(ageToMonth),
                days: parseInt(days),
                mode: 'SENT',
                countryId,
                subject,
              })
            } else if (!countryId && uType !== 'PARENTS') {
              handleAllSend({
                usersType: uType,
                messageType: 'EMAIL',
                message,
                image: imageUrl,
                parentSubscriptionPlan: pType,
                parentSubCategory: psType,
                ageFromMonth: parseInt(ageFromMonth),
                ageToMonth: parseInt(ageToMonth),
                days: parseInt(days),
                mode: 'SENT',
                subject,
              })
            } else if (uType === 'PARENTS') {
              handleParentSend({
                usersType: uType,
                messageType: 'EMAIL',
                message,
                image: imageUrl,
                parentSubscriptionPlan: pType,
                parentSubCategory: psType,
                ageFromMonth: parseInt(ageFromMonth),
                ageToMonth: parseInt(ageToMonth),
                days: parseInt(days),
                mode: 'SENT',
                countryId,
                subject,
              })
            }
          }}
        >
          Send
        </Button>
        )}
        
      </DialogActions>
    </React.Fragment>
  );
}

const userType = [
  { title: "ALL" },
  { title: "PARENTS" },
  { title: "DOCTORS" },
  { title: "VACCENTERS" },
  { title: "NEWS LETTERT SUBSCRIBERS" },
];

const parentCategory = [
  { title: "FREE PLAN", value: "FREEPLAN" },
  { title: "PREMIUM PLAN", value: "PREMIUMPLAN" },
  { title: "EXPIRED", value: "EXPIRED"  },
  { title: "QR", value: "QR" },
  { title: "ALL", value: "ALL" },
];

// don't change this titles

const parentSubCategoryAll = [
  { title: "With No profile pictures", value: "With No profile pictures"},
  // { title: "With no Milestone Updates", value: "With no Milestoe Updates" },
  { title: "With no Growth updates", value: "With no Growth updates" },
  { title: "With premium expiration within", value: "With premium expiration within" },
  { title: "With Premium already Expired", value: "With Premium already Expired" },
  { title: "No Children", value: "No childern" },
  { title: "With Children", value: "With Childern" },
]

const parentSubCategoryFreeQr = [
  { title: "With No profile pictures", value: "With No profile pictures" },
  // { title: "With no Milestone Updates", value: "With no Milestoe Updates" },
  { title: "With no Growth updates", value: "With no Growth updates" },
  { title: "With Children", value: "With Childern" },
]

const parentSubCategoryPremium = [
  { title: "With No profile pictures", value: "With No profile pictures" },
  // { title: "With no Milestone Updates", value: "With no Milestoe Updates" },
  { title: "With no Growth updates", value: "With no Growth updates"},
  { title: "With premium expiration within", value: "With premium expiration within" },
  { title: "With Children", value: "With Childern" },
]

const parentSubCategoryEx = [
  { title: "With No profile pictures", value: "With No profile pictures" },
  // { title: "With no Milestone Updates", value: "With no Milestoe Updates" },
  { title: "With no Growth updates", value: "With no Growth updates" },
  { title: "With Premium already Expired", value: "With Premium already Expired"  },
  { title: "With Childern", value: "With Childern" },
]

