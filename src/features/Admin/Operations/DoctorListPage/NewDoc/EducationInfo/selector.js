export const selectDoctorEducationData = (state) => state.doctorList.doctorEducationData || [];
export const getSelectedDoctorId = (state) => state.doctorList.generalInfo.id;
export const selectDoctorCountry = (state) => state.DoctorProfileInfo.doctorProfileData.basicDetails.country || 1000;
export const selectAddingEducationStatus = (state) => state.doctorList.educationDataAddingStatus;
export const selectAddingEducationError = (state) => state.doctorList.educationDataAddingError;
export const selectDeletingEducationStatus = (state) => state.doctorList.educationDataDeletionStatus;
export const selectDeletingEducationError = (state) => state.doctorList.educationDataDeletionError;
