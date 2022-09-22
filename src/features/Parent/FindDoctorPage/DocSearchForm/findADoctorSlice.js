import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import * as SubscriptionApi from "../../../../api/subscriptionApi";
import { setLoading } from "../../../Common/commonSlice";

const REDUCER_DOMAIN = "FindADoctor";

export const findADoctor = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    specializations: [],
    symptoms: [],
    doctorsFound: [],
    sortyByFields: {
      fee: false,
    },
    filterOptions: {
      gender: null,
      consultingFee: null,
      availability: null,
      country: null,
    },
    searchInfo: null,
    selectedDoctorInfo: {},
    retrievingSelectedDoctorInfoStatus: "idle",
    retrievingSelectedDoctorInfoError: null,
    retrievingSpecializationsStatus: "idle",
    retrievingSpecializationsError: null,
    retrievingSymptomsStatus: "idle",
    retrievingSymptomsError: null,
    searchingDoctorsStatus: "idle",
    searchingDoctorsError: null,
    makeAppointmentWizard: {
      activeStep: 0,
      step1: {
        appointmentType: null,
        serviceId: 4,
        selectedDate: null,
        selectedTime: null,
        forChild: false,
        selectedChild: null,
      },
      step2: {
        couponData: null,
        couponValidationStatus: "idle",
        couponValidationError: null,
      },
      step3: {
        capturingAppointmentStatus: "idle",
        capturingAppointmentError: null,
        isAppointmentCreationSuccess: false,
        creatingAppointmentStatus: "idle",
        creatingAppointmentError: null,
        paymentId: null,
      },
    },
    selectedDoctorAppointmentTypes: [],
    retrievingSelectedDoctorAppointmentTypesStatus: "idle",
    retrievingSelectedDoctorAppointmentTypesError: null,
    selectedDoctorAppointmentDates: [],
    retrievingSelectedDoctorAppointmentDatesStatus: "idle",
    retrievingSelectedDoctorAppointmentDatesError: null,
    childrenFreeQuaterList: [],
    retrievingChildrenFreeQuaterListStatus: "idle",
    retrievingChildrenFreeQuaterListError: null,
    availableTimes: [],
    retrievingAvailableTimesStatus: "idle",
    retrievingAvailableTimesError: null,
    consultationPlans: [],
    retrievingConsultationPlansStatus: "idle",
    retrievingConsultationPlansError: null,
    downloadingPaymentSummaryStatus: "idle",
    downloadingPaymentSummaryError: null,
    sendingPaymentSummaryEmailStatus: "idle",
    sendingPaymentSummaryEmailError: null,
  },

  reducers: {
    // resetToInitialState: (state) => state=state.initialState,
    setSearchInfo: (state, action) => {
      state.searchInfo = action.payload;
    },
    setActiveStepIndex: (state, action) => {
      state.makeAppointmentWizard.activeStep = action.payload;
    },
    setServiceId: (state, action) => {
      state.makeAppointmentWizard.step1.serviceId = action.payload;
    },
    setCouponData: (state, action) => {
      state.makeAppointmentWizard.step2.couponData = action.payload;
    },
    setIsAppointmentCreated: (state, action) => {
      state.makeAppointmentWizard.step3.isAppointmentCreationSuccess =
        action.payload;
    },
    setPaymentId: (state, action) => {
      state.makeAppointmentWizard.step3.paymentId = action.payload;
    },
    setDownloadingPaymentSummaryStatus: (state, action) => {
      state.downloadingPaymentSummaryStatus = action.payload;
    },
    setDownloadingPaymentSummaryError: (state, action) => {
      state.downloadingPaymentSummaryError = action.payload;
    },
    setSendingPaymentSummaryEmailStatus: (state, action) => {
      state.sendingPaymentSummaryEmailStatus = action.payload;
    },
    setSendingPaymentSummaryEmailError: (state, action) => {
      state.sendingPaymentSummaryEmailError = action.payload;
    },
    setCapturingAppointmentStatus: (state, action) => {
      state.makeAppointmentWizard.step3.capturingAppointmentStatus =
        action.payload;
    },
    setCapturingAppointmentError: (state, action) => {
      state.makeAppointmentWizard.step3.capturingAppointmentError =
        action.payload;
    },
    setCreatingAppointmentStatus: (state, action) => {
      state.makeAppointmentWizard.step3.creatingAppointmentStatus =
        action.payload;
    },
    setCreatingAppointmentError: (state, action) => {
      state.makeAppointmentWizard.step3.creatingAppointmentError =
        action.payload;
    },
    setCouponValidationStatus: (state, action) => {
      state.makeAppointmentWizard.step2.couponValidationStatus = action.payload;
    },
    setCouponValidationError: (state, action) => {
      state.makeAppointmentWizard.step2.couponValidationError = action.payload;
    },
    setForChild: (state, action) => {
      state.makeAppointmentWizard.step1.forChild = action.payload;
    },
    setSelectedChild: (state, action) => {
      state.makeAppointmentWizard.step1.selectedChild = action.payload;
    },
    setSelectedAppointmentDate: (state, action) => {
      state.makeAppointmentWizard.step1.selectedDate = action.payload;
    },
    setSelectedAppointmentTime: (state, action) => {
      state.makeAppointmentWizard.step1.selectedTime = action.payload;
    },
    setSelectedDoctorAppointmentDates: (state, action) => {
      state.selectedDoctorAppointmentDates = action.payload;
    },
    setRetrievingSelectedDoctorAppointmentDatesStatus: (state, action) => {
      state.retrievingSelectedDoctorAppointmentDatesStatus = action.payload;
    },
    setRetrievingSelectedDoctorAppointmentDatesError: (state, action) => {
      state.retrievingSelectedDoctorAppointmentDatesError = action.payload;
    },
    setSelectedDoctorAppointmentTypes: (state, action) => {
      state.selectedDoctorAppointmentTypes = action.payload;
    },
    setRetrievingSelectedDoctorAppointmentTypesStatus: (state, action) => {
      state.retrievingSelectedDoctorAppointmentTypesStatus = action.payload;
    },
    setRetrievingSelectedDoctorAppointmentTypesError: (state, action) => {
      state.retrievingSelectedDoctorAppointmentTypesError = action.payload;
    },
    setSelectedAppointmentType: (state, action) => {
      state.makeAppointmentWizard.step1.appointmentType = action.payload;
    },
    setSpecializations: (state, action) => {
      state.specializations = action.payload;
    },
    setRetrievingSpecializationsStatus: (state, action) => {
      state.retrievingSpecializationsStatus = action.payload;
    },
    setRetrievingSpecializationsError: (state, action) => {
      state.retrievingSpecializationsError = action.payload;
    },
    setSymptoms: (state, action) => {
      state.symptoms = action.payload;
    },
    setRetrievingSymptomsStatus: (state, action) => {
      state.retrievingSymptomsStatus = action.payload;
    },
    setRetrievingSymptomsError: (state, action) => {
      state.retrievingSymptomsError = action.payload;
    },
    setDoctorsFound: (state, action) => {
      state.doctorsFound = action.payload;
    },
    setSearchingDoctorsStatus: (state, action) => {
      state.searchingDoctorsStatus = action.payload;
    },
    setSearchingDoctorsError: (state, action) => {
      state.searchingDoctorsError = action.payload;
    },
    setSelectedDoctorInfo: (state, action) => {
      state.selectedDoctorInfo = action.payload;
    },
    setRetrievingSelectedDoctorInfoStatus: (state, action) => {
      state.retrievingSelectedDoctorInfoStatus = action.payload;
    },
    setRetrievingSelectedDoctorInfoError: (state, action) => {
      state.retrievingSelectedDoctorInfoError = action.payload;
    },
    setChildrenFreeQuaterList: (state, action) => {
      state.childrenFreeQuaterList = action.payload;
    },
    setRetrievingChildrenFreeQuaterListStatus: (state, action) => {
      state.retrievingChildrenFreeQuaterListStatus = action.payload;
    },
    setRetrievingChildrenFreeQuaterListError: (state, action) => {
      state.retrievingChildrenFreeQuaterListError = action.payload;
    },
    setAvailableTimes: (state, action) => {
      state.availableTimes = action.payload;
    },
    setRetrievingAvailableTimesStatus: (state, action) => {
      state.retrievingAvailableTimesStatus = action.payload;
    },
    setRetrievingAvailableTimesError: (state, action) => {
      state.retrievingAvailableTimesError = action.payload;
    },
    setConsultationPlans: (state, action) => {
      state.consultationPlans = action.payload;
    },
    setRetrievingConsultationPlansStatus: (state, action) => {
      state.retrievingConsultationPlansStatus = action.payload;
    },
    setRetrievingConsultationPlansError: (state, action) => {
      state.retrievingConsultationPlansError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setSearchInfo,
  setSpecializations,
  setRetrievingSpecializationsStatus,
  setRetrievingSpecializationsError,
  setSymptoms,
  setRetrievingSymptomsStatus,
  setRetrievingSymptomsError,
  setDoctorsFound,
  setSearchingDoctorsStatus,
  setSearchingDoctorsError,
  setSelectedDoctorInfo,
  setRetrievingSelectedDoctorInfoStatus,
  setRetrievingSelectedDoctorInfoError,
  setSelectedAppointmentType,
  setSelectedDoctorAppointmentTypes,
  setRetrievingSelectedDoctorAppointmentTypesStatus,
  setRetrievingSelectedDoctorAppointmentTypesError,
  setSelectedDoctorAppointmentDates,
  setRetrievingSelectedDoctorAppointmentDatesStatus,
  setRetrievingSelectedDoctorAppointmentDatesError,
  setServiceId,
  setSelectedAppointmentDate,
  setChildrenFreeQuaterList,
  setRetrievingChildrenFreeQuaterListStatus,
  setRetrievingChildrenFreeQuaterListError,
  setAvailableTimes,
  setRetrievingAvailableTimesStatus,
  setRetrievingAvailableTimesError,
  setSelectedAppointmentTime,
  setForChild,
  setSelectedChild,
  setConsultationPlans,
  setRetrievingConsultationPlansStatus,
  setRetrievingConsultationPlansError,
  setCouponData,
  setCouponValidationStatus,
  setCouponValidationError,
  setCapturingAppointmentStatus,
  setCapturingAppointmentError,
  setCreatingAppointmentStatus,
  setCreatingAppointmentError,
  setIsAppointmentCreated,
  setActiveStepIndex,
  setPaymentId,
  resetToInitialState,
  setDownloadingPaymentSummaryStatus,
  setDownloadingPaymentSummaryError,
  setSendingPaymentSummaryEmailStatus,
  setSendingPaymentSummaryEmailError
} = findADoctor.actions;


export const downloadPaymentSummaryAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDownloadingPaymentSummaryStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDownloadingPaymentSummaryError(null));
      const response = await ImmunifyApi.downloadAppointmentPaymentSummary(payload);
      const data = await response.json();
      if (response && response.status === 200) {
        window.open("data:application/octet-stream;charset=utf-16le;base64," +data?.base64Data);
        dispatch(setDownloadingPaymentSummaryStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setDownloadingPaymentSummaryStatus("failed"));
      dispatch(setDownloadingPaymentSummaryError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setDownloadingPaymentSummaryStatus("idle"))
      );
    }
  };
};

export const sendAppointmentSummaryEmail = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSendingPaymentSummaryEmailStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setSendingPaymentSummaryEmailError(null));
      const response = await ImmunifyApi.emailAppointmentPaymentSummary(payload);
      if (response && response.status === 200) {
        dispatch(setSendingPaymentSummaryEmailStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setSendingPaymentSummaryEmailStatus("failed"));
      dispatch(setSendingPaymentSummaryEmailError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setSendingPaymentSummaryEmailStatus("idle"))
      );
    }
  };
};

export const createAppointmentAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setCreatingAppointmentStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setCreatingAppointmentError(null));
      const response = await ImmunifyApi.createAppointment(payload);
      if (response && response.status === 200) {
        dispatch(setCreatingAppointmentStatus("succeeded"));
        dispatch(setIsAppointmentCreated(true));
        dispatch(setPaymentId(payload.paymentId));
      } else {
      }
    } catch (err) {
      dispatch(setCreatingAppointmentStatus("failed"));
      dispatch(setCreatingAppointmentError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setCreatingAppointmentStatus("idle"))
      );
    }
  };
};

export const captureAppointmentAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setCapturingAppointmentStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setCapturingAppointmentError(null));
      const response = await ImmunifyApi.captureAppointment(payload);
      if (response && response.status === 200) {
        dispatch(setCapturingAppointmentStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setCapturingAppointmentStatus("failed"));
      dispatch(setCapturingAppointmentError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setCapturingAppointmentStatus("idle"))
      );
    }
  };
};

export const validateCouponAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setCouponValidationStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setCouponValidationError(null));
      const response = await ImmunifyApi.validateCoupon(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setCouponData(data));
        dispatch(setCouponValidationStatus("succeeded"));
      } else {
        dispatch(setCouponValidationStatus("failed"));
      }
    } catch (err) {
      dispatch(setCouponValidationStatus("failed"));
      dispatch(setCouponValidationError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setCouponValidationStatus("idle")));
    }
  };
};

export const getAllChildrenHaveFreeQuaterAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingChildrenFreeQuaterListStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingChildrenFreeQuaterListError(null));
      const { data, status } =
        await SubscriptionApi.getAllChildrenHaveFreeQuater(payload);
      if (data && status === 200) {
        dispatch(setChildrenFreeQuaterList(data));
        dispatch(setRetrievingChildrenFreeQuaterListStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingChildrenFreeQuaterListStatus("failed"));
      dispatch(setRetrievingChildrenFreeQuaterListError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingChildrenFreeQuaterListStatus("idle"))
      );
    }
  };
};

export const getAvailableTimesAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingAvailableTimesStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingAvailableTimesError(null));
      const response = await ImmunifyApi.getSelectedAppointmentTypeTimes(
        payload
      );
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setAvailableTimes(data));
        dispatch(setRetrievingAvailableTimesStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingAvailableTimesStatus("failed"));
      dispatch(setRetrievingAvailableTimesError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingAvailableTimesStatus("idle"))
      );
    }
  };
};

export const getSpecializations = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSpecializationsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSpecializationsError(null));
      const response = await ImmunifyApi.getDoctorSpecializations(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSpecializations(data?.body?.data));
        dispatch(setRetrievingSpecializationsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSpecializationsStatus("failed"));
      dispatch(setRetrievingSpecializationsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSpecializationsStatus("idle"))
      );
    }
  };
};

export const getSymptoms = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSymptomsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSymptomsError(null));
      const response = await ImmunifyApi.getSymptomsList(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSymptoms(data));
        dispatch(setRetrievingSymptomsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSymptomsStatus("failed"));
      dispatch(setRetrievingSymptomsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSymptomsStatus("idle"))
      );
    }
  };
};

export const getDoctorAppointmentTypesAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedDoctorAppointmentTypesStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedDoctorAppointmentTypesError(null));
      const response = await ImmunifyApi.getDoctorAppointmentTypes(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSelectedDoctorAppointmentTypes(data));
        dispatch(
          setRetrievingSelectedDoctorAppointmentTypesStatus("succeeded")
        );
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedDoctorAppointmentTypesStatus("failed"));
      dispatch(setRetrievingSelectedDoctorAppointmentTypesError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedDoctorAppointmentTypesStatus("idle"))
      );
    }
  };
};

export const findDoctors = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSearchInfo(payload));
      dispatch(setSearchingDoctorsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setSearchingDoctorsError(null));
      const response = await ImmunifyApi.searchDoctors(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setDoctorsFound(data));
        dispatch(setSearchingDoctorsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setSearchingDoctorsStatus("failed"));
      dispatch(setSearchingDoctorsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setSearchingDoctorsStatus("idle")));
    }
  };
};

export const getSlectedDoctorInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedDoctorInfoStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedDoctorInfoError(null));
      const response = await ImmunifyApi.getDoctorProfileInfo(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSelectedDoctorInfo(data));
        dispatch(setRetrievingSelectedDoctorInfoStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedDoctorInfoStatus("failed"));
      dispatch(setRetrievingSelectedDoctorInfoError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedDoctorInfoStatus("idle"))
      );
    }
  };
};

export const getSelectedAppointmentTypeDates = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedDoctorAppointmentDatesStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedDoctorAppointmentDatesError(null));
      const response = await ImmunifyApi.getSelectedAppointmentTypeDates(
        payload
      );
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSelectedDoctorAppointmentDates(data));
        dispatch(
          setRetrievingSelectedDoctorAppointmentDatesStatus("succeeded")
        );
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedDoctorAppointmentDatesStatus("failed"));
      dispatch(setRetrievingSelectedDoctorAppointmentDatesError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedDoctorAppointmentDatesStatus("idle"))
      );
    }
  };
};

export const getConultationPlans = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingConsultationPlansStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingConsultationPlansError(null));
      const response = await ImmunifyApi.getConsultationPlans(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setConsultationPlans(data));
        dispatch(setRetrievingConsultationPlansStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingConsultationPlansStatus("failed"));
      dispatch(setRetrievingConsultationPlansError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingConsultationPlansStatus("idle"))
      );
    }
  };
};

export default findADoctor.reducer;
