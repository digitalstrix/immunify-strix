import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "MyAppointments";

export const myAppointmentsSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    myAppointments: [],
    doctorInfo: {},
    retrievingMyAppointmentsStatus: "idle",
    retrievingMyAppointmentsError: null,
    cancellingAppointmentStatus: "idle",
    cancellingAppointmentError: null,
    retrievingDoctorMoreInfoStatus: "idle",
    retrievingDoctorMoreInfoError: null,
    callData: {},
    initiateCallStatus: "idle",
    initiateCallError: null,
  },
  reducers: {
    setMyAppointments: (state, action) => {
      state.myAppointments = action.payload;
    },
    setDoctorInfo: (state, action) => {
      state.doctorInfo = action.payload;
    },
    setRetrievingMyAppointmentsStatus: (state, action) => {
      state.retrievingMyAppointmentsStatus = action.payload;
    },
    setRetrievingMyAppointmentsError: (state, action) => {
      state.retrievingMyAppointmentsError = action.payload;
    },
    setRetrievingDoctorMoreInfoStatus: (state, action) => {
      state.retrievingDoctorMoreInfoStatus = action.payload;
    },
    setRetrievingDoctorMoreInfoError: (state, action) => {
      state.retrievingDoctorMoreInfoError = action.payload;
    },
    setCancellingAppointmentStatus: (state, action) => {
      state.cancellingAppointmentStatus = action.payload;
    },
    setCancellingAppointmentError: (state, action) => {
      state.cancellingAppointmentError = action.payload;
    },
    setInitiateCallStatus: (state, action) => {
      state.initiateCallStatus = action.payload;
    },
    setInitiateCallError: (state, action) => {
      state.initiateCallError = action.payload;
    },
    setCallData: (state, action) => {
      state.callData = action.payload;
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
  setDoctorInfo,
  setRetrievingDoctorMoreInfoStatus,
  setRetrievingDoctorMoreInfoError,
  setInitiateCallStatus,
  setInitiateCallError,
  setCallData,
} = myAppointmentsSlice.actions;

export const getMyAppointments = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingMyAppointmentsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingMyAppointmentsError(null));
      const response = await ImmunifyApi.getDoctorAppointments(payload);
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

export const getDoctorMoreInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingDoctorMoreInfoStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingDoctorMoreInfoError(null));
      const response = await ImmunifyApi.getDoctorProfileInfo(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setDoctorInfo(data));
        dispatch(setRetrievingDoctorMoreInfoStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingDoctorMoreInfoStatus("failed"));
      dispatch(setRetrievingDoctorMoreInfoError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingDoctorMoreInfoStatus("idle"))
      );
    }
  };
};

export const cancelAppointment = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setCancellingAppointmentStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setCancellingAppointmentError(null));
      const response = await ImmunifyApi.cancelAppointment(payload);
      if (response && response.status === 200) {
        dispatch(
          getMyAppointments({
            immId: payload.personId,
            date: payload.date,
          })
        );
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

export const initiateCallAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setInitiateCallStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setInitiateCallError(null));
      const response = await ImmunifyApi.initVideoCall(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setCallData(data));
        dispatch(setInitiateCallStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setInitiateCallStatus("failed"));
      dispatch(setInitiateCallError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setInitiateCallStatus("idle")));
    }
  };
};

export default myAppointmentsSlice.reducer;
