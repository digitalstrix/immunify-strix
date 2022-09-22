import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator, extractDate, excuteAfterGivenDelay } from '../../../utils/commonUtils';
import ImmunifyApi from '../../../api/immunifyApi';
import { VAC_SCHEDULE_STATUS_DELETED } from '../../../constants/vacScheduleConstants';
import { setLoading } from '../../Common/commonSlice';

const REDUCER_DOMAIN = 'vacSchedules';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

// export const fetchSchedules = createAsyncThunk(prefixEventName('fetchSchedules'), async (payload) => {
//     const response = await ImmunifyApi.getVacSchedules(payload);
//     return response.json();
// });

export const loadVaccines = createAsyncThunk(prefixEventName('loadVaccines'), async () => {
    const response = await ImmunifyApi.getVaccines();
    return response.json();
});

const vacSchdulesSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        schedules: [],
        scheduleDetails: {},
        vaccines: [],
        schedulesLoadingStatus: 'idle',
        scheduleCreateStatus: 'idle',
        scheduleUpdateStatus: 'idle',
        scheduleDeleteStatus: 'idle',
        scheduleDetailsLoadingStatus: 'idle',
        vaccinesLoadingStatus: 'idle',
        addScheduleDetailsStatus: 'idle',
        vacScheduleDeleteStatus: 'idle'
    },
    reducers: {
        setSchedules: (state, action) => {
            state.schedules = action.payload;
        },
        setScheduleLoadingStatus: (state, action) => {
            state.schedulesLoadingStatus = action.payload;
        },
        setScheduleCreateStatus: (state, action) => {
            state.scheduleCreateStatus = action.payload;
        },
        setScheduleUpdateStatus: (state, action) => {
            state.scheduleUpdateStatus = action.payload;
        },  
        setScheduleDeleteStatus: (state, action) => {
            state.scheduleDeleteStatus = action.payload;
        },
        updateSchedules: (state, action) => {
            const schedule = action.payload;
            const index = state.schedules.findIndex(({ id }) => id === schedule.id);
            if (index === -1) {
                state.schedules.push(schedule);
            } else {
                state.schedules[index] = {
                    ...state.schedules[index],
                    ...schedule,
                    updatedAt: new Date().toISOString()
                };
            }
        },
        updateSchedule: (state, action) => {
            const schedule = action.payload;
            const index = state.schedules.findIndex(({ id }) => id === schedule.id);
            if (index !== -1) {
                state.schedules[index] = {
                    ...state.schedules[index],
                    ...schedule,
                    updatedAt: new Date().toISOString()
                };
            }            
        },
        setScheduleDetailsLoaingStatus: (state, action) => {
            state.scheduleDetailsLoadingStatus = action.payload;
        },
        updateScheduleDetails: (state, action) => {
            const { id, details } = action.payload;
            state.scheduleDetails[id] = details;
        },
        setAddScheduleDetailsStatus: (state, action) => {
            state.addScheduleDetailsStatus = action.payload;
        },
        setVacScheduleDeleteStatus: (state, action) => {
            state.vacScheduleDeleteStatus = action.payload;
        }
    },
    extraReducers: {
        // [fetchSchedules.fulfilled]: (state, action) => {
        //     state.schedulesLoadingStatus = 'succeeded';
        //     state.schedules = action.payload;
        // },
        // [fetchSchedules.pending]: (state, action) => {
        //     state.schedulesLoadingStatus = 'loading';
        // },
        // [fetchSchedules.rejected]: (state, action) => {
        //     state.schedulesLoadingStatus = 'failed';
        // },
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
    setScheduleCreateStatus,
    setScheduleUpdateStatus,
    setScheduleDeleteStatus,
    updateSchedules,
    setScheduleDetailsLoaingStatus,
    updateScheduleDetails,
    setAddScheduleDetailsStatus,
    setVacScheduleDeleteStatus,
    updateSchedule,
    setSchedules,
    setScheduleLoadingStatus
} = vacSchdulesSlice.actions;

export const fetchSchedules = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setScheduleLoadingStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.getVacSchedules(payload);
            if (response && response.status === 200) {
                const schedules = await response.json();
                dispatch(setScheduleLoadingStatus('succeeded'));
                dispatch(setSchedules(schedules))
            }

        } catch (err) {
            dispatch(setScheduleLoadingStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setScheduleLoadingStatus('idle'));
                dispatch(setLoading(false));
            });
        }
    }
}

export const registerVacSchedule = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setScheduleCreateStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.createVacSchedule(payload);
            if (response && response.status === 201) {
                const schedule = await response.json();
                dispatch(updateSchedules(schedule));
                dispatch(setScheduleCreateStatus('succeeded'));
            }            
        } catch (err) {
            dispatch(setScheduleCreateStatus('failed'));

        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setScheduleCreateStatus('idle'));
                dispatch(setLoading(false));
            });
        }
    }
}

export const updateVacSchedule = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setScheduleUpdateStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.updateVacSchedule(payload);
            if (response && response.status === 200) {
                dispatch(updateSchedules(payload));
                dispatch(setScheduleUpdateStatus('succeeded'));
            }
        } catch (err) {
            dispatch(setScheduleUpdateStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setScheduleUpdateStatus('idle'));
                dispatch(setLoading(false));
            });
            
        }
    }
}

export const getScheduleDetails = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setScheduleDetailsLoaingStatus('loading'));
            const response = await ImmunifyApi.getScheduleDetails(payload);
            if (response && response.status === 200) {
                const { id, VaccinationScheduleDetails: details } = await response.json();
                dispatch(updateScheduleDetails({ id, details }));
                dispatch(setScheduleDetailsLoaingStatus('succeeded'));
                
            }
        } catch (err) {
            dispatch(setScheduleDetailsLoaingStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setScheduleDetailsLoaingStatus('idle'));
            });            
        }
    };
};

export const addVacScheduleDetails = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setAddScheduleDetailsStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.addVaccineToSchedule(payload);
            if (response && response.status === 201) {
                dispatch(setAddScheduleDetailsStatus('succeeded'));
                const { scheduleId: schedueId } = payload;
                dispatch(getScheduleDetails({ schedueId }));
            }
        } catch (err) {
            dispatch(setAddScheduleDetailsStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setAddScheduleDetailsStatus('idle'));
                dispatch(setLoading(false));
            });
            
        }
    };
}

export const deleteVacSchedule = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setVacScheduleDeleteStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.deleteVacSchedule(payload);
            if (response && response.status === 200) {
                dispatch(setVacScheduleDeleteStatus('succeeded'));
                dispatch(updateSchedule({
                    id: payload.scheduleId,
                    status: VAC_SCHEDULE_STATUS_DELETED
                }));
            }
        } catch (err) {
            dispatch(setVacScheduleDeleteStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setVacScheduleDeleteStatus('idle'));
                dispatch(setLoading(false));
            });
        }
    };
}

export default vacSchdulesSlice.reducer;
