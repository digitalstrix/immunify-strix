import React from "react";
import TabBar from "../../../../common/components/TabBar";
import DueVaccines from "./DueVaccines";
import VacVaccines from "./VacVaccines";
import { useSelector } from "react-redux";
import { selectPatientType } from "./selector";
import { Box, Grid, Typography } from "@material-ui/core";
import { selectParentAdditionalData } from "../PatientContainer/selector";

const Index = () => {
  const userType = useSelector(selectPatientType);
  const data = useSelector(selectParentAdditionalData);
  return (
    <div>
      {userType === "CHILD" ? (
        <TabBar
          tab1title="Due Vaccines"
          tab1data={<DueVaccines />}
          tab2title="Vaccinated Vaccines"
          tab2data={<VacVaccines />}
          tab3disable={true}
          tab3hide="none"
          tab4disable={true}
          tab4hide="none"
          tab5disable={true}
          tab5hide="none"
          tab6disable={true}
          tab6hide="none"
          variant="fullWidth"
        />
      ) : (
        <Box p={5}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="subtitle1" color="initial">
                {data?.vaccines === null ||
                data?.vaccines === undefined
                  ? "No records found"
                  : data?.vaccines}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default Index;
