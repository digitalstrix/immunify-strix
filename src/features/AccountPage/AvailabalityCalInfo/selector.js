export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const selectDoctorSessions = (state) =>
  state.doctorSessions.doctorSessions;
export const selectDoctorConsultationPlans = (state) =>
  state.DoctorProfileInfo.doctorProfileData.additionalData.consultationData ||
  [];

export const selectAddSessionStatus = (state) =>
  state.doctorSessions.addingDoctorSessionsStatus;
export const selectAddSessionError = (state) =>
  state.doctorSessions.addingingDoctorSessionsError;

export const selectDeleteSessionStatus = (state) =>
  state.doctorSessions.deleteDoctorSessionStatus;
export const selectDeleteSessionError = (state) =>
  state.doctorSessions.deleteDoctorSessionsError;
