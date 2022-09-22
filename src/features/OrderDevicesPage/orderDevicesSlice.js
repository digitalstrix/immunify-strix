import { createSlice } from '@reduxjs/toolkit';
import ImmunifyApi from '../../api/immunifyApi';
import { setLoading } from '../Common/commonSlice';

const REDUCER_DOMAIN = 'orderDevices';

export const orderDevicesSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        createOrderStatus: 'idle',
        createOrderError: null
    },
    reducers: {
        setCreateOrderStatus: (state, action) => {
            state.createOrderStatus = action.payload;
        },
        setCreateOrderError: (state, action) => {
            state.createOrderError = action.payload;
        }
    }
});

export const {
    updateInputs,
    updateErrors,
    setCreateOrderStatus,
    setCreateOrderError
} = orderDevicesSlice.actions;

export const orderDevices = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setCreateOrderStatus('loading'));
            dispatch(setLoading(true));
            dispatch(setCreateOrderError(null));

            const response = await ImmunifyApi.orderDevices(payload);

            if (response && response.status === 201) {
                dispatch(setCreateOrderStatus('succeeded'));

            } else {
                // todo handle
            }

        } catch(err) {
            dispatch(setCreateOrderStatus('failed'));
            dispatch(setCreateOrderError(err));
        } finally {
            dispatch(setCreateOrderStatus('idle'));
            dispatch(setLoading(false));
        }
    };
}


export default orderDevicesSlice.reducer;
