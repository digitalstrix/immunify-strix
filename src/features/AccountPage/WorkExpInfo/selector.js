export const selectDoctorWorkExpData = (state) => state.doctorWorkExp.doctorWorkExperienceData || [];
export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const selectDoctorCountry = (state) => state.DoctorProfileInfo.doctorProfileData.basicDetails.country || null;
export const selectAddingWorkExpStatus = (state) => state.doctorWorkExp.workExperienceDataAddingStatus;
export const selectAddingWorkExpError = (state) => state.doctorWorkExp.workExperienceDataAddingError;
export const selectDeletingWorkExpStatus = (state) => state.doctorWorkExp.workExperienceDataDeletionStatus;
export const selectDeletingWorkExpError = (state) => state.doctorWorkExp.workExperienceDataDeletionError;
