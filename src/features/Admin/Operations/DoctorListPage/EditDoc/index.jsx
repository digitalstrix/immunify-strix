import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from "notistack";
import { Box, makeStyles, Grid } from "@material-ui/core";
import TabBar from "../../../../../common/components/TabBar";
import ProfileInfo from "../NewDoc/ProfileInfo";
import Description from "../NewDoc/Description";
import EducationInfo from "../NewDoc/EducationInfo";
import WorkExpInfo from "../NewDoc/WorkExpInfo";
import ConsultationPlanInfo from "../NewDoc/ConsultationPlanInfo";
import AvailabiltyCal from "../NewDoc/AvailabalityCalInfo";
import HospitalInfo from "../NewDoc/HospitalInfo";
import { SESSION_TIME_OPTIONS } from '../../../../../constants/doctorListConstants';

import {
  selectAppointmentTypes,
  selectSpecializations,
  selectGeneralInfo,
  selectWorkExperience,
  selectHospital,
  selectEducation,
  selectSessions,
  selectConsultationPlans,
  selectCountries,
  selectEducationUpdateStatus,
  selectExperienceUpdateStatus,
  selectConsultationPlanUpdateStatus,
  selectSessionUpdateStatus,
  selectHospitalUpdateStatus,
  selectGeneralInfoUpdateStatus,
  selectProfilePicture,
  selectDescription,
  selectDescriptionStatus
} from '../selector';
import { notify, initTime } from "../../../../../utils/commonUtils";
import { resetSelectedDoctor } from '../doctorListSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));


const initCountry = (countryId, countries) => {
  const country =  countries.find(({ id }) => id === countryId);
  if (country) {
    return country;
  }
  return { id : countryId, countryName: `${countryId}` };
}

const generateGeneralInfo = ({ firstName = '', lastName = '', contact, address1,
specialization, specializationId, country }, countries = []) => ({
  fullName: `${firstName} ${lastName}`,
  contactNumber: contact,
  specialization: { label: specialization, value: specializationId },
  address: address1,
  country: initCountry(country, countries)
});

const initGeneralInfo = (doctorGenInfo, countries) => {
  if (doctorGenInfo) {
    return {
      ...doctorGenInfo,
      ...generateGeneralInfo(doctorGenInfo, countries)
    };
  }
  return {};
};



const initEducation = (education) => {
  if (education) {
    return {
      ...education,
      digree: education.digree || '',
      parsingDate: education.parsingDate || new Date(),
      university: education.university || ''
    }
  }
  return {
    parsingDate: new Date()
  };
};

const initDescription = (description) => {
  console.log('chill', description)
  if (description) {
    return {
      ...description,
      description: description.description || '',
    }
  }
  return {};
};
const initWorkExperience = (workExperience) => {
  if (workExperience) {
    return workExperience.map((record) => ({
      ...record,
      hospital: record.hospitalClinic,
      startDate: record.startDate ? new Date(record.startDate) : new Date(),
      endDate: record.endDate ? new Date(record.endDate) : new Date()
    }));
  }
  return [];
};

const pickAppointmentType = (appointmentType, appointmentTypes) => {
  appointmentTypes = [
    {label: "Telemedicine", value: 1},
    {label: "General", value: 2},
    {label: "Home Vaccination", value: 3},
  ]
  return appointmentTypes.find(({ label }) => label === appointmentType);
};

const pickSessionTimeOption = (sessionTime) => {
  return SESSION_TIME_OPTIONS.find(({ label }) => label === sessionTime);
}
const initConsultationPlan = (consultationPlan = null, appointmentTypes = []) => {
  if (consultationPlan) {
    return consultationPlan.map(record => ({
      ...record,
      appoinmentType: pickAppointmentType(record.appoinmentType, appointmentTypes),
      sessionTime: pickSessionTimeOption(record.sessionTime),
      session: record.sessionTime
    }));
  }
  return [];
};

const initAvailabilityCalender = (sessions, appointmentTypes) => {
  if (sessions) {
    return sessions.map((session) => ({
      ...session,
      appoinment: session.appoinmentType,
      appoinmentType: pickAppointmentType(session.appoinmentType, appointmentTypes),
      startTime: initTime(session.startTime),
      endTime: initTime(session.endTime),
      days: JSON.parse(session.days),
      months: JSON.parse(session.months),
      years: JSON.parse(session.years)
    }));
  }
  return [];
};
const initHospital = (hospital) => {

  if (hospital) {
    return {
      ...hospital,
      hospital: hospital.hospitalName || '',
      phone: hospital.phoneNumber || ''
    }
  }
  return {};
};


const Index = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const appointmentTypes = useSelector(selectAppointmentTypes);
  const specializations = useSelector(selectSpecializations);
  const doctorGenInfo = useSelector(selectGeneralInfo);
  const countries = useSelector(selectCountries);
  const profilePicture = useSelector(selectProfilePicture);

  const [generalInfo, setGeneralInfo] = useState(initGeneralInfo(doctorGenInfo, countries));
  const [generalInfoErrors, setGeneralInfoErrors] = useState({});

  const [education, setEducation] = useState(initEducation());
  const [description, setDescription] = useState(initDescription());
  const [educationInputErrors, setEducationInputErrors] = useState({});

  const [workExperience, setWorkExperience] = useState(initWorkExperience());
  const [workExpInputErrors, setWorkExpInputErrors] = useState({});

  const [consultationPlan, setConsultationPlan] = useState(initConsultationPlan());
  const [consultationPlanInputErrors, setConsultationPlanInputErrors] = useState({});

  const [availabilityCalender, setAvailabilityCalender] = useState(initAvailabilityCalender());
  const [availabilityCalenderInputErrors, setAvailabilityCalenderInputErrors] = useState({})

  const [hospital, setHospital] = useState(initHospital());
  const [hospitalInputErrors, setHospitalInputErrors] = useState({});

  const currentWorkExperience = useSelector(selectWorkExperience);
  const currentEducation = useSelector(selectEducation);
  const currentDescription = useSelector(selectDescription);
  const currentHospital = useSelector(selectHospital);
  const currentSessions = useSelector(selectSessions);
  const currentConsultationPlans = useSelector(selectConsultationPlans);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSelectedDoctor());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('initializing general info');
    setGeneralInfo(initGeneralInfo(doctorGenInfo, countries));
  }, [doctorGenInfo, countries]);

  useEffect(() => {
    console.log('initializaing work experience')
    setWorkExperience(initWorkExperience(currentWorkExperience));
  }, [currentWorkExperience]);

  useEffect(() => {
    console.log('updateing education');
    setEducation(initEducation(currentEducation));
  }, [currentEducation]);

  useEffect(() => {
    console.log('updating description', currentDescription);
    setDescription(initDescription(currentDescription));
  }, [currentDescription]);

  useEffect(() => {
    console.log('updating hospital info')
    setHospital(initHospital(currentHospital));
  }, [currentHospital]);

  useEffect(() => {
    console.log('updating sessions');
    setAvailabilityCalender(initAvailabilityCalender(currentSessions, appointmentTypes));
  }, [currentSessions, appointmentTypes]);

  useEffect(() => {
    console.log('initing consultation plans')
    setConsultationPlan(initConsultationPlan(currentConsultationPlans, appointmentTypes));
  }, [currentConsultationPlans, appointmentTypes]);

  const educationUpdateStatus = useSelector(selectEducationUpdateStatus);
  const workExperienceUpdateStatus = useSelector(selectExperienceUpdateStatus);
  const consultationPlanUpdateStatus = useSelector(selectConsultationPlanUpdateStatus);
  const sessionUpdateStatus = useSelector(selectSessionUpdateStatus);
  const hospitalUpdateStatus = useSelector(selectHospitalUpdateStatus);
  const descriptionupdateStatus = useSelector(selectDescriptionStatus);
  const generalInfoStatus = useSelector(selectGeneralInfoUpdateStatus);

  useEffect(() => {
    if (educationUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Education information updated successfully!');
    } else if (educationUpdateStatus === 'failed') {
      notify(enqueueSnackbar, 'Education inforamtion update failed! Please try again.', 'error');
    }
  }, [educationUpdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (workExperienceUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Work experience updated successfully!');
    } else if (workExperienceUpdateStatus === 'failed') {
      notify(enqueueSnackbar, 'Work experience update failed! Please try again.', 'error');
    }
  }, [workExperienceUpdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (consultationPlanUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Consultation plan updated successfully!');
    } else if (consultationPlanUpdateStatus === 'failed') {
      notify(enqueueSnackbar, 'Consultation plan update failed! Please try again.', 'error');
    }
  }, [consultationPlanUpdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (descriptionupdateStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Description updated successfully!');
    } else if (descriptionupdateStatus === 'failed') {
      notify(enqueueSnackbar, 'Description update failed! Please try again.', 'error');
    }
  }, [descriptionupdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (sessionUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Sessions created/updated successfully!');
    } else if (sessionUpdateStatus === 'failed') {
      notify(enqueueSnackbar, 'Sessions update failed! Please try again.', 'error');
    } else if (sessionUpdateStatus === 'failed_duplicate_request') {
      notify(enqueueSnackbar, 'Failed to create/update session since times are conflicting with another session or session with the same name.', 'warning');
    } else if (sessionUpdateStatus === 'failed_bad_request') {
      notify(enqueueSnackbar, 'Please check the start and end times.', 'warning');
    } else if (sessionUpdateStatus === 'failed_forbidden') {
      notify(enqueueSnackbar, 'Per appointment time should be at least 10 minutes! Adjust the time/appointments accordingly.', 'warning')
    }
  }, [sessionUpdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (hospitalUpdateStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Hopital information updated successfully!');
    } else if (hospitalUpdateStatus === 'failed') {
      notify(enqueueSnackbar, 'Hospital information update failed! Please try again.', 'error');
    }
  }, [hospitalUpdateStatus, enqueueSnackbar]);

  useEffect(() => {
    if (generalInfoStatus === 'succeeded') {
      notify(enqueueSnackbar, 'Doctor updated successfully!');
    } else if (generalInfoStatus === 'failed') {
      notify(enqueueSnackbar, 'Doctor update failed! Please try again.', 'error');
    }
  }, [generalInfoStatus, enqueueSnackbar]);

  return (
    <div className={classes.root}>
      <Box mt={3}>
        <Grid container direction="row" justify="center" alignItems="center">

          <TabBar
            tab1title="General"
            tab1data={<ProfileInfo updateAction={setGeneralInfo} values={generalInfo} errorProps={generalInfoErrors} updateErrorProps={setGeneralInfoErrors} specializations={specializations} isUpdate={true} profilePicture={profilePicture}/>}


            tab2title="Description"
            tab2data={<Description values={description} updateAction={setDescription} isUpdate={true} />}


            tab3title="Education"
            tab3data=
            {<EducationInfo updateAction={setEducation} values={education} errorProps={educationInputErrors} updateErrorProps={setEducationInputErrors} isUpdate={true} />}


            tab4title="Work Experience"
            tab4data=
            {<WorkExpInfo updateAction={setWorkExperience} values={workExperience} errorProps={workExpInputErrors} updateErrorProps={setWorkExpInputErrors} isUpdate={true} />}


            tab5title="Consultation Plan"
            tab5data=
            {<ConsultationPlanInfo updateAction={setConsultationPlan} values={consultationPlan} errorProps={consultationPlanInputErrors} updateErrorProps={setConsultationPlanInputErrors} appointmentTypes={appointmentTypes} isUpdate={true} />}


            tab6title="Availabality Calendar"
            tab6data={<AvailabiltyCal updateAction={setAvailabilityCalender} values={availabilityCalender} errorProps={availabilityCalenderInputErrors} updateErrorProps={setAvailabilityCalenderInputErrors} appointmentTypes={appointmentTypes} isUpdate={true} sessionUpdateStatus={sessionUpdateStatus} consultationPlan={consultationPlan} />}


            tab7title="Hospital"
            tab7data={<HospitalInfo updateAction={setHospital} values={hospital} errorProps={hospitalInputErrors} updateErrorProps={setHospitalInputErrors} isUpdate={true} />}

            variant="scrollable"
          />
        </Grid>
      </Box>
    </div>
  );
};

export default Index;
