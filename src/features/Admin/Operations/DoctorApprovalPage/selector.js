export const selectPendingUsers = (state) => state.doctorApprovalReducer.nonApprovedUsers;
export const selectDoctorApprovalStatus = (state) => state.doctorApprovalReducer.doctorApprovalStatus;

export const selectDoctorRemoveStatus = (state) => state.doctorApprovalReducer.doctorRemoveStatus;
