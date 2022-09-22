import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from "../../../Common/commonSlice";
import {
  getSingleChildInfo,
  getSingleChildSchedulePercentage,
} from "../myChildrenSlice";

const REDUCER_DOMAIN = "ParentSideChildVac";

export const ParentSideChildVac = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    selectedVaccine: null,
    myChildrenQRCodes: [],
    qrDate: null,
    retrievingQrDateStatus: "idle",
    retrievingQrDateError: null,
    parentSideManageVaccinationStatus: "idle",
    parentSideManageVaccinationError: null,
    vacScheduleDownloadStatus: "idle",
    vacScheduleDownloadError: null,
    vacScheduleEmailStatus: "idle",
    vacScheduleEmailError: null,
  },
  reducers: {
    setSelectedVaccine: (state, action) => {
      state.selectedVaccine = action.payload;
    },
    setQrDate: (state, action) => {
      state.qrDate = action.payload;
    },
    setRetrievingQrDateStatus: (state, action) => {
      state.retrievingQrDateStatus = action.payload;
    },
    setRetrievingQrDateError: (state, action) => {
      state.retrievingQrDateError = action.payload;
    },
    setVacScheduleDownloadStatus: (state, action) => {
      state.vacScheduleDownloadStatus = action.payload;
    },
    setVacScheduleDownloadError: (state, action) => {
      state.vacScheduleDownloadError = action.payload;
    },
    setVacScheduleEmailStatus: (state, action) => {
      state.vacScheduleEmailStatus = action.payload;
    },
    setVacScheduleEmailError: (state, action) => {
      state.vacScheduleEmailError = action.payload;
    },
    setParentSideManageVaccinationStatus: (state, action) => {
      state.parentSideManageVaccinationStatus = action.payload;
    },
    setParentSideManageVaccinationError: (state, action) => {
      state.parentSideManageVaccinationError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setSelectedVaccine,
  setQrDate,
  setRetrievingQrDateStatus,
  setRetrievingQrDateError,
  setParentSideManageVaccinationStatus,
  setParentSideManageVaccinationError,
  setVacScheduleDownloadStatus,
  setVacScheduleDownloadError,
  setVacScheduleEmailStatus,
  setVacScheduleEmailError,
} = ParentSideChildVac.actions;

export const getQrDate = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingQrDateStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingQrDateError(null));
      const response = await ImmunifyApi.getQrDate(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setQrDate(data));
        dispatch(setRetrievingQrDateStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingQrDateStatus("failed"));
      dispatch(setRetrievingQrDateError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setRetrievingQrDateStatus("idle")));
    }
  };
};

export const manageVaccination = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setParentSideManageVaccinationStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setParentSideManageVaccinationError(null));
      const response = await ImmunifyApi.manageVaccinationByParent(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(getSingleChildInfo({ childId: payload.childId }));
        dispatch(getSingleChildSchedulePercentage(payload.childId));
        dispatch(setParentSideManageVaccinationStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setParentSideManageVaccinationStatus("failed"));
      dispatch(setParentSideManageVaccinationError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setParentSideManageVaccinationStatus("idle"))
      );
    }
  };
};

export const downloadVacSchedule = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setVacScheduleDownloadStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setVacScheduleDownloadError(null));
      const response = await ImmunifyApi.getChildVacScheduleLinkByParent(
        payload
      );
      if (response && response.status === 200) {
        let data = await response.json();
        window.open(
          "data:application/octet-stream;charset=utf-16le;base64," +
            data?.base64Data
        );
        dispatch(setVacScheduleDownloadStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setVacScheduleDownloadStatus("failed"));
      dispatch(setVacScheduleDownloadError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setVacScheduleDownloadStatus("idle"))
      );
    }
  };
};

export const emailVacSchedule = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setVacScheduleEmailStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setVacScheduleEmailError(null));
      const response = await ImmunifyApi.emailChildVacScheduleLinkByParent(
        payload
      );
      if (response && response.status === 200) {
        dispatch(setVacScheduleEmailStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setVacScheduleEmailStatus("failed"));
      dispatch(setVacScheduleEmailError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setVacScheduleEmailStatus("idle")));
    }
  };
};

export default ParentSideChildVac.reducer;
