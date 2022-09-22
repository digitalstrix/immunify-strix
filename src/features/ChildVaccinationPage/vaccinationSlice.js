import { createSlice } from "@reduxjs/toolkit";
import ImmunifyApi from "../../api/immunifyApi";
import {
  calculateAge,
  extractDate,
  excuteAfterGivenDelay,
  formatChildName,
} from "../../utils/commonUtils";
import { setLoading } from "../Common/commonSlice";

const REDUCER_DOMAIN = "vaccination";

const generateChildVaccinationFormInitialState = () => ({
  inputs: {
    childId: "",
    childVacDetailId: "",
    vacId: "",
    updatedBy: "",
    vaccine: "",
    barCode: "",
    qrCode: "",
    remarks: "",
    doseId: "",
  },
  errors: {
    childId: null,
    childVacDetailId: null,
    vacId: null,
    updatedBy: null,
    vaccine: null,
    barCode: null,
    qrCode: null,
    remarks: null,
  },
});

const initNewVaccineForm = () => ({
  inputs: {
    tradeNameInfo: {},
    vaccineInfo: {},
    vaccineStarts: new Date().toDateString(),
    childId: "",
    vacId: "",
    variations: [],
  },
  errors: {},
});

const getInitialState = () => ({
  parents: [],
  children: [],
  childFetchingStatus: "idle",
  childFetchingError: null,
  openChildVaccinationDialog: false,
  childVaccinationDialogType: null,
  childVaccinationStatus: "idle",
  childVaccinationError: null,
  childVaccinationForm: generateChildVaccinationFormInitialState(),
  vaccineTradeNames: null,
  vaccines: null,
  addNewVaccineForm: initNewVaccineForm(),
  vacVialImage: null,
  vacVialImageRetrievingStatus: "idle",
  vacVialImageRetrievingError: null,
});

export const vaccinationSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: getInitialState(),
  reducers: {
    setVacVialImage: (state, action) => {
      state.vacVialImage = action.payload;
    },
    setVacVialImageRetrievingStatus: (state, action) => {
      state.vacVialImageRetrievingStatus = action.payload;
    },
    setVacVialImageRetrievingError: (state, action) => {
      state.vacVialImageRetrievingError = action.payload;
    },
    setParents: (state, action) => {
      state.parents = action.payload;
    },
    setChildren: (state, action) => {
      state.children = action.payload;
    },
    setChildFetchingStatus: (state, action) => {
      state.childFetchingStatus = action.payload;
    },
    setChildFetchingError: (state, action) => {
      state.childFetchingError = action.payload;
    },
    setOpenChildVaccinationDialog: (state, action) => {
      state.openChildVaccinationDialog = action.payload;
    },
    setChildVaccinationDialogType: (state, action) => {
      state.childVaccinationDialogType = action.payload;
    },
    setChildVaccinationStatus: (state, action) => {
      state.childVaccinationStatus = action.payload;
    },
    setChildVaccinationError: (state, action) => {
      state.childVaccinationError = action.payload;
    },
    setChildVaccinationFormInputs: (state, action) => {
      state.childVaccinationForm.inputs = action.payload;
    },
    setChildVaccinationFormErrors: (state, action) => {
      state.childVaccinationForm.erros = action.payload;
    },
    initChildVaccinationForm: (state, action) => {
      const { childId, id, vacId, vaccineName, doseId } = action.payload;
      const vaccinationForm = generateChildVaccinationFormInitialState();
      const { inputs } = vaccinationForm;
      inputs.childId = childId;
      inputs.childVacDetailId = id;
      inputs.vacId = vacId;
      inputs.vaccine = vaccineName;
      inputs.doseId = doseId;
      if (state.childVaccinationDialogType === "Update") {
        const [{ ChildVaccinationDetails }] = state.children;
        const scheduleRecord = ChildVaccinationDetails.find(
          ({ id: childVacDetailId }) => childVacDetailId === id
        );
        if (scheduleRecord) {
          if (scheduleRecord.notes) {
            inputs.remarks = scheduleRecord.notes;
          }
          if (scheduleRecord.barcode) {
            inputs.barCode = scheduleRecord.barcode;
          }
          if (scheduleRecord.qrcode) {
            inputs.qrCode = scheduleRecord.qrcode;
          }
        }
      }
      state.childVaccinationForm = vaccinationForm;
    },
    setVaccineTradeNames: (state, action) => {
      state.vaccineTradeNames = action.payload;
    },
    setVaccines: (state, action) => {
      state.vaccines = action.payload;
    },
    updateAddNewVaccineInputs: (state, action) => {
      state.addNewVaccineForm.inputs = action.payload;
    },
    updateAddNewVaccineFormErrors: (state, action) => {
      state.addNewVaccineForm.errors = action.payload;
    },
    initVaccination: (state, action) => {
      Object.entries(getInitialState()).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
  extraReducers: {},
});

export const {
  initVaccination,
  setParents,
  setChildren,
  setChildFetchingError,
  setChildFetchingStatus,
  setOpenChildVaccinationDialog,
  setChildVaccinationDialogType,
  setChildVaccinationStatus,
  setChildVaccinationError,
  setChildVaccinationFormInputs,
  setChildVaccinationFormErrors,
  initChildVaccinationForm,
  setVaccineTradeNames,
  setVaccines,
  updateAddNewVaccineInputs,
  updateAddNewVaccineFormErrors,
  setVacVialImage,
  setVacVialImageRetrievingStatus,
  setVacVialImageRetrievingError,
} = vaccinationSlice.actions;

export const fetchChild = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setChildFetchingError(null));
      dispatch(setChildFetchingStatus("loading"));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.getChildByQrCode(payload);
      if (response.status === 200) {
        let child = await response.json();
        const { dateOfBirth } = child.BirthInformation;
        child = {
          ...child,
          age: calculateAge(dateOfBirth),
          name: formatChildName(child),
          createdAt: extractDate(child.createdAt),
          BirthInformation: {
            ...child.BirthInformation,
            dateOfBirth: extractDate(dateOfBirth),
          },
        };
        const parent = {
          ...child.Person,
        };
        dispatch(setParents([parent]));
        dispatch(setChildren([child]));
        dispatch(setChildFetchingStatus("succeeded"));
      } else {
        if (response.status === 404) {
          dispatch(setChildFetchingStatus("failed"));
        }
      }
    } catch (err) {
      dispatch(setChildFetchingStatus("failed"));
      dispatch(setChildFetchingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(dispatch(setChildFetchingStatus("idle")));
    }
  };
};

export const vaccinateChild = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setChildVaccinationStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setChildVaccinationError(null));

      const response = await ImmunifyApi.vaccinateChild(payload);

      if (response && response.status === 200) {
        let child = await response.json();

        child = {
          ...child,
          age: calculateAge(child.BirthInformation.dateOfBirth),
          name: formatChildName(child),
        };
        dispatch(setChildVaccinationStatus("succeeded"));
        dispatch(setChildren([child]));
      } else {
      }
    } catch (err) {
      dispatch(setChildVaccinationError(err));
      console.error(err);
    } finally {
      dispatch(setChildVaccinationStatus("idle"));
      dispatch(setLoading(false));
    }
  };
};

export const getVaccineTradeNames = () => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getVaccineTradeNames();
      if (response && response.status === 200) {
        const tradeNames = await response.json();
        dispatch(setVaccineTradeNames(tradeNames));
      } else {
        // TODO: handle properly
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const getVaccinesByTradeName = (payload) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.getVaccinesByTradeName(payload);
      if (response && response.status === 200) {
        let vaccines = await response.json();
        vaccines = vaccines.map(({ Vaccine }) => Vaccine);
        dispatch(setVaccines(vaccines));
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const getVaccines = () => {
  return async (dispatch) => {
    try {
      console.log("calling api");
      const response = await ImmunifyApi.getVaccines();
      if (response && response.status === 200) {
        const vaccines = await response.json();
        dispatch(setVaccines(vaccines));
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const addNewVaccine = (payload) => {
  return async (dispatch) => {
    try {
      const response = await ImmunifyApi.addVaccine(payload);
      if (response && response.status === 200) {
        const res = await response.json();
      } else {
        //todo handle
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const getVaccineVialImage = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setVacVialImageRetrievingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setVacVialImageRetrievingError(null));
      const response = await ImmunifyApi.getVacVialPresigndUrl(payload);
      if (response && response.status === 200) {
        dispatch(setVacVialImageRetrievingStatus("succeeded"));
        const data = await response.json();
        dispatch(setVacVialImage(data));
      } else {
      }
    } catch (err) {
      dispatch(setVacVialImageRetrievingStatus("failed"));
      dispatch(setVacVialImageRetrievingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setVacVialImageRetrievingStatus("idle"))
      );
    }
  };
};

export default vaccinationSlice.reducer;
