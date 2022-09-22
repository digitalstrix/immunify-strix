import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import FilterToolbar from "./DoctorSettlementsList/FilterToolbar";
import SettlementdDataTable from "./DoctorSettlementsList/DataTable";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <FilterToolbar />
        </Box>
        <Box mt={3}>
          <SettlementdDataTable />
        </Box>
      </Container>
    </div>
  );
};

export default Index;
