import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  FormHelperText,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from "../../../../../common/components/Admin/Dialog";
import { Autocomplete } from "@material-ui/lab";
import {
  selectCountries,
  selectSearchedUser,
  selectImageUrl,
  selectLoading,
} from "../selector";
import { selectUser } from "../../../../User/selector";
import {
  uploadImageAsync,
  getSearchUsers,
  singleMessageAsync,
} from "../userEngagementSlice";
import Remove from "../../../../../assets/icons/Remove.svg";

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

export default function Index(data) {
  const messageType = data.data.messageType;

  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => selectUser(state));
  const countryList = useSelector((state) => selectCountries(state));

  const searchedUser = useSelector((state) => selectSearchedUser(state));

  const country = countryList.map((o) => ({
    lable: o.countryName,
    value: o.id,
  }));

  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [press, setPress] = useState(false);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [isCanSend, setIsCanSend] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const imageUrl = useSelector((state) => selectImageUrl(state));
  const isLoadin = useSelector((state) => selectLoading(state));

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


  const handleSend = useCallback(
    (info) => {
      dispatch(singleMessageAsync(info));
    },
    [dispatch]
  );

  const imageUpload = useCallback(
    (info) => {
      dispatch(uploadImageAsync(info));
    },
    [dispatch]
  );

  const RemoveIcon = (props) => (
    <img src={Remove} width="30" height="30" alt="child info icon" />
  );

  useEffect(() => {
    async function fetchMyAPI() {
      const data = new FormData();
      let width = null;
      let height = null;
      if (selectedFile) {
        var reader = new FileReader();
        reader.onload = await async function (e) {
          var img = new Image();
          img.onload = await function () {
            width = img.width;
            height = img.height;
            setImgHeight(img.height);
            setImgWidth(img.width);
            if (
              (messageType === "PUSHNOTIFICATION" &&
                width != 400 &&
                height != 200) ||
              (messageType === "EMAIL" && width != 600 && height != 550)
            ) {
              setSelectedFile(null);
            } else {
              data.append("profileImage", selectedFile, selectedFile.name);
              imageUpload(data);
            }
            console.log("The width of the image is " + img.width + "px.");
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(selectedFile);
      }
    }

    fetchMyAPI();
  }, [selectedFile]);

  const searchUserHandler = useCallback(
    (info) => {
      dispatch(getSearchUsers(info));
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="countrySelect"
                  options={country}
                  getOptionLabel={(option) => option.lable}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      size="small"
                      required
                    />
                  )}
                  onChange={(event, value) => {
                    setCountryId(value.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="contact"
                  label="Contact Number"
                  variant="outlined"
                  size="small"
                  name="name"
                  type="text"
                  fullWidth
                  onChange={(e) => setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  name="name"
                  type="text"
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                  disabled={(!contact && !email) || !countryId}
                  onClick={() => {
                    searchUserHandler({
                      contact,
                      email,
                      countryId,
                    });
                    setPress(true);
                  }}
                >
                  Search
                </Button>
              </Grid>
              {!searchedUser && press && (
                <Grid item xs={12}>
                  <Alert severity="error">Not found!</Alert>
                </Grid>
              )}
              {searchedUser && (
                <Grid item container xs={12} spacing={3}>
                  <Grid item xs={12}> <Typography> <Box fontWeight='bold'>Full Name: {searchedUser.firstName + " " + searchedUser.lastName + " "}</Box></Typography> </Grid>
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
                      onChange={(e) => setSubject(e.target.value)}
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
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={imgWidth ? 10 : 12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id="image"
                      variant="outlined"
                      size="small"
                      name="name"
                      type="file"
                      required
                      fullWidth
                      onChange={async (e) => {
                        await setSelectedFile(e.target.files[0]);
                      }}
                    />
                  </Grid>
                  {(imgWidth || imgHeight) && (
                    <Grid
                      item
                      xs={2}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        disabled={false}
                        color="inherit"
                        onClick={() => {
                          setImgWidth(null);
                          setImgHeight(null);
                          setSelectedFile(null);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    {((messageType == "PUSHNOTIFICATION" &&
                      ((imgWidth && imgWidth != 400) ||
                        (imgHeight && imgHeight != 200))) ||
                      (messageType == "EMAIL" &&
                        ((imgWidth && imgWidth != 600) ||
                          (imgHeight && imgHeight != 550)))) && (
                      <FormHelperText>
                        Acceptable Width : 300px height: 500px for notification
                        && 600px height: 550px for emalis
                      </FormHelperText>
                    )}
                    {((messageType == "PUSHNOTIFICATION" &&
                      ((imgWidth && imgWidth != 400) ||
                        (imgHeight && imgHeight != 200))) ||
                      (messageType == "EMAIL" &&
                        ((imgWidth && imgWidth != 600) ||
                          (imgHeight && imgHeight != 550)))) && (
                      <Alert
                        onClose={() => {
                          setImgWidth(null);
                          setImgHeight(null);
                          setSelectedFile(null);
                        }}
                        severity="error"
                      >
                        Image size is not acceptable!
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<SendIcon />}
          disabled={
            !subject ||
            !message ||
            isLoadin === "loading" ||
            !countryId ||
            !selectedFile ||
            !searchedUser ||
            !isCanSend
          }
          onClick={() => {
            handleSend({
              messageType: messageType,
              message,
              image: imageUrl,
              mode: "SENT",
              countryId,
              subject,
              email: searchedUser.email,
              fcm_token: searchedUser.fcmToken,
              fcmToken: searchedUser.fcmToken,
              firstName: searchedUser.firstName,
              lastName: searchedUser.lastName,
              userId: searchedUser.userId,
              description: message,
            });
          }}
        >
          Send
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
