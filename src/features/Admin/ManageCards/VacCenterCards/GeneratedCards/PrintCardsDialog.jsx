import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  FormControlLabel,
  makeStyles,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Button,
} from "@material-ui/core";
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";

import image_front from "../../../../../assets/img/placeholder_front.png";
import image_back from "../../../../../assets/img/placeholder_back.png";

import { DialogContent, DialogActions } from '../../../../../common/components/Admin/Dialog';

import { selectArtworkDetails } from '../../selector';
import { setPdfUrl, printCards } from '../../mangeCardsSlice';
import { getSignedUrls } from '../../../ManageTemplates/manageTemplateSlice';

const useStyles = makeStyles((theme) => ({
  image: {
    position: "relative",
    height: 300,
    objectFit: "cover",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
  },
}));

const optionMultiplier = 100;

const generateQuantityOptions = (remainingCount) => {
  if (remainingCount <= optionMultiplier) {
    return [remainingCount];
  }
  const options = [];
  for (let i = optionMultiplier; i < remainingCount; i = i + optionMultiplier) {
    options.push(i);
  }
  options.push(remainingCount);
  return options;
};

const initArtworks = ({ artworks }) => artworks && artworks.length > 0 ? artworks[0] : null;

const PrintCardsDialog = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("Country_Wise");


  const quantityOptions = useMemo(() => {
    return generateQuantityOptions(props.batch.remainingCount);
  }, [props.batch.remainingCount]);

  const [quantity, setQuantity] = useState(quantityOptions[0]);
  const [artwork, setArtwork] = useState(initArtworks(props));

  const artworkDetails = useSelector(selectArtworkDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (artwork && !artworkDetails[artwork.id]) {
      dispatch(getSignedUrls({
        id: artwork.id,
        keys: [
          artwork.frontImage,
          artwork.backImage
        ]
      }));
    }
  }, [artworkDetails, artwork, dispatch]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const renderPreview  = (artwork, artworkDetails) => {
    if (!artwork) {
      return null;
    }
    const { id } = artwork;
    const details=  artworkDetails[id];

    return (
      <React.Fragment>
        <Grid item xs={6}>
          {
            !details ? <CircularProgress /> : <img src={details[0]} alt="Card Front" className={classes.image} />
          }          
        </Grid>
        <Grid item xs={6}>
          {
            !details ? <CircularProgress /> : <img src={details[1]} alt="Card Back" className={classes.image} />
          }
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <Box p={3}>
            <Grid container row spacing={3}>
              {/* <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Artwork selection option</FormLabel>
                  <RadioGroup
                    row
                    aria-label="option"
                    name="option"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Country_Wise"
                      control={<Radio color="primary" />}
                      label="Country wise"
                    />
                    <FormControlLabel
                      value="application_center_wise"
                      control={<Radio color="primary" />}
                      label="Application Center Wise"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="select_artwork"
                  options={props.artworks}
                  onChange={(e, value) => setArtwork(value)}
                  getOptionLabel={(option) => option.templateName || ''}
                  value={artwork || ''}
                  disableClearable
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Artwork"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                    id="select_quantity"
                    options={quantityOptions}
                    getOptionLabel={(option) => `${option}`}
                    onChange={(e, value) => setQuantity(value)}
                    value={quantity}
                    disableClearable
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Quantity"
                        variant="outlined"
                      />
                    )}
                  />
              </Grid>
              {renderPreview(artwork, artworkDetails)}
            </Grid>
            {
              props.pdfUrl && <Grid container row spacing={3}>
                {props.pdfUrl.map((url, index) => (
                  <React.Fragment>
                    <a href={url} title={`Download Batch ${index}`} download={'cards.pdf'}>
                      {`Download Batch ${index}`}
                    </a>
                    <p>&nbsp;&nbsp;&nbsp;</p>
                  </React.Fragment>
                ))}
              </Grid>
            }            
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => props.handleClose()}
          color="primary"
          variant="outlined"
        >
          Close 
        </Button>
        {
          !props.pdfUrl && 
          <Button
            autoFocus
            onClick={() => {
              if (artwork && artwork.id) {
                const payload = {
                  vacId: props.vacId,
                  quantity,
                  artwork: artwork.id,
                  start: props.batch.start,
                  end: props.batch.end
                }  
                dispatch(printCards(payload));
              }
            }}
            type='button'
            disabled={props.cardPrintingStatus === 'loading'}
            color="primary"
            variant="contained"
          >
            {props.dialogactiontitle}
          </Button>
        }

      </DialogActions>
    </React.Fragment>
  );
};

const artworks = [
  { title: "ArtWork Sri Lanka1" },
  { title: "ArtWork Sri Lanka2" },
  { title: "ArtWork India1" },
];

export default PrintCardsDialog;
