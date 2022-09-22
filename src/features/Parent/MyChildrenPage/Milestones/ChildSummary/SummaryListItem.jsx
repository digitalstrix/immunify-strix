import React from "react";
import { Grid, Checkbox, Divider, Typography } from "@material-ui/core";

export const Summarylistitem = ({
  viewStatus,
  isAction,
  atAgeUnit,
  atAge,
  behaviour,
  childId,
  cbId,
  isDisable,
  milestoneCompletedByChild,
  updateChildMilestone,
}) => {
  return viewStatus === "COMPLETED" && milestoneCompletedByChild === 1 ? (
    <>
      {isAction && (
        <>
          <Grid md={11} style={{ marginBottom: 10 }}>
            {behaviour}
          </Grid>
          <Grid md={1}>
            <Checkbox
              color="primary"
              disabled={isDisable && milestoneCompletedByChild}
              defaultChecked={milestoneCompletedByChild}
              onChange={() => {
                updateChildMilestone({
                  childId,
                  cbId,
                  atAge,
                  atAgeUnit,
                  milestoneCompletedByChild: !milestoneCompletedByChild,
                });
              }}
            />
          </Grid>
          <Divider
            dark
            variant="full"
            style={{ width: "100%", marginBottom: 10 }}
          />
        </>
      )}
      {!isAction && <Typography>{behaviour}</Typography>}
    </>
  ) : viewStatus === "INCOMPLETED" && milestoneCompletedByChild === 0 ? (
    <>
      {isAction && (
        <>
          <Grid md={11} style={{ marginBottom: 10 }}>
            {behaviour}
          </Grid>
          <Grid md={1}>
            <Checkbox
              color="primary"
              disabled={isDisable && milestoneCompletedByChild}
              defaultChecked={milestoneCompletedByChild}
              onChange={() => {
                updateChildMilestone({
                  childId,
                  cbId,
                  atAge,
                  atAgeUnit,
                  milestoneCompletedByChild: !milestoneCompletedByChild,
                });
              }}
            />
          </Grid>
          <Divider
            dark
            variant="full"
            style={{ width: "100%", marginBottom: 10 }}
          />
        </>
      )}
      {!isAction && <Typography>{behaviour}</Typography>}
    </>
  ) : null;
};
