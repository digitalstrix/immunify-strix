import {
    VACCINE_VISE_TABLE_COLUMNS,
    TOTAL_VACCINATED_TABLE_COLUMNS,
    CHILD_OVERDUE_TABLE_COLUMNS,
    OVERDUE_ALL_TABLE_COLUMNS,
    VACCINATED_DETAILS_BY_VACCINE_TABLE_COLUMNS,
    OVERDUE_DETAILS_BY_VACCINE_TABLE_COLUMNS,
    DEFAULT_TABLE_OPTIONS,
    CATCHUP_END_MESSAGE,
    REPORT_FORMATS    
} from '../constants/reportsConstants';

import { extractDate } from './commonUtils';

const REPORT_COLUMNS = [
    TOTAL_VACCINATED_TABLE_COLUMNS,
    CHILD_OVERDUE_TABLE_COLUMNS,
    VACCINE_VISE_TABLE_COLUMNS,
    OVERDUE_ALL_TABLE_COLUMNS
];

const SECONDARY_REPORT_COLUMNS = [
    VACCINATED_DETAILS_BY_VACCINE_TABLE_COLUMNS,
    OVERDUE_DETAILS_BY_VACCINE_TABLE_COLUMNS
];

export const getTableColumns = (reportFormat) => REPORT_COLUMNS[reportFormat - 1];
export const getSecondaryTableColumns = (reportFormat) => SECONDARY_REPORT_COLUMNS[reportFormat -1];
export const secondaryReponseMapper = (reportFormat) => {
    if (reportFormat === 1) {
        return (record) => ({
            ...record, dueDate: extractDate(record.dueDate),
            vaccinatedDate: extractDate(record.vaccinatedDate)
        });
    }
    return (record) => ({
        ...record,
        dueDate: extractDate(record.dueDate),
        catchUpPeriod: `${extractDate(record.catchupPeriodStart)} - ${extractDate(record.catchupPeriodEnd)}`
    });
};

const colorByCatchupMessage = (message) => {
    if (message === CATCHUP_END_MESSAGE) {
        return '#ff5733';
    }
    return '#391';
};

export const tableOptions = () => ({
    ...DEFAULT_TABLE_OPTIONS,
    rowStyle: rowData => ({
        color: colorByCatchupMessage(rowData.isCatchEndMessage)
    })
});

const getTitlePrefix = (isPrimary) => (
    isPrimary ? ' Report from' : ' from'
);

export const title = (reportFormat, from, to, isPrimary = true) => {
    return REPORT_FORMATS[reportFormat - 1]
    .label.concat(`${getTitlePrefix(isPrimary)} ${from} to ${to}`);
};
