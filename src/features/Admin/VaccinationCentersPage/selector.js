export const selectCountryLoadingStatus = (state) =>
  state.country.countryLoadingStatus;
export const selectCountries = (state) => state.country.countries;
export const selectVacTypes = (state) => state.vacCenter.vacTypes;
export const selectVacStates = (state) => state.vacCenter.vacStates;
export const selectCenterFetchStatus = (state) =>
  state.vacCenter.centerMetadataLoadingStatus;
export const selectVacCenters = (state) => state.vacCenter.centers;
export const selectCenterRegStatus = (state) =>
  state.vacCenter.registerVacCenterStatus;
export const selectCenterRegError = (state) =>
  state.vacCenter.registerVacCenterError;
export const selectMainCenters = (state) => state.vacCenter.mainCenters;
export const selectCenterUpdateStatus = (state) =>
  state.vacCenter.updateVacCenterStatus;
export const selectCenterUpdateError = (state) =>
  state.vacCenter.updateVacCenterError;
export const selectUser = (state) => state.user.user;
