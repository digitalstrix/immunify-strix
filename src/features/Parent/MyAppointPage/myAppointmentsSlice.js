import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "calender";

export const myAppointmentSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    myAppointments: {
      upComming: [],
      past: [],
    },
    retrievingMyAppointmentsStatus: "idle",
    retrievingMyAppointmentsError: null,
    cancellingAppointmentStatus: "idle",
    cancellingAppointmentError: null,
  },
  reducers: {
    setMyAppointments: (state, action) => {
      state.myAppointments = action.payload;
    },
    setRetrievingMyAppointmentsStatus: (state, action) => {
      state.retrievingMyAppointmentsStatus = action.payload;
    },
    setRetrievingMyAppointmentsError: (state, action) => {
      state.retrievingMyAppointmentsError = action.payload;
    },
    setCancellingAppointmentStatus: (state, action) => {
      state.cancellingAppointmentStatus = action.payload;
    },
    setCancellingAppointmentError: (state, action) => {
      state.cancellingAppointmentError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setMyAppointments,
  setRetrievingMyAppointmentsStatus,
  setRetrievingMyAppointmentsError,
  setCancellingAppointmentStatus,
  setCancellingAppointmentError,
} = myAppointmentSlice.actions;

export const getAppointmentsData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingMyAppointmentsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingMyAppointmentsError(null));
      const response = await ImmunifyApi.getParentAppointmentData(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setMyAppointments(data));
        dispatch(setRetrievingMyAppointmentsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingMyAppointmentsStatus("failed"));
      dispatch(setRetrievingMyAppointmentsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingMyAppointmentsStatus("idle"))
      );
    }
  };
};

export const cancelAppointmentAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setCancellingAppointmentStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setCancellingAppointmentError(null));
      const response = await ImmunifyApi.cancelAppointmentByParent(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(getAppointmentsData({ personId: payload.personId }));
        dispatch(setCancellingAppointmentStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setCancellingAppointmentStatus("failed"));
      dispatch(setCancellingAppointmentError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setCancellingAppointmentStatus("idle"))
      );
    }
  };
};

export default myAppointmentSlice.reducer;
