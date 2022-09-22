import Joi from 'joi';
import {
    VAC_SCHEDULE_STATUS_ACTIVE,
    VAC_SCHEDULE_STATUS_INACTIVE,
    VAC_SCHEDULE_STATUS_DELETED
} from '../constants/vacScheduleConstants';

const REQUIRED_ERROR = 'Required';
const INPUT_COUNTRY = 'country';
const INPUT_NAME = 'name';
const INPUT_DESCRIPTION = 'description';
const INPUT_STATE = 'state'
const INPUT_STATUS = 'status';

const VALIDATION_ENABLED_INPUTS = [
    INPUT_COUNTRY,
    INPUT_NAME,
    INPUT_DESCRIPTION
]; 

const VacScheduleSchema = Joi.object({
    id: Joi.number().allow(null),
    name: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.number().required(),
    state: Joi.string().allow(''),
    status: Joi.string().pattern(new RegExp('ACTIVE|INACTIVE'))
});

const ScheduleDetailSchema = Joi.object({
    scheduleId: Joi.number().required(),
    vaccineId: Joi.number().required(),
    doses: Joi.array().items(Joi.object({
        doseId: Joi.number().required(),
        startYear: Joi.number().required(),
        startMonth: Joi.number().required(),
        startWeek: Joi.number().required(),
        startDay: Joi.number().required(),
        catchupYear: Joi.number().required(),
        catchupMonth: Joi.number().required(),
        catchupWeek: Joi.number().required(),
        catchupDay:Joi.number().required()
    })).required()
});

export const validateScheduleRegPayload = (payload) => {
    const { error } = VacScheduleSchema.validate(payload);
    console.log(error);
    return !error;
};

export const validateFormInput = ({ name, value }) => {
    if (VALIDATION_ENABLED_INPUTS.includes(name) && !value) {
        return REQUIRED_ERROR;
    }
    return null;
};

export const generateVacScheduleFormErrors = (inputs) => {
    return Object.entries(inputs)
    .map(([name, value]) => ({ [name]: validateFormInput({ name, value })}))
    .reduce((acc, val) => ({ ...acc, ...val }));
};


export const generateRegVacSchedulePayload = ({ id, name, country, state, description }, isActive) => {
    const payload = {
        id: id ? id : null,
        name,
        state,
        description,
        country: country ? country.id : '',
        status: isActive ? VAC_SCHEDULE_STATUS_ACTIVE : VAC_SCHEDULE_STATUS_INACTIVE
    };
    return payload;
}

export const generateScheduleDetailPayload = (schedule, vaccine, doses ) => {
    if (!vaccine) {
        return null;
    }
    return ({
        scheduleId: schedule.id,
        vaccineId: vaccine.id,
        doses
    });
}

export const validateScheduleDetailPayload = (payload) => {
    const { error } = ScheduleDetailSchema.validate(payload);
    console.log(error);
    return !error;
};


const units = [
    { name: 'Year', short: 'Y'},
    { name: 'Month', short: 'M'},
    { name: 'Week', short: 'W'},
    { name: 'Day', short: 'D'},
];

const formatPeriod = (data, type = 'start') => {
    return units.map(({ name, short}) => {
        const key = `${type}${name}`;
        return `${data[key]}${short}`;
    }).join(' ');
}


export const formatScheduleDetails = (details = []) => {
    return details.map(({ Vaccine, ...rest }) => ({
        ...rest,
        name: Vaccine.name || '',
        protectAgainst: Vaccine.protectAgainst || '',
        gender: Vaccine.gender,
        start: formatPeriod(rest),
        catchup: formatPeriod(rest, 'catchup')
    }));
}

export const initDoses = (count) => {
    const variations = [];
    const variety = {
        startYear: 0,
        startMonth: 0,
        startWeek: 0,
        startDay: 0,
        catchupYear: 0,
        catchupMonth: 0,
        catchupWeek: 0,
        catchupDay: 0
    };
    for (let i = 1; i <= count; i++) {
        variations.push({ ...variety, doseId: i });
    }
    return variations;
}

export const generateVacSchedDeletePayload = ({ id }) => {
    return ({
        scheduleId: id,
        status: VAC_SCHEDULE_STATUS_DELETED
    });
};