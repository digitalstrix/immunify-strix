import React from "react";
import {
  Card,
  Grid,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";
import { DialogContent } from "../../../../common/components/Admin/Dialog";
import {
  DATA_SET01,
  DATA_SET02,
  DATA_SET03,
  DATA_SET04,
} from "../../../../constants/healthTipsConstants";
import { childMilestone } from "./selector";

export const HealthTips = () => {
  const milestones = useSelector(childMilestone);
  const { fetchAge, fetchAgeUnit } = milestones.length > 0 ? milestones[0] : {};

  return (
    <div>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <List dense={false}>
                  {((fetchAge === 2 ||
                    fetchAge === 4 ||
                    fetchAge === 6 ||
                    fetchAge === 9) &&
                    fetchAgeUnit === "MONTHS") ||
                  (fetchAge === 1 && fetchAgeUnit === "YEARS")
                    ? DATA_SET01.map((i) => {
                        return (
                          <>
                            <ListItem>
                              <ListItemIcon>
                                <InfoIcon style={{ color: "#0096FF" }} />
                              </ListItemIcon>
                              <ListItemText primary={i.tip} />
                            </ListItem>
                            <Divider
                              dark
                              variant="inset"
                              style={{ width: "100%", marginBottom: 10 }}
                            />
                          </>
                        );
                      })
                    : (fetchAge === 18 && fetchAgeUnit === "MONTHS") ||
                      (fetchAge === 2 && fetchAgeUnit === "YEARS")
                    ? DATA_SET02.map((i) => {
                        return (
                          <>
                            <ListItem>
                              <ListItemIcon>
                                <InfoIcon style={{ color: "#0096FF" }} />
                              </ListItemIcon>
                              <ListItemText primary={i.tip} />
                            </ListItem>
                            <Divider
                              dark
                              variant="inset"
                              style={{ width: "100%", marginBottom: 10 }}
                            />
                          </>
                        );
                      })
                    : fetchAge === 3 && fetchAgeUnit === "YEARS"
                    ? DATA_SET03.map((i) => {
                        return (
                          <>
                            <ListItem>
                              <ListItemIcon>
                                <InfoIcon style={{ color: "#0096FF" }} />
                              </ListItemIcon>
                              <ListItemText primary={i.tip} />
                            </ListItem>{" "}
                            <Divider
                              dark
                              variant="inset"
                              style={{ width: "100%", marginBottom: 10 }}
                            />
                          </>
                        );
                      })
                    : DATA_SET04.map((i) => {
                        return (
                          <>
                            <ListItem>
                              <ListItemIcon>
                                <InfoIcon style={{ color: "#0096FF" }} />
                              </ListItemIcon>
                              <ListItemText primary={i.tip} />
                            </ListItem>{" "}
                            <Divider
                              dark
                              variant="inset"
                              style={{ width: "100%", marginBottom: 10 }}
                            />
                          </>
                        );
                      })}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
    </div>
  );
};
