import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainToolbar from "./MainToolbar";
import { Box, Container, Grid, Paper, Typography } from "@material-ui/core";
import TabBar from "../../../common/components/TabBar";
import ReceivedInfo from "./ReceivedInfo";
import RedundInfo from "./RedundInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth={true}>
        <MainToolbar />
        <Box mt={4}>
          <Grid container justify="center">
            <Grid item xs={12} md={3}>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" color="textSecondary" align="center">
                  Availabale Balance
                </Typography>
                <Typography variant="h4" color="primary" align="center">
                  <Box fontWeight="fontWeightBold">LKR 1300</Box>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Grid container justify="center">
              <Grid item xs={12} md={6}>
                <TabBar
                  tab1title="Received"
                  tab1data={<ReceivedInfo />}
                  tab2title="Refunded"
                  tab2data={<RedundInfo />}
                  tab3disable={true}
                  tab3hide="none"
                  tab4disable={true}
                  tab4hide="none"
                  tab5disable={true}
                  tab5hide="none"
                  tab6disable={true}
                  tab6hide="none"
                  centered={true}
                  variant="fullWidth"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Index;
