export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const getPrescriptionUploadingStatus = (state) => state.myPatients.uploadPrescriptionByDoctorStatus;