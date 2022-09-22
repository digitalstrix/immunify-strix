const INPUT_VACCINE_NAME = 'name';
const INPUT_PROTECT_AGAINST = 'protectAgainst';
const INPUT_ADVERSE_EFFECT = 'adverseEffect';
const VALIDATION_ENABLED_INPUTS = [
    INPUT_VACCINE_NAME,
    INPUT_PROTECT_AGAINST,
    INPUT_ADVERSE_EFFECT
];
const REQUIRED_ERROR = 'Required';

export const formErrorsExists = (inputs) => {
    return VALIDATION_ENABLED_INPUTS.some(input => !inputs[input])
}

export const validateFormInput = ({ name, value }) => {
    if (VALIDATION_ENABLED_INPUTS.includes(name) && !value) {
        return REQUIRED_ERROR;
    }
    return null;
};

export const generateFormErrors = (inputs) => {
    return VALIDATION_ENABLED_INPUTS
    .map(input => ({ [input]: validateFormInput({ name: input, value: inputs[input] }) }))
    .reduce((acc, val) => ({ ...acc, ...val }), {});
}