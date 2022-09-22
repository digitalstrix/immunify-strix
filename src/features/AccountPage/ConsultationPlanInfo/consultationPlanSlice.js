import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";
import { getDoctorProfileInfo } from "../ProfileInfo/profileInfoSlice";

const REDUCER_DOMAIN = "consultationPlans";

export const consultationPlansSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    consultationPlanAddingStatus: "idle",
    consultationPlanAddingError: null,
    consultationPlanDeletingStatus: "idle",
    consultationPlanDeletingError: null,
  },
  reducers: {
    setConsultationPlanAddingStatus: (state, action) => {
      state.consultationPlanAddingStatus = action.payload;
    },
    setConsultationPlanAddingError: (state, action) => {
      state.consultationPlanAddingError = action.payload;
    },
    setConsultationPlanDeletingStatus: (state, action) => {
      state.consultationPlanDeletingStatus = action.payload;
    },
    setConsultationPlanDeletingError: (state, action) => {
      state.consultationPlanDeletingError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setConsultationPlanAddingStatus,
  setConsultationPlanAddingError,
  setConsultationPlanDeletingStatus,
  setConsultationPlanDeletingError,
} = consultationPlansSlice.actions;

export const addConsultationPlan = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setConsultationPlanAddingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setConsultationPlanAddingError(null));
      const response = await ImmunifyApi.addConsultationPlan(payload);
      if (response && response.status === 200) {
        dispatch(setConsultationPlanAddingStatus("succeeded"));
        dispatch(getDoctorProfileInfo({ doctorId: payload.personId }));
      } else {
        // todo handle
      }
    } catch (err) {
      dispatch(setConsultationPlanAddingStatus("failed"));
      dispatch(setConsultationPlanAddingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setConsultationPlanAddingStatus("idle"))
      );
    }
  };
};

export const deleteConsultationPlan = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setConsultationPlanDeletingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setConsultationPlanDeletingError(null));
      const response = await ImmunifyApi.deleteConsultationPlan(payload);
      if (response && response.status === 200) {
        dispatch(setConsultationPlanDeletingStatus("succeeded"));
        dispatch(getDoctorProfileInfo({ doctorId: payload.personId }));
      } else {
        // todo handle
      }
    } catch (err) {
      dispatch(setConsultationPlanDeletingStatus("failed"));
      dispatch(setConsultationPlanDeletingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setConsultationPlanDeletingStatus("idle"))
      );
    }
  };
};

export default consultationPlansSlice.reducer;
