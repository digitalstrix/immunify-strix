import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectMedicines } from "./selector";

const Index = () => {
  const medicines = useSelector(selectMedicines);

  return (
    <div>
      <Box p={5}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              {medicines || "No Data."}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Index;
