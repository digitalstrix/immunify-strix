import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "CallView";

export const callViewSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    settingCallCompleteStatus: "idle",
    settingCallCompleteError: null,
  },
  reducers: {
    setSettingCallCompleteStatus: (state, action) => {
      state.settingCallCompleteStatus = action.payload;
    },
    setSettingCallCompleteError: (state, action) => {
      state.settingCallCompleteError = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSettingCallCompleteStatus, setSettingCallCompleteError } =
  callViewSlice.actions;

export const setCallStatus = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSettingCallCompleteStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setSettingCallCompleteError(null));
      const response = await ImmunifyApi.completeSpecificAppointment(payload);
      if (response && response.status === 200) {
        dispatch(setSettingCallCompleteStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setSettingCallCompleteStatus("failed"));
      dispatch(setSettingCallCompleteError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setSettingCallCompleteStatus("idle"))
      );
    }
  };
};

export default callViewSlice.reducer;
