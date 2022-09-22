import React from "react";
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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import image_front from "../../../../../assets/img/placeholder_front.png";
import image_back from "../../../../../assets/img/placeholder_back.png";

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

const Printcardsdialog = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("Country_Wise");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <form noValidate autoComplete="off">
      <Box p={3}>
        <Grid container row spacing={3}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              id="select_artwork"
              options={artworks}
              getOptionLabel={(option) => option.title}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Artwork"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="card_quantity"
              label="Enter Quantity to Print"
              type="Number"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <img
              src={image_front}
              alt="image_front"
              className={classes.image}
            />
          </Grid>
          <Grid item xs={6}>
            <img src={image_back} alt="image_back" className={classes.image} />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

const artworks = [
  { title: "ArtWork Sri Lanka1" },
  { title: "ArtWork Sri Lanka2" },
  { title: "ArtWork India1" },
];

export default Printcardsdialog;
