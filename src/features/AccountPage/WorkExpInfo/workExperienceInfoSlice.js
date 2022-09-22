import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "doctorWorkExperienceData";

export const workExperienceInfo = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    doctorWorkExperienceData: [],
    workExperienceDataRetrievingStatus: "idle",
    workExperienceDataRetrievingError: null,
    workExperienceDataAddingStatus: "idle",
    workExperienceDataAddingError: null,
    workExperienceDataDeletionStatus: "idle",
    workExperienceDataDeletionError: null,
  },
  reducers: {
    setWorkExperienceDataRetrievingStatus: (state, action) => {
      state.workExperienceDataRetrievingStatus = action.payload;
    },
    setWorkExperienceDataRetrievingError: (state, action) => {
      state.workExperienceDataRetrievingError = action.payload;
    },
    setWorkExperienceData: (state, action) => {
      state.doctorWorkExperienceData = action.payload;
    },
    setWorkExperienceDataAddingStatus: (state, action) => {
      state.workExperienceDataAddingStatus = action.payload;
    },
    setWorkExperienceDataAddingError: (state, action) => {
      state.workExperienceDataAddingError = action.payload;
    },
    setWorkExperienceDeletionStatus: (state, action) => {
      state.workExperienceDataDeletionStatus = action.payload;
    },
    setWorkExperienceDeletionError: (state, action) => {
      state.workExperienceDataDeletionError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setWorkExperienceDataRetrievingStatus,
  setWorkExperienceDataRetrievingError,
  setWorkExperienceData,
  setWorkExperienceDataAddingStatus,
  setWorkExperienceDataAddingError,
  setWorkExperienceDeletionStatus,
  setWorkExperienceDeletionError,
} = workExperienceInfo.actions;

export const getWorkExperienceInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setWorkExperienceDataRetrievingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setWorkExperienceDataRetrievingError(null));
      const response = await ImmunifyApi.getDoctorWorkExpInfo(payload);
      if (response && response.status === 200) {
        dispatch(setWorkExperienceDataRetrievingStatus("succeeded"));
        let data = await response.json();
        dispatch(setWorkExperienceData(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setWorkExperienceDataRetrievingStatus("failed"));
      dispatch(setWorkExperienceDataRetrievingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setWorkExperienceDataRetrievingStatus("idle"))
      );
    }
  };
};

export const addWorkExperienceInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setWorkExperienceDataAddingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setWorkExperienceDataAddingError(null));
      const response = await ImmunifyApi.addDoctorWorkExpInfo(payload);
      if (response && response.status === 200) {
        dispatch(setWorkExperienceDataAddingStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setWorkExperienceDataAddingStatus("failed"));
      dispatch(setWorkExperienceDataAddingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setWorkExperienceDataAddingStatus("idle"))
      );
    }
  };
};

export const deleteWorkExperienceInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setWorkExperienceDeletionStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setWorkExperienceDeletionError(null));
      const response = await ImmunifyApi.deleteDoctorWorkExpInfo(payload);
      if (response && response.status === 200) {
        dispatch(setWorkExperienceDeletionStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setWorkExperienceDeletionStatus("failed"));
      dispatch(setWorkExperienceDeletionError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setWorkExperienceDeletionStatus("idle"))
      );
    }
  };
};

export default workExperienceInfo.reducer;
