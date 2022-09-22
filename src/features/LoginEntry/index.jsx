import React, {useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Alert} from '@material-ui/lab';
import { useSnackbar } from "notistack";

import {
  selectEntryStatus,
  selectEntryData,
  selectEntrySuccessUserData,
  selectEntryOtpStatus,
  selectPasswordResetRequestStatus,
  selectPasswordResetRequestSuccessData,
  selectPasswordResetChangeStatus,
  selectPasswordResetChangeSuccessData,
} from './selector';
import {notify} from '../../utils/commonUtils';

import Entry from './Entry/Entry';
// import OtpScreen from './Entry/OtpScreen';

export default function Index() {

  const dispatch = useDispatch();

  const entryStatus = useSelector((state) => selectEntryStatus(state));
  const entryData = useSelector((state) => selectEntryData(state));
  const entryOtpStatus = useSelector((state) => selectEntryOtpStatus(state));
  const entrySuccessUserData = useSelector((state) => selectEntrySuccessUserData(state));

  const passwordResetRequestStatus = useSelector((state) => selectPasswordResetRequestStatus(state));
  const passwordResetRequestSuccessData = useSelector((state) => selectPasswordResetRequestSuccessData(state));
  const passwordResetChangeStatus = useSelector((state) => selectPasswordResetChangeStatus(state));
  const passwordResetChangeSuccessData = useSelector((state) => selectPasswordResetChangeSuccessData(state));

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (entryStatus === 'succeeded') {
      notify(enqueueSnackbar, `Otp sent successfully to ${entryData?.to}`);
    } else if (entryStatus === 'failed') {
      notify(enqueueSnackbar, 'Entry Failed', 'error');
    } else if (entryStatus === 'failed-bad-request') {
      notify(enqueueSnackbar, 'Entry failed! Number is not match with country', 'error');
    }
  }, [entryStatus, enqueueSnackbar, entryData]);

  useEffect(() => {
    if (entryOtpStatus === 'succeeded') {
      notify(enqueueSnackbar, `Login Success!`);
    } else if (entryOtpStatus === 'failed') {
      notify(enqueueSnackbar, 'Login Failed', 'error');
    } else if (entryOtpStatus === 'failed-bad-request') {
      notify(enqueueSnackbar, 'Login Failed, Otp is wrong!', 'error');
    }
  }, [
    entryOtpStatus,
    enqueueSnackbar,
    entrySuccessUserData
  ]);

  useEffect(() => {
    if (passwordResetRequestStatus === 'succeeded') {
      notify(enqueueSnackbar, `Otp sent successfully to your email`);
    } else if (passwordResetRequestStatus === 'failed') {
      notify(enqueueSnackbar, 'Password reset failed', 'error');
    }
  }, [passwordResetRequestStatus, enqueueSnackbar, passwordResetRequestSuccessData]);

  useEffect(() => {
    if (passwordResetChangeStatus === 'succeeded') {
      notify(enqueueSnackbar, `Password reset success.`);
    } else if (passwordResetChangeStatus === 'failed') {
      notify(enqueueSnackbar, 'Try again', 'error');
    }
  }, [passwordResetChangeStatus, enqueueSnackbar, passwordResetChangeSuccessData]);

  return (
    <div>
      <Entry />
    </div>
  )
}

