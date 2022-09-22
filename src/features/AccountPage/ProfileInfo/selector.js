export const selectDoctorProfilePicture = (state) => state.DoctorProfileInfo.profilePictureUrl?.imageUrl;
export const selectisLoading = (state) => state.common.loading;
export const selectDoctorBasicData = (state) => state.DoctorProfileInfo.doctorProfileData.basicDetails;
export const selectSpecializationsList = (state) => state.common.doctorSpecializations;
export const selectRetrievingSpecializationsListStatus = (state) => state.common.doctorSpecializationsStatus;
export const selectCountriesList = (state) => state.country.countries;
export const selectDoctorProfileGeneralTabEditingState = (state) => state.DoctorProfileInfo.isGeneralTabEditing;
export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const getProfileInfoError = (state) => state.DoctorProfileInfo.profileInfoError;
export const getProfileInfoStatus = (state) => state.DoctorProfileInfo.profileInfoStatus;
export const getProfilePictureStatus = (state) => state.DoctorProfileInfo.profilePictureStatus;
export const getProfilePictureError = (state) => state.DoctorProfileInfo.profilePictureError;
export const getProfileDataUpdatingStatus = (state) => state.DoctorProfileInfo.profileDataUpdatingStatus;
export const getProfileDataUpdatingError = (state) => state.DoctorProfileInfo.profileDataUpdatingError;

