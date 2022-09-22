export const getLoggedInUserId = (state) => state.user.user.personId;
export const selectSettingCallCompleteStatus = (state) => state.parentCallView.settingCallCompleteStatus;
export const selectSettingCallCompleteError = (state) => state.parentCallView.settingCallCompleteError;
export const selectCallerName = (state) => state.common.callerData.userName || "";
