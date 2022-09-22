import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "doctorHospitalData";

export const doctorHospitalSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    doctorHospitalData: {},
    doctorHospitalDataRetrievingStatus: "idle",
    doctorHospitalDataRetrievingError: null,
    doctorHospitalDataAddingStatus: "idle",
    doctorHospitalDataAddingError: null,
  },
  reducers: {
    setDoctorHospitalData: (state, action) => {
      state.doctorHospitalData = action.payload;
    },
    setDoctorHospitalDataRetrievingStatus: (state, action) => {
      state.doctorHospitalDataRetrievingStatus = action.payload;
    },
    setDoctorHospitalDataRetrievingError: (state, action) => {
      state.doctorHospitalDataRetrievingError = action.payload;
    },
    setDoctorHospitalDataAddingStatus: (state, action) => {
      state.doctorHospitalDataAddingStatus = action.payload;
    },
    setDoctorHospitalDataAddingError: (state, action) => {
      state.doctorHospitalDataAddingError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setDoctorHospitalData,
  setDoctorHospitalDataRetrievingStatus,
  setDoctorHospitalDataRetrievingError,
  setDoctorHospitalDataAddingStatus,
  setDoctorHospitalDataAddingError,
} = doctorHospitalSlice.actions;

export const getDoctorHospitalInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDoctorHospitalDataRetrievingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDoctorHospitalDataRetrievingError(null));
      const response = await ImmunifyApi.getDoctorHospital(payload);
      if (response && response.status === 200) {
        dispatch(setDoctorHospitalDataRetrievingStatus("succeeded"));
        let data = await response.json();
        dispatch(setDoctorHospitalData(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setDoctorHospitalDataRetrievingStatus("failed"));
      dispatch(setDoctorHospitalDataRetrievingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setDoctorHospitalDataRetrievingStatus("idle"))
      );
    }
  };
};

export const addDoctorHospitalInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDoctorHospitalDataAddingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDoctorHospitalDataAddingError(null));
      const response = await ImmunifyApi.addDoctorHospital(payload);
      if (response && response.status === 200) {
        dispatch(getDoctorHospitalInfo({ immId: payload.immId }));
        dispatch(setDoctorHospitalDataAddingStatus("succeeded"));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setDoctorHospitalDataAddingStatus("failed"));
      dispatch(setDoctorHospitalDataAddingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setDoctorHospitalDataAddingStatus("idle"))
      );
    }
  };
};

export default doctorHospitalSlice.reducer;
