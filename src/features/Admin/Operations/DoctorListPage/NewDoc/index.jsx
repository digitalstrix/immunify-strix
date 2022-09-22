import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ProfileInfo from "./ProfileInfo";
import EducationInfo from "./EducationInfo";
import WorkExpInfo from "./WorkExpInfo";
import ConsultationPlanInfo from "./ConsultationPlanInfo";
import AvailabiltyCal from "./AvailabalityCalInfo";
import HospitalInfo from "./HospitalInfo";
import MainToolbar from "./MainToolbar";
import { Box, Container } from "@material-ui/core";

import { setGeneralInfo, setEducation, setWorkExperience, setAvailabilityCalender, setHospital, setConsultationPlan } from '../doctorListSlice';
import {
  createProfilePayload,
  validateProfilePayload,
  generateProfileInputErrors
} from '../../../../../utils/doctorListUtils';
import { notify, excuteAfterGivenDelay } from '../../../../../utils/commonUtils';

import { resetSelectedDoctor, createDoctor, persistOptionalDoctorInfo } from '../doctorListSlice';
import {
  selectAppointmentTypes,
  selectAddDoctorStatus,
  selectOptionalInfoUpdatingStatus,
  selectSpecializations,
  selectGeneralInfo
} from '../selector';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const IS_OPTIONAL = 'isOptional';
const TITLE = 'title';
const UPDATE_ACTION = 'updateAction';

const STEP_INFO = [
  {
    [TITLE]: 'General Info',
    [IS_OPTIONAL]: false,
    [UPDATE_ACTION]: setGeneralInfo
  },
  {
    [TITLE]: 'Education Info',
    [IS_OPTIONAL]: true,
    [UPDATE_ACTION]: setEducation
  },
  {
    [TITLE]: 'Work Info',
    [IS_OPTIONAL]: true,
    [UPDATE_ACTION]: setWorkExperience
  },
  {
    [TITLE]: 'Consultation Plan',
    [IS_OPTIONAL]: true,
    [UPDATE_ACTION]: setConsultationPlan
  },
  {
    [TITLE]: 'Availability Calendar',
    [IS_OPTIONAL]: true,
    [UPDATE_ACTION]: setAvailabilityCalender
  },
  {
    [TITLE]: 'Hospital Info',
    [IS_OPTIONAL]: false,
    [UPDATE_ACTION]: setHospital
  }
];

const getSteps = () => STEP_INFO.map(step => step[TITLE]);
const isStepOptional = (step) => STEP_INFO[step][IS_OPTIONAL];
const initGeneralInfo = () => ({
  country: ''
});
const initEducation = () => ({

});
const initWorkExperience = () => ([]);
const initConsultationPlan = () => ([]);
const initAvailabilityCalender = () => ([]);
const initHospital = () => ({

});
const DOCTOR_CREATION_SUCCESSFUL_MSG = 'Doctor created successully!';
const DOCTOR_CREATION_FAILURE_MSG = 'Doctor creation failed! Please try again.';
const DOCTOR_CREATION_FAILURE_DUPLICATE_MSG = 'Doctor with the same email address already exists!';
const DOCTOR_UPDATE_SUCCESSFUL_MSG = 'Doctor updated successfully!';
const DOCTOR_UPDATE_FAILURE_MSG = 'Doctor update failed! Please try again.';

const Index = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const appointmentTypes = useSelector(selectAppointmentTypes);
  const specializations = useSelector(selectSpecializations);
  const doctorGenInfo = useSelector(selectGeneralInfo);
  const [doctorCreated, setDoctorCreated] = useState(false);
  const addDoctorStatus = useSelector(selectAddDoctorStatus);
  const optionalInfoUpdatingStatus = useSelector(selectOptionalInfoUpdatingStatus);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set());
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const [generalInfo, setGeneralInfo] = useState(initGeneralInfo());
  const [generalInfoErrors, setGeneralInfoErrors] = useState({});

  const [education, setEducation] = useState(initEducation());
  const [educationInputErrors, setEducationInputErrors] = useState({});

  const [workExperience, setWorkExperience] = useState(initWorkExperience());
  const [workExpInputErrors, setWorkExpInputErrors] = useState({});

  const [consultationPlan, setConsultationPlan] = useState(initConsultationPlan());
  const [consultationPlanInputErrors, setConsultationPlanInputErrors] = useState({});

  const [availabilityCalender, setAvailabilityCalender] = useState(initAvailabilityCalender());
  const [availabilityCalenderInputErrors, setAvailabilityCalenderInputErrors] = useState({})

  const [hospital, setHospital] = useState(initHospital());
  const [hospitalInputErrors, setHospitalInputErrors] = useState({});

  const dispatch = useDispatch();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProfileInfo updateAction={setGeneralInfo} values={generalInfo} errorProps={generalInfoErrors} updateErrorProps={setGeneralInfoErrors} specializations={specializations} doctorCreated={doctorCreated}/>;
      case 1:
        return <EducationInfo updateAction={setEducation} values={education} errorProps={educationInputErrors} updateErrorProps={setEducationInputErrors}/>;
      case 2:
        return <WorkExpInfo updateAction={setWorkExperience} values={workExperience} errorProps={workExpInputErrors} updateErrorProps={setWorkExpInputErrors}/>;
      case 3:
        return <ConsultationPlanInfo updateAction={setConsultationPlan} values={consultationPlan} errorProps={consultationPlanInputErrors} updateErrorProps={setConsultationPlanInputErrors} appointmentTypes={appointmentTypes}/>;
      case 4:
        return <AvailabiltyCal updateAction={setAvailabilityCalender} values={availabilityCalender} plans={consultationPlan} errorProps={availabilityCalenderInputErrors} updateErrorProps={setAvailabilityCalenderInputErrors} appointmentTypes={appointmentTypes}/>;
      case 5:
        return <HospitalInfo updateAction={setHospital} values={hospital} errorProps={hospitalInputErrors} updateErrorProps={setHospitalInputErrors}/>;
      default:
        return "Unknown stepIndex";
    }
  }

  useEffect(() => {
    if (addDoctorStatus === 'succeeded') {
      notify(enqueueSnackbar, DOCTOR_CREATION_SUCCESSFUL_MSG);            
    } else if (addDoctorStatus === 'failed') {
      notify(enqueueSnackbar, DOCTOR_CREATION_FAILURE_MSG, 'error');
    } else if (addDoctorStatus === 'failed_duplicate_request') {
      notify(enqueueSnackbar, DOCTOR_CREATION_FAILURE_DUPLICATE_MSG, 'warning');
    }
  }, [addDoctorStatus, enqueueSnackbar]);

  useEffect(() => {
    if (optionalInfoUpdatingStatus === 'succeeded') {
      notify(enqueueSnackbar, DOCTOR_UPDATE_SUCCESSFUL_MSG);
      excuteAfterGivenDelay(() => {
        props.history.push('/doctor-list');
        dispatch(resetSelectedDoctor());
      }, 100);      
    } else if (optionalInfoUpdatingStatus === 'failed') {
      notify(enqueueSnackbar, DOCTOR_UPDATE_FAILURE_MSG, 'error');
    }
  }, [optionalInfoUpdatingStatus, enqueueSnackbar, props.history, dispatch]);

  useEffect(() => {
    if (doctorGenInfo) {
      setDoctorCreated(true);      
    }
  }, [doctorGenInfo]);

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepLast = (step) => {
    if (step === 5) {
      return true;
    }
    return false;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const skippedSteps = () => {
    return skipped.size;
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          steps.findIndex((step, i) => !completed.has(i))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    if (isStepLast(activeStep)) {
      console.log('updating optional info');
      dispatch(persistOptionalDoctorInfo({
        education,
        workExperience,
        consultationPlan,
        availabilityCalender,
        hospital
      }));
    } else if (isStepOptional(activeStep) || doctorCreated) {
      const newCompleted = new Set(completed);
      newCompleted.add(activeStep);
      setCompleted(newCompleted); 

      if (completed.size !== totalSteps() - skippedSteps()) {
        handleNext();
      }
    } else {
      const payload = createProfilePayload(generalInfo);
      console.log(payload);
      if (validateProfilePayload(payload)) {
        console.log('success');
        dispatch(createDoctor(payload));
      } else {
        const e = generateProfileInputErrors(generalInfo);
        console.log(e);
        setGeneralInfoErrors(e);
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(new Set());
    setSkipped(new Set());
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  function isStepComplete(step) {
    return completed.has(step);
  }
  
  return (
    <div className={classes.root}>
      <MainToolbar />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const buttonProps = {};
              if (isStepOptional(index)) {
                buttonProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepButton
                    disabled={!doctorCreated}
                    onClick={handleStep(index)}
                    completed={isStepComplete(index)}
                    {...buttonProps}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep, dispatch)}
                </Typography>
                <Box display="flex" justifyContent="flex-end">
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {!isStepLast(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isStepOptional(activeStep) && !doctorCreated}
                        onClick={handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                    {isStepOptional(activeStep) && !completed.has(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        // disabled={isStepFirst(activeStep)}
                        onClick={handleSkip}
                        className={classes.button}
                      >
                        Skip
                      </Button>
                    )}

                    {activeStep !== steps.length &&
                      (completed.has(activeStep) ? (
                        <Typography
                          variant="caption"
                          className={classes.completed}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleComplete}
                          disabled={(!isStepOptional(activeStep) && !isStepLast(activeStep)) && (addDoctorStatus === 'loading' || doctorCreated)}
                        >
                          {isStepLast(activeStep)
                            ? "Finish"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </div>
                </Box>
              </div>
            )}
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default withRouter(Index);
