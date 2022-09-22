import Joi from 'joi';
import { VAC_CENTER_REQUIRED_FIELDS } from '../constants/vacCenterConstants';

const ERROR_MSG_REQUIRED = 'Required';
const ERROR_MSG_REQUIRED_VALID_EMAIL = 'Required a valid email';

const FetchVacCentersPayloadSchema = Joi.object({
    country: Joi.number().allow(''),
    state: Joi.string().allow(''),
    status: Joi.string().required(),
    vacName: Joi.string().allow(''),
    vacType: Joi.string().allow('')
});

const VacCenterPayloadSchema = Joi.object({
    vacCenterId: Joi.number().allow(null),
    name: Joi.string().required(),
    vacCode: Joi.string().required(),
    vacType: Joi.string().required(),
    isGovernment: Joi.boolean().required(),
    isChain: Joi.boolean().required(),
    isMain: Joi.boolean().required(),
    mainHospitalId: Joi.number().allow(null),
    country: Joi.number().required(),
    state: Joi.string().allow(''),
    city: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string().allow(''),
    postalCode: Joi.string().required(),
    contactPerson: Joi.string().required(),
    contactNumber: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    fax: Joi.string().required(),
    status: Joi.string().pattern(new RegExp('ACTIVE|INACTIVE|DELETED')),
    vendorId: Joi.number().allow(null),
    vacCenterPlaceId: Joi.string().allow(null),
    vacCenterLatitude: Joi.number().allow(null),
    vacCenterLongitude: Joi.number().allow(null)
});

const EmailValidationSchema = Joi.string().email({ tlds: { allow: false } }).required();

export const validateVacCenterFields = ({ name, value }, { isMain }) => {
    if (VAC_CENTER_REQUIRED_FIELDS.includes(name) && !value) {
        if (name === 'mainHospitalId' && isMain) return null;
        return ERROR_MSG_REQUIRED;
    }
    if (name === 'email') {
        const { error } = EmailValidationSchema.validate(value);
        if (error) {
            return ERROR_MSG_REQUIRED_VALID_EMAIL;
        }
    }
    return null;
};

export const generateVacCenterRegFormErrors = (inputs, checks) => {
    return Object.entries(inputs).map(([name, value]) => ({ [name]: validateVacCenterFields({ name, value }, checks) }))
        .reduce((acc, val) => ({ ...acc, ...val }), {});
}

export const generateRegisterVacCenterPayload = (inputs, checks, loggedInUser) => {
    const payload = {
        ...checks,
        ...inputs,
        country: inputs.country ? inputs.country.id : '',
        address2: inputs.address2 ? inputs.address2 : '',
        mainHospitalId: !checks.isMain && inputs.mainHospitalId ? Number(inputs.mainHospitalId.id) : null,
        vendorId: inputs.vendorId ? Number(inputs.vendorId) : null,
        vacCenterPlaceId: inputs.placeId ? inputs.placeId : null,
        vacCenterLatitude: inputs.lat ? inputs.lat : null,
        vacCenterLongitude: inputs.lat ? inputs.lng : null,
        createdBy: loggedInUser.id,
    };
    ['placeId', 'lat', 'lng'].forEach(key => delete payload[key]);
    return payload;
};

export const validateRegVacCenterPayload = (payload) => {
    const { error } = VacCenterPayloadSchema.validate(payload);
    console.log(error)
    return !error;
}

export const generateGetVacCentersPayload = ({ country, state, status, vacName, vacType }) => ({
    country: country ? country.id : '',
    state: state ? state.state : '',
    status,
    vacName,
    vacType: vacType ? vacType.vacType : ''
});

export const validateGetVacCentersPayload = (payload) => {
    const { error } = FetchVacCentersPayloadSchema.validate(payload);
    console.log(error)
    return !error;
}

