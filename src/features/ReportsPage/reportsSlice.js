import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ImmunifyApi from '../../api/immunifyApi';
import {    
    ALL_VACCINES_OPTION,
    ALL_DOSES,
    ALL_VACCINES_ID
} from '../../constants/reportsConstants';
import { eventNameGenerator } from '../../utils/commonUtils';
import {
    getTableColumns,
    getSecondaryTableColumns,
    secondaryReponseMapper,
    title
} from '../../utils/reportsUtils';
import { setLoading } from '../Common/commonSlice';

const REDUCER_DOMAIN = 'reports';
const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const loadVaccines = createAsyncThunk(prefixEventName('loadVaccines'), async () => {
    const response = await ImmunifyApi.getVaccines();
    return response.json();
});

const reportsSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        columns: [],
        data: [],
        vaccines: [],
        secondaryReportColumns: [],
        secondaryReportData: [],
        vaccinesLoadingStatus: 'idle',
        vaccinesLoadingError: null,
        reportLoadingStatus: 'idle',
        reportLoadingError: null,
        secondaryReportLoadingStatus: 'idle',
        secondaryReportLoadingError: null,
        reportFormat: 0,
        from: null,
        to: null,
        title: '',
        secondaryTitle: ''
    },
    reducers: {
        setColumns: (state, action) => {
            state.columns = action.payload;
        },
        setData: (state, action) => { 
            state.data = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setSecondaryTitle: (state, action) => {
            state.secondaryTitle = action.payload;
        },
        setReportLoadingStatus: (state, action) => {
            state.reportLoadingStatus = action.payload;
        },
        setReportLoadingError: (state, action) => {
            state.reportLoadingError = action.payload;
        },
        setSecondaryReportLoadingStatus: (state, action) => {
            state.secondaryReportLoadingStatus = action.payload;
        },
        setSecondaryReportLoadingError: (state, action) => {
            state.secondaryReportLoadingError = action.payload;
        },
        setReportMetaData: (state, action) => {
            const { reportFormat, from, to } = action.payload;
            state.reportFormat = reportFormat;
            state.from = from;
            state.to = to;
        },
        setSecondaryData: (state, action) => {
            state.secondaryReportData = action.payload;
        },
        setSecondaryColumns: (state, action) => {
            state.secondaryReportColumns = action.payload;
        }
    },
    extraReducers: {
        [loadVaccines.pending]: (state, action) => {
            state.vaccinesLoadingStatus = 'loading';
        },
        [loadVaccines.fulfilled]: (state, action) => {
            state.vaccinesLoadingStatus = 'success';
            state.vaccines = [ALL_VACCINES_OPTION, ...action.payload];
        },
        [loadVaccines.rejected]: (state, action) => {
            state.vaccinesLoadingStatus = 'failed';
            state.vaccinesLoadingError = action.payload;
        }
    }
});

export const {
    setColumns,
    setData,
    setReportLoadingStatus,
    setReportLoadingError,
    setReportMetaData,
    setSecondaryReportLoadingError,
    setSecondaryReportLoadingStatus,
    setSecondaryData,
    setSecondaryColumns,
    setTitle,
    setSecondaryTitle
} = reportsSlice.actions;

export const loadReport = (payload) => {
    return async (dispatch, getState) => {
        const { reportFormat, from, to } = payload;
        const { vacId } = getState().user.user;
        const requestBody = {
            vacId,
            country: 92 // get from user country       
        };
        if (reportFormat === 4) {
            requestBody.dateFrom = from;
            requestBody.dateTo = to;
        } else {
            requestBody.from = from;
            requestBody.to = to;
            requestBody.reportFormat = reportFormat;

            let { vaccine, doseId } = payload;

            if (!(vaccine.length === 1 && vaccine[0].id === ALL_VACCINES_ID)) {
                requestBody.vaccine = vaccine.map(({ id }) => id);
            }

            if (!(doseId.length === 1 && doseId[0] === ALL_DOSES)) {
                requestBody.doseId = doseId.map(value => Number(value));
            }
        }
        try {
            dispatch(setReportLoadingStatus('loading'));
            dispatch(setLoading(true));
            dispatch(setReportLoadingError(null));
            dispatch(setTitle(title(reportFormat, from, to)));
            let response;
            switch (reportFormat) {
                case 1: {
                    response = await ImmunifyApi.getTotalVaccinatedReport(requestBody);
                    break;
                }
                case 2: {
                    response = await ImmunifyApi.getTotalOverdueReport(requestBody);
                    break;
                }
                case 3: {
                    response = await ImmunifyApi.getVaccineViseReport(requestBody);
                    break;
                }
                default: {
                    response = await ImmunifyApi.getOverdueAllReport(requestBody);                    
                }
            }
            dispatch(setReportMetaData({ reportFormat, from, to }));
            if (response && response.status === 200) {
                const data = await response.json();
                dispatch(setReportLoadingStatus('succeeded'));
                dispatch(setColumns(getTableColumns(reportFormat)));
                dispatch(setData(data));
            }
        } catch (err) {
            dispatch(setReportLoadingError(err));
            dispatch(setReportLoadingStatus('failed'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const loadSecondaryReport = ({ doseId, vaccineId }) => {
    return async (dispatch, getState) => {       
        
        const { reports: { reportFormat, from, to }, user: { user : { vacId }} } = getState();

        const requestBody = {
            vacId,
            country: 92, // get from user country  
            vaccine: [vaccineId],
            doseId,
            from,
            to
        };
        dispatch(setSecondaryReportLoadingError(null));
        dispatch(setSecondaryReportLoadingStatus('loading'));
        dispatch(setLoading(true));
        dispatch(setSecondaryTitle(title(reportFormat, from, to, false)));
        try {
            const response = await (
                reportFormat === 1 ? ImmunifyApi.getChildVaccinatedDetailsByVaccine(requestBody)
                : ImmunifyApi.getChildVaccinationOverdueDetailsByVaccine(requestBody)
                );
            if (response && response.status === 200) {
                let data = await response.json();
                data = data.map(secondaryReponseMapper(reportFormat));
                dispatch(setSecondaryReportLoadingStatus('succeeded'));
                dispatch(setSecondaryColumns(getSecondaryTableColumns(reportFormat)))
                dispatch(setSecondaryData(data));
            } else{
                // todo handle properly
            }

        } catch(err) {
            dispatch(setSecondaryReportLoadingError(err));
            dispatch(setSecondaryReportLoadingStatus('failed'));
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export default reportsSlice.reducer;
