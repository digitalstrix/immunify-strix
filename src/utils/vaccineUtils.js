import Joi from 'joi';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '../constants/vaccineConstants';

const REQUIRED_ERROR = 'Required';

const INPUT_VACCINE_NAME = 'name';
const INPUT_PROTECT_AGAINST = 'protectAgainst';
const INPUT_ADVERSE_EFFECTS = 'adeverseEffect';
const INPUT_NOTES = 'notes';


const VALIDATION_ENABLED_INPUTS = [
    INPUT_VACCINE_NAME,
    INPUT_PROTECT_AGAINST
];

export const validateFormInput = ({ name, value }) => {
    if (VALIDATION_ENABLED_INPUTS.includes(name) && !value) {
        return REQUIRED_ERROR;
    }
    return null;
};

const AddVaccineSchema = Joi.object({
    vaccineId: Joi.number().allow(null),
    name: Joi.string().required(),
    protectAgainst: Joi.string().required(),
    adverseEffect: Joi.string().allow(''),
    notes: Joi.string().allow(''),
    gender: Joi.string().pattern(new RegExp('BOTH|MALE|FEMALE')).required(),
    status: Joi.string().pattern(new RegExp('ACTIVE|INACTIVE|DELETED')).required()
});

export const validateAddVaccinePayload = (payload) => {
    const { error } = AddVaccineSchema.validate(payload);
    console.log(error);
    return !error;
};

export const generateAddVaccineFormErrors = (inputs) => {
    return Object.entries(inputs)
        .map(([name, value]) => ({ [name]: validateFormInput({ name, value }) }))
        .reduce((acc, val) => ({ ...acc, ...val }));
};


export const generateAddVaccinePayload = ({ id, name, protectAgainst, adverseEffect, gender, notes }, status) => {
    const payload = {
        vaccineId: id ? id : null,
        name,
        protectAgainst,
        adverseEffect,
        notes,
        gender,
        status: status ? STATUS_ACTIVE : STATUS_INACTIVE
    };
    return payload;
}

const durationUnitConvert = (unit) => {
  if (unit === "Year") {
    return 0;
  } else if (unit === "Month") {
    return 1;
  } else if (unit === "Week") {
    return 2;
  } else if (unit === "Day") {
    return 3;
  } else {
    return "Not selected";
  }
};

export const generateAddTradenamePayload = ({ tradename, manufacturerCompanyId, dosecount, durationUnit, createdBy, doses, vaccines }) => {
  const payload = {
    tradeName: tradename,
    manufacturerCompanyId,
    doseCount: parseInt(dosecount),
    createdBy,
    vaccines,
    doses:
      dosecount === "2"
        ? [{ doseId: 2, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose2) }]
        : dosecount === "3"
        ? [
            { doseId: 2, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose2) },
            { doseId: 3, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose3) },
          ]
        : dosecount === "4"
        ? [
            { doseId: 2, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose2) },
            { doseId: 3, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose3) },
            { doseId: 4, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose4) },
          ]
        : dosecount === "5"
        ? [
            { doseId: 2, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose2) },
            { doseId: 3, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose3) },
            { doseId: 4, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose4) },
            { doseId: 5, durationUnit: durationUnitConvert(durationUnit), durationVal: parseInt(doses.dose5) },
          ]
        : [],
  };
  return payload;
};

