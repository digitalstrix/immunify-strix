export const selectDoctorEducationData = (state) => state.doctorEducation.doctorEducationData || [];
export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const selectDoctorCountry = (state) => state.DoctorProfileInfo.doctorProfileData.basicDetails.country || null;
export const selectAddingEducationStatus = (state) => state.doctorEducation.educationDataAddingStatus;
export const selectAddingEducationError = (state) => state.doctorEducation.educationDataAddingError;
export const selectDeletingEducationStatus = (state) => state.doctorEducation.educationDataDeletionStatus;
export const selectDeletingEducationError = (state) => state.doctorEducation.educationDataDeletionError;
