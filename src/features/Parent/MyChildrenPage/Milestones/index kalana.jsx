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
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  childMilestone,
  getSelectedChildInfo,
  milestonePercentage,
  selectCommonLoadingState,
} from "./selector";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Dialog from "../../../../common/components/Admin/Dialog";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import milestone1 from "../../../../assets/img/Milestones/milestone-01.png";
import milestone2 from "../../../../assets/img/Milestones/milestone-02.png";
import milestone3 from "../../../../assets/img/Milestones/milestone-03.png";
import milestone4 from "../../../../assets/img/Milestones/milestone-04.png";
import milestone5 from "../../../../assets/img/Milestones/milestone-05.png";
import milestone6 from "../../../../assets/img/Milestones/milestone-06.png";
import milestone7 from "../../../../assets/img/Milestones/milestone-07.png";
import milestone8 from "../../../../assets/img/Milestones/milestone-08.png";
import milestone9 from "../../../../assets/img/Milestones/milestone-09.png";
import milestone10 from "../../../../assets/img/Milestones/milestone-10.png";
import Milestonedetails from "./MilestoneDetails";
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
import { Autocomplete } from "@material-ui/lab";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    borderRadius: 4,
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
  },
}))(MuiAccordionDetails);

const cardStyle = makeStyles({
  card: {
    width: "30%",
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
});

function Index() {
  const dispatch = useDispatch();
  const classes = cardStyle();
  const selectedChild = useSelector(getSelectedChildInfo);
  const isLoading = useSelector(selectCommonLoadingState);
  const milestones = useSelector(childMilestone);
  const milestonePercentages = useSelector(milestonePercentage);

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

  const [expanded, setExpanded] = useState("panel1");
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedAgeUnit, setSelectedAgeUnit] = useState(null);
  const [toggle, setToggle] = useState(
    milestones &&
      milestones.length > 0 &&
      `${milestones[0].fetchAge} ${milestones[0].fetchAgeUnit}`
  );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
    image,
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
        <Box align="center" my={2}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={milestone1}
              title="2monthsImage"
            />
          </Card>
          <Typography variant="overline" component="h6">
            Current Milestone: {toggle}
          </Typography>
        </Box>

        <Box align="center" my={2}>
          <div style={{ flexDirection: "row" }}>
            {/* <Autocomplete
              id="milestone-select"
              options={milestones}
              size="small"
              getOptionLabel={(option) =>
                `${option.fetchAge} ${option.fetchAgeUnit}`
              }
              onChange={(event, value) => console.log("=========", value)}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="select a milestone"
                  variant="outlined"
                />
              )}
            /> */}
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
          </div>
        </Box>

        <Button
          style={{ width: "100%" }}
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
            setDialogType(CHILD_MILESTONES);
            setOpenDialog(true);
          }}
        >
          <Card style={{ width: "100%" }}>
            <CardContent>
              <List dense={false}>
                <ListItem style={{ marginTop: 10 }}>
                  <ListItemText
                    primary={`${selectedChild.firstName} ${
                      selectedChild.lastName
                    }'s ${selectedMilestoneProgressObj?.atAge || 0} ${
                      selectedMilestoneProgressObj?.atAgeUnit || "MONTHS"
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <div style={{ width: 70, height: 70 }}>
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
                        <div style={{ fontSize: 12 }}>
                          <strong>
                            {selectedMilestoneProgressObj?.completedPercentage ||
                              0}
                            %
                          </strong>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Button>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid md={4}>
            <Button
              variant="contained"
              color="primary"
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
              style={{
                backgroundColor: "#b8c7e0",
                color: "#FFFFFF",
                padding: 10,
                height: 60,
                width: 100,
              }}
              style={{
                position: "relative",
                height: 60,
                width: 100,
                display: "block",
                margin: "30px auto",
                padding: 0,
                overflow: "hidden",
                "border-width": 0,
                outline: "none",
                "border-radius": "2px",
                " box-shadow": "0 1px 4px rgba(0, 0, 0, .6)",
                "background-color": "#d9d9d9",
                color: "#000000",
                transition: "background-color .3s",
              }}
            >
              Child Summary
            </Button>
          </Grid>
          <Grid md={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setDialogType(HEALTH_TIPS);
                setOpenDialog(true);
              }}
              style={{
                position: "relative",
                height: 60,
                width: 100,
                display: "block",
                margin: "30px auto",
                padding: 0,
                overflow: "hidden",
                "border-width": 0,
                outline: "none",
                "border-radius": "2px",
                " box-shadow": "0 1px 4px rgba(0, 0, 0, .6)",
                "background-color": "#d9d9d9",
                color: "#000000",
                transition: "background-color .3s",
              }}
            >
              Health Tips
            </Button>
          </Grid>
          <Grid md={4}>
            <Button
              variant="contained"
              color="primary"
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
              style={{
                position: "relative",
                height: 60,
                width: 100,
                display: "block",
                margin: "30px auto",
                padding: 0,
                overflow: "hidden",
                "border-width": 0,
                outline: "none",
                "border-radius": "2px",
                " box-shadow": "0 1px 4px rgba(0, 0, 0, .6)",
                "background-color": "#d9d9d9",
                color: "#000000",
                transition: "background-color .3s",
              }}
            >
              Consult Doctor
            </Button>
          </Grid>
        </Grid>

        {/* <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Social</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Milestonedetails dataType="m1" />
          </AccordionDetails>
        </Accordion>
        <Accordion
          square
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Communication</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Milestonedetails dataType="m2" />
          </AccordionDetails>
        </Accordion> */}
      </Box>
    </>
  );
}

export default Index;
