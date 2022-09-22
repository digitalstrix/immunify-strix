export const getLoggedInUserId = (state) => state.user.user.personId;
export const selectCancellingAppointmentStatus = (state) => state.doctorSideMyAppointments.cancellingAppointmentStatus;
export const selectCancellingAppointmentError = (state) => state.doctorSideMyAppointments.cancellingAppointmentError;
export const selectMyAppointments = (state) => {
  const data = state.doctorSideMyAppointments.myAppointments;
  const modified =
    data.length > 0
      ? data.map((item) => {
          const patient = item?.PatientData;
          const { PatientData, ...noA } = item;
          return { ...noA, ...patient, ...item };
        })
      : [];
  return modified;
};
export const selectMyAppointmentsRaw = (state) => state.doctorSideMyAppointments.myAppointments;
export const selectDoctorBasicData = (state) => state.doctorSideMyAppointments.doctorInfo?.basicDetails;