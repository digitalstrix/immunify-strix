import { createSlice } from "@reduxjs/toolkit";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from '../../../Common/commonSlice';

const REDUCER_DOMAIN = "consultationTimes";

const getInitialState = () => ({
    consultationTimes: [],
    loadingStatus: 'idle',
    loadingError: null,
    consultationTimesStatus: 'idle',
});

export const consultationTimesSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: getInitialState(),
    reducers: {
        setConsultationTimesFulfilled: (state, action) => {
            state.consultationTimes = action.payload;
            state.loadingStatus = 'succeeded';
        },
        setConsultationTimesError: (state, action) => {
            state.loadingStatus = 'failed';
        },
        getConsultationTimesLoading: (state, action) => {
            state.loadingStatus = 'loading';
        },
        setConsultationTimesStatus: (state, action) => {
            state.consultationTimesStatus = action.payload;
        }
    },
    extraReducers: {},
});

export const {
    setConsultationTimesFulfilled,
    setConsultationTimesError,
    getConsultationTimesLoading,
    setConsultationTimesStatus
} = consultationTimesSlice.actions;

export const getConsultationTimesAsync = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setConsultationTimesStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.getconsultationTimes(payload);
            if (response.status === 200) {
                let data = await response.json();
                dispatch(setConsultationTimesFulfilled(data));
                dispatch(setConsultationTimesStatus('succeeded'));
            } else {
                dispatch(setConsultationTimesStatus('failed'));
            }
        } catch (err) {
            dispatch(setConsultationTimesStatus('failed'));
        } finally {
            dispatch(setLoading(false));
            dispatch(setConsultationTimesStatus("idle"))
        }
    };
};




export default consultationTimesSlice.reducer;
