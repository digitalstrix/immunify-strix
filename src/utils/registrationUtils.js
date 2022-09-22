import Joi from 'joi';

import { isEmpty, updateObjectProp, calculateAge } from './commonUtils';
import {
    PARENT_FORM_INPUTS,
    PARENT_FORM_TEXT_INPUTS,
    PARENT_FORM_ERROR_MSG_EMAIL_REQUIRED,
    ERROR_MSG_REQUIRED,
    CHILD_FORM_INPUT_NAMES,
    CHILD_FORM_VALIDATION_ENABLED_FIELDS
} from '../constants/registrationConstants';

const { EMAIL, COUNTRY, PHONE } = PARENT_FORM_INPUTS;

const STATUS_ACTIVE = 'ACTIVE';
const ParentSchema = Joi.object({
    id: Joi.number().allow(''),
    idNumber: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    middleName: Joi.string().allow(''),
    country: Joi.number().required(),
    email: Joi.string().email({ tlds: {allow: false} }).allow(''),
    postalCode: Joi.string().required(),
    city: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.string().allow(''),
    state: Joi.string().allow(''),
    status: Joi.string().pattern(new RegExp('ACTIVE')),
    contact: Joi.string().allow(''),
    vacId: Joi.number().required(),
    isAnalogUser: Joi.boolean().required(),
    managedByThirdParty: Joi.boolean().required(),
    
});


export const validateCreateParentPayload = (payload, { checkedNoEmail, checkedNoESmartPhone }) => {
    const { error } = ParentSchema.validate(payload);
    console.log(error);
    if (!error) {
        if ((!(checkedNoEmail || checkedNoESmartPhone) && !payload.email) || (!checkedNoESmartPhone && !payload.contact)) {
            return false;
        }
    }
    return !error;
};


const genericValidationSchema = Joi.string().required();
const countryValidationSchema = Joi.object({
    countryCode: Joi.string().allow(''),
    countryName: Joi.string().required(),
    id: Joi.number().required()
});
const emailValidationSchema =  Joi.string().email({ tlds: {allow: false} }).required();

export const validateParentFormInputs = ({ name, value }, { checkedNoEmail,  checkedNoESmartPhone}) => {

    if (value === '' && ((name === EMAIL.NAME && (checkedNoEmail || checkedNoESmartPhone)) || (name === PHONE.NAME && checkedNoESmartPhone))) {
        return null;
    }

    let validationSchema = genericValidationSchema;
    if (name === EMAIL.NAME) {
        validationSchema = emailValidationSchema;
    } else if (name === COUNTRY.NAME) {
        validationSchema = countryValidationSchema;
    }

    const { error } = validationSchema.validate(value);

    if (error) {
        if (name === EMAIL.NAME) {
            return PARENT_FORM_ERROR_MSG_EMAIL_REQUIRED;
        }
        return ERROR_MSG_REQUIRED;
    }
    return null;
};

export const generateParentFormErrors = (inputs, checks) => {
    return PARENT_FORM_TEXT_INPUTS.map(input => {        
        const error = validateParentFormInputs({
            name: input,
            value: inputs[input]
        }, checks);
        return { [input] : error };
    }).reduce((acc, val) => ({ ...acc, ...val }), {});
};

export const generateCreateParentPayload = (inputs, { checkedNoEmail, checkedNoESmartPhone }, { vacId }) => ({
    ...inputs,
    country: inputs.country ? inputs.country.id : '',
    middleName: '',
    address2: inputs.address2 || '',
    state: inputs.state || '',
    vacId,
    status: STATUS_ACTIVE,
    managedByThirdParty: checkedNoESmartPhone,
    isAnalogUser: !checkedNoESmartPhone && checkedNoEmail
});

export const validateChildFormInputs = ({ name, value }) => {
    if (isEmpty(value) && (CHILD_FORM_VALIDATION_ENABLED_FIELDS.includes(name))) {
        return ERROR_MSG_REQUIRED;
    }
    return null;
};

export const generateChildFormErrors = (inputs) => {
    return CHILD_FORM_INPUT_NAMES.map(name => ({
        [name]: validateChildFormInputs({ name, value: inputs[name] })
    })).reduce((acc, val) => ({ ...acc, ...val }), {});
};

export const generateCreateChildPayload = ({
    id, firstName, lastName, middleName, gender, dateOfBirth, hospital, city, state, country, relationship },
{ relativeId }, { vacId }) => ({
    bio: {
        firstName,
        middleName,
        lastName,
        gender: gender ? gender.value : '',
        parentId: relativeId,
        id: id ? id: '',
        status: STATUS_ACTIVE
    },
    birthInformation: {
        dateOfBirth,
        hospital,
        city,
        state: state || '',
        vacId,
        country: country ? country.id : '',
    },
    relationship: {
        relativeId,
        relationship: relationship ? relationship.value : '',
        status: STATUS_ACTIVE
    },    
});

const ChildPayloadSchema = Joi.object({
    bio: Joi.object({
        firstName: Joi.string().allow(''),
        middleName: Joi.string().allow(''),
        lastName: Joi.string().allow(''),
        gender: Joi.string().required(),
        parentId: Joi.number().integer().required(),
        id: Joi.number().allow(''),
        status: Joi.string().required()
    }),
    birthInformation: Joi.object({
        dateOfBirth: Joi.string().pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')),
        hospital: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().allow(''),
        vacId: Joi.number().integer().required(),
        country: Joi.number().integer().required(),
    }),
    relationship: Joi.object({
        relativeId: Joi.number().integer().required(),
        relationship: Joi.string().required(),
        status: Joi.string().required()
    })
});

export const validateCreateChildPayload = (payload) => {
    const { error } = ChildPayloadSchema.validate(payload);
    console.log(error);
    return !error;
};

export const createUpdatedChildPayload = (child, updatedProperties) => {
    const updatingChild = { ...child };
    const {
        bio: { firstName, middleName, lastName, gender },
        birthInformation: { dateOfBirth, hospital, city, country },
        relationship: { relationship }
    } = updatedProperties;

    // [{ firstName }, { middleName }, { lastName }, { gender }].forEach(entry => {

    // });

    updatingChild.firstName = firstName;
    updatingChild.lastName = lastName
    updatingChild.middleName = middleName;
    updatingChild.gender = gender;
    updatingChild.age = calculateAge(dateOfBirth);

    const BirthInformation = { ...updatingChild.BirthInformation };
    BirthInformation.dateOfBirth = dateOfBirth;
    BirthInformation.hospital = hospital;
    BirthInformation.city = city;
    BirthInformation.country = country;
    updatingChild.BirthInformation = BirthInformation;

    const Relationships = [ ...updatingChild.Relationships ];
    Relationships[0] = { ...Relationships[0], relationship};
    updatingChild.Relationships = Relationships;

    return updatingChild;
};

let ch = {
    "bio": {
      "firstName": "CH",
      "middleName": "MM",
      "lastName": "LL",
      "gender": "MALE",
      "parentId": 1568,
      "status": "ACTIVE"
    },
    "birthInformation": {
      "dateOfBirth": "2020-12-30",
      "hospital": "ABC",
      "vacId": 1,
      "city": "Kurunegala",
      "state": "North Western Province",
      "country": 193,
      "placeId": "ChIJuehrsIo54zoRUlCIHufkkB8",
      "latitude": "7.4817695",
      "longitude": "80.3608876"
    },
    "relationship": {
      "relativeId": 1568,
      "relationship": "GUARDIAN",
      "status": "ACTIVE"
    }
  };
let a = {
    "idNumber":"89888908089788978979",
    "firstName":"Tharuka",
    "middleName":"",
    "lastName":"Jayalath",
    "email":"tharukajayalath@gmail.com",
    "address1":"\"Senasuma\", Wewalagma",
    "address2":"",
    "city":"",
    "state":"",
    "postalCode":"60506",
    "country":193,
    "contact":"0712687005",
    "vacId":1,
    "status":"ACTIVE",
    "isAnalogUser":false,
    "managedByThirdParty":false
}

