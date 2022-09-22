import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";

import StatCard from "./StatCard";
import Maintoolbar from "./Maintoolbar";
import MapSummary from "./MapSummary/MapSummary";
// import TableSummary from "./Tablesummary";
// import Tablesummary from './tablesummary';
import { initVaccination } from "../ChildVaccinationPage/vaccinationSlice";
import { initGrowth } from "../ChildVaccinationPage/growthSlice";
import Graphssection from "./GraphsSection";
// import VacbyVaccine from "./VacbyVaccine";
// import VacbyGender from "./VacbyGender";
// import VacbyAge from "./VacbyAge";
// import ChildGrowth from "./ChildGrowth";
// import Forecast from "./Forecast";
import bannerImg from "../../assets/img/doc_banner.png";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { selectCenterStats, selectGranularity } from "./selector";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  heading: {
    fontWeight: "bold",
  },
}));

const extractStatValue = (stats, granularity, index) => stats[granularity][index];

const DashboardPage = () => {
  const classes = useStyles();
  const stats = useSelector(selectCenterStats);
  const granularity = useSelector(selectGranularity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initVaccination());
    dispatch(initGrowth());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={false}>
        <Maintoolbar />
        <Box mt={3}>
          <Box my={3}>
            <Grid container justifyContent='center' spacing={3}>
              <Grid item xs={12} md={12} lg={8}>
                <Card style={{ backgroundColor: "#fcedff" }}>
                  <Grid
                    container
                    item
                    justifyContent='space-between'
                    alignItems='center'
                    spacing={3}>
                    <Grid item xs={12} md={6}>
                      <CardContent>
                        <Box my={3}>
                          <Typography variant='h5' className={classes.heading}>
                            Do more with Immunifyme App!
                          </Typography>
                          <Box mt={2}>
                            <Typography variant='p'>
                              Smarter Digitization, Leads to Better Immunization
                            </Typography>
                          </Box>
                        </Box>

                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() =>
                            window.open(
                              "https://play.google.com/store/apps/details?id=com.immparentportal&hl=en&gl=US",
                              "_blank"
                            )
                          }>
                          Download Now
                        </Button>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <img src={bannerImg} alt='' width='100%' height='100%' />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item container xs={12} md={12} lg={4} spacing={3}>
                <Grid item xs={12} md={4} lg={12}>
                  <StatCard
                    title='TOTAL VACCINATIONS'
                    value={extractStatValue(stats, granularity, 0)}
                    icon={<AttachMoneyIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={12}>
                  <StatCard
                    title='TOTAL CARD ISSUED'
                    value={extractStatValue(stats, granularity, 1)}
                    icon={<AttachMoneyIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={12}>
                  <StatCard
                    title='TOTAL CHILD REGISTRATIONS'
                    value={extractStatValue(stats, granularity, 2)}
                    icon={<AttachMoneyIcon />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {/* <Grid container spacing={3}>
            <Grid item xs={4}>
              <StatCard
                title='TOTAL VACCINATIONS'
                value={extractStatValue(stats, granularity, 0)}
                icon={<AttachMoneyIcon />}
              />
            </Grid>
            <Grid item xs={4}>
              <StatCard
                title='TOTAL CARD ISSUED'
                value={extractStatValue(stats, granularity, 1)}
                icon={<AttachMoneyIcon />}
              />
            </Grid>
            <Grid item xs={4}>
              <StatCard
                title='TOTAL CHILD REGISTRATIONS'
                value={extractStatValue(stats, granularity, 2)}
                icon={<AttachMoneyIcon />}
              />
            </Grid>
          </Grid> */}
        </Box>
        <MapSummary google />
        {/* <Box mt={3}>
          <Tablesummary />
        </Box> */}
        <Box mt={6}>
          <Graphssection />
        </Box>
        {/* <Box mt={6}>
          <VacbyVaccine />
        </Box>
        <Box mt={6}>
          <VacbyGender />
        </Box>
        <Box mt={6}>
          <VacbyAge />
        </Box>
        <Box mt={6}>
          <ChildGrowth />
        </Box>
        <Box mt={6}>
          <Forecast />
        </Box> */}
      </Container>
    </>
  );
};

export default DashboardPage;
