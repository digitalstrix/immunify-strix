import React, { useEffect, useRef, useState } from "react";
import defaultChild from "../../../../assets/img/Background/default-baby-img.jpeg";
import {
  Card,
  Grid,
  CardContent,
  Box,
  CardMedia,
  CardActionArea,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { DialogContent } from "../../../../common/components/Admin/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { selectedMilestone } from "./ChildSummary/selector";
import { getChildMilestoneDetails } from "./milestoneSlice";
import { getChildBelongsParent, selectedMilestoneImage } from "./selector";
import { makeStyles } from "@material-ui/core/styles";
import Milestonedetails from "./MilestoneDetails";
import Skeleton from "@material-ui/lab/Skeleton";

export const DetailedMilestones = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const [isHeaderImageLoaded, setIsHeaderImageLoaded] = useState(false);
  const classes = useStyles();
  const { image, childId, atAgeUnit, atAge, index } =
    useSelector(selectedMilestone);

  useEffect(() => {
    dispatch(
      getChildMilestoneDetails({
        childId,
        atAgeUnit,
        atAge,
      })
    );
  }, [childId, atAge, atAgeUnit, dispatch]);

  const { id, country } = useSelector(getChildBelongsParent);

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

  const inputFile = useRef(null);
  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <DialogContent>
        <Card>
          <CardContent>
            <Box align="center" my={2}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    onButtonClick();
                  }}
                >
                  <CardMedia
                    style={{
                      height: "300px",
                      display: isHeaderImageLoaded ? "" : "none",
                    }}
                    component="img"
                    image={imageUri()}
                    title="Contemplative Reptile"
                    onLoad={() => {
                      setIsHeaderImageLoaded(true);
                    }}
                  />
                  {!isHeaderImageLoaded && (
                    <Skeleton variant="rect" width={"auto"} height={"300px"} />
                  )}
                  <input
                    type="file"
                    id="file"
                    name="myImage"
                    accept="image/*"
                    ref={inputFile}
                    onChange={(e) => {}}
                    style={{ display: "none" }}
                  />
                </CardActionArea>
              </Card>
            </Box>
            <Divider
              dark
              variant="full"
              style={{ width: "100%", marginBottom: 10 }}
            />
            <Grid container spacing={3}>
              <Grid container justify="center" item xs={12}>
                <Typography variant="h5" component="h5" gutterBottom>
                  {atAge} {atAgeUnit}
                </Typography>
              </Grid>
              <Grid
                container
                justify="center"
                item
                xs={12}
                style={{ marginTop: -30 }}
              >
                <Typography variant="h6" component="h6" gutterBottom>
                  Milestone Checklist
                </Typography>
              </Grid>
              <Grid container xs={12} style={{ padding: 10 }}>
                <Accordion
                  square
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  style={{ width: "100%", backgroundColor: "#ededed" }}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography variant="h6">Social</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Milestonedetails dataType="social" />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  square
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  style={{ width: "100%", backgroundColor: "#ededed" }}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography variant="h6">Communication</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Milestonedetails dataType="communication" />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  square
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  style={{ width: "100%", backgroundColor: "#ededed" }}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography variant="h6">Cognitive</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Milestonedetails dataType="cognitive" />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  square
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                  style={{ width: "100%", backgroundColor: "#ededed" }}
                >
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography variant="h6">Physical Development</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Milestonedetails dataType="physical" />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
    </div>
  );
};

export default DetailedMilestones;

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  },
}));
