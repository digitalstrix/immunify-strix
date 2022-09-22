import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "profileInfo";

export const profileInfoSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    doctorProfileData: {
      additionalData: {
        addedBy: null,
        class: null,
        code: null,
        consultingFee: null,
        createdAt: null,
        hospitalClinic: null,
        id: null,
        isVerified: null,
        languagesKnown: null,
        registrationNumber: null,
        salutation: null,
        specializaionName: null,
        specialization: null,
        updatedAt: null,
        userMappingId: null,
        education: [],
        experiance: [],
        consultationDAta: [],
        sessionData: [],
      },
      basicDetails: {
        address1: null,
        address2: null,
        city: null,
        contact: null,
        country: null,
        createdAt: null,
        email: null,
        facebookId: null,
        firstName: null,
        gender: null,
        id: null,
        idNumber: null,
        isAnalogUser: false,
        lastName: null,
        managedByThirdParty: false,
        middleName: null,
        postalCode: null,
        registrationNumber: null,
        specialization: null,
        state: null,
        status: null,
        timeOffset: null,
        updatedAt: null,
      },
    },
    isGeneralTabEditing: false,
    profilePictureUrl: null,
    profileInfoStatus: "idle",
    profileInfoError: null,
    profilePictureStatus: "idle",
    profilePictureError: null,
    profileDataUpdatingStatus: "idle",
    profileDataUpdatingError: null,
  },
  reducers: {
    setProfileInfoStatus: (state, action) => {
      state.profileInfoStatus = action.payload;
    },
    setProfileInfoError: (state, action) => {
      state.profileInfoError = action.payload;
    },
    setDoctorProfileInfo: (state, action) => {
      state.doctorProfileData = action.payload;
    },
    setProfilePictureStatus: (state, action) => {
      state.profilePictureStatus = action.payload;
    },
    setProfilePictureError: (state, action) => {
      state.profilePictureError = action.payload;
    },
    setDoctorProfilePicture: (state, action) => {
      state.profilePictureUrl = action.payload;
    },
    setProfileDataUpdatingStatus: (state, action) => {
      state.profileDataUpdatingStatus = action.payload;
    },
    setProfileDataUpdatingError: (state, action) => {
      state.profileDataUpdatingError = action.payload;
    },
    setDoctorProfileGeneralTabEditingState: (state, action) => {
      state.isGeneralTabEditing = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setProfileInfoStatus,
  setProfileInfoError,
  setDoctorProfileInfo,
  setProfilePictureStatus,
  setProfilePictureError,
  setDoctorProfilePicture,
  setProfileDataUpdatingStatus,
  setDoctorProfileGeneralTabEditingState,
  setProfileDataUpdatingError,
} = profileInfoSlice.actions;

export const getDoctorProfileInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setProfileInfoStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setProfileInfoError(null));
      const response = await ImmunifyApi.getDoctorProfileInfo(payload);
      if (response && response.status === 200) {
        dispatch(setProfileInfoStatus("succeeded"));
        let data = await response.json();
        dispatch(setDoctorProfileInfo(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setProfileInfoStatus("failed"));
      dispatch(setProfileInfoError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setProfileInfoStatus("idle")));
    }
  };
};

export const getDoctorProfilePicture = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setProfilePictureStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setProfilePictureError(null));
      const response = await ImmunifyApi.getDoctorProfilePicture(payload);
      if (response && response.status === 200) {
        dispatch(setProfilePictureStatus("succeeded"));
        let data = await response.json();
        dispatch(setDoctorProfilePicture(data));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setProfilePictureStatus("failed"));
      dispatch(setProfilePictureError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setProfilePictureStatus("idle")));
    }
  };
};

export const updateDoctorProfileInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setProfileDataUpdatingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setProfileDataUpdatingError(null));
      const response = await ImmunifyApi.updateDoctorProfileData(payload);
      if (response && response.status === 200) {
        dispatch(setProfileDataUpdatingStatus("succeeded"));
        dispatch(setDoctorProfileGeneralTabEditingState(false));
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(setProfileDataUpdatingStatus("failed"));
      dispatch(setProfileDataUpdatingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setProfileDataUpdatingStatus("idle"))
      );
    }
  };
};

export default profileInfoSlice.reducer;
