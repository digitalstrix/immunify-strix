import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator, extractDate, excuteAfterGivenDelay } from '../../../utils/commonUtils';
import ImmunifyApi from '../../../api/immunifyApi';
import { setLoading } from '../../Common/commonSlice';
// import { CENTER_METADATA_RESP_DATA_KEYS } from '../../../constants/vacCenterConstants';

const REDUCER_DOMAIN = 'vacCenters';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const fetchVacCenterMetadata = createAsyncThunk(prefixEventName('fetchVacCenterMetadata'), async () => {
    const response = await Promise.all([
        ImmunifyApi.getVacStates(),
        ImmunifyApi.getVacTypes()
    ]);
    const mapped = response.map(resp => resp.json());
    return Promise.all(mapped);
});

export const getVacCenters = createAsyncThunk(prefixEventName('getVacCenters'), async (payload) => {
    const response = await ImmunifyApi.getVacCenters(payload);
    return response.json();
});

export const getMainCenters = createAsyncThunk(prefixEventName('getMainCenters'), async (payload) => {
    const response = await ImmunifyApi.getVacCenters(payload);
    return response.json();
});

export const vacCenterSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        centerMetadataLoadingStatus: 'idle',
        vacStates: [],
        vacTypes: [],
        centersLoadingStatus: 'idle',
        centers: [],
        registerVacCenterStatus: 'idle',
        registerVacCenterError: null,
        updateVacCenterStatus: 'idle',
        updateVacCenterError: null,
        mainCenters: []
    },
    reducers: {
        setRegVacCenterStatus: (state, action) => {
            state.registerVacCenterStatus = action.payload;
        },
        setRegVacCenterError: (state, action) => {
            state.registerVacCenterError = action.payload;
        },
        setUpdateVacCenterError: (state, action) => {
            state.updateVacCenterError = action.payload;
        },
        setUpdateVacCenterStatus: (state, action) => {
            state.updateVacCenterStatus = action.payload;
        },
        setCenters: (state, action) => {
            state.centers = action.payload;
        }
    },
    extraReducers: {
        [fetchVacCenterMetadata.pending]: (state, action) => {
            state.centerMetadataLoadingStatus = 'loading';
        },
        [fetchVacCenterMetadata.fulfilled]: (state, action) => {
            state.centerMetadataLoadingStatus = 'succeeded';
            const [vacStates, vacTypes]  = action.payload;
            if (vacStates) {
                state.vacStates = vacStates.filter(({ state }) => !!state);
            }
            if (vacTypes) {
                state.vacTypes =  vacTypes.filter(({ vacType }) => !!vacType);
            }
        },
        [fetchVacCenterMetadata.rejected]: (state, action) => {
            state.centerMetadataLoadingStatus = 'failed';
        },
        [getVacCenters.pending]: (state, action) => {
            state.centersLoadingStatus = 'loading';
        },
        [getVacCenters.fulfilled]: (state, action) => {
            state.centers = action.payload.map(({ createdAt, ...rest }) => ({
                ...rest,
                createdAt: extractDate(createdAt)
            }));
            state.centersLoadingStatus = 'succeeded';
        },
        [getVacCenters.rejected]: (state, action) => {
            state.centersLoadingStatus = 'failed';
        },
        [getMainCenters.fulfilled]: (state, action) => {
            state.mainCenters = action.payload.filter(({ name }) => !!name );
        }
    }
});

export const {
    setRegVacCenterStatus,
    setCenters,
    setRegVacCenterError,
    setUpdateVacCenterError,
    setUpdateVacCenterStatus
} = vacCenterSlice.actions;

export const registerVacCenter = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setRegVacCenterStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.createVacCenter(payload);

            if (response) {
                if (response.status === 201) {
                    dispatch(setRegVacCenterStatus('succeeded'));

                } else if (response.status === 400) {
                    const { errors } = await response.json();
                    if (errors && errors.length) {
                        dispatch(setRegVacCenterError(errors[0].message));
                    }                    
                    dispatch(setRegVacCenterStatus('failed'));
                }
                // const center = await response.json();
                // const { centers } = getState().vacCenter;
                // dispatch(setCenters([ ...centers, center ]));
            }

        } catch (err) {
            dispatch(setRegVacCenterStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setRegVacCenterStatus('idle'));
                dispatch(setRegVacCenterError(null));
                dispatch(setLoading(false));
            });
        }
    };
};

export const updateVacCenter = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setUpdateVacCenterStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.updateVacCenter(payload);
            if (response && response.status === 200) {
                dispatch(setUpdateVacCenterStatus('succeeded'));
            }
        } catch (err) {
            dispatch(setUpdateVacCenterStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setUpdateVacCenterStatus('idle'));
                dispatch(setUpdateVacCenterError(null));
                dispatch(setLoading(false));

            });
        }
    };
};


export default vacCenterSlice.reducer;
