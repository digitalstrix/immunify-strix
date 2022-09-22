import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  eventNameGenerator,
  extractDate,
  excuteAfterGivenDelay,
  isEmptyObject,
  isEmptyArray,
} from "../../../../utils/commonUtils";
import {
  getDoctorPayloadAdditonalData,
  formatSessionRecord,
  formatConsultationRecord,
  convertConsultationRecord,
  convertSessionRecord,
  formatEducationPayload,
  generateProfileUploadPayload,
  formatDescriptionPayload,
} from "../../../../utils/doctorListUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from "../../../Common/commonSlice";

const REDUCER_DOMAIN = "doctorList";
const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const getAppointmentTypes = createAsyncThunk(prefixEventName("getAppointmentTypes"), async () => {
  const response = await ImmunifyApi.getAppointmentTypes();
  return response.json();
});

export const getSpecializations = createAsyncThunk(prefixEventName("getSpecializations"), async () => {
  const response = await ImmunifyApi.getSpecializations();
  return response.json();
});

export const searchDoctors = createAsyncThunk(prefixEventName("serchDoctors"), async (name) => {
  const response = await ImmunifyApi.searchDoctors({ name });
  return response.json();
});

export const getDoctorProfileUrl = createAsyncThunk(prefixEventName("profilePicture"), async (payload) => {
  const response = await ImmunifyApi.getSignedProfileUrl(payload);
  return response.json();
});

const initDoctorStatus = () => ({
  profilePicture: null,
  generalInfo: null,
  education: null,
  description: null,
  workExperience: null,
  consultationPlan: null,
  availabilityCalender: null,
  hospital: null,
});

const doctorListSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    ...initDoctorStatus(),
    doctors: [],
    appointmentTypes: [],
    specializations: [],
    doctorAddStatus: "idle",
    optionalInfoUpdatingStatus: "idle",
    educationUpdateStatus: "idle",
    descriptionUpdateStatus: "idle",
    experienceUpdateStatus: "idle",
    consultationPlanUpdateStatus: "idle",
    sessionUpdateStatus: "idle",
    hospitalUpdateStatus: "idle",
    generalInfoUpdateStatus: "idle",
    profilePictureUploadingStatus: "idle",
    searchStatus: "idle",
    profileDataUpdatingStatus: "idle",
    profileDataUpdatingError: null,

    doctorEducationData: [],
    educationDataRetrievingStatus: "idle",
    educationDataRetrievingError: null,
    educationDataAddingStatus: "idle",
    educationDataAddingError: null,
    educationDataDeletionStatus: "idle",
    educationDataDeletionError: null,
  },
  reducers: {
    setGeneralInfo: (state, action) => {
      state.generalInfo = action.payload;
    },
    setEducation: (state, action) => {
      state.education = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setWorkExperience: (state, action) => {
      state.workExperience = action.payload;
    },
    setConsultationPlan: (state, action) => {
      state.consultationPlan = action.payload;
    },
    setAvailabilityCalender: (state, action) => {
      state.availabilityCalender = action.payload;
    },
    setHospital: (state, action) => {
      state.hospital = action.payload;
    },
    setDoctorAddStatus: (state, action) => {
      state.doctorAddStatus = action.payload;
    },
    setOptionalInfoUpdatingStatus: (state, action) => {
      state.optionalInfoUpdatingStatus = action.payload;
    },
    setEducationUpdateStatus: (state, action) => {
      state.educationUpdateStatus = action.payload;
    },
    setDescriptionUpdateStatus: (state, action) => {
      state.descriptionUpdateStatus = action.payload;
    },
    setHospitalUpdateStatus: (state, action) => {
      state.hospitalUpdateStatus = action.payload;
    },
    setWorkExpUpdateStatus: (state, action) => {
      state.experienceUpdateStatus = action.payload;
    },
    setConsultationPlanUpdateStatus: (state, action) => {
      state.consultationPlanUpdateStatus = action.payload;
    },
    setSessionUpdateStatus: (state, action) => {
      state.sessionUpdateStatus = action.payload;
    },
    setGeneralInfoUpdateStatus: (state, action) => {
      state.generalInfoUpdateStatus = action.payload;
    },
    resetSelectedDoctor: (state) => {
      Object.keys(initDoctorStatus()).forEach((key) => (state[key] = null));
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    setProfilePicUploadingStatus: (state, action) => {
      state.profilePictureUploadingStatus = action.payload;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload;
    },
    setProfileDataUpdatingStatus: (state, action) => {
      state.profileDataUpdatingStatus = action.payload;
    },
    setProfileDataUpdatingError: (state, action) => {
      state.profileDataUpdatingError = action.payload;
    },
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
  extraReducers: {
    [getAppointmentTypes.fulfilled]: (state, action) => {
      state.appointmentTypes = action.payload;
    },
    [getSpecializations.fulfilled]: (state, action) => {
      const {
        body: { data },
      } = action.payload;
      state.specializations = data;
    },
    [searchDoctors.fulfilled]: (state, action) => {
      state.doctors = action.payload;
      state.searchStatus = "succeeded";
    },
    [searchDoctors.rejected]: (state) => {
      state.searchStatus = "failed";
    },
    [getDoctorProfileUrl.fulfilled]: (state, action) => {
      state.profilePicture = action.payload.profilePicture;
    },
  },
});

export const {
  setGeneralInfo,
  setEducation,
  setDescription,
  setWorkExperience,
  setConsultationPlan,
  setAvailabilityCalender,
  setHospital,
  setDoctorAddStatus,
  setOptionalInfoUpdatingStatus,
  setEducationUpdateStatus,
  setDescriptionUpdateStatus,
  setHospitalUpdateStatus,
  setWorkExpUpdateStatus,
  setConsultationPlanUpdateStatus,
  setSessionUpdateStatus,
  setGeneralInfoUpdateStatus,
  resetSelectedDoctor,
  setProfilePicture,
  setProfilePicUploadingStatus,
  setSearchStatus,
  setProfileDataUpdatingStatus,
  setProfileDataUpdatingError,

  setEducationDataRetrievingStatus,
  setEducationDataRetrievingError,
  setEducationData,
  setEducationDataAddingStatus,
  setEducationDataAddingError,
  setEducationDeletionStatus,
  setEducationDeletionError,
} = doctorListSlice.actions;

export const createDoctor = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDoctorAddStatus("loading"));
      const response = await ImmunifyApi.addDoctor({
        ...payload,
        ...getDoctorPayloadAdditonalData(),
      });
      if (response && response.status === 201) {
        const doctor = await response.json();
        dispatch(setGeneralInfo(doctor));
        dispatch(setDoctorAddStatus("succeeded"));
      } else {
        if (response.status === 409) {
          dispatch(setDoctorAddStatus("failed_duplicate_request"));
        } else {
          dispatch(setDoctorAddStatus("failed"));
        }
      }
    } catch (err) {
      dispatch(setDoctorAddStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setDoctorAddStatus("idle"));
      });
    }
  };
};

export const persistOptionalDoctorInfo = ({ education, workExperience, consultationPlan, availabilityCalender, hospital }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOptionalInfoUpdatingStatus("loading"));
      const { id: immId } = getState().doctorList.generalInfo;
      let promises = [];
      if (!isEmptyObject(education)) {
        promises.push(
          ImmunifyApi.updateDoctorEducation({
            ...formatEducationPayload(education),
            immId,
          })
        );
      }
      if (!isEmptyObject(hospital)) {
        promises.push(ImmunifyApi.updateDoctorHospital({ ...hospital, immId }));
      }
      if (!isEmptyArray(workExperience)) {
        const workExperiencePromises = workExperience.map((experience) => ImmunifyApi.updateDoctorWorkExperience({ ...experience, immId }));
        promises = [...promises, ...workExperiencePromises];
      }
      if (!isEmptyArray(consultationPlan)) {
        const consultationPlanPromises = consultationPlan.map((entry) => ImmunifyApi.addConsultationPlan(formatConsultationRecord(entry, immId)));
        promises = [...promises, ...consultationPlanPromises];
      }
      if (!isEmptyArray(availabilityCalender)) {
        const availabilityCalPromises = availabilityCalender.map((entry) => ImmunifyApi.addDoctorSession(formatSessionRecord(entry, immId)));
        promises = [...promises, ...availabilityCalPromises];
      }

      const response = await Promise.all(promises);
      const mapped = response.map((resp) => resp.json());
      const mappedResponse = await Promise.all(mapped);
      dispatch(setOptionalInfoUpdatingStatus("succeeded"));
    } catch (err) {
      dispatch(setOptionalInfoUpdatingStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setOptionalInfoUpdatingStatus("idle"));
      });
    }
  };
};

export const fetchDoctorDescription = (immId) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getDoctorDescription({ immId });
      if (response && response.status === 201) {
        const data = await response.json();
        dispatch(setDescription(data));
      }
    } catch (err) {
      // todo: handle
    }
  };
};

export const fetchDoctorEducation = (immId) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getDoctorEducation({ immId });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setEducation(data));
      }
    } catch (err) {
      // todo: handle
    }
  };
};

export const fetchDoctorHospital = (immId) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getDoctorHospital({ immId });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setHospital(data));
      }
    } catch (err) {
      // todo: handle
    }
  };
};

export const fetchDoctorSessions = (immId) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getDoctorSessions({ immId });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setAvailabilityCalender(data));
      }
    } catch (err) {
      // todo: handle
    }
  };
};

export const fetchDoctorConsultationPlans = (immId) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getConsultationPlans({ immId });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setConsultationPlan(data));
      }
    } catch (err) {
      // todo: handle
    }
  };
};

export const fetchDoctorWorkExperience = (immId) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getDoctorWorkExperience({ immId });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setWorkExperience([data]));
      }
    } catch (err) {
      // todo: handle
    }
  };
};

export const fetchSelectedDoctorInfo = (payload) => {
  return async (dispatch) => {
    dispatch(setGeneralInfo(payload));
    const { id: immId } = payload;
    try {
      dispatch(fetchDoctorEducation(immId));
      dispatch(fetchDoctorDescription(immId));
      dispatch(fetchDoctorHospital(immId));
      dispatch(fetchDoctorSessions(immId));
      dispatch(fetchDoctorConsultationPlans(immId));
      dispatch(fetchDoctorWorkExperience(immId));
    } catch (err) {
      // todo: handle
    }
  };
};

export const updateDoctorEducation = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { id: immId } = getState().doctorList.generalInfo;
      dispatch(setEducationUpdateStatus("loading"));
      const response = await ImmunifyApi.updateDoctorEducation({
        ...formatEducationPayload(payload),
        immId,
      });
      if (response && response.status === 200) {
        dispatch(setEducationUpdateStatus("succeeded"));
      } else {
        dispatch(setEducationUpdateStatus("failed"));
      }
    } catch (err) {
      dispatch(setEducationUpdateStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setEducationUpdateStatus("idle"));
      });
    }
  };
};

export const updateDoctorDescription = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { id: immId, addedBy } = getState().doctorList.generalInfo;
      const userId = getState().user.user.id;

      const response = await ImmunifyApi.updateDoctorDescription({
        description: payload.description,
        doctorId: immId,
        addedBy: userId,
      });
      if (response && response.status === 201) {
        dispatch(setDescription(payload));
        dispatch(setDescriptionUpdateStatus("succeeded"));
      } else {
        dispatch(setDescriptionUpdateStatus("failed"));
      }
    } catch (err) {
      dispatch(setDescriptionUpdateStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setDescriptionUpdateStatus("idle"));
      });
    }
  };
};

export const updateDoctorWorkExperience = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { id: immId } = getState().doctorList.generalInfo;
      const response = await ImmunifyApi.updateDoctorWorkExperience({
        ...payload,
        immId,
      });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setWorkExperience([data]));
        dispatch(setWorkExpUpdateStatus("succeeded"));
      } else {
        dispatch(setWorkExpUpdateStatus("failed"));
      }
    } catch (err) {
      dispatch(setWorkExpUpdateStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setWorkExpUpdateStatus("idle"));
      });
    }
  };
};

export const updateDoctorHospital = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { id: immId } = getState().doctorList.generalInfo;
      const response = await ImmunifyApi.updateDoctorHospital({
        ...payload,
        immId,
      });
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setHospital(data));
        dispatch(setHospitalUpdateStatus("succeeded"));
      } else {
        dispatch(setHospitalUpdateStatus("failed"));
      }
    } catch (err) {
      dispatch(setHospitalUpdateStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setHospitalUpdateStatus("idle"));
      });
    }
  };
};

export const updateDoctorConsultationPlan = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().doctorList.generalInfo;
      const response = await ImmunifyApi.addConsultationPlan(
        formatConsultationRecord(payload, id)
      );
      if (response && response.status === 200) {
        const data = await response.json();
        let { consultationPlan } = getState().doctorList;
        const index = consultationPlan.findIndex(
          ({ appointmentType }) => appointmentType === payload.appointmentType
        );
        const formattedPayload = convertConsultationRecord(payload);
        const newConsultationPlan = [...consultationPlan];
        if (index !== -1) {
          newConsultationPlan[index] = formattedPayload;
        } else {
          newConsultationPlan.push(formattedPayload);
        }
        dispatch(setConsultationPlan(newConsultationPlan));
        dispatch(setConsultationPlanUpdateStatus("succeeded"));
      } else {
        dispatch(setConsultationPlanUpdateStatus("failed"));
      }
    } catch (err) {
      dispatch(setConsultationPlanUpdateStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setConsultationPlanUpdateStatus("idle"));
      });
    }
  };
};

export const updateDoctorSession = (payload) => {
  return async (dispatch, getState) => {
    try {
      const {
        generalInfo: { id },
        availabilityCalender,
      } = getState().doctorList;
      const formattedPayload = formatSessionRecord(payload, id);
      if (payload.id) {
        const response = await ImmunifyApi.updateDoctorSession(
          formattedPayload
        );
        if (response && response.status === 200) {
          const index = availabilityCalender.findIndex(
            ({ id }) => id === payload.id
          );
          const updatedAvailabilityCalender = [...availabilityCalender];
          updatedAvailabilityCalender[index] = convertSessionRecord(payload);
          dispatch(setAvailabilityCalender(updatedAvailabilityCalender));
          dispatch(setSessionUpdateStatus("succeeded"));
        } else {
          dispatch(setSessionUpdateStatus("failed"));
        }
      } else {
        const response = await ImmunifyApi.addDoctorSession(formattedPayload);
        if (response) {
          if (response.status === 201) {
            const data = await response.json();
            const formattedData = convertSessionRecord({ ...data, ...payload });
            if (availabilityCalender) {
              dispatch(
                setAvailabilityCalender([
                  ...availabilityCalender,
                  formattedData,
                ])
              );
            } else {
              dispatch(setAvailabilityCalender([formattedData]));
            }
            dispatch(setSessionUpdateStatus("succeeded"));
          } else if (response.status === 409) {
            dispatch(setSessionUpdateStatus("failed_duplicate_request"));
          } else if (response.status === 400) {
            dispatch(setSessionUpdateStatus("failed_bad_request"));
          } else if (response.status === 403) {
            dispatch(setSessionUpdateStatus("failed_forbidden"));
          } else {
            dispatch(setSessionUpdateStatus("failed"));
          }
        } else {
          dispatch(setSessionUpdateStatus("failed"));
        }
      }
    } catch (err) {
      dispatch(setSessionUpdateStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setSessionUpdateStatus("idle"));
      }, 1000);
    }
  };
};

export const uploadProfilePicture = (file) => {
  return async (dispatch, getState) => {
    const { country, id: personId } = getState().doctorList.generalInfo;
    const payload = generateProfileUploadPayload({ file, country, personId });
    try {
      const response = await ImmunifyApi.uploadDoctorProfilePicture(payload);
      if (response && response.status === 200) {
        const { url } = await response.json();
        dispatch(setProfilePicture(url));
        dispatch(setProfilePicUploadingStatus("succeeded"));
      } else {
        dispatch(setProfilePicUploadingStatus("failed"));
      }
    } catch (err) {
      dispatch(setProfilePicUploadingStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setProfilePicUploadingStatus("idle"));
      });
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
        dispatch(fetchSelectedDoctorInfo(payload));
        dispatch(setProfileDataUpdatingStatus("succeeded"));
      } else {
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

export default doctorListSlice.reducer;
