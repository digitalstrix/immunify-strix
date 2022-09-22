import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "DoctorBankAccount";

export const doctorBankAccount = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    bankAccount: {},
    retrievingBankAccountStatus: "idle",
    retrievingBankAccountError: null,
    updatingBankAccountStatus: "idle",
    updatingBankAccountError: null,
  },
  reducers: {
    setBankAccount: (state, action) => {
      state.bankAccount = action.payload;
    },
    setRetrievingBankAccountStatus: (state, action) => {
      state.retrievingBankAccountStatus = action.payload;
    },
    setRetrievingBankAccountError: (state, action) => {
      state.retrievingBankAccountError = action.payload;
    },
    setUpdatingBankAccountStatus: (state, action) => {
      state.updatingBankAccountStatus = action.payload;
    },
    setUpdatingBankAccountError: (state, action) => {
      state.updatingBankAccountError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setBankAccount,
  setRetrievingBankAccountStatus,
  setRetrievingBankAccountError,
  setUpdatingBankAccountStatus,
  setUpdatingBankAccountError,
} = doctorBankAccount.actions;

export const getBankAccount = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingBankAccountStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingBankAccountError(null));
      const response = await ImmunifyApi.getDoctorBankAccount(payload);
      if (response && response.status === 200) {
        let data = await response.json();
        dispatch(setBankAccount(data));
        dispatch(setRetrievingBankAccountStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingBankAccountStatus("failed"));
      dispatch(setRetrievingBankAccountError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingBankAccountStatus("idle"))
      );
    }
  };
};

export const updateBankAccount = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdatingBankAccountStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setUpdatingBankAccountError(null));
      const response = await ImmunifyApi.addDoctorBankAccount(payload);
      if (response && response.status === 200) {
        // let data = await response.json();
        dispatch(getBankAccount(payload.immId));
        dispatch(setUpdatingBankAccountStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setUpdatingBankAccountStatus("failed"));
      dispatch(setUpdatingBankAccountError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setUpdatingBankAccountStatus("idle"))
      );
    }
  };
};

export default doctorBankAccount.reducer;
