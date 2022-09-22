import { createSlice } from '@reduxjs/toolkit';
import ImmunifyApi from '../../api/immunifyApi';
import { setLoading } from '../Common/commonSlice';

const REDUCER_DOMAIN = 'requestVaccines';

export const requestVaccinationSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        requestStatus: 'idle',
        requestError: null
    },
    reducers: {
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload;
        },
        setRequestError: (state, action) => {
            state.requestError = action.payload;
        }
    }
});

export const {
    setRequestStatus,
    setRequestError
} = requestVaccinationSlice.actions;

export const requestVaccines = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setRequestStatus('loading'));
            dispatch(setLoading(true));
            dispatch(setRequestError(null));
            const response = await ImmunifyApi.requestVaccines(payload);
            if (response && response.status === 201) {
                dispatch(setRequestStatus('succeeded'));
            } else {
                // todo handle
            }
        } catch (err) {
            dispatch(setRequestError(err));
            dispatch(setRequestStatus('failed'));
        } finally {
            dispatch(setRequestStatus('idle'));
            dispatch(setLoading(false));
        }
    };
};

export default requestVaccinationSlice.reducer;
