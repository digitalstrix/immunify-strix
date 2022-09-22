import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  childBelongsNutritions,
  childBreakFirstFeed,
  childDinnerFeed,
  childLunchFeed,
  getSelectedChildInfo,
  selectCommonLoadingState,
} from "./selector";
import {
  getChildNutritionPlan,
  setSelectedChildNutritionData,
} from "./ChildNutritionSlice";

import z61 from "../../../../assets/img/Nutrition/0-6/1.jpg";
import z62 from "../../../../assets/img/Nutrition/0-6/2.jpg";
import z63 from "../../../../assets/img/Nutrition/0-6/3.jpg";
import z64 from "../../../../assets/img/Nutrition/0-6/4.jpg";
import z65 from "../../../../assets/img/Nutrition/0-6/5.jpg";
import z66 from "../../../../assets/img/Nutrition/0-6/6.jpg";
import z67 from "../../../../assets/img/Nutrition/0-6/7.jpg";
import z68 from "../../../../assets/img/Nutrition/0-6/8.jpg";

import z11 from "../../../../assets/img/Nutrition/1-3/1.jpg";
import z12 from "../../../../assets/img/Nutrition/1-3/2.jpg";
import z13 from "../../../../assets/img/Nutrition/1-3/3.jpg";
import z14 from "../../../../assets/img/Nutrition/1-3/4.jpg";

import z689 from "../../../../assets/img/Nutrition/6-8/9.jpg";

import z461 from "../../../../assets/img/Nutrition/4-6/1.jpg";
import z462 from "../../../../assets/img/Nutrition/4-6/2.jpg";

import z781 from "../../../../assets/img/Nutrition/7-8/sec21.jpg";
import z782 from "../../../../assets/img/Nutrition/7-8/sec22.jpg";
import z783 from "../../../../assets/img/Nutrition/7-8/sec23.jpg";
import z784 from "../../../../assets/img/Nutrition/7-8/sec24.jpg";
import z785 from "../../../../assets/img/Nutrition/7-8/sec25.jpg";
import z786 from "../../../../assets/img/Nutrition/7-8/sec26.jpg";
import z787 from "../../../../assets/img/Nutrition/7-8/sec27.jpg";
import z788 from "../../../../assets/img/Nutrition/7-8/sec28.jpg";
import z789 from "../../../../assets/img/Nutrition/7-8/sec29.jpg";
import z790 from "../../../../assets/img/Nutrition/7-8/sec210.jpg";

import z9125 from "../../../../assets/img/Nutrition/9-12/5.jpg";
import z9126 from "../../../../assets/img/Nutrition/9-12/6.jpg";

const Z61Img = () => (
  <img src={z61} width="100%" height="100%" alt="NutritionImage" />
);

const Z62Img = () => (
  <img src={z62} width="100%" height="100%" alt="NutritionImage" />
);

const Z63Img = () => (
  <img src={z63} width="100%" height="100%" alt="NutritionImage" />
);

const Z64Img = () => (
  <img src={z64} width="100%" height="100%" alt="NutritionImage" />
);

const Z65Img = () => (
  <img src={z65} width="100%" height="100%" alt="NutritionImage" />
);

const Z66Img = () => (
  <img src={z66} width="100%" height="100%" alt="NutritionImage" />
);

const Z67Img = () => (
  <img src={z67} width="100%" height="100%" alt="NutritionImage" />
);

const Z68Img = () => (
  <img src={z68} width="100%" height="100%" alt="NutritionImage" />
);

const Z11Img = () => (
  <img src={z11} width="100%" height="100%" alt="NutritionImage" />
);

const Z12Img = () => (
  <img src={z12} width="100%" height="100%" alt="NutritionImage" />
);

const Z13Img = () => (
  <img src={z13} width="100%" height="100%" alt="NutritionImage" />
);

const Z14Img = () => (
  <img src={z14} width="100%" height="100%" alt="NutritionImage" />
);

const Z689Img = () => (
  <img src={z689} width="100%" height="100%" alt="NutritionImage" />
);

const Z461Img = () => (
  <img src={z461} width="100%" height="100%" alt="NutritionImage" />
);

const Z462Img = () => (
  <img src={z462} width="100%" height="100%" alt="NutritionImage" />
);

const Z781Img = () => (
  <img src={z781} width="100%" height="100%" alt="NutritionImage" />
);

const Z782Img = () => (
  <img src={z782} width="100%" height="100%" alt="NutritionImage" />
);

const Z783Img = () => (
  <img src={z783} width="100%" height="100%" alt="NutritionImage" />
);

const Z784Img = () => (
  <img src={z784} width="100%" height="100%" alt="NutritionImage" />
);

const Z785Img = () => (
  <img src={z785} width="100%" height="100%" alt="NutritionImage" />
);

const Z786Img = () => (
  <img src={z786} width="100%" height="100%" alt="NutritionImage" />
);

const Z787Img = () => (
  <img src={z787} width="100%" height="100%" alt="NutritionImage" />
);

const Z788Img = () => (
  <img src={z788} width="100%" height="100%" alt="NutritionImage" />
);

const Z789Img = () => (
  <img src={z789} width="100%" height="100%" alt="NutritionImage" />
);

const Z790Img = () => (
  <img src={z790} width="100%" height="100%" alt="NutritionImage" />
);

const Z9125Img = () => (
  <img src={z9125} width="100%" height="100%" alt="NutritionImage" />
);

const Z9126Img = () => (
  <img src={z9126} width="100%" height="100%" alt="NutritionImage" />
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Index = ({ data }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedChildInfo = useSelector(getSelectedChildInfo);
  const isLoading = useSelector(selectCommonLoadingState);

  const childNutrition = useSelector(childBelongsNutritions);
  const childBreakFirst = useSelector(childBreakFirstFeed);
  const childLunch = useSelector(childLunchFeed);
  const childDinner = useSelector(childDinnerFeed);

  const { childAgeByMonth, childNutritions } = childNutrition;

  useEffect(() => {
    if (isLoading !== false) {
      dispatch(
        getChildNutritionPlan({
          childId: selectedChildInfo?.id,
          country: selectedChildInfo?.BirthInformation?.country,
          dateOfBirth: selectedChildInfo?.BirthInformation?.dateOfBirth,
        })
      );
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedChildNutritionData([]));
    };
  }, []);

  return (
    <div className={classes.root}>
      {isLoading && childAgeByMonth ? (
        <>
          <Skeleton animation="pulse" height={60} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
          <Skeleton animation="pulse" height={60} style={{ marginTop: -20 }} />
        </>
      ) : (
        <>
          {childAgeByMonth >= 72 && (
            <Accordion disabled={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <Box fontWeight={600}>
                    Nutrition plan for children more than 6 years old is not
                    provided.
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Z61Img />
              </AccordionDetails>
            </Accordion>
          )}

          {childAgeByMonth <= 6 && (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>1st 06 Months Tips</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z61Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Foremilk and Hindmilk</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z62Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Expressed Milk</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z63Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Breastfeeding</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z64Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Breastfeeding Positions</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z65Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Breast Milk Benefits for Mom</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z67Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Breast Milk Benefits for Baby</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z68Img />
                </AccordionDetails>
              </Accordion>
            </>
          )}

          {childAgeByMonth >= 7 && childAgeByMonth <= 8 && (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Complementary Feeding</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z781Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Optimal Feeding</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z782Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>When to Start</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z783Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>The Pillars</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z784Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Key Tips</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z785Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>How to start</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z786Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Right Consistency</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z787Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Food Groups</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z788Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Household Measure</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z789Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Sample Meal Plan</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z790Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Successfull Feeding</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z9125Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>What to Avoid</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z9126Img />
                </AccordionDetails>
              </Accordion>
            </>
          )}

          {childAgeByMonth >= 9 && childAgeByMonth <= 11 && (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>How to Start</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Food Groups</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Ideal Meal Goal</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Sample Meal Plan</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>HouseHold Measures</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Successful Feeding</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>What to Avoid</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </>
          )}

          {childAgeByMonth >= 12 && childAgeByMonth <= 36 && (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Switch to Family Pot</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z11Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Nutrition Requirement</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z12Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Sample Meal Plan</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z13Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Points to Remember</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z14Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Household Measure</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z689Img />
                </AccordionDetails>
              </Accordion>
            </>
          )}

          {childAgeByMonth >= 37 && childAgeByMonth <= 71 && (
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Nutrition Requirement</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z461Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Sample Meal Plan</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z462Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Household Measures</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z689Img />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography className={classes.heading}>
                    <Box fontWeight={600}>Points to Remember</Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Z14Img />
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Index;
