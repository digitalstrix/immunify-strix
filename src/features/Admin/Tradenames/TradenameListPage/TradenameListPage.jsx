import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import MainToolbar from "./MainToolbar";
import TradenameDataTable from "./TradenameDataTable";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Tradenamelistpage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={3}>
          <TradenameDataTable />
        </Box>
      </Container>
    </div>
  );
};

export default Tradenamelistpage;
