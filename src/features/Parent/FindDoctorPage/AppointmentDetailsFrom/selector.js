export const getDoctorSearchInfo = (state) => state.findADoctor.searchInfo
export const selectRetrievingSelectedDoctorInfoStatus = (state) => state.findADoctor.retrievingSelectedDoctorInfoStatus
export const selectSelectedDoctorInfo = (state) => state.findADoctor.selectedDoctorInfo
export const selectSelectedDoctorAppointmentTypes = (state) => state.findADoctor?.selectedDoctorInfo?.additionalData?.consultationData || []
export const selectSelectedDoctorSessions = (state) => state.findADoctor?.selectedDoctorInfo?.additionalData?.sessionData || []
export const getSelectedAppointmentType = (state) => state.findADoctor.makeAppointmentWizard.step1.appointmentType
export const selectSelectedDoctorAppointmentTypeDates = (state) => state.findADoctor.selectedDoctorAppointmentDates
export const getSelectedAppointmentDate = (state) => state.findADoctor.makeAppointmentWizard.step1.selectedDate
export const getSelectedAppointmentTime = (state) => state.findADoctor.makeAppointmentWizard.step1.selectedTime
export const getSelectedChild = (state) => state.findADoctor.makeAppointmentWizard.step1.selectedChild
export const selectIsForChildState = (state) => state.findADoctor.makeAppointmentWizard.step1.forChild
export const selectCouponData = (state) => state.findADoctor.makeAppointmentWizard.step2.couponData
export const selectCouponValidationStatus = (state) => state.findADoctor.makeAppointmentWizard.step2.couponValidationStatus
export const selectIsFree = (state) => state.findADoctor?.searchInfo?.isFree
export const getLoggedInParentId = (state) => state.user.user.personId;
export const getLoggedInParentObj = (state) => state.user.user;
export const selectRetrievingChildrenFreeQuaterListStatus = (state) => state.findADoctor.retrievingChildrenFreeQuaterListStatus
export const selectCapturingAppointmentStatus = (state) => state.findADoctor.makeAppointmentWizard.step3.capturingAppointmentStatus
export const selectIsAppointmentCreationSuccess = (state) => state.findADoctor.makeAppointmentWizard.step3.isAppointmentCreationSuccess
export const selectAppointmentCreationState = (state) => state.findADoctor.makeAppointmentWizard.step3.creatingAppointmentStatus
export const selectPaymentId = (state) => state.findADoctor.makeAppointmentWizard.step3.paymentId
export const selectActiveStep = (state) => state.findADoctor.makeAppointmentWizard.activeStep
export const retrievingSelectedDoctorAppointmentTypeTimesStatus = (state) => state.findADoctor.retrievingAvailableTimesStatus
export const downloadingPaymentSummaryStatus = (state) => state.findADoctor.downloadingPaymentSummaryStatus
export const downloadingPaymentSummaryError = (state) => state.findADoctor.downloadingPaymentSummaryError
export const sendingPaymentSummaryEmailStatus = (state) => state.findADoctor.sendingPaymentSummaryEmailStatus
export const sendingPaymentSummaryEmailError = (state) => state.findADoctor.sendingPaymentSummaryEmailError
export const selectSelectedDoctorAppointmentTypeTimes = (state) => {
  let timesModified = [];
  if (state.findADoctor?.availableTimes.length > 0) {
    timesModified = state.findADoctor?.availableTimes?.map((item) => {
      return { ...item, time: `${item.startTime} - ${item.endTime}` };
    });
  }
  return timesModified;
};
export const selectMyChildrenList = (state) => {
  const modifiedData = state.myChildren.myChildren.map((child) => {
    const { firstName, lastName } = child;
    return { ...child, fullName: `${firstName} ${lastName}` };
  });
  return modifiedData;
};
export const selectFreeChildren = (state) => {
  const modifiedData = state.findADoctor?.childrenFreeQuaterList?.map(
    (item) => {
      const { memberImmId, memberName } = item;
      return { id: memberImmId, fullName: memberName };
    }
  );
  return modifiedData;
};

