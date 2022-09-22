export const selectDoctorBasicData = (state) => state.DoctorProfileInfo.doctorProfileData.basicDetails;
export const selectCallData = (state) => state.doctorSideMyAppointments.callData;
export const selectInitiateCallStatus = (state) => state.doctorSideMyAppointments.initiateCallStatus;
export const selectInitiateCallError = (state) => state.doctorSideMyAppointments.initiateCallError;
export const getLoggedInUserId = (state) => state.user.user.personId;