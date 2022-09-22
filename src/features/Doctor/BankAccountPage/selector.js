export const getLoggedInDoctorId = (state) => state.user.user.personId;
export const getLoggedInDoctorUserName = (state) => state.user.user.username;
export const getLoggedInDoctorEmail = (state) => state.user.user.email;
export const selectBankAccount = (state) => state.doctorBankAccount.bankAccount;
export const getBankAccountStatus = (state) => state.doctorBankAccount.retrievingBankAccountStatus;
export const getBankAccountError = (state) => state.doctorBankAccount.retrievingBankAccountError;
export const getUpdateBankAccountStatus = (state) => state.doctorBankAccount.updatingBankAccountStatus;
export const getUpdateBankAccountError = (state) => state.doctorBankAccount.updatingBankAccountError;
