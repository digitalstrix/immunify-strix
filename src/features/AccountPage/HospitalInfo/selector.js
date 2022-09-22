export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const selectDoctorHospitalInfo = (state) =>
  state.doctorHospital.doctorHospitalData || {};

export const getRetrievingHospitalInfoStatus = (state) =>
  state.doctorHospital.doctorHospitalDataRetrievingStatus;
export const getRetrievingHospitalInfoError = (state) =>
  state.doctorHospital.doctorHospitalDataRetrievingError;

export const getUpdatingHospitalInfoStatus = (state) =>
  state.doctorHospital.doctorHospitalDataAddingStatus;
export const getUpdatingHospitalInfoError = (state) =>
  state.doctorHospital.doctorHospitalDataAddingError;
