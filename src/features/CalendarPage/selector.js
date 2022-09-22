export const getLoggedInUserId = (state) => state.user.user.personId;
export const selectEvents = state => state.calender.userEvents;
export const selectUser = state => state.user.user;
export const selectEventsRetreivingStatus = state => state.calender.retrievingUserEventsStatus;
export const selectUpdateEventStatus = state => state.calender.updatingUserEventStatus;
export const selectAddEventStatus = state => state.calender.addUserEventStatus;
export const selectDeleteEventStatus = state => state.calender.deleteUserEventStatus;

