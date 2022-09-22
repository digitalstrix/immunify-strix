import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import Qrcodelisttoolbar from "../VendorCardRequests/VaccinationCentersList/QRcodeListToolbar";
import Vaccentercardsdatatable from "../VendorCardRequests/VaccinationCentersList/VaccinationCentersList";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Vendorcardrequests = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box mt={4}>
          <Qrcodelisttoolbar />
        </Box>
        <Box mt={3}>
          <Vaccentercardsdatatable />
        </Box>
      </Container>
    </div>
  );
};

export default Vendorcardrequests;
