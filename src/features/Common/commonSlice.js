import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../utils/commonUtils";
import ImmunifyApi from "../../api/immunifyApi";

const REDUCER_DOMAIN = "common";

export const commonSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    loggingOutStatus: "idle",
    loggingOutError: null,
    loading: false,
    doctorSpecializations: [],
    doctorSpecializationsStatus: "idle",
    doctorSpecializationsError: null,
    receivingCall: false,
    callerData: {
      channel: null,
      token: null,
      uid: null,
      slotId: null,
      userName: null,
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDoctorSpecializationsStatus: (state, action) => {
      state.doctorSpecializationsStatus = action.payload;
    },
    setDoctorSpecializationsError: (state, action) => {
      state.doctorSpecializationsError = action.payload;
    },
    setDoctorSpecializations: (state, action) => {
      state.doctorSpecializations = action.payload;
    },
    setReceivingCallStatus: (state, action) => {
      state.receivingCall = action.payload;
    },
    setCallerData: (state, action) => {
      state.callerData = action.payload?.data;
    },
    setLoggingOutStatus: (state, action) => {
      state.loggingOutStatus = action.payload;
    },
    setLoggingOutError: (state, action) => {
      state.loggingOutError = action.payload;
    },
  },
});

export const {
  setLoading,
  setDoctorSpecializationsStatus,
  setDoctorSpecializationsError,
  setDoctorSpecializations,
  setReceivingCallStatus,
  setCallerData,
  setLoggingOutStatus,
  setLoggingOutError,
} = commonSlice.actions;

export const getDoctorSpecializationsList = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDoctorSpecializationsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDoctorSpecializationsError(null));
      const response = await ImmunifyApi.getDoctorSpecializations(payload);
      if (response && response.status === 200) {
        dispatch(setDoctorSpecializationsStatus("succeeded"));
        let data = await response.json();
        dispatch(setDoctorSpecializations(data?.body?.data));
      } else {
        // todo handle
      }
    } catch (err) {
      dispatch(setDoctorSpecializationsStatus("failed"));
      dispatch(setDoctorSpecializationsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setDoctorSpecializationsStatus("idle"))
      );
    }
  };
};

export const userLogout = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setLoggingOutStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setLoggingOutError(null));
      const response = await ImmunifyApi.webLogout(payload);
      if (response && response.status === 200) {
        dispatch(setLoggingOutStatus("succeeded"));
      } else {
        // todo handle
      }
    } catch (err) {
      dispatch(setLoggingOutStatus("failed"));
      dispatch(setLoggingOutError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setLoggingOutStatus("idle")));
    }
  };
};

export default commonSlice.reducer;
