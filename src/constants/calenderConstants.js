export const EVENT_TYPE_HOLIDAY_VALUE = 'holiday';
export const EVENT_TYPE_NEW_EVENT_VALUE = 'newEvent';

export const EVENT_TYPES = [
    { title: 'New Event', value: EVENT_TYPE_NEW_EVENT_VALUE },
    { title: 'Holiday', value: EVENT_TYPE_HOLIDAY_VALUE },    
];

export const AGE_MEASURING_UNITS = [
    { title: 'Month', value: 'MONTHS'},
    { title: 'Year', value: 'YEARS'},
];

export const AGE_UNIT_MONTH_LABEL = 'Set age range 0 month(s) to 12 month(s)';
export const AGE_UNIT_YEAR_LABEL = 'Set age range 1 years(s) to 18 years(s)';

export const AGE_UNIT_MONTH_MAX = 12;
export const AGE_UNIT_YEAR_MAX = 21;

export const ERROR_MSG_REQUIRED = 'Required';

export const INPUT_FIELD_TITLE = 'title';
export const INPUT_FIELD_AT_AGE_UNIT = 'atAgeUnit';

export const VALIDATION_ENABLED_FIELDS = [
    INPUT_FIELD_TITLE,
    INPUT_FIELD_AT_AGE_UNIT    
];

export const EVENT_DETAILS_COMMON_DATA_ROWS = [
    { thead: "Event Title", dataKey: 'title' },
    { thead: "Event Description", dataKey: 'description' },
    { thead: "Event Starts", dataKey: 'fromDate', format: true },
    { thead: "Event Ends", dataKey: 'toDate', format: true },
];

export const NEW_EVENT_DETAILS_DATA_ROWS = [
    { thead: "Age Group", dataKey: 'ageGroup', format: true, depends: ['ageFrom', 'ageTo', 'atAgeUnit'] },
    { thead: "Email Sent Status", dataKey: 'mailSendStatus' },
];