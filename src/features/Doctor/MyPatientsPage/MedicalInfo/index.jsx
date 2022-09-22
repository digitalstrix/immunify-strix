import React, { useEffect } from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPatientImmId,
  selectHeight,
  selectWeight,
  selectHc,
} from "./selector";
import { getChildLatestGrowthInfo } from "../myPatientsSlice";
import { selectParentAdditionalData } from "../PatientContainer/selector";

const Index = ({ userType }) => {
  const dispatch = useDispatch();
  const parentData = useSelector(selectParentAdditionalData);
  const patientImmId = useSelector(selectPatientImmId);

  const childHeight = useSelector(selectHeight);
  const childWeight = useSelector(selectWeight);
  const childHc = useSelector(selectHc);

  const parentHeight = parentData?.height;
  const parentWeight = parentData?.weight;
  const parentHc = "N/A";

  const parentHeightProcessed = parentHeight?.split(/\.(?=[^\.]+$)/);

  const height =userType === "CHILD" ? childHeight : `${parentHeightProcessed[0]} ft ${parentHeightProcessed[1]} inches`;
  const weight = userType === "CHILD" ? childWeight : parentWeight;
  const hc = userType === "CHILD" ? childHc : parentHc;

  useEffect(() => {
    dispatch(getChildLatestGrowthInfo({ childId: patientImmId }));
    return () => {};
  }, [dispatch]);

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
              Height
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              {height
                ? `${height} ${userType === "CHILD" ? "cm" : ""}`
                : "No Data."}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Weight
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              {weight ? `${weight} Kg` : "No Data."}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              Head Circumference
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="initial">
              {hc ? `${hc} cm` : "No Data."}
            </Typography>
          </Grid>
        </Grid>
        {userType === "PARENT" && (
          <>
            <Divider />
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="subtitle1" color="initial">
                  Boold Type
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="initial">
                  {parentData ? `${parentData.blood}` : "No Data."}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
};

export default Index;
