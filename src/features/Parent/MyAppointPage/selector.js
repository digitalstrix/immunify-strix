export const getLoggedInUserId = (state) => state.user.user.personId;
export const selectPastAppointments = (state) => state.parentAppointments.myAppointments?.past;
export const selectUpcommingAppointments = (state) => state.parentAppointments.myAppointments?.upComming;
export const selectAppointmentCancellingStatus = (state) => state.parentAppointments.cancellingAppointmentStatus;
export const selectAppointmentCancellingError = (state) => state.parentAppointments.cancellingAppointmentError;
export const selectAppointmentsReceivingStatus = (state) => state.parentAppointments.retrievingMyAppointmentsStatus;