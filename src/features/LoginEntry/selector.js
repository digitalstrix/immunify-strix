export const selectEntryStatus = (state) => state?.loginEntryReducer?.entryStatus;
export const selectEntryData = (state) => state?.loginEntryReducer?.entryData;
export const selectEntryOtpStatus = (state) => state?.loginEntryReducer?.entryOtpStatus;
export const selectEntrySuccessUserData = (state) => state?.loginEntryReducer?.entrySuccessUserData;
export const selectPasswordResetRequestStatus = (state) => state?.loginEntryReducer?.passwordResetRequestStatus;
export const selectPasswordResetRequestSuccessData = (state) => state?.loginEntryReducer?.passwordResetRequestSuccessData;
export const selectPasswordResetChangeStatus = (state) => state?.loginEntryReducer?.passwordResetChangeStatus;
export const selectPasswordResetChangeSuccessData = (state) => state?.loginEntryReducer?.passwordResetChangeSuccessData;
