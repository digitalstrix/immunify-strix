import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "doctorEducationData";

export const educationInfoSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    doctorEducationData: [],
    educationDataRetrievingStatus: "idle",
    educationDataRetrievingError: null,
    educationDataAddingStatus: "idle",
    educationDataAddingError: null,
    educationDataDeletionStatus: "idle",
    educationDataDeletionError: null,
  },
  reducers: {
    setEducationDataRetrievingStatus: (state, action) => {
      state.educationDataRetrievingStatus = action.payload;
    },
    setEducationDataRetrievingError: (state, action) => {
      state.EducationDataRetrievingError = action.payload;
    },
    setEducationData: (state, action) => {
      state.doctorEducationData = action.payload;
    },
    setEducationDataAddingStatus: (state, action) => {
      state.educationDataAddingStatus = action.payload;
    },
    setEducationDataAddingError: (state, action) => {
      state.educationDataAddingError = action.payload;
    },
    setEducationDeletionStatus: (state, action) => {
      state.educationDataDeletionStatus = action.payload;
    },
    setEducationDeletionError: (state, action) => {
      state.educationDataDeletionError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setEducationDataRetrievingStatus,
  setEducationDataRetrievingError,
  setEducationData,
  setEducationDataAddingStatus,
  setEducationDataAddingError,
  setEducationDeletionStatus,
  setEducationDeletionError,
} = educationInfoSlice.actions;

export const getEducationInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setEducationDataRetrievingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setEducationDataRetrievingError(null));
      const response = await ImmunifyApi.getDoctorEducation(payload);
      if (response && response.status === 200) {
        dispatch(setEducationDataRetrievingStatus("succeeded"));
        let data = await response.json();
        dispatch(setEducationData(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setEducationDataRetrievingStatus("failed"));
      dispatch(setEducationDataRetrievingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setEducationDataRetrievingStatus("idle"))
      );
    }
  };
};

export const addEducationInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setEducationDataAddingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setEducationDataAddingError(null));
      const response = await ImmunifyApi.addDoctorEducationInfo(payload);
      if (response && response.status === 200) {
        dispatch(setEducationDataAddingStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setEducationDataAddingStatus("failed"));
      dispatch(setEducationDataAddingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setEducationDataAddingStatus("idle"))
      );
    }
  };
};

export const deleteEducationInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setEducationDeletionStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setEducationDeletionError(null));
      const response = await ImmunifyApi.deleteDoctorEducationInfo(payload);
      if (response && response.status === 200) {
        dispatch(setEducationDeletionStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setEducationDeletionStatus("failed"));
      dispatch(setEducationDeletionError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setEducationDeletionStatus("idle")));
    }
  };
};

export default educationInfoSlice.reducer;
