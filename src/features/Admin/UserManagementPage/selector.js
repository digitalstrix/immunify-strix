export const selectIsLoadingAdminAdd = (state) => {
  return state?.userManagementReducer?.loadingAddAdminStatus;
};

export const selectCountries = (state) => state?.userManagementReducer?.countries;

export const selectAddedUsers = (state) => {
  return state?.userManagementReducer?.users;
};

export const selectUsersIsLoading = (state) => {
  return state?.userManagementReducer?.usersLoadingStatus;
};

export const selectIsLoadingAdminUpdate = (state) => {
  return state?.userManagementReducer?.loadingUpdateAdminStatus;
};