import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventNameGenerator, excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from '../../../Common/commonSlice';

const REDUCER_DOMAIN = "doctorApproval";

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const getNonApprovedUsers = createAsyncThunk(
  prefixEventName("getNonApprovedUsers"),
  async () => {
    const response = await ImmunifyApi.getNonApprovedUsers();
    return response.json();
  }
);

const doctorApprovalSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    nonApprovedUsers: [],
    loadingStatus: 'idle',
    loadingError: null,
    doctorApprovalStatus: 'idle',
    doctorRemoveStatus: 'idle',
  },
  reducers: {
    setDoctorApprovalStatus: (state, action) => {
      state.doctorApprovalStatus = action.payload;
    },
    setDoctorRemoveStatus: (state, action) => {
      state.doctorRemoveStatus = action.payload;
    }
  },
  extraReducers: {
    [getNonApprovedUsers.pending]: (state, action) => {
      state.loadingStatus = 'loading';
    },
    [getNonApprovedUsers.fulfilled]: (state, action) => {
      state.nonApprovedUsers = action.payload;
      state.loadingStatus = 'succceeded';
    },
    [getNonApprovedUsers.rejected]: (state, action) => {
      state.loadingStatus = 'failed';
    }
  },
});

const { setDoctorApprovalStatus, setDoctorRemoveStatus } = doctorApprovalSlice.actions;

export const approveDoctor = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDoctorApprovalStatus('loading'));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.approveDoctor(payload);
      if (response && response.status === 200) {
        dispatch(setDoctorApprovalStatus('succeeded'));
        dispatch(getNonApprovedUsers());
      } else {
        dispatch(setDoctorApprovalStatus('failed'));
      }
    } catch (err) {
      dispatch(setDoctorApprovalStatus('loading'));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setDoctorApprovalStatus('idle'));
      });
    }
  };
};

export const removeDoctor = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDoctorRemoveStatus('loading'));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.removeDoctor(payload);
      if (response && response.status === 200) {
        dispatch(setDoctorRemoveStatus('succeeded'));
        dispatch(getNonApprovedUsers());
        
      } else {
        dispatch(setDoctorRemoveStatus('failed'));
      }
    } catch (err) {
      dispatch(setDoctorRemoveStatus('loading'));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setDoctorRemoveStatus('idle'));
      });
    }
  }
}


export default doctorApprovalSlice.reducer;
