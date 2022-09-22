import React, { useEffect } from "react";
import { Card, Grid, CardContent } from "@material-ui/core";
import { DialogContent } from "../../../../../common/components/Admin/Dialog";
import TabBar from "../../../../../common/components/TabBar";
import { Incomplete } from "./Incompleted";
import { Completed } from "./Completed";
import { useDispatch, useSelector } from "react-redux";
import {
  getChildMilestoneRetrievingError,
  getChildMilestoneRetrievingStatus,
  getChildMilestoneUpdatingError,
  getChildMilestoneUpdatingStatus,
  selectedMilestone,
} from "./selector";
import { getChildMilestoneDetails } from "../milestoneSlice";
import LinearProgress from "@material-ui/core/LinearProgress";
import { notify } from "../../../../../utils/commonUtils";
import { useSnackbar } from "notistack";

export const ChildSummary = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const updatingStatus = useSelector(getChildMilestoneUpdatingStatus);
  const retrievingStatus = useSelector(getChildMilestoneRetrievingStatus);
  const retrievingError = useSelector(getChildMilestoneRetrievingError);
  const updatingError = useSelector(getChildMilestoneUpdatingError);

  const { image, childId, atAgeUnit, atAge } = useSelector(selectedMilestone);

  const CHILD_MILESTONE_UPDATE_SUCCESSFUL_MSG = "Child Milestone Successfully Updated!";
  const CHILD_MILESTONE_UPDATE_FAILURE_MSG = "Child Milestone Updating Failed!";
  const CHILD_MILESTONE_RETREIVAL_FAILURE_MSG = "Child Milestone Retrieving Failed!";

  useEffect(() => {
    if (updatingStatus === "succeeded") {
      notify(enqueueSnackbar, CHILD_MILESTONE_UPDATE_SUCCESSFUL_MSG);
    } else if (updatingStatus === "failed") {
      notify(enqueueSnackbar, CHILD_MILESTONE_UPDATE_FAILURE_MSG, "error");
    }
  }, [updatingStatus, updatingError, enqueueSnackbar]);

  useEffect(() => {
   if (retrievingStatus === "failed") {
      notify(enqueueSnackbar, CHILD_MILESTONE_RETREIVAL_FAILURE_MSG, "error");
    }
  }, [retrievingStatus, retrievingError, enqueueSnackbar]);

  useEffect(() => {
    dispatch(
      getChildMilestoneDetails({
        childId,
        atAgeUnit,
        atAge,
      })
    );
  }, [childId, atAge, atAgeUnit, dispatch]);

  return (
    <div>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {updatingStatus === "loading" ||
                  (retrievingStatus === "loading" && <LinearProgress />)}
                <TabBar
                  tab1title={"Incompleted"}
                  tab1data={<Incomplete />}
                  tab2title={"Completed"}
                  tab2data={<Completed />}
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
          </CardContent>
        </Card>
      </DialogContent>
    </div>
  );
};
