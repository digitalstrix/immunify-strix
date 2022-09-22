export const getDoctorConsultationPlans = (state) => state.DoctorProfileInfo.doctorProfileData.additionalData.consultationData || [];
export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const getConsultationPlanAddingStatus = (state) => state.doctorConsultationPlans.consultationPlanAddingStatus;
export const getConsultationPlanAddingError = (state) => state.doctorConsultationPlans.consultationPlanAddingError;
export const getConsultationPlanDeletingStatus = (state) => state.doctorConsultationPlans.consultationPlanDeletingStatus;
export const getConsultationPlanDeletingError = (state) => state.doctorConsultationPlans.consultationPlanDeletingError;
export const selectDoctorSessions = (state) => state.DoctorProfileInfo.doctorProfileData?.additionalData?.sessionData || [];
