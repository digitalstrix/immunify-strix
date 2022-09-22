import Joi from 'joi';
import moment from 'moment';

import {
    VALIDATION_ENABLED_FIELDS,
    ERROR_MSG_REQUIRED,
    EVENT_TYPE_HOLIDAY_VALUE,
    INPUT_FIELD_AT_AGE_UNIT,
    EVENT_DETAILS_COMMON_DATA_ROWS,
    NEW_EVENT_DETAILS_DATA_ROWS,
    EVENT_TYPES,
    AGE_MEASURING_UNITS
} from '../constants/calenderConstants';

export const isHolidayEventTypeSelected = ({ eventType }) => {
    return eventType && eventType.value === EVENT_TYPE_HOLIDAY_VALUE;
};

const newEventBaseSchema = {
  ageUnit: Joi.string().required(),
  doctorId: Joi.number().required(),
  eventDesc: Joi.string().required(),
  eventName: Joi.string().required(),
  fromDate: Joi.required(),
  fromTime: Joi.required(),
  isHoliday: Joi.boolean().required(),
  minAgeRange:  Joi.number().required(),
  maxAgeRange:  Joi.required(),
  toDate: Joi.string().required(),
  toTime: Joi.string().required(),
};

const NewEventSchema = Joi.object(newEventBaseSchema);

const UpdateNewEventPayloadSchema = Joi.object({
    id: Joi.number().required(),
    updateInfo: Joi.object(newEventBaseSchema)
});

const HolidayEventSchema = Joi.object({
    doctorId: Joi.number().required(),
    eventDesc: Joi.string().allow(),
    eventName: Joi.string().required(),
    fromDate: Joi.required(),
    fromTime: Joi.required(),
    isHoliday: Joi.boolean().required(),
    toDate: Joi.string().required(),
    toTime: Joi.string().required(),
    ageUnit: Joi.string().allow(),
    minAgeRange:  Joi.number(),
    maxAgeRange:  Joi.number(),
    toDate: Joi.string(),
    toTime: Joi.string(),
});

const DeleteNewEventPayloadSchema = Joi.object({
    id: Joi.number().required(),
    updateInfo: Joi.object({
        status: Joi.string().pattern(new RegExp('DELETE')).required()
    })
});

const getValidationSchema = (payload, isDelete = false) => {
    const { isHoliday, id } = payload;
    if (isHoliday) {
        return HolidayEventSchema;
    }
    if (!id) {
        return NewEventSchema;
    }
    return isDelete ? DeleteNewEventPayloadSchema : UpdateNewEventPayloadSchema;
};

export const validateAddEventPayload = (payload, isDelete) => {    
    const { error } = getValidationSchema(payload, isDelete).validate(payload);
    console.log(error);
    return !error;
}

const createAddNewEventPayload = ({
    id, title, description, ageRange, atAgeUnit, dateFrom, dateTo }, { id: createdBy, vacId }, isDelete) => {
        if (isDelete) {
            return {
                id,
                updateInfo : {
                    status: 'DELETE'
                }
            };
        }
        const payload = {
            isHoliday: false,
            vacId,
            ageFrom: ageRange[0],
            ageTo: ageRange[1],
            atAgeUnit: atAgeUnit ? atAgeUnit.value : null,
            dateFrom: dateFrom.toUTCString(),
            dateTo: dateTo.toUTCString(),
            title,
            description,
            createdBy
        };
        if (id) {
            return {
                id,
                updateInfo: { ...payload, updatedBy: createdBy }
            };
        }
        return payload;
    };



const filterHolidayEvents = (holidayEvents, eventId) => {
    if (eventId) {
        return holidayEvents.filter(({ id }) => id !== eventId).slice();
    }
    return holidayEvents.slice();
}

const createAddHolidayEventPayload = ({ id, dateFrom, dateTo, description, title }, { id: createdBy, vacId }, holidayEvents, isDelete) => {
    const payload = {
        isHoliday: true,
        createdBy,
        vacId,
        queryInfo: {}
    };
    const holidays = filterHolidayEvents(holidayEvents, id);
    if (!isDelete) {
        holidays.push(
            {
                id: id ? id : new Date().getTime(),
                dateFrom: dateFrom.toUTCString(),
                dateTo: dateTo.toUTCString(),
                description,
                title,
                isHoliday: true
            }
        );
    }
    payload.queryInfo.holidays = holidays;
    return payload;
};

export const createAddEventPayload = (inputs, user, holidayEvents, isDelete = false) => {
    if (isHolidayEventTypeSelected(inputs)) {
        return createAddHolidayEventPayload(inputs, user, holidayEvents, isDelete);
    }
    return createAddNewEventPayload(inputs, user, isDelete);
}

export const validateEventInputs = ({ name, value }, inputs) => {
    if (VALIDATION_ENABLED_FIELDS.includes(name)) {
        if (isHolidayEventTypeSelected(inputs) && name === INPUT_FIELD_AT_AGE_UNIT) {
            return null;
        }
        if (!value) {
            return ERROR_MSG_REQUIRED;
        }
    }
    return null;
}

export const generateInputErrors = (inputs) => {
    return VALIDATION_ENABLED_FIELDS
    .map(field => ({ [field]: validateEventInputs({ name: field, value: inputs[field] }, inputs) }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});
};

export const isOnSameDay = (dateA, dateB) => {
    const startOfDayOfA = dateA.startOf('day');
    const startOfDayOfB = dateB.startOf('day');
    return !startOfDayOfA.isBefore(startOfDayOfB) && !startOfDayOfA.isAfter(startOfDayOfB)
};

const getEventDetailsDataRows = ({ isHoliday = false }) => {
    if (isHoliday) {
        return EVENT_DETAILS_COMMON_DATA_ROWS;
    }
    return [...EVENT_DETAILS_COMMON_DATA_ROWS, ...NEW_EVENT_DETAILS_DATA_ROWS];
}

const constructAgeGroupStr = (event, depends) => {
    const [from, to, unit] = depends.map(key => event[key]);
    return `Between ${from} to ${to} ${unit.toLocaleLowerCase()}`; 
}

const extractAndConvert = (event, dataKey, format, depends) => {
    if (format) {
        return depends.length > 0 ? constructAgeGroupStr(event, depends) : moment(event[dataKey]).format('LLL');
    }
    return event[dataKey];
}
export const generateTableDataRows = (event) => getEventDetailsDataRows(
    event
    ).map(({ thead, dataKey, format = false, depends = [] }) => ({ thead, tdata: extractAndConvert(event, dataKey, format, depends) }));

export const generateSliderMarks = (values) => values.map(value => ({ value, label: `${value}`}));


export const generateInitialInputs = ({ dateFrom, dateTo }, selectedEvent) => {
    if (selectedEvent) {
      const { id, isHoliday, title, description, start, end } = selectedEvent;
      const inputs = {
        id,
        title,
        description,
        dateFrom: start,
        dateTo: end
      };
      if (isHoliday) {
        inputs.eventType = EVENT_TYPES[1];      
      } else {
        const { ageFrom, ageTo, atAgeUnit } = selectedEvent;
        inputs.eventType = EVENT_TYPES[0];      
        inputs.ageRange = [ageFrom, ageTo];
        inputs.atAgeUnit = AGE_MEASURING_UNITS.find(({ value }) => value === atAgeUnit);
      }
      return inputs;
    }
    return {
      id: null,
      title: '',
      description: '',
      eventType: EVENT_TYPES[0],
      ageRange: [0, 1],
      atAgeUnit: null,
      dateFrom,
      dateTo
    };
};
