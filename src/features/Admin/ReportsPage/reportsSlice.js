import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator, extractDate, excuteAfterGivenDelay } from '../../../utils/commonUtils';
import ImmunifyApi from '../../../api/immunifyApi';
import { setLoading } from '../../Common/commonSlice';

const REDUCER_DOMAIN = 'reports';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const fetchBatches = createAsyncThunk(prefixEventName('fetchPrintedBatches'), async (payload) => {
    const response = await ImmunifyApi.getPrintedBatches(payload);
    return response.json();
});

export const fetchBatchDetails = createAsyncThunk(prefixEventName('fetchBatchDetails'), async (payload) => {
    const response = await ImmunifyApi.getSignedUrs(payload);
    const data = await response.json();
    const mapped = data.map((link, index) => ({ link, subId: index }));
    console.log(mapped);
    return {
        batchId: payload.batchId,
        data: mapped
    }
});

export const reportsSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        batches: [],
        batchDetails: {

        },
        reportType: 'VAC'
    },
    reducers: {
        setReportType: (state, action) => {
            if (state.reportType !== action.payload) {
                state.batches = [];
                state.batchDetails = {}
            }
            state.reportType = action.payload;
        }
    },
    extraReducers: {
        [fetchBatches.fulfilled]: (state, action) => {
            state.batches = action.payload.map(({ createdAt, ...rem }) => ({ ...rem, createdAt: extractDate(createdAt) }));
        },
        [fetchBatchDetails.fulfilled]: (state, action) => {
            const { batchId, data } = action.payload;
            state.batchDetails[batchId] = data;
        }
    }
});

export const { setReportType } = reportsSlice.actions;

export default reportsSlice.reducer;
