export const ERROR_MSG_REQUIRED = 'Required';
export const ERROR_MSG_NUMBER_REQUIRED = 'Number is required';
export const ERROR_MSG_REQUIRED_VALID_EMAIL = 'Required a valid email';

export const PROFILE_INPUTS = [
    'fullName',
    'email',
    'contactNumber',
    'address',
    'registrationNumber',
    'specialization',
    'city',
    'country'    
];

export const AMOUNT_INPUT_NAME = 'amount';

export const EDUCATION_INPUTS = [
    { fieldName: 'digree', required: true },
    { fieldName: 'university', required: true },
    { fieldName: 'parsingDate', required: false },
];

export const WORK_EXPERIENCE_INPUTS = [
    { fieldName: 'hospital', required: true },
    { fieldName: 'address', required: true },
    { fieldName: 'startDate', required: false },
    { fieldName: 'endDate', required: false },
];

export const HOSPITAL_INPUTS = [
    { fieldName: 'hospital', required: true },     
    { fieldName: 'address', required: true },
    { fieldName: 'phone', required: false },
];

export const CONSULTATION_PLAN_INPUTS = [
    { fieldName: 'appoinmentType', required: true },
    { fieldName: 'sessionTime', required: true },
    { fieldName: AMOUNT_INPUT_NAME, required: true },
];

export const SESSION_INPUTS = [
    { fieldName: 'sessionName', required: true },
    { fieldName: 'startTime', required: true },
    { fieldName: 'endTime', required: true },
    { fieldName: 'appoinmentType', required: true },
    { fieldName: 'patientSlots', required: true },
];

export const SESSION_TIME_OPTIONS = [
    { label: "15", value: 15 },
    { label: "30", value: 30 },
    { label: "45", value: 45 },
    { label: "60", value: 60 },
];
  
export const CONSULTING_FEE = {
  FREE: "FREE",
  LOW: "LOW",
  GENERAL: "GENERAL",
  MEDIUM: "MEDIUM",
};

export const CONSULTING_FEE_TEXT = {
  FREE: "Free",
  LOW: "1-200",
  GENERAL: "201-500",
  MEDIUM: "501-1000",
};

export const CONSULTING_FEE_AMOUNT = {
  FREE: "Free",
  LOW: [1, 200],
  GENERAL: [201, 500],
  MEDIUM: [501, 1000],
};

export const AVAILABILITY = {
  ANY_DAY: "ANY_DAY",
  TODAY: "TODAY",
  NEXT_THREE_DAYS: "NEXT_THREE_DAYS",
  COMMING_WEEKEND: "COMMING_WEEKEND",
};