/* eslint-disable no-unused-vars */
import React, { PropTypes, useEffect, useCallback, useState } from "react";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SendIcon from "@material-ui/icons/Send";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from "../../../../../../common/components/Admin/Dialog";
import { Autocomplete } from "@material-ui/lab";
import { selectCountries, selectImageUrl, selectLoading } from '../../selector';
import { selectUser, selectUserLoadingStatus } from "../../../../../User/selector";
import { sendForTestingAsync, uploadImageAsync } from '../../userEngagementSlice';
import Remove from "../../../../../../assets/icons/Remove.svg";

// userId, description, notificationType, image, subject, message, messageType,

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
  const dispatch = useDispatch();

  const countryList = useSelector((state) => selectCountries(state));
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const user = useSelector((state) => selectUser(state));

  const [uType, setuType] = React.useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const imageUrl = useSelector((state) => selectImageUrl(state));
  const isLoadin = useSelector((state) => selectLoading(state));

  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSend = useCallback(
    (info) => {
      dispatch(sendForTestingAsync(info));
      setSubject(null);
      setMessage(null);
      setImage(null);
      setSelectedFile(null);
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
              if (width !== 400 || height !== 200) {
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
	}, [selectedFile]);
  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
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
              {uType === "Parents" ? (
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
                  />
                </Grid>
              ) : null} */}

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
                  // required
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
                {((imgWidth && imgWidth !== 400) || (imgHeight &&imgHeight !== 200)) && (
                  <FormHelperText>
                    Acceptable Width : 600px height: 560px
                  </FormHelperText>
                )}
                {((imgWidth && imgWidth !== 400) || (imgHeight &&imgHeight !== 200)) && (
                  <Alert onClose={() => {
                    setImgWidth(null);
                    setImgHeight(null);
                    setSelectedFile(null);
                  }} severity="error">Image size is not acceptable!</Alert>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                    />
                  }
                  label="Test before send"
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: state.checkedA ? "block" : "none" }}
              >
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  size="small"
                  required
                  fullWidth
                />
              </Grid> */}
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" endIcon={<SendIcon />}
          disabled = {
            !subject ||
            !message ||
            (selectedFile && ((imgWidth && imgWidth !== 400) || (imgHeight &&imgHeight !== 200)) && imageUrl ) ||
            isLoadin === 'loading'
          }
          onClick={() => {handleSend({ subject, message, image: imageUrl, messageType: 'PUSHNOTIFICATION', userId: user.personId })}}
        >
          Test Send
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

const countryAble = [
  { title: 'All' }
]

const userType = [
  { title: "All" },
  { title: "Parents" },
  { title: "Doctors" },
  { title: "Vac Centers" },
];

const parentCategory = [
  { title: "For Premium" },
  { title: "For Free" },
  { title: "For Parents with 1 to 3 months old" },
];
