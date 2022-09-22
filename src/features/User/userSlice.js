import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator } from '../../utils/commonUtils';
import ImmunifyApi from '../../api/immunifyApi';

const REDUCER_DOMAIN = 'user';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const getUser = createAsyncThunk(prefixEventName('getUser'), async (payload) => {
  const response = await ImmunifyApi.getLoggedInUser(payload);
  return response.json();
});

export const setUserFcmToken = createAsyncThunk(prefixEventName('setUserFcmToken'), async (payload) => {
    const response = await ImmunifyApi.setFcmTokenFromWeb(payload);
    return response.json();
  });

export const userSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    user: null,
    userLoadingStatus: "idle",
    userLoadingError: null,
    fcmToken: null,
    fcmTokenStatus: "idle",
    fcmTokenError: null,
    deviceIdForWeb: null,
  },
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.userLoadingStatus = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload && payload.length > 0) {
        state.user = payload[0];
      }
      state.userLoadingStatus = "success";
    },
    [getUser.rejected]: (state, action) => {
      state.userLoadingStatus = "failed";
    },
    [setUserFcmToken.pending]: (state, action) => {
      state.fcmTokenStatus = "pending";
    },
    [setUserFcmToken.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload) {
        const {rawDeviceLoginData, user} = payload;
        state.fcmToken = rawDeviceLoginData?.fcmToken;
        state.deviceIdForWeb = rawDeviceLoginData?.id;
      }
      state.fcmTokenStatus = "success";
    },
    [setUserFcmToken.rejected]: (state, action) => {
      state.fcmTokenStatus = "failed";
    },
  },
});

export default userSlice.reducer;
