import React from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectPatientAllergies } from "./selector";

const Index = () => {
  const allergies = useSelector(selectPatientAllergies);

  return (
    <div>
      <Box p={5}>
        {allergies && allergies.length > 0 ? (
          allergies.map((i) => {
            return (
              <Box>
                <Grid
                  key={Math.random()}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="subtitle1" color="initial">
                      {i.title || "No record found"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="initial">
                      {i.description && "-" + i.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            );
          })
        ) : (
          <Typography variant="subtitle1" color="initial">
            No Data.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Index;
