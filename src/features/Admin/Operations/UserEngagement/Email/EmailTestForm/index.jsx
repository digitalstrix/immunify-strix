import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import {Alert} from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from "@material-ui/icons/Send";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  DialogContent,
  DialogActions,
} from "../../../../../../common/components/Admin/Dialog";
import { selectImageUrl, selectLoading } from '../../selector'
import { selectUser } from "../../../../../User/selector";
import { sendForTestingAsync, uploadImageAsync } from '../../userEngagementSlice';
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
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    checkedA: false,
  });

  const user = useSelector((state) => selectUser(state));

  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const imageUrl = useSelector((state) => selectImageUrl(state));
  const isLoadin = useSelector((state) => selectLoading(state));
  const [imgWidth, setImgWidth] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);

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

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl])

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
          reader.onload = function (e) {
            var img = new Image();
            img.onload = function() {
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


  // const imageUrl = useSelector((state) => selectImageUrl(state));
  // const isLoadin = useSelector((state) => selectLoading(state));

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
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Type your message here...</p>"
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setMessage(data);
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </Grid> */}

                <Grid item xs={imgWidth ? 10 : 12} style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
									<TextField
                  id="image"
                  // label="Image upload"
                  variant="outlined"
                  size="small"
                  name="name"
                  type="file"
                  // placeholder="image url"
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
              </Grid> */}
              {/* <Grid
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
            (selectedFile && ((imgWidth && imgWidth !== 600) || (imgHeight &&imgHeight !== 550)) ) ||
            isLoadin === 'loading'
          }
          onClick={() => {handleSend({ subject, message, image, messageType: 'EMAIL', userId: user.personId  })}}
        >
          Test Send
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
