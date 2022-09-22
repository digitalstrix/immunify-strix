import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "MyPatients";

export const myPatientsSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    selectedPatientData: null,
    retrievingSelectedPatientStatus: "idle",
    retrievingSelectedPatientError: null,
    selectedPatientLatestGrowthData: {
      age: null,
      childId: null,
      hcw: null,
      height: null,
      weight: null,
    },
    retrievingSelectedPatientLatestGrowthDataStatus: "idle",
    retrievingSelectedPatientLatestGrowthDataError: null,
    uploadPrescriptionByDoctorStatus: "idle",
    uploadPrescriptionByDoctorError: null,
    scheduleAppointmentStatus: "idle",
    scheduleAppointmentError: null,
    limitedParentsList: [],
    retrievingLimitedParentsListStatus: "idle",
    retrievingLimitedParentsListError: null,
    limitedChildrenList: [],
    retrievingLimitedChildrenListListStatus: "idle",
    retrievingLimitedChildrenListListError: null,
  },
  reducers: {
    setLimitedParentsList: (state, action) => {
      state.limitedParentsList = action.payload;
    },
    setRetrievingLimitedParentsListStatus: (state, action) => {
      state.retrievingLimitedParentsListStatus = action.payload;
    },
    setRetrievingLimitedParentsListError: (state, action) => {
      state.retrievingLimitedParentsListError = action.payload;
    },
    setLimitedChildrenList: (state, action) => {
      state.limitedChildrenList = action.payload;
    },
    setRetrievingLimitedChildrenListListStatus: (state, action) => {
      state.retrievingLimitedChildrenListListStatus = action.payload;
    },
    setRetrievingLimitedChildrenListListError: (state, action) => {
      state.retrievingLimitedChildrenListListError = action.payload;
    },
    setSelectedPatientData: (state, action) => {
      state.selectedPatientData = action.payload;
    },
    setRetrievingSelectedPatientStatus: (state, action) => {
      state.retrievingSelectedPatientStatus = action.payload;
    },
    setRetrievingSelectedPatientError: (state, action) => {
      state.retrievingSelectedPatientError = action.payload;
    },
    setSelectedPatientLatestGrowthData: (state, action) => {
      state.selectedPatientLatestGrowthData = action.payload;
    },
    setRetrievingSelectedPatientLatestGrowthDataStatus: (state, action) => {
      state.retrievingSelectedPatientLatestGrowthDataStatus = action.payload;
    },
    setRetrievingSelectedPatientLatestGrowthDataError: (state, action) => {
      state.retrievingSelectedPatientLatestGrowthDataError = action.payload;
    },
    setUploadingPrescriptionByDoctorStatus: (state, action) => {
      state.uploadPrescriptionByDoctorStatus = action.payload;
    },
    setUploadingPrescriptionByDoctorError: (state, action) => {
      state.uploadPrescriptionByDoctorError = action.payload;
    },
    setScheduleAppointmentStatus: (state, action) => {
      state.scheduleAppointmentStatus = action.payload;
    },
    setScheduleAppointmentError: (state, action) => {
      state.scheduleAppointmentError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setSelectedPatientData,
  setRetrievingSelectedPatientStatus,
  setRetrievingSelectedPatientError,
  setSelectedPatientLatestGrowthData,
  setRetrievingSelectedPatientLatestGrowthDataStatus,
  setRetrievingSelectedPatientLatestGrowthDataError,
  setUploadingPrescriptionByDoctorStatus,
  setUploadingPrescriptionByDoctorError,
  setScheduleAppointmentStatus,
  setScheduleAppointmentError,
  setLimitedChildrenList,
  setRetrievingLimitedChildrenListListStatus,
  setRetrievingLimitedChildrenListListError,
  setLimitedParentsList,
  setRetrievingLimitedParentsListStatus,
  setRetrievingLimitedParentsListError,
} = myPatientsSlice.actions;

export const getMyChildPatients = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingLimitedChildrenListListStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingLimitedChildrenListListError(null));
      const response = await ImmunifyApi.getMyChildPatients(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setLimitedChildrenList(data));
        dispatch(setRetrievingLimitedChildrenListListStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingLimitedChildrenListListStatus("failed"));
      dispatch(setRetrievingLimitedChildrenListListError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingLimitedChildrenListListStatus("idle"))
      );
    }
  };
};

export const getMyAdultPatients = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingLimitedParentsListStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingLimitedParentsListError(null));
      const response = await ImmunifyApi.getMyAdultPatients(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setLimitedParentsList(data));
        dispatch(setRetrievingLimitedParentsListStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingLimitedParentsListStatus("failed"));
      dispatch(setRetrievingLimitedParentsListError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingLimitedParentsListStatus("idle"))
      );
    }
  };
};

export const getPatientAllData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedPatientStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedPatientError(null));
      const response = await ImmunifyApi.getPatientAllData(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setSelectedPatientData({ ...data, ...payload }));
        dispatch(setRetrievingSelectedPatientStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedPatientStatus("failed"));
      dispatch(setRetrievingSelectedPatientError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedPatientStatus("idle"))
      );
    }
  };
};

export const getChildLatestGrowthInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedPatientLatestGrowthDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedPatientLatestGrowthDataError(null));
      const response = await ImmunifyApi.getPatientLatestGrowthInfo(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(
          setSelectedPatientLatestGrowthData(
            data.length > 0
              ? data[0]
              : {
                  age: null,
                  childId: null,
                  hcw: null,
                  height: null,
                  weight: null,
                }
          )
        );
        dispatch(
          setRetrievingSelectedPatientLatestGrowthDataStatus("succeeded")
        );
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedPatientLatestGrowthDataStatus("failed"));
      dispatch(setRetrievingSelectedPatientLatestGrowthDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedPatientLatestGrowthDataStatus("idle"))
      );
    }
  };
};

export const uploadPrescription = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUploadingPrescriptionByDoctorStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setUploadingPrescriptionByDoctorError(null));
      const response = await ImmunifyApi.addPrescription(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setUploadingPrescriptionByDoctorStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setUploadingPrescriptionByDoctorStatus("failed"));
      dispatch(setUploadingPrescriptionByDoctorError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setUploadingPrescriptionByDoctorStatus("idle"))
      );
    }
  };
};

export const scheduleAppointment = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setScheduleAppointmentStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setScheduleAppointmentError(null));
      const response = await ImmunifyApi.scheduleAppointment(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setScheduleAppointmentStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setScheduleAppointmentStatus("failed"));
      dispatch(setScheduleAppointmentError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setScheduleAppointmentStatus("idle"))
      );
    }
  };
};

export default myPatientsSlice.reducer;
