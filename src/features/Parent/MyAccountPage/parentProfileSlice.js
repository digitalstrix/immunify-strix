import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay, getCookie } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "ParentProfile";

export const parentProfileSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    basicProfileData: null,
    additionalProfileData: null,
    profilePicture: null,
    retrievingBasicProfileDataStatus: "idle",
    retrievingBasicProfileDataError: null,
    retrievingAdditionalProfileDataStatus: "idle",
    retrievingAdditionalProfileDataError: null,
    retrievingProfilePictureStatus: "idle",
    retrievingProfilePictureError: null,
    updatingBasicProfileDataStatus: "idle",
    updatingBasicProfileDataError: null,
    updatingAdditionalProfileDataStatus: "idle",
    updatingAdditionalProfileDataError: null,
    updatingProfilePictureStatus: "idle",
    updatingProfilePictureError: null,
  },
  reducers: {
    setBasicProfileData: (state, action) => {
      state.basicProfileData = action.payload;
    },
    setRetrievingBasicProfileDataStatus: (state, action) => {
      state.retrievingBasicProfileDataStatus = action.payload;
    },
    setRetrievingBasicProfileDataError: (state, action) => {
      state.retrievingBasicProfileDataError = action.payload;
    },
    setUpdatingBasicProfileDataStatus: (state, action) => {
      state.updatingBasicProfileDataStatus = action.payload;
    },
    setUpdatingBasicProfileDataError: (state, action) => {
      state.updatingBasicProfileDataError = action.payload;
    },
    setUpdatingAdditionalProfileDataStatus: (state, action) => {
      state.updatingAdditionalProfileDataStatus = action.payload;
    },
    setUpdatingAdditionalProfileDataError: (state, action) => {
      state.updatingAdditionalProfileDataError = action.payload;
    },
    setAdditionalProfileData: (state, action) => {
      state.additionalProfileData = action.payload;
    },
    setRetrievingAdditionalProfileDataStatus: (state, action) => {
      state.retrievingAdditionalProfileDataStatus = action.payload;
    },
    setRetrievingAdditionalProfileDataError: (state, action) => {
      state.retrievingAdditionalProfileDataError = action.payload;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    setRetrievingProfilePictureStatus: (state, action) => {
      state.retrievingProfilePictureStatus = action.payload;
    },
    setRetrievingProfilePictureError: (state, action) => {
      state.retrievingProfilePictureError = action.payload;
    },
    setUpdatingProfilePictureStatus: (state, action) => {
      state.updatingProfilePictureStatus = action.payload;
    },
    setUpdatingProfilePictureError: (state, action) => {
      state.updatingProfilePictureError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setBasicProfileData,
  setRetrievingBasicProfileDataStatus,
  setRetrievingBasicProfileDataError,
  setProfilePicture,
  setRetrievingProfilePictureStatus,
  setRetrievingProfilePictureError,
  setAdditionalProfileData,
  setRetrievingAdditionalProfileDataStatus,
  setRetrievingAdditionalProfileDataError,
  setUpdatingBasicProfileDataStatus,
  setUpdatingBasicProfileDataError,
  setUpdatingAdditionalProfileDataStatus,
  setUpdatingAdditionalProfileDataError,
  setUpdatingProfilePictureStatus,
  setUpdatingProfilePictureError
} = parentProfileSlice.actions;

export const getProfilePictureById = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingProfilePictureStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingProfilePictureError(null));
      const response = await ImmunifyApi.getParentProfilePictureById(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setProfilePicture(data));
        dispatch(setRetrievingProfilePictureStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingProfilePictureStatus("failed"));
      dispatch(setRetrievingProfilePictureError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingProfilePictureStatus("idle"))
      );
    }
  };
};

export const getBasicProfileData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingBasicProfileDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingBasicProfileDataError(null));
      const response = await ImmunifyApi.getBasicParentData(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setBasicProfileData(data));
        dispatch(setRetrievingBasicProfileDataStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingBasicProfileDataStatus("failed"));
      dispatch(setRetrievingBasicProfileDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingBasicProfileDataStatus("idle"))
      );
    }
  };
};

export const getAdditionalProfileData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingAdditionalProfileDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingAdditionalProfileDataError(null));
      const response = await ImmunifyApi.getParentAdditionalData(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setAdditionalProfileData(data));
        dispatch(setRetrievingAdditionalProfileDataStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingAdditionalProfileDataStatus("failed"));
      dispatch(setRetrievingAdditionalProfileDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingAdditionalProfileDataStatus("idle"))
      );
    }
  };
};

export const updateBasicProfileData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdatingBasicProfileDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setUpdatingBasicProfileDataError(null));
      const response = await ImmunifyApi.updateParentProfileBasicData(payload);
      if (response && response.status === 200) {
        dispatch(getBasicProfileData({ parentId: payload.pid }));
        dispatch(setUpdatingBasicProfileDataStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setUpdatingBasicProfileDataStatus("failed"));
      dispatch(setUpdatingBasicProfileDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setUpdatingBasicProfileDataStatus("idle"))
      );
    }
  };
};

export const updateAdditionalProfileData = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdatingAdditionalProfileDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setUpdatingAdditionalProfileDataError(null));
      const response = await ImmunifyApi.updateParentProfileAdditionalData(payload);
      if (response && response.status === 200) {
        dispatch(getAdditionalProfileData(payload.immId))
        dispatch(setUpdatingAdditionalProfileDataStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setUpdatingAdditionalProfileDataStatus("failed"));
      dispatch(setUpdatingAdditionalProfileDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setUpdatingAdditionalProfileDataStatus("idle"))
      );
    }
  };
};

export default parentProfileSlice.reducer;
