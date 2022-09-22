import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from "../../../Common/commonSlice";

const REDUCER_DOMAIN = "SelectedChildHealthFiles";

export const selectedChildHealthFiles = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    labReports: [],
    retrievingLabReportsStatus: "idle",
    retrievingLabReportsError: null,
    prescriptions: [],
    retrievingPrescriptionsStatus: "idle",
    retrievingPrescriptionsError: null,
    emailHealthFileStatus: "idle",
    emailHealthFileError: null,
    deleteLabReportStatus: "idle",
    deleteLabReportError: null,
    deletePrescriptionStatus: "idle",
    deletePrescriptionError: null,
    addHealthFileStatus: "idle",
    addHealthFileError: null,
  },
  reducers: {
    setLabReports: (state, action) => {
      state.labReports = action.payload;
    },
    setRetrievingLabReportsStatus: (state, action) => {
      state.retrievingLabReportsStatus = action.payload;
    },
    setRetrievingLabReportsError: (state, action) => {
      state.retrievingLabReportsError = action.payload;
    },
    setPrescriptions: (state, action) => {
      state.prescriptions = action.payload;
    },
    setRetrievingPrescriptionsStatus: (state, action) => {
      state.retrievingPrescriptionsStatus = action.payload;
    },
    setRetrievingPrescriptionsError: (state, action) => {
      state.retrievingPrescriptionsError = action.payload;
    },
    setEmailHealthFileStatus: (state, action) => {
      state.emailHealthFileStatus = action.payload;
    },
    setEmailHealthFileError: (state, action) => {
      state.emailHealthFileError = action.payload;
    },
    setDeleteHealthFileStatus: (state, action) => {
      state.deleteLabReportStatus = action.payload;
    },
    setDeleteHealthFileError: (state, action) => {
      state.deleteLabReportError = action.payload;
    },
    setAddHealthFileStatus: (state, action) => {
      state.addHealthFileStatus = action.payload;
    },
    setAddHealthFileError: (state, action) => {
      state.addHealthFileError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setLabReports,
  setRetrievingLabReportsStatus,
  setRetrievingLabReportsError,
  setPrescriptions,
  setRetrievingPrescriptionsStatus,
  setRetrievingPrescriptionsError,
  setEmailHealthFileStatus,
  setEmailHealthFileError,
  setDeleteHealthFileStatus,
  setDeleteHealthFileError,
  setAddHealthFileStatus,
  setAddHealthFileError,
} = selectedChildHealthFiles.actions;

export const getChildLabReports = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setLabReports([]));
      dispatch(setRetrievingLabReportsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingPrescriptionsError(null));
      const response = await ImmunifyApi.getChildLabReports(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setLabReports(data));
        dispatch(setRetrievingLabReportsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingLabReportsStatus("failed"));
      dispatch(setRetrievingPrescriptionsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingLabReportsStatus("idle"))
      );
    }
  };
};

export const emailHealthFile = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setEmailHealthFileStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setEmailHealthFileError(null));
      const response = await ImmunifyApi.emailChildHealthFile(payload);
      if (response && response.status === 200) {
        dispatch(setEmailHealthFileStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setEmailHealthFileStatus("failed"));
      dispatch(setEmailHealthFileError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setEmailHealthFileStatus("idle")));
    }
  };
};

export const deleteLabRoportFile = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeleteHealthFileStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDeleteHealthFileError(null));
      const response = await ImmunifyApi.deleteChildLabReport(payload);
      if (response && response.status === 200) {
        dispatch(setDeleteHealthFileStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setDeleteHealthFileStatus("failed"));
      dispatch(setDeleteHealthFileError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setDeleteHealthFileStatus("idle")));
    }
  };
};

export const deletePrescription = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeleteHealthFileStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDeleteHealthFileError(null));
      const response = await ImmunifyApi.deleteChildPrescription(payload);
      if (response && response.status === 200) {
        dispatch(setDeleteHealthFileStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setDeleteHealthFileStatus("failed"));
      dispatch(setDeleteHealthFileError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setDeleteHealthFileStatus("idle")));
    }
  };
};

export const addHealthFile = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setAddHealthFileStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setAddHealthFileError(null));
      const response = await ImmunifyApi.addChildHealthFile(payload);
      if (response && response.status === 200) {
        dispatch(setAddHealthFileStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setAddHealthFileStatus("failed"));
      dispatch(setAddHealthFileError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setAddHealthFileStatus("idle")));
    }
  };
};

export const getChildPrescriptions = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setPrescriptions([]));
      dispatch(setRetrievingPrescriptionsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingPrescriptionsError(null));
      const response = await ImmunifyApi.getChildPrescriptions(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setPrescriptions(data));
        dispatch(setRetrievingPrescriptionsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingPrescriptionsStatus("failed"));
      dispatch(setRetrievingPrescriptionsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingPrescriptionsStatus("idle"))
      );
    }
  };
};

export default selectedChildHealthFiles.reducer;
