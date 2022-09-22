import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator } from '../../utils/commonUtils';
import ImmunifyApi from '../../api/immunifyApi';
import { DATA_KEYS, GRANULARITY_OPTIONS } from '../../constants/dashboarConstants';

const REDUCER_DOMAIN = 'dashboard';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const getChartData = createAsyncThunk(prefixEventName('chartData'), async (payload) => {
    const response = await Promise.all([
        ImmunifyApi.getVaccinatedCountWeekly(payload),
        ImmunifyApi.getNotVaccinatedCountWeekly(payload),
        ImmunifyApi.getVaccinatedCountMonthly(payload),
        ImmunifyApi.getVaccinationForcast(payload)
    ]);
    const mapped = response.map(resp => resp.json());

    return Promise.all(mapped);
});

export const getCenterStats = createAsyncThunk(prefixEventName('centerStats'), async (payload) => {
    const response = await Promise.all([
        ImmunifyApi.getTotalVaccinatedCount(payload),
        ImmunifyApi.getIssuedQrCodeCount(payload),
        ImmunifyApi.getNewBornChildCount(payload)
    ]);
    const mapped = response.map(resp => resp.json());
    return Promise.all(mapped);
});


const formatDataForChart = (responseData, dataKey) => {
    const labels = [];
    const data = [];
    responseData.forEach((record) => {
        labels.push(record.name);
        data.push(record[dataKey])
    });
    return {
        labels,
        data
    }
};


const formatResponse = (response) => {
    return DATA_KEYS.map(({ dataKey, stateKey }, index) => {
        const formattedResp = formatDataForChart(response[index], dataKey);
        return {
            [stateKey]: formattedResp            
        }
    }).reduce((acc, val) => ({ ...acc, ...val }), {});
};

const extractDataField = (fields, dataKey) => {
    return fields.map(field => field[0][dataKey]);
};

const formatStatsResponse = (response) => {
    return {
        today: extractDataField(response, 'today'),
        lastWeek: extractDataField(response, 'lastWeek'),
        lastMonth: extractDataField(response, 'lastMonth')
    }
};

export const dashboardSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        chartDataLoadingStatus: 'idle',
        chartDataLoadingError: null,
        chartData: null,
        centerStatsLoadingStatus: 'idle',
        centerStatsLoadingError: null,
        centerStats: {
            today: [0, 0, 0],
            lastWeek: [0, 0, 0],
            lastMonth: [0, 0, 0]
        },
        granularity: GRANULARITY_OPTIONS[0].value
    },
    reducers: {
        setGranularity: (state, action) => {
            state.granularity = action.payload;
        }
    },
    extraReducers: {
        [getChartData.pending]: (state, action) => {
            state.chartDataLoadingStatus = 'loading';
        },
        [getChartData.fulfilled]: (state, action) => {
            state.chartData = formatResponse(action.payload);
            state.chartDataLoadingStatus = 'succeeded';
        },
        [getChartData.rejected]: (state, action) => {
            state.chartDataLoadingStatus = 'failed';
        },
        [getCenterStats.pending]: (state, action) => {
            state.centerStatsLoadingStatus = 'loading';
        },
        [getCenterStats.fulfilled]: (state, action) => {
            state.centerStats = formatStatsResponse(action.payload);
            state.centerStatsLoadingStatus = 'succeeded';
        },
        [getCenterStats.rejected]: (state, action) => {
            state.centerStatsLoadingStatus = 'failed';
        }  
      }
});

export const { setGranularity } = dashboardSlice.actions;

export default dashboardSlice.reducer;
