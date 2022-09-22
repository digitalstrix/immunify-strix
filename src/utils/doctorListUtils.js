import Joi from 'joi';
import { extractDateStr, extractTime } from './commonUtils';
import {
    ERROR_MSG_REQUIRED,
    ERROR_MSG_NUMBER_REQUIRED,
    ERROR_MSG_REQUIRED_VALID_EMAIL,
    AMOUNT_INPUT_NAME,
    PROFILE_INPUTS,
    EDUCATION_INPUTS,
    WORK_EXPERIENCE_INPUTS,
    HOSPITAL_INPUTS,
    CONSULTATION_PLAN_INPUTS,
    SESSION_INPUTS,
    CONSULTING_FEE_AMOUNT,
    CONSULTING_FEE,
    AVAILABILITY
} from '../constants/doctorListConstants';
const {ANY_DAY, TODAY, NEXT_THREE_DAYS, COMMING_WEEKEND} = AVAILABILITY;

const ProfileSchema = Joi.object({
    firstName: Joi.string().required(),    
    lastName: Joi.string().required(),    
    fullName: Joi.string(),    
    email: Joi.string().email({ tlds: {allow: false} }).required(),
    country: Joi.number().required(),
    contactNumber: Joi.string().required(),
    registrationNumber: Joi.string().required(),
    specialization: Joi.number().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    address2: Joi.string(),
    state: Joi.string(),
    placeId: Joi.string().allow(null),
    latitude: Joi.number().allow(null),
    longitude: Joi.number().allow(null)
});

const WorkExperienceSchema = Joi.object({
    hospital: Joi.string().required(),
    address: Joi.string().required(),
    startDate: Joi.object().allow(null),
    endDate: Joi.object().allow(null)
});

const ConsultationPlanSchema = Joi.object({
    appoinmentType: Joi.object().required(),
    sessionTime: Joi.object().required(),
    amount: Joi.number().required()
});

const SessionSchema = Joi.object({
    id: Joi.string().allow(null),
    sessionName: Joi.string().required(),
    startTime: Joi.object().required(),
    endTime: Joi.object().required(),
    appoinmentType: Joi.object().required(),
    patientSlots: Joi.number().required(),
    years: Joi.array().required(),
    months: Joi.array().required(),
    days: Joi.array().required()
});

const EducationSchema = Joi.object({
    digree: Joi.string().required(),
    university: Joi.string().required(),
    parsingDate: Joi.object().allow(null)
});

const HospitalSchema = Joi.object({
    hospital: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().allow(null)
});

const GenericValidationSchema = {
    validate: (value) => !value ? { error : 'required' } : { error: null }
};

const NumberValidationSchema = Joi.number().required();
// const countryValidationSchema = Joi.object({
//     countryCode: Joi.string().allow(''),
//     countryName: Joi.string().required(),
//     id: Joi.number().required()
// });
const emailValidationSchema =  Joi.string().email({ tlds: {allow: false} }).required();

const getValidationSchema = (name) => name === 'email' ? emailValidationSchema : GenericValidationSchema;

export const validateProfileInput = ({ name, value }) => {
    const validationSchema = getValidationSchema(name);
    const { error } = validationSchema.validate(value);
    if (error) {
        if (name === 'email') {
            return ERROR_MSG_REQUIRED_VALID_EMAIL;
        }
        return ERROR_MSG_REQUIRED;
    }
    return null;
}

export const validateProfilePayload = (payload) => {
    const { error } = ProfileSchema.validate(payload);
    console.log(error);
    return !error;
};

export const createProfilePayload = (inputs) => {
    return {
        ...inputs,
        country: inputs.country ? inputs.country.id : '',
        specialization: inputs.specialization ? inputs.specialization.value : '',
        fullName: `${inputs.firstName} ${inputs.lastName}`,
    }
};

export const generateProfileInputErrors = (inputs) => {
    return PROFILE_INPUTS.map(input => ({
        [input]: validateProfileInput({ name: input, value: inputs[input]})
    })).reduce((acc, val) => ({ ...acc, ...val}), {});
};

export const validateEducationInput = ({ name , value }) => {
    const currentInput = EDUCATION_INPUTS.find(({ fieldName }) => fieldName === name);
    if (currentInput && currentInput.required) {
        const { error } = GenericValidationSchema.validate(value);
        if (error) {
            return ERROR_MSG_REQUIRED;
        }
    }    
    return null;
};

export const validateEducationPayload = (payload) => {
    const { error } = EducationSchema.validate(payload);
    console.log(error);
    return !error;
}

export const generateEducationPayloadValidationErrors = (inputs) => {
    return EDUCATION_INPUTS.map(({ fieldName }) => ({
        [fieldName]: validateEducationInput({ name: fieldName, value: inputs[fieldName]})
    })).reduce((acc, val) => ({ ...acc, ...val}), {});
};

export const validateWorkExpInput = ({ name , value }) => {
    const currentInput = WORK_EXPERIENCE_INPUTS.find(({ fieldName }) => fieldName === name);
    if (currentInput && currentInput.required) {
        const { error } = GenericValidationSchema.validate(value);
        if (error) {
            return ERROR_MSG_REQUIRED;
        }
    }    
    return null;
};

export const validateWorkExpInputs = (payload) => {
    const { error } = WorkExperienceSchema.validate(payload);
    return !error;
};

export const generateWorkExpPayloadErrors = (payload) => {
    return WORK_EXPERIENCE_INPUTS.map(({ fieldName }) => ({
        [fieldName]: validateWorkExpInput({ name: fieldName, value: payload[fieldName] })
    })).reduce((acc, val) => ({ ...acc, ...val }), {});
};

const isAmountInput = name => name === AMOUNT_INPUT_NAME;

export const validateConsultationPlanInput = ({ name, value }) => {
    const validationSchema = isAmountInput(name) ? NumberValidationSchema : GenericValidationSchema;
    const { error } = validationSchema.validate(value);
    if (error) {
        return isAmountInput(name) ? ERROR_MSG_NUMBER_REQUIRED : ERROR_MSG_REQUIRED;
    }
    return null;
};

export const validateConsultationPlanPayload = (payload) => {
    const { error } = ConsultationPlanSchema.validate(payload);
    return !error;
}

export const generateConsultationPayloadValidationErrors = (payload) => {
    return CONSULTATION_PLAN_INPUTS.map(({ fieldName }) => ({
        [fieldName]: validateConsultationPlanInput({ name: fieldName, value: payload[fieldName] })
    })).reduce((acc, val) => ({ ...acc, ...val }), {});  
};

export const validateHospitalInput = ({ name , value }) => {
    const currentInput = HOSPITAL_INPUTS.find(({ fieldName }) => fieldName === name);
    if (currentInput && currentInput.required) {
        const { error } = GenericValidationSchema.validate(value);
        if (error) {
            return ERROR_MSG_REQUIRED;
        }
    }    
    return null;
};

export const validateHospitalPayload = (payload) => {
    const { error } = HospitalSchema.validate(payload);
    console.log(error);
    return !error;
}

export const generateHospitalPayloadValidationErrors = (inputs) => {
    return HOSPITAL_INPUTS.map(({ fieldName }) => ({
        [fieldName]: validateHospitalInput({ name: fieldName, value: inputs[fieldName]})
    })).reduce((acc, val) => ({ ...acc, ...val}), {});
};

export const validateSessionInput = ({ name, value }) => {
    const { error } = GenericValidationSchema.validate(value);
    if (error) {
        return ERROR_MSG_REQUIRED;
    }
    return null;
};

export const validateSessionPayload = (payload) => {
    const { error } = SessionSchema.validate(payload);
    return !error;    
};

export const generateSessionInputValidationErrors = (payload) => {
    return SESSION_INPUTS.map(({ fieldName }) => ({
        [fieldName]: validateConsultationPlanInput({ name: fieldName, value: payload[fieldName] })
    })).reduce((acc, val) => ({ ...acc, ...val }), {});
};

export const formatWorkExp = (records = []) => {
    return records.map(({ startDate, endDate, ...rest }) => ({
        ...rest,
        startDate,
        endDate,
        start: startDate ? extractDateStr(startDate) : null,
        end: endDate ? extractDateStr(endDate) : null
    }));
}

export const formatConsultationPlan = (records = []) => {
    return records.map(({ appoinmentType, sessionTime, ...rest }) => ({
        ...rest,
        appoinmentType,
        sessionTime,
        appoinment: appoinmentType?.label,
        session: sessionTime?.value
    }));
}

export const formatSessions = (records = []) => {
    return records.map(({ appoinmentType, startTime, endTime, ...rest }) => ({
        ...rest,
        appoinmentType,
        startTime,
        endTime,
        start: extractTime(startTime),
        end: extractTime(endTime),
        appoinment: appoinmentType.label
    }));
};

export const getDoctorPayloadAdditonalData = () => ({
    regType: 'SELF',
    userType: 'DOCTOR',
});

// export const initTime = (timeStr) => {
//     const date = new Date().toISOString().split('T')[0];
//     return new Date(`${date}T${timeStr}`);
// }

export const formatSessionRecord = (record, id) => ({
    ...record,
    doctorId: id,
    appoinmentType: record.appoinmentType.label,
    startTime: extractTime(record.startTime),
    endTime: extractTime(record.endTime)
});

export const formatConsultationRecord = (record, id) => ({
    ...record,
    personId: id,
    appoinmentType: record.appoinmentType.label,
    sessionTime: record.sessionTime.value
});

export const convertConsultationRecord = ({ appoinmentType, sessionTime, ...rest }) => {
    return ({
        ...rest,
        sessionTime: sessionTime.label,
        appoinmentType: appoinmentType.label 
    });
}

export const convertSessionRecord = ({ appoinmentType, years, months, days, startTime, endTime, ...rest}) => {
    return ({
        ...rest,
        appoinmentType: appoinmentType.label,
        years: JSON.stringify(years),
        months: JSON.stringify(months),
        days: JSON.stringify(days),
        startTime: extractTime(startTime),
        endTime: extractTime(endTime),
    });
}

const getSpecialization = (specializationId, specializations) => {
    const id = Number(specializationId);
    const specialization = specializations.find(({ value }) => value === id);
    if (specialization) {
        return specialization.label;
    }
    return specializationId;
};

export const formatDoctors = (doctors = [], specializations = []) => {
    return doctors.map(({ specialization, ...rem }) => ({
        ...rem,
        specialization: getSpecialization(specialization, specializations),
        specializationId: Number(specialization)
    }));
};

export const formatEducationPayload = ({ digree, university, parsingDate }) => ({
    degree: digree,
    college: university,
    passingDate: parsingDate,
})

export const formatDescriptionPayload = ({ doctorId, description, addedBy }) => ({
  doctorId: doctorId,
  description: description,
  addedBy: addedBy,
});
// export const createDoctorEducationPayload = (edu)

export const generateProfileUploadPayload = ({ file, country, personId }) => {
    const formData = new FormData();
    formData.append("immunifyMe", file);
    formData.append("immunifyMe", JSON.stringify({
      uploadInfo: {
          country,
          personId
      }
    }));
    return formData;
}

const getConsultingFee = (fee, consultingFee) => {
  let amount = [];
  if (consultingFee === CONSULTING_FEE.FREE) {
    amount.push(0, 0);
  } else {
    amount = CONSULTING_FEE_AMOUNT[consultingFee];
  }
  return fee >= amount[0] && fee <= amount[1];
};

const getDateOnly = (date = new Date()) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

const calculateDate = (availabilityType, doctorAvailableDate) => {
  const currentDate = new Date();
  let isDateFiltered;
  if (availabilityType === ANY_DAY) {
    isDateFiltered = true;
  }
  if (availabilityType === TODAY) {
    isDateFiltered = getDateOnly() === getDateOnly(doctorAvailableDate);
  }
  if (availabilityType === NEXT_THREE_DAYS) {
    const dateAfterThreeDays = currentDate.setDate(currentDate.getDate() + 3);
    isDateFiltered =
      doctorAvailableDate &&
      new Date(doctorAvailableDate).getTime() > new Date().getTime() &&
      new Date(doctorAvailableDate).getTime() <
        new Date(dateAfterThreeDays).getTime();
  }
  if (availabilityType === COMMING_WEEKEND) {
    const dateAfterSevenDays = currentDate.setDate(currentDate.getDate() + 7);
    const commingWeekend = new Date(doctorAvailableDate).getDay();
    isDateFiltered =
      doctorAvailableDate &&
      (commingWeekend === 6 || commingWeekend === 0) &&
      new Date(doctorAvailableDate).getTime() > new Date().getTime() &&
      new Date(doctorAvailableDate).getTime() <
        new Date(dateAfterSevenDays).getTime();
  }
  return isDateFiltered;
};

export const getFilteredDoctors = (doctorList, sortOptions, filterOptions) => {
  const { fee: sortByFee } = sortOptions;
  const {
    gender: doctorGender,
    consultingFee,
    availability,
    country,
    city,
  } = filterOptions;
  const doctors = doctorList.filter((doctor) => {
    const {
      consultingFee: fee,
      gender,
      date: doctorAvailableDate,
      country: doctorCountry,
      city: doctorCity,
    } = doctor;
    return (
      (doctorGender ? gender === doctorGender : true) &&
      (consultingFee ? getConsultingFee(fee, consultingFee) : true) &&
      (availability
        ? calculateDate(availability, doctorAvailableDate)
        : true) &&
      (country ? country === doctorCountry : true) &&
      (city ? city === doctorCity : true) &&
      doctor
    );
  });
  if (sortByFee) {
    return doctors.sort((previous, next) =>
      previous.consultingFee > next.consultingFee ? 1 : -1
    );
  } else {
    return doctors;
  }
};