export const selectSentEmails = (state) => state.userEngagementReducer.sentEmails;
export const selectDraftEmails = (state) => state.userEngagementReducer.draftEmails;
export const selectSentNotifications = (state) => state.userEngagementReducer.sentNotifications;
export const selectDraftNotifications = (state) => state.userEngagementReducer.draftNotifications;
export const selectSearchedUser = (state) => state.userEngagementReducer.searchedUser

export const selectCountries = (state) => state.userEngagementReducer.countries;
export const selectImageUrl = (state) => state.userEngagementReducer.imageUrl;
export const selectLoading = (state) => state.userEngagementReducer.getUploadImageStatus;
