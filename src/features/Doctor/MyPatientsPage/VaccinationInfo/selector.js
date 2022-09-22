export const selectPatientType = (state) => state.myPatients.selectedPatientData?.userType;
export const selectVaccines = (state) => state.myPatients.selectedPatientData?.vaccinations||[];
export const selectParentVaccinationData = (state) => state.myPatients.selectedPatientData?.vaccines||null;
