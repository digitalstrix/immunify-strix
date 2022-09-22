import Joi from 'joi';
import { extractDate } from './commonUtils';

export const generateCatchUpPeriod = ({ catchupPeriodStart, catchupPeriodEnd }) => {
    return `${extractDate(catchupPeriodStart)} -  ${extractDate(catchupPeriodEnd)}`;
}

const VaccinationSchema = Joi.object({
    childId: Joi.number().required(),
    childVacDetailId: Joi.number().required(),
    vacId: Joi.number().required(),
    updatedBy: Joi.number().required(),
    vaccine: Joi.string().required(),
    barCode: Joi.string().allow(''),
    qrCode: Joi.string().allow(''),
    remarks: Joi.string().allow('')
});

export const validateChildVaccinationPayload = (payload) => {
    const { error } = VaccinationSchema.validate(payload);
    console.log(error);
    return !error;
}

export const generateChildVaccinationPayload = ({
    childId, childVacDetailId, vaccine, barCode, qrCode, remarks
}, { vacId, id: updatedBy }) => ({
    childId,
    childVacDetailId,
    vacId,
    vaccine,
    barCode,
    qrCode,
    remarks,
    updatedBy
});

export const initVariations = (count) => {
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

//588