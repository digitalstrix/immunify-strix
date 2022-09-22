import React, { useState, useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { DialogContent } from "../../../../../common/components/Admin/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  categorizeMilestone,
  getChildMilestoneRetrievingStatus,
  getChildMilestoneUpdatingStatus,
  isDisableMilestone,
  selectedMilestone,
} from "./selector";
import { Summarylistitem } from "./SummaryListItem";
import { updateChildMilestoneAsync } from "../milestoneSlice";
import Skeleton from "@material-ui/lab/Skeleton";

export const Incomplete = () => {
  const dispatch = useDispatch();
  const { actByDoc, social, communication, cognitive, physical } = useSelector(categorizeMilestone);
  const [expanded, setExpanded] = useState(true);
  const isDisable = useSelector(isDisableMilestone);
  const { image, childId, atAgeUnit, atAge, index } = useSelector(selectedMilestone);

  const updatingStatus = useSelector(getChildMilestoneUpdatingStatus);
  const retrievingStatus = useSelector(getChildMilestoneRetrievingStatus);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const updateChildMilestone = useCallback(
    (info) => {
      dispatch(updateChildMilestoneAsync(info));
    },
    [dispatch]
  );

  return (
    <div>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {updatingStatus === "loading" ||
                retrievingStatus === "loading" ? (
                  <Skeleton
                    variant="rect"
                    width={"100%"}
                    height={expanded === "panel1" ? 30 * social.length : 30}
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  <Accordion
                    square
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Social</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        {social &&
                          social.length > 0 &&
                          social.map((i) => {
                            return (
                              <Summarylistitem
                                key={i.id}
                                viewStatus={"INCOMPLETED"}
                                title={i.title}
                                status={i.status}
                                isAction
                                behaviour={i.behaviour}
                                imageUri={i.imageUri}
                                isDisable={isDisable}
                                childId={childId}
                                cbId={i.id}
                                index={index}
                                atAgeUnit={atAgeUnit}
                                atAge={atAge}
                                milestoneCompletedByChild={i.completedByChild}
                                updateChildMilestone={updateChildMilestone}
                              />
                            );
                          })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}

                {updatingStatus === "loading" ||
                retrievingStatus === "loading" ? (
                  <Skeleton
                    variant="rect"
                    width={"100%"}
                    height={
                      expanded === "panel2" ? 30 * communication.length : 30
                    }
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  <Accordion
                    square
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Communication</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        {communication &&
                          communication.length > 0 &&
                          communication.map((i) => {
                            return (
                              <Summarylistitem
                                key={i.id}
                                viewStatus={"INCOMPLETED"}
                                title={i.title}
                                status={i.status}
                                isAction
                                behaviour={i.behaviour}
                                imageUri={i.imageUri}
                                isDisable={isDisable}
                                childId={childId}
                                cbId={i.id}
                                index={index}
                                atAgeUnit={atAgeUnit}
                                atAge={atAge}
                                milestoneCompletedByChild={i.completedByChild}
                                updateChildMilestone={updateChildMilestone}
                              />
                            );
                          })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}

                {updatingStatus === "loading" ||
                retrievingStatus === "loading" ? (
                  <Skeleton
                    variant="rect"
                    width={"100%"}
                    height={expanded === "panel3" ? 30 * cognitive.length : 30}
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  <Accordion
                    square
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Cognitive</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        {cognitive &&
                          cognitive.length > 0 &&
                          cognitive.map((i) => {
                            return (
                              <Summarylistitem
                                key={i.id}
                                viewStatus={"INCOMPLETED"}
                                title={i.title}
                                status={i.status}
                                isAction
                                behaviour={i.behaviour}
                                imageUri={i.imageUri}
                                isDisable={isDisable}
                                childId={childId}
                                cbId={i.id}
                                index={index}
                                atAgeUnit={atAgeUnit}
                                atAge={atAge}
                                milestoneCompletedByChild={i.completedByChild}
                                updateChildMilestone={updateChildMilestone}
                              />
                            );
                          })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}

                {updatingStatus === "loading" ||
                retrievingStatus === "loading" ? (
                  <Skeleton
                    variant="rect"
                    width={"100%"}
                    height={expanded === "panel4" ? 30 * physical.length : 30}
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  <Accordion
                    square
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>Physical Development</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        {physical &&
                          physical.length > 0 &&
                          physical.map((i) => {
                            return (
                              <Summarylistitem
                                key={i.id}
                                viewStatus={"INCOMPLETED"}
                                title={i.title}
                                status={i.status}
                                isAction
                                behaviour={i.behaviour}
                                imageUri={i.imageUri}
                                isDisable={isDisable}
                                childId={childId}
                                cbId={i.id}
                                index={index}
                                atAgeUnit={atAgeUnit}
                                atAge={atAge}
                                milestoneCompletedByChild={i.completedByChild}
                                updateChildMilestone={updateChildMilestone}
                              />
                            );
                          })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
    </div>
  );
};
