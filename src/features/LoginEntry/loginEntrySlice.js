/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { eventNameGenerator, excuteAfterGivenDelay } from '../../utils/commonUtils';
import LoginApi from '../../api/loginApi';
import ImmunifyApi from '../../api/immunifyApi';
import { setLoading } from '../Common/commonSlice';
import { getCookie, setCookie } from '../../utils/commonUtils';

const REDUCER_DOMAIN = "loginEntry";

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

const loginEntrySlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    entryData: null,
    entryStatus: 'idle',
    entryOtpStatus: 'idle',
    entrySuccessUserData: null,
    logoutStatus: 'idle',
    passwordResetRequestStatus: 'idle',
    passwordResetRequestSuccessData: null,
    passwordResetChangeStatus: 'idle',
    passwordResetChangeSuccessData: null,
  },
  reducers: {
    setEntryStatus: (state, action) => {
      state.entryStatus = action.payload;
    },
    setEntryData: (state, action) => {
      state.entryData = action.payload;
    },
    setEntryOtpStatus: (state, action) => {
      state.entryOtpStatus = action.payload;
    },
    setEntryOtpData: (state, action) => {
      state.entrySuccessUserData = action.payload;
    },
    setLogutStatus: (state, action) => {
      state.logoutStatus = action.payload;
    },
    setPasswordResetRequestStatus: (state, action) => {
      state.passwordResetRequestStatus = action.payload;
    },
    setPasswordResetRequestSuccessData: (state, action) => {
      state.passwordResetRequestSuccessData = action.payload;
    },
    setPasswordResetChangeStatus: (state, action) => {
      state.passwordResetChangeStatus = action.payload;
    },
    setPasswordResetChangeSuccessData: (state, action) => {
      state.passwordResetChangeSuccessData = action.payload;
    },
  },
});

const {
  setEntryStatus,
  setEntryData,
  setEntryOtpStatus,
  setEntryOtpData,
  setLogutStatus,
  setPasswordResetRequestStatus,
  setPasswordResetRequestSuccessData,
  setPasswordResetChangeStatus,
  setPasswordResetChangeSuccessData,
} = loginEntrySlice.actions;

export const entryEmailAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setEntryOtpStatus('loading'));
      dispatch(setLoading(true));
      // console.log('ccccccccc')
      // console.log('come =====> ', payload);
      const response = await LoginApi.adminLogin(payload);
      // console.log('responecece==============> ', response);
      if (response && response.status === 200) {
        // console.log('-=-=-= ...> ', response.data);
        dispatch(setEntryOtpData(response.data));
        dispatch(setEntryOtpStatus('succeeded'));
      } else if (response && response.status === 400) {
        dispatch(setEntryOtpStatus('failed-bad-request'));
      } else {
        dispatch(setEntryOtpStatus('failed'));
      }
    } catch (error) {
      console.log('error ===> ', error);
      dispatch(setEntryOtpStatus('failed'));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setEntryOtpStatus('idle'));
      });
    }
  };
};

export const hasRole = async(payload) => {
  // return async (dispatch) => {
    try {
      // console.log('ccccccccc')
      // console.log('come =====> ', payload);
      const response = await LoginApi.hasRole(payload);
      await Promise.all([response]);
      // console.log('responecece==============> ', response);
      if (response && response.status === 200) {
        return true;
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  // };
}

export const logoutAsync = (payload) => {
  return async (dispatch) => {
    try {
      console.log('ccccccccc', getCookie('login'));
      console.log('come =====> ', payload);
      dispatch(setLogutStatus('loading'));
      const response = await LoginApi.logout(payload);
      console.log('responecece==============> ', response);
      if (response && response.status === 200) {
        dispatch(setLogutStatus('succeeded'));
        dispatch({
          type: 'USER_LOGOUT',
        });
      } else {
        dispatch(setLogutStatus('failed'));
        // return false
      }
    } catch (error) {
      dispatch(setLogutStatus('failed'));
      // return false
    } finally {
      excuteAfterGivenDelay(() => dispatch(setLogutStatus("idle")));
    }
  };
}

export const checkAuthAsync = (payload) => {
  console.log('papapapa ====> ', payload);
  return async (dispatch) => {
    try {
      const response = await LoginApi.checkAuth(payload);
      if (response && response.status === 200) {
        if (!response?.data?.isCanAccess) {
          dispatch(logoutAsync());
          payload.history.push("/");
          setCookie("login", "", 0);
        }
      }
    } catch (error) {
      console.log('error occur');
    }
  }
}

export const passwordResetRequestAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setPasswordResetRequestStatus('loading'));
      const response = await LoginApi.adminPasswordReset(payload);
      if (response.status !== 200) {
        throw new Error();
      }
      dispatch(setPasswordResetRequestSuccessData(response?.data));
      dispatch(setPasswordResetRequestStatus('succeeded'));
    } catch (error) {
      console.log('error req ===> ', error);
      dispatch(setPasswordResetRequestStatus('failed'));
    } finally {
      dispatch(setPasswordResetRequestStatus('idle'));
    }
  }
};

export const passwordResetChangeAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setPasswordResetChangeStatus('loading'));
      const response = await LoginApi.adminPasswordChange(payload);
      console.log('res===> ', response);
      if (response.status !== 200) {
        throw new Error();
      }
      dispatch(setPasswordResetRequestSuccessData(response?.data));
      dispatch(setPasswordResetChangeStatus('succeeded'));
      dispatch(setPasswordResetRequestSuccessData(null));
    } catch (error) {
      console.log('error req ===> ', error);
      dispatch(setPasswordResetChangeStatus('failed'));
    } finally {
      dispatch(setPasswordResetChangeStatus('idle'));
    }
  }
};


export default loginEntrySlice.reducer;
