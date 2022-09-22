import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../utils/commonUtils";
import ImmunifyApi from "../../api/immunifyApi";
import { setLoading } from "../Common/commonSlice";

const REDUCER_DOMAIN = "calender";

export const calenderSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    userEvents: [],
    retrievingUserEventsStatus: "idle",
    retrievingUserEventsError: null,
    updatingUserEventStatus: "idle",
    updatingUserEventError: null,
    addUserEventStatus: "idle",
    addUserEventError: null,
    deleteUserEventStatus: "idle",
    deleteUserEventError: null,
  },
  reducers: {
    setUserEvents: (state, action) => {
      state.userEvents = action.payload;
    },
    setRetrievingUserEventsStatus: (state, action) => {
      state.retrievingUserEventsStatus = action.payload;
    },
    setRetrievingUserEventsError: (state, action) => {
      state.retrievingUserEventsError = action.payload;
    },
    setUpdatingUserEventStatus: (state, action) => {
      state.updatingUserEventStatus = action.payload;
    },
    setUpdatingUserEventError: (state, action) => {
      state.updatingUserEventError = action.payload;
    },
    setAddUserEventStatus: (state, action) => {
      state.addUserEventStatus = action.payload;
    },
    setAddUserEventError: (state, action) => {
      state.addUserEventError = action.payload;
    },
    setDeleteUserEventStatus: (state, action) => {
      state.deleteUserEventStatus = action.payload;
    },
    setDeleteUserEventError: (state, action) => {
      state.deleteUserEventError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setUserEvents,
  setRetrievingUserEventsStatus,
  setRetrievingUserEventsError,
  setUpdatingUserEventStatus,
  setUpdatingUserEventError,
  setAddUserEventStatus,
  setAddUserEventError,
  setDeleteUserEventStatus,
  setDeleteUserEventError
} = calenderSlice.actions;

export const getUserEvents = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingUserEventsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingUserEventsError(null));
      const response = await ImmunifyApi.getDoctorEvents(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setUserEvents(data));
        dispatch(setRetrievingUserEventsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingUserEventsStatus("failed"));
      dispatch(setRetrievingUserEventsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingUserEventsStatus("idle"))
      );
    }
  };
};

export const updateUserEvent = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdatingUserEventStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setUpdatingUserEventError(null));
      const response = await ImmunifyApi.updateDoctorEvent(payload);
      if (response && response.status === 200) {
        dispatch(getUserEvents(payload.doctorId));
        dispatch(setUpdatingUserEventStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setUpdatingUserEventStatus("failed"));
      dispatch(setUpdatingUserEventError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setUpdatingUserEventStatus("idle")));
    }
  };
};

export const addUserEvent = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setAddUserEventStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setAddUserEventError(null));
      const response = await ImmunifyApi.addDoctorEvent(payload);
      if (response && response.status === 200) {
        dispatch(getUserEvents(payload.doctorId));
        dispatch(setAddUserEventStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setAddUserEventStatus("failed"));
      dispatch(setAddUserEventError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setAddUserEventStatus("idle")));
    }
  };
};

export const deleteUserEvent = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeleteUserEventStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDeleteUserEventError(null));
      const response = await ImmunifyApi.deleteDoctorEvent(payload);
      if (response && response.status === 200) {
        dispatch(getUserEvents(payload.doctorId));
        dispatch(setDeleteUserEventStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setDeleteUserEventStatus("failed"));
      dispatch(setDeleteUserEventError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setDeleteUserEventStatus("idle")));
    }
  };
};

export default calenderSlice.reducer;
