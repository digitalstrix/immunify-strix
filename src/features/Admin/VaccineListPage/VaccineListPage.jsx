import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import MainToolbar from "./MainToolbar";
import VaccineDataTable from "./VaccineDataTable";
import Filterstoolbar from "./VaccineDataTable/FiltersToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Vaccinelistpage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar /> 
        <Box m={4}>
          {/* <Filterstoolbar /> */}
        </Box>
        <Box mt={3}>
          <VaccineDataTable />
        </Box>
      </Container>
    </div>
  );
};

export default Vaccinelistpage;
