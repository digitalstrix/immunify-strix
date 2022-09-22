import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  ButtonBase,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { countryToFlag, getSelectedFileByElementId } from '../../../../utils/commonUtils';
import {
  validateFormInput,
  generateCreateTemplatePayload,
  generateVacScheduleFormErrors,
  validateCreateTemplatePayload
} from '../../../../utils/manageTemplateUtils';
// import { selectCountries, selectVacNames } from '../selector';
import { DialogContent, DialogActions } from '../../../../common/components/Admin/Dialog';
import { uploadArtwork, addArtwork, updateArtWork, getSignedUrls } from '../manageTemplateSlice';
import { getVacCenters } from '../../VaccinationCentersPage/vacCenterSlice';
import { selectVacCenters, selectArtworkDetails } from '../selector';

import image_front from "../../../../assets/img/placeholder_front.png";
import image_back from "../../../../assets/img/placeholder_back.png";

const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 15,
    "& > span": {
      fontSize: 18,
    },
  },

  input: {
    display: "none",
  },

  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const ARTWORK_TYPES = [
  { label: 'Generic', value: 'GENERIC', },
  { label: 'Generic Small', value: 'GENERIC_SMALL', },
  { label: 'Custom with Logo', value: 'CUSTOM_WITH_LOGO', },
];

const INITIAL_INPUTS = {
  templateId: null,
  templateName: '',
  description: '',
  country: '',
  artworkType: '',
  frontImage: '',
  backImage: '',
  center: ''
};

const TEXT_INPUTS_META = [
  { key: 'templateName', defaultValue: '' },
  { key: 'description', defaultValue: '' },
  { key: 'frontImage', defaultValue: '' },
  { key: 'backImage', defaultValue: '' },
  { key: 'artworkType', defaultValue: ARTWORK_TYPES[0] }
];

const FRONT_IMAGE_INPUT_ID = 'contained-button-file-front';
const BACK_IMAGE_INPUT_ID = 'contained-button-file-back';

const FRONT_IMAGE_PREVIEW_ID = 'front-preview';
const BACK_IMAGE_PREVIEW_ID = 'back-preview';

const IMG_WIDTH = 313;
const IMG_HEIGHT = 201;

const handleFileSelect = (fileInputId, imageId, stateUpdater) => {
  const image = getSelectedFileByElementId(fileInputId);
  stateUpdater(image);                      
  if (image) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const element = document.getElementById(imageId);
      if (element) {  
        element.setAttribute('src', e.target.result);
        element.setAttribute('width', IMG_WIDTH);
        element.setAttribute('height', IMG_HEIGHT);
      }
    };

    reader.readAsDataURL(image);
  }
}


const initialInputs = ({ data, countryMap = new Map(), centersMap = new Map() }) => {
  if (data) {
    const inputs = TEXT_INPUTS_META.map(({ key, defaultValue }) => ({ [key]: data[key] || defaultValue }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});
    inputs.country = countryMap.get(data.countryId);
    inputs.templateId = data.id ? data.id : null;
    if (data.vacId) {
      inputs.center = centersMap.get(data.vacId);
    }
    return inputs; 
  }
  return INITIAL_INPUTS;
}



const Index = (props) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState(initialInputs(props));

  const [errors, setErrors] = useState({});

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const artworkDetails = useSelector(selectArtworkDetails);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value }}) => {
    setInputs({
      ...inputs,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: validateFormInput({ name, value })
    })
  };

  useEffect(() => {
    if (props.data) {
      const { id, frontImage, backImage } = props.data;
      if (!artworkDetails[id]) {
        dispatch(getSignedUrls({
          id,
          keys: [
            frontImage,
            backImage
          ]
        }));
      }
    }
  }, [props.data, artworkDetails, dispatch]);


  const selectedCenters = useMemo(() => {
    if (inputs.country) {
      return props.vacCenters.filter(({ country }) => country === inputs.country.id);
    }
    return [];
  }, [inputs.country, props.vacCenters]);

  const renderPreview = (elementId, inputValue, artworkDetails, { data }, index) => {
    if (!data || inputValue) {
      return <img id={elementId} src="#" alt="Card preview" />
    }
    const { id } = data;
    if (!artworkDetails[id]) {
      return <CircularProgress />;
    }
    return <img src={artworkDetails[id][index]} alt="Card preview" className={classes.image} />
  };

  return (
    <React.Fragment>
      <DialogContent dividers>        
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  id="template_name"
                  label="Template Name"
                  variant="outlined"
                  name="templateName"                  
                  value={inputs.templateName}
                  error={!!errors.templateName}
                  helperText={errors.templateName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {/* <Autocomplete
                  id="temp_type"
                  options={ARTWORK_TYPES}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  value={inputs.artworkType}
                  onChange={(e, value) => {
                    handleChange({
                      target: { name: 'artworkType', value }
                    })
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Template Type"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                /> */}
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="template_description"
                  label="Template Description"
                  variant="outlined"
                  name="description"
                  value={inputs.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  disabled={false}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
              <Autocomplete
                  id="country-select-demo"
                  options={props.countries}
                  classes={{
                    option: classes.option,
                  }}
                  value={inputs.country}
                  autoHighlight
                  fullWidth
                  getOptionLabel={(option) => option.countryName}
                  onChange={(e, value) => {
                    handleChange({
                      target: { name: 'country', value },
                    });
                    if (value && (!inputs.country || value.id !== inputs.country.id)) {
                      dispatch(getVacCenters({ country: value.id }));
                    }
                  }}
                  renderOption={(option) => (
                    <React.Fragment>
                      <span>{countryToFlag(option.countryCode)}</span>
                      {option.countryName} ({option.countryCode})
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      required
                      fullWidth
                      error={!!errors.country}
                      helperText={errors.country}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  id="vac_center"
                  options={selectedCenters}
                  getOptionLabel={(option) => option.name || ''}
                  fullWidth
                  value={inputs.center}
                  onChange={(e, value) => {
                    handleChange({ target: { name: 'center', value }});
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vaccination Center"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id={FRONT_IMAGE_INPUT_ID}
                  multiple
                  type="file"
                  onChange={() => handleFileSelect(FRONT_IMAGE_INPUT_ID, FRONT_IMAGE_PREVIEW_ID, setFrontImage)}
                />
                <label htmlFor={FRONT_IMAGE_INPUT_ID}>
                  <ButtonBase
                    component="span"
                    focusRipple
                    key="card_front"
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                      width: "100%",
                    }}
                  >
                    {!frontImage && !props.data &&
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image_front})`,
                        }}
                      />
                    }
                    {renderPreview(FRONT_IMAGE_PREVIEW_ID, frontImage, artworkDetails, props, 0)}
                    {/* <img id={FRONT_IMAGE_PREVIEW_ID} src="#" alt="front selected" /> */}
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                      >
                        Upload Front Image
                        <span className={classes.imageMarked} />
                      </Typography>
                    </span>
                  </ButtonBase>
                </label>
              </Grid>
              <Grid item xs={6}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id={BACK_IMAGE_INPUT_ID}
                  multiple
                  type="file"
                  onChange={() => handleFileSelect(BACK_IMAGE_INPUT_ID, BACK_IMAGE_PREVIEW_ID, setBackImage)}
                />
                <label htmlFor={BACK_IMAGE_INPUT_ID}>
                  <ButtonBase
                    component="span"
                    focusRipple
                    key="card_front"
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                      width: "100%",
                    }}
                  >
                    {
                      !backImage && !props.data &&
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image_back})`,
                        }}
                      />
                    }
                    {/* <img id={BACK_IMAGE_PREVIEW_ID} src="#" alt="back selected" /> */}
                    {renderPreview(BACK_IMAGE_PREVIEW_ID, backImage, artworkDetails, props, 1)}
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                      >
                        Upload Back Image
                        <span className={classes.imageMarked} />
                      </Typography>
                    </span>
                  </ButtonBase>
                </label>
              </Grid>
            </Grid>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => props.handleClose()}
          disabled={false}
          color="primary"
          variant="outlined"
        >
          Close 
        </Button>
        <Button
          autoFocus
          onClick={() => {
            const payload = generateCreateTemplatePayload(inputs, { frontImage, backImage });
            if (validateCreateTemplatePayload(payload)) {
              const requestPayload = {
                processed: payload,
                frontImage,
                backImage
              }
              if (!props.data) {
                dispatch(addArtwork(requestPayload));
              } else {
                requestPayload.data = props.data;
                dispatch(updateArtWork(requestPayload));
              }
            } else {
              const errors = generateVacScheduleFormErrors(inputs);
              console.log(errors);
              setErrors(errors);
            }
          }}
          type='button'
          color="primary"
          variant="contained"
          disabled={props.disableAction}
        >
          {props.dialogactiontitle}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default Index;
