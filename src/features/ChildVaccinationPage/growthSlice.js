import { createSlice } from '@reduxjs/toolkit';
import ImmunifyApi from '../../api/immunifyApi';
import { processGrowthData } from '../../utils/growthUtils';
import { setLoading } from '../Common/commonSlice';

const REDUCER_DOMAIN = 'growth';

const getInitialState = () =>({
    originalGrowthInfo: [],
    growthInfo: [],
    heightInfo: [],
    weightInfo: [],
    hcwInfo: [],
    standardGraphs: {
        hcw: [],
        height: [],
        weight: []
    },
    growthFetchingStatus: 'idle',
    growthFetchingError: null,
    addGrowthStatus: 'idle',
    addGrowthError: null,
    growthInput: {
        hcw: null,
        height: null,
        weight: null
    }
});

const growthSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: getInitialState(),
    reducers: {
        updateGrowthInfo: (state, action) => {
            const { growthInfo, standardGraphs } = action.payload;
            state.originalGrowthInfo = growthInfo;
            const {HeightGrowth, WeightGrowth, HcwGrowth} = growthInfo;
            let allGrowthData = HeightGrowth.concat(WeightGrowth);
            allGrowthData = allGrowthData.concat(HcwGrowth);
            state.growthInfo = processGrowthData(allGrowthData);
            state.heightInfo = processGrowthData(HeightGrowth);
            state.weightInfo = processGrowthData(WeightGrowth);
            state.hcwInfo = processGrowthData(HcwGrowth);
            state.standardGraphs = standardGraphs;
        },
        setGrowthFetchingStatus: (state, action) => {
            state.growthFetchingStatus = action.payload;
        },
        setGrowthFetchingError: (state, action) => {
            state.growthFetchingError = action.payload;
        },
        setAddGrowthStatus: (state, action) => {
            state.addGrowthStatus = action.payload;
        },
        setAddGrowthError: (state, action) => {
            state.addGrowthError = action.payload;
        },
        updateGrowthInput: (state, action) => {
            state.growthInput = action.payload;
        },
        initGrowth: (state, action) => {
            Object.entries(getInitialState()).forEach(([key, value])=>{
                state[key] = value;
            });
        }
    },
    extraReducers: {

    }
});

export const {
    initGrowth,
    updateGrowthInfo,
    setGrowthFetchingStatus,
    setGrowthFetchingError,
    setAddGrowthStatus,
    setAddGrowthError,
    updateGrowthInput
} = growthSlice.actions;


export const addChildGrowthInfo = (payload) => {
    const {childId} = payload;
    return async (dispatch) => {
        try {
            dispatch(setAddGrowthStatus('loading'));
            dispatch(setLoading(true));
            dispatch(setAddGrowthError(null));
            const response = await ImmunifyApi.addGrowthInfo(payload);
            if (response && (response.status === 201 || response.status === 200)) {
                dispatch(setAddGrowthStatus('succeeded'));
            } else {
                // todo handle
            }
        } catch (err) {
            dispatch(setAddGrowthError(err));
            dispatch(setAddGrowthStatus('failed'));
        } finally {
            dispatch(setLoading(false));
            getGrowthInfo({childId});
        }
    };
}

export const getGrowthInfo = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setGrowthFetchingStatus('loading'));
            dispatch(setLoading(true));
            dispatch(setGrowthFetchingError(null));
            const response = await ImmunifyApi.getGrowathInfo(payload);
            if (response && response.status === 200) {
                const growth = await response.json();
                dispatch(updateGrowthInfo(growth));
                dispatch(setGrowthFetchingStatus('succeeded'));
            } else {
                //todo handle 
            }
        } catch (err) {
            dispatch(setGrowthFetchingError(err));
            dispatch(setGrowthFetchingStatus('failed'));
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export default growthSlice.reducer;