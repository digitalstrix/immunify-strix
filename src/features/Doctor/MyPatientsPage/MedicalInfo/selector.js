export const selectPatientType = (state) => state.myPatients.selectedPatientData?.userType;
export const selectPatientImmId = (state) => state.myPatients.selectedPatientData?.immId;
export const selectHeight = (state) => state.myPatients.selectedPatientLatestGrowthData.height;
export const selectWeight = (state) => state.myPatients.selectedPatientLatestGrowthData.weight;
export const selectHc = (state) => state.myPatients.selectedPatientLatestGrowthData.hcw;