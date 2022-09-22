import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";
import { getDoctorProfileInfo } from "../ProfileInfo/profileInfoSlice";

const REDUCER_DOMAIN = "Sessions";

export const availabilityCalendarSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    doctorSessions: [],
    retrievingDoctorSessionsStatus: "idle",
    retrievingDoctorSessionsError: null,
    addingDoctorSessionsStatus: "idle",
    addingingDoctorSessionsError: null,
    deleteDoctorSessionStatus: "idle",
    deleteDoctorSessionsError: null,
  },
  reducers: {
    setDoctorSessions: (state, action) => {
      state.doctorSessions = action.payload;
    },
    setRetrievingDoctorSessionsStatus: (state, action) => {
      state.retrievingDoctorSessionsStatus = action.payload;
    },
    setRetrievingDoctorSessionsError: (state, action) => {
      state.retrievingDoctorSessionsError = action.payload;
    },
    setAddDoctorSessionStatus: (state, action) => {
      state.addingDoctorSessionsStatus = action.payload;
    },
    setAddDoctorSessionError: (state, action) => {
      state.addingingDoctorSessionsError = action.payload;
    },
    setDeleteDoctorSessionsStatus: (state, action) => {
      state.deleteDoctorSessionStatus = action.payload;
    },
    setDeleteDoctorSessionsError: (state, action) => {
      state.deleteDoctorSessionsError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setDoctorSessions,
  setRetrievingDoctorSessionsStatus,
  setRetrievingDoctorSessionsError,
  setAddDoctorSessionStatus,
  setAddDoctorSessionError,
  setDeleteDoctorSessionsStatus,
  setDeleteDoctorSessionsError,
} = availabilityCalendarSlice.actions;

export const getDoctorSessions = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingDoctorSessionsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingDoctorSessionsError(null));
      const response = await ImmunifyApi.getDoctorSessions(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setDoctorSessions(data));
        dispatch(setRetrievingDoctorSessionsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingDoctorSessionsStatus("failed"));
      dispatch(setRetrievingDoctorSessionsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingDoctorSessionsStatus("idle"))
      );
    }
  };
};

export const addDoctorSession = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setAddDoctorSessionStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setAddDoctorSessionError(null));
      const response = await ImmunifyApi.addDoctorSession(payload);
      if (response && response.status === 201) {
        dispatch(getDoctorSessions({ immId: payload.doctorId }));
        dispatch(getDoctorProfileInfo({ doctorId: payload.doctorId }));
        dispatch(setAddDoctorSessionStatus("succeeded"));
      } else if (response && response.status === 409) {
        dispatch(setAddDoctorSessionStatus("conflict"));
      } else {
      }
    } catch (err) {
      dispatch(setAddDoctorSessionStatus("failed"));
      dispatch(setAddDoctorSessionError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setAddDoctorSessionStatus("idle")));
    }
  };
};

export const deleteDoctorSessions = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeleteDoctorSessionsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDeleteDoctorSessionsError(null));
      const response = await ImmunifyApi.deleteDoctorSession(payload);
      if (response && response.status === 200) {
        dispatch(getDoctorSessions({ immId: payload.doctorId }));
        dispatch(getDoctorProfileInfo({ doctorId: payload.doctorId }));
        dispatch(setDeleteDoctorSessionsStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setDeleteDoctorSessionsStatus("failed"));
      dispatch(setDeleteDoctorSessionsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setDeleteDoctorSessionsStatus("idle"))
      );
    }
  };
};

export default availabilityCalendarSlice.reducer;
