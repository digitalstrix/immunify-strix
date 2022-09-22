import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import Chart from "../../../common/components/Chart";
import Loader from "../../../common/components/Loader";
import {
  selectChartDataLoadingStatus,
  selectChartData,
  selectUser
} from '../selector';
import { getChartData } from '../dashboardSlice';
import {
  STATE_KEY_VACCINATED_WEEKLY,
  STATE_KEY_OVERDUE_WEEKLY,
  STATE_KEY_VACCINATED_MONTHLY,
  STATE_KEY_VACCINATION_FORCAST
} from '../../../constants/dashboarConstants';

const extract = (data, dataKey, propertyType = 'data') => {
  return data[dataKey][propertyType];
};

const Index = () => {

  const chartLoading = useSelector(selectChartDataLoadingStatus);
  const chartData = useSelector(selectChartData);
  const { vacId } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if ((chartLoading === 'idle' || chartLoading === 'failed') && retryCount < 1) {
      dispatch(getChartData({ vacId }));
      setRetryCount(1);
    }
  }, [chartLoading, vacId, retryCount, dispatch]);

  if (chartLoading === 'loading') {
    return <Loader />;
  } else if (chartLoading === 'failed' || chartData === null) {
    return null;
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Vaccinated Data (Weekly)
              </Typography>
              <Chart
                graphtype={"Bar"}
                labels={extract(chartData, STATE_KEY_VACCINATED_WEEKLY, 'labels')}
                datasets={[
                  {
                    label: "#No of Vaccinations",
                    data: extract(chartData, STATE_KEY_VACCINATED_WEEKLY),
                    backgroundColor: "#8fa0fd",
                    //   barThickness: "70",
                    borderWidth: "2",
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Overdue Data (Weekly)
              </Typography>
              <Chart
                graphtype={"Bar"}
                labels={extract(chartData, STATE_KEY_OVERDUE_WEEKLY, 'labels')}
                datasets={[
                  {
                    label: "#No of Vaccinations",
                    data: extract(chartData, STATE_KEY_OVERDUE_WEEKLY),
                    backgroundColor: "#95eeff",
                    //   barThickness: "70",
                    borderWidth: "2",
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Children return for vaccination (Monthly)
              </Typography>
              <Chart
                graphtype={"Bar"}
                labels={extract(chartData, STATE_KEY_VACCINATED_MONTHLY, 'labels')}
                datasets={[
                  {
                    label: "#No of Vaccinations",
                    data: extract(chartData, STATE_KEY_VACCINATED_MONTHLY),
                    backgroundColor: "#8fa0fd",
                    //   barThickness: "70",
                    borderWidth: "2",
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                Vaccination Forecast (Monthly)
              </Typography>
              <Chart
                graphtype={"Bar"}
                labels={extract(chartData, STATE_KEY_VACCINATION_FORCAST, 'labels')}
                datasets={[
                  {
                    label: "#No of Vaccinations",
                    data: extract(chartData, STATE_KEY_VACCINATION_FORCAST),
                    backgroundColor: "#95eeff",
                    //   barThickness: "70",
                    borderWidth: "2",
                  },
                ]}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
