export const PARENT_FORM_INPUTS = {
    FIRST_NAME: {
        NAME: 'firstName',
    },
    LAST_NAME: {
        NAME: 'lastName',
    },
    GENDER: {
        NAME: 'gender',
    },
    ID_NUMBER: {
        NAME: 'idNumber',
    },
    PHONE: {
        NAME: 'contact',
    },
    EMAIL: {
        NAME: 'email',
    },
    POSTAL_CODE: {
        NAME: 'postalCode',
    },
    ADDRESS_1: {
        NAME: 'address1',
    },
    CITY: {
        NAME: 'city',
    },
    NO_SMART_PHONE: {
        NAME: 'checkedNoESmartPhone',
    },
    NO_EMAIL: {
        NAME: 'checkedNoEmail'
    },
    COUNTRY: {
        NAME: 'country'
    }
};

export const PARENT_FORM_TEXT_INPUTS = [
    PARENT_FORM_INPUTS.FIRST_NAME.NAME,
    PARENT_FORM_INPUTS.LAST_NAME.NAME,
    PARENT_FORM_INPUTS.ID_NUMBER.NAME,
    PARENT_FORM_INPUTS.PHONE.NAME,
    PARENT_FORM_INPUTS.EMAIL.NAME,
    PARENT_FORM_INPUTS.POSTAL_CODE.NAME,
    PARENT_FORM_INPUTS.ADDRESS_1.NAME,
    PARENT_FORM_INPUTS.CITY.NAME,
    PARENT_FORM_INPUTS.COUNTRY.NAME,    
];

export const CHILD_FORM_INPUTS = {
    RELATIONSHIP: {
        NAME: 'relationship'
    },
    GENDER: {
        NAME: 'gender',
    },
    FIRST_NAME: {
        NAME: 'firstName'
    },
    MIDDLE_NAME: {
        NAME: 'middleName'
    },
    LAST_NAME: {
        NAME: 'lastName',
    },
    HOSPITAL: {
        NAME: 'hospital'
    },
    DATE_OF_BIRTH: {
        NAME: 'dateOfBirth'
    },
    COUNTRY: {
        NAME: 'country'
    },
    CITY: {
        NAME: 'city'
    }
}

export const CHILD_FORM_TEXT_INPUTS = [
    // CHILD_FORM_INPUTS.RELATIONSHIP.NAME,
    // CHILD_FORM_INPUTS.GENDER.NAME,
    CHILD_FORM_INPUTS.FIRST_NAME.NAME,
    CHILD_FORM_INPUTS.MIDDLE_NAME.NAME,
    CHILD_FORM_INPUTS.LAST_NAME.NAME,
    // CHILD_FORM_INPUTS.HOSPITAL.NAME,
    // CHILD_FORM_INPUTS.DATE_OF_BIRTH.NAME,
    // CHILD_FORM_INPUTS.COUNTRY.NAME,
    // CHILD_FORM_INPUTS.CITY.NAME,
];

export const CHILD_FORM_INPUT_NAMES = Object.entries(CHILD_FORM_INPUTS)
.map(([key, value]) => value.NAME);

export const CHILD_FORM_VALIDATION_ENABLED_FIELDS = [
    CHILD_FORM_INPUTS.RELATIONSHIP.NAME,
    CHILD_FORM_INPUTS.GENDER.NAME,
    CHILD_FORM_INPUTS.HOSPITAL.NAME,
    CHILD_FORM_INPUTS.CITY.NAME,
    CHILD_FORM_INPUTS.COUNTRY.NAME
];

export const ERROR_MSG_REQUIRED = 'Required';
export const PARENT_FORM_ERROR_MSG_EMAIL_REQUIRED = 'Required a valid email';

export const CHILDREN_DIALOG_TYPE_EDIT = 'EDIT';
export const CHILDREN_DIALOG_TYPE_GRAPH = 'GRAPH';
export const CHILDREN_DIALOG_TYPE_CARD = 'CARD';

export const RELATIONSHIPS = [
    { title: "Father", value: 'FATHER' },
    { title: "Mother", value: 'MOTHER' },
    { title: "Guardian", value: 'GUARDIAN' },
];
  
export const GENDERS = [ 
    { title: "Male", value: 'MALE' },
    { title: "Female", value: 'FEMALE' },
];

export const ERROR_MESSAGES = new Map([
    ['contact', 'Contact does not match for the selected country'],
    ['idNumber', 'Passport/Aadhar already exist']
]);
