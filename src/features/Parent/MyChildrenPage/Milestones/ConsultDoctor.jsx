import React, { useEffect } from "react";
import {
  Card,
  Grid,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
  Typography,
  Avatar,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoIcon from "@material-ui/icons/Info";
import { DialogContent } from "../../../../common/components/Admin/Dialog";
import {
  categorizeMilestone,
  selectedMilestone,
} from "./ChildSummary/selector";
import { useDispatch, useSelector } from "react-redux";
import { getChildMilestoneDetails } from "./milestoneSlice";
import { selectCommonLoadingState } from "./selector";

export const ConsultDoctor = () => {
  const dispatch = useDispatch();
  const { childId, atAgeUnit, atAge } = useSelector(selectedMilestone);

  useEffect(() => {
    dispatch(
      getChildMilestoneDetails({
        childId,
        atAgeUnit,
        atAge,
      })
    );
  }, [childId, atAge, atAgeUnit, dispatch]);

  const { actByDoc } = useSelector(categorizeMilestone);
  const isLoading = useSelector(selectCommonLoadingState);

  return (
    <div>
      <DialogContent>
        {isLoading && <LinearProgress />}
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <List dense={false}>
                  {isLoading ? (
                    <>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid md={1}>
                          <Skeleton variant="circle">
                            <Avatar />
                          </Skeleton>
                        </Grid>
                        <Grid md={11}>
                          <Typography variant="h2">
                            <Skeleton />
                          </Typography>{" "}
                        </Grid>
                      </Grid>{" "}
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid md={1}>
                          <Skeleton variant="circle">
                            <Avatar />
                          </Skeleton>
                        </Grid>
                        <Grid md={11}>
                          <Typography variant="h2">
                            <Skeleton />
                          </Typography>{" "}
                        </Grid>
                      </Grid>{" "}
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid md={1}>
                          <Skeleton variant="circle">
                            <Avatar />
                          </Skeleton>
                        </Grid>
                        <Grid md={11}>
                          <Typography variant="h2">
                            <Skeleton />
                          </Typography>{" "}
                        </Grid>
                      </Grid>{" "}
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid md={1}>
                          <Skeleton variant="circle">
                            <Avatar />
                          </Skeleton>
                        </Grid>
                        <Grid md={11}>
                          <Typography variant="h2">
                            <Skeleton />
                          </Typography>{" "}
                        </Grid>
                      </Grid>{" "}
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid md={1}>
                          <Skeleton variant="circle">
                            <Avatar />
                          </Skeleton>
                        </Grid>
                        <Grid md={11}>
                          <Typography variant="h2">
                            <Skeleton />
                          </Typography>{" "}
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    actByDoc &&
                    actByDoc.length > 0 &&
                    actByDoc.map((i) => {
                      return (
                        <div key={i.id}>
                          <ListItem>
                            <ListItemIcon>
                              <InfoIcon style={{ color: "#0096FF" }} />
                            </ListItemIcon>
                            <ListItemText primary={i.behaviour} />
                          </ListItem>
                          <Divider
                            dark
                            variant="inset"
                            style={{ width: "100%", marginBottom: 10 }}
                          />
                        </div>
                      );
                    })
                  )}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
    </div>
  );
};
