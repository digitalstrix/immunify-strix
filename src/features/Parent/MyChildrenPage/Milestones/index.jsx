import defaultChild from "../../../../assets/img/Background/default-baby-img.jpeg";
import React, { useEffect, useState } from "react";
import {
  Box,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  childMilestone,
  getSelectedChildInfo,
  milestonePercentage,
  selectCommonLoadingState,
  selectedMilestoneImage,
} from "./selector";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Dialog from "../../../../common/components/Admin/Dialog";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import milestone1 from "../../../../assets/img/Milestones/milestone-01.png";
import {
  getChildMilestoneImages,
  getChildMilestonePercentage,
  setMilestoneImages,
  setMilestonePercentage,
  setSelectedMilestone,
} from "./milestoneSlice";
import { validMilestonePercentages } from "../../../../utils/childUtils";
import { ChildSummary } from "./ChildSummary";
import { HealthTips } from "./HealthTips";
import { ConsultDoctor } from "./ConsultDoctor";
import Detailedmilestones from "./DetailedMilestones";
import EditIcon from "@material-ui/icons/CreateOutlined";
import { withRouter } from "react-router";
import { selectedMilestone } from "./ChildSummary/selector";

const cardStyle = makeStyles({
  card: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    // paddingTop: "100%", // 1:1,
    backgroundColor: "#f3e8ff",
  },
  input: {
    display: "none",
  },
  cardAction: {
    width: "100%",
  },
  percentage: {
    fontWeight: "bold",
  },
});

function Index(props) {
  const dispatch = useDispatch();
  const classes = cardStyle();
  const selectedChild = useSelector(getSelectedChildInfo);
  const isLoading = useSelector(selectCommonLoadingState);
  const milestones = useSelector(childMilestone);
  const milestonePercentages = useSelector(milestonePercentage);
  const { image, childId, atAgeUnit, atAge, index } =
    useSelector(selectedMilestone);

  const CHILD_SUMMARY = "Child Summary";
  const CHILD_MILESTONES = `${selectedChild?.firstName || ""} ${
    selectedChild?.middleName || ""
  }  ${selectedChild?.lastName || ""}  Milestones`;
  const HEALTH_TIPS = "Health Tips";
  const CONSULT_DOCTOR = "Consult Doctor";

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const validPercentages = validMilestonePercentages(
    milestonePercentages,
    milestones
  );

  useEffect(() => {
    dispatch(getChildMilestoneImages({ childId: selectedChild.id }));
    dispatch(getChildMilestonePercentage(selectedChild.id));
    return () => {
      dispatch(setMilestoneImages([]));
      dispatch(setMilestonePercentage([]));
    };
  }, [dispatch]);

  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedAgeUnit, setSelectedAgeUnit] = useState(null);
  const [toggle, setToggle] = useState(
    milestones &&
      milestones.length > 0 &&
      `${milestones[0].fetchAge} ${milestones[0].fetchAgeUnit}`
  );

  const getDialogContent = () => {
    if (dialogType === CHILD_SUMMARY) {
      return <ChildSummary />;
    }
    if (dialogType === HEALTH_TIPS) {
      return <HealthTips />;
    }
    if (dialogType === CONSULT_DOCTOR) {
      return <ConsultDoctor />;
    }
    if (dialogType === CHILD_MILESTONES) {
      return <Detailedmilestones />;
    }
    return null;
  };

  // --------------------
  // childId={childId}
  // milestones={milestones}
  // childName={childName}
  // milestonePercentages={validPercentages}
  // selectedMilestone={selectedMilestone}
  // milestonePercentagesSelector={milestonePercentages}

  const [selectedMilestoneProgressObj, setSelectedMilestoneProgressObj] =
    useState(validPercentages[0]);
  const [selectedMilestoneObj, setMilestoneObj] = useState(milestones[0]);

  const {
    ageByDays,
    ageByMonths,
    title,

    fetchAgeUnit,
    fetchAge,
    disabled,
  } = selectedMilestoneObj;

  const getSelectedMilestoneObj = (fetchAge, fetchAgeUnit) => {
    var result = milestonePercentages.find((obj) => {
      return obj.atAgeUnit === fetchAgeUnit && obj.atAge === fetchAge;
    });
    setSelectedMilestoneProgressObj(result);
  };

  useEffect(() => {
    getSelectedMilestoneObj(fetchAge, fetchAgeUnit);
  }, [milestonePercentages]);

  const handleViewDetails = () => {
    dispatch(
      setSelectedMilestone({
        atAge: selectedAge || fetchAge,
        atAgeUnit: selectedAgeUnit || fetchAgeUnit,
        childId: selectedChild.id,
        image,
        ageByMonths,
        ageByDays,
        disabled,
      })
    );
    // setDialogType(CHILD_MILESTONES);
    // setOpenDialog(true);
    props.history.push("/milestones");
  };

  const imageUri = () => {
    const uriMap = selectedMilestoneImage(image, atAge, atAgeUnit);
    if (isNaN(uriMap)) {
      if (typeof uriMap === "object") {
        return defaultChild;
      }
      return uriMap;
    } else {
      return defaultChild;
    }
  };

  return (
    <>
      <Dialog
        dialogtitle={dialogType}
        dialogcontent={getDialogContent()}
        maxWidth="sm"
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleOpen={() => setOpenDialog(true)}
      />
      <Box
        p={3}
        style={{
          opacity: isLoading ? 0.25 : 1,
          pointerEvents: isLoading ? "none" : "initial",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Box align="center">
              {milestones &&
                milestones.length > 0 &&
                milestones.map((i) => {
                  return (
                    <Button
                      variant="contained"
                      startIcon={
                        `${i.fetchAge} ${i.fetchAgeUnit}` === toggle ? (
                          <FiberManualRecordIcon color="#00A300" />
                        ) : null
                      }
                      style={
                        `${i.fetchAge} ${i.fetchAgeUnit}` === toggle
                          ? {
                              backgroundColor: "#12824C",
                              color: "#FFFFFF",
                              padding: 10,
                            }
                          : { margin: 10 }
                      }
                      onClick={() => {
                        setSelectedAge(i.fetchAge);
                        setSelectedAgeUnit(i.fetchAgeUnit);
                        setToggle(`${i.fetchAge} ${i.fetchAgeUnit}`);
                        getSelectedMilestoneObj(i.fetchAge, i.fetchAgeUnit);
                      }}
                    >
                      {`${i.fetchAge} ${i.fetchAgeUnit}`}
                    </Button>
                  );
                })}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ height: "100%" }}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={3}
                justifyContent="space-between"
              >
                <Box style={{ width: "50%" }}>
                  <CircularProgressbarWithChildren
                    value={
                      selectedMilestoneProgressObj?.completedPercentage || 0
                    }
                    styles={buildStyles({
                      textSize: "16px",
                      pathTransitionDuration: 0.5,
                      pathColor: "purple",
                      textColor: "#f88",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  >
                    <Typography variant="h4" className={classes.percentage}>
                      {selectedMilestoneProgressObj?.completedPercentage || 0}%
                    </Typography>
                  </CircularProgressbarWithChildren>
                </Box>
                <Box mt={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleViewDetails}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Box display="flex" justifyContent="space-around" mt={3}>
              <Button
                variant="contained"
                color="default"
                size="large"
                onClick={() => {
                  dispatch(
                    setSelectedMilestone({
                      atAge: selectedAge || fetchAge,
                      atAgeUnit: selectedAgeUnit || fetchAgeUnit,
                      childId: selectedChild.id,
                      image,
                      ageByMonths,
                      ageByDays,
                      disabled,
                    })
                  );
                  setDialogType(CHILD_SUMMARY);
                  setOpenDialog(true);
                }}
              >
                Child Summary
              </Button>

              <Button
                variant="contained"
                color="default"
                size="large"
                onClick={() => {
                  setDialogType(HEALTH_TIPS);
                  setOpenDialog(true);
                }}
              >
                Health Tips
              </Button>

              <Button
                variant="contained"
                color="default"
                size="large"
                onClick={() => {
                  dispatch(
                    setSelectedMilestone({
                      atAge: selectedAge || fetchAge,
                      atAgeUnit: selectedAgeUnit || fetchAgeUnit,
                      childId: selectedChild.id,
                      image,
                      ageByMonths,
                      ageByDays,
                      disabled,
                    })
                  );
                  setDialogType(CONSULT_DOCTOR);
                  setOpenDialog(true);
                }}
              >
                Consult Doctor
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withRouter(Index);
