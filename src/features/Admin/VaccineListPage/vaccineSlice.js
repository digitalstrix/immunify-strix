import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator, extractDate, excuteAfterGivenDelay } from '../../../utils/commonUtils';
import ImmunifyApi from '../../../api/immunifyApi';
import { setLoading } from '../../Common/commonSlice';

const REDUCER_DOMAIN = 'vaccines';
const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const loadVaccines = createAsyncThunk(prefixEventName('loadVaccines'), async () => {
    const response = await ImmunifyApi.getVaccines();
    return response.json();
});

const vaccineSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        vaccines: [],
        vaccinesLoadingStatus: 'idle',
        addNewVaccineStatus: 'idle',
        updateVaccineStatus: 'idle',
        tradenames: []
    },
    reducers: {
        // setVaccines: (state, action) => {
        //     state.vaccines = action.payload;
        // },
        updateVaccines: (state, action) => {
            const { id: vaccineId } = action.payload;
            const index = state.vaccines.findIndex(({ id }) => id === vaccineId);
            console.log(`Index: ${index}`);
            if (index === -1) {
                state.vaccines = [...state.vaccines, action.payload];
            } else {
                state.vaccines[index] = action.payload;
            }

        },
        setAddNewVaccineStatus: (state, action) => {
            state.addNewVaccineStatus = action.payload;
        },
        setUpdateVaccineStatus: (state, action) => {
            state.updateVaccineStatus = action.payload;
        }

    },
    extraReducers: {
        [loadVaccines.pending]: (state, action) => {
            state.vaccinesLoadingStatus = 'loading';
        },
        [loadVaccines.fulfilled]: (state, action) => {
            state.vaccinesLoadingStatus = 'succeeded';
            state.vaccines = action.payload;
        },
        [loadVaccines.rejected]: (state, action) => {
            state.vaccinesLoadingStatus = 'failed';
        }
    }
});

export const {
    updateVaccines,
    setAddNewVaccineStatus,
    setUpdateVaccineStatus
} = vaccineSlice.actions;

export const addNewVaccine = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setAddNewVaccineStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.addNewVaccine(payload);
            if (response && response.status === 201) {
                const data = await response.json();
                dispatch(updateVaccines(data));
                dispatch(setAddNewVaccineStatus('succeeded'));
            } else {
                dispatch(setAddNewVaccineStatus('failed'));
            }
        } catch (err) {
            dispatch(setAddNewVaccineStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setAddNewVaccineStatus('idle'));
                dispatch(setLoading(false));
            });
        }
    }
};

export const updateVaccine = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setUpdateVaccineStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.updateVaccine(payload);
            if (response && response.status === 200) {
                const { vaccineId, ...rest } = payload;
                dispatch(updateVaccines({ id: vaccineId, ...rest }));
                dispatch(setUpdateVaccineStatus('succeeded'));
            } else {
                dispatch(setUpdateVaccineStatus('failed'));
            }
        } catch (err) {
            dispatch(setUpdateVaccineStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setUpdateVaccineStatus('idle'));
                dispatch(setLoading(false));
            });
        }
    }
};

export default vaccineSlice.reducer;
