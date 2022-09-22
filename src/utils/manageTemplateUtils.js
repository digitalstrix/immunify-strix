import Joi from 'joi';

const INPUT_COUNTRY = 'country';
const INPUT_TEMPLATE_NAME = 'templateName';
const FRONT_IMAGE = 'frontImage';
const BACK_IMAGE = 'backImage';

const VALIDATION_ENABLED_INPUTS = [
    INPUT_COUNTRY,
    INPUT_TEMPLATE_NAME,
    FRONT_IMAGE,
    BACK_IMAGE
];

const REQUIRED_ERROR = 'Required';

const CreateTemplateSchema = Joi.object({
    templateId: Joi.number().allow(null),
    templateName: Joi.string().required(),
    countryId: Joi.number().required(),
    artworkType: Joi.string().pattern(new RegExp('GENERIC|GENERIC_SMALL|CUSTOM_WITH_LOGO')),
    description: Joi.string().allow(''),
    frontImage: Joi.object().required(),
    backImage: Joi.object().required(),
    vacId: Joi.number().allow(null)
});

export const validateCreateTemplatePayload = (payload) => {
    const { error } = CreateTemplateSchema.validate(payload);
    console.log(error);
    return !error;
};

export const generateCreateTemplatePayload = ({ templateName, country, artworkType, description, center, templateId }, { frontImage, backImage }) => {
    const payload = {
        templateId: templateId ? templateId : null,
        templateName,
        countryId: country ? country.id : null,
        artworkType: artworkType ? artworkType.value : 'GENERIC',
        description,
        frontImage: frontImage ? frontImage : {},
        backImage: backImage ? backImage : {},
        vacId: center ? center.id : null
    };
    return payload;
}

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

export const generateArtworkUploadPayload = ({ file, uploadSide, key }) => {
    const formData = new FormData();
    formData.append("immunifyMe", file);
    formData.append("immunifyMe", JSON.stringify({
      uploadInfo: {
        uploadSide,
        imageCategory: "ARTWORK_UPLOAD",
        key
      }
    }));
    return formData;
}
