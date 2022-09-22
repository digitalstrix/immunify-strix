export const selectParents = (state) => state.vaccination.parents;
export const selectChildren = (state) => state.vaccination.children;
export const selectOpenChildVaccinationDialog = (state) =>
  state.vaccination.openChildVaccinationDialog;
export const selectChildVaccinationDialogType = (state) =>
  state.vaccination.childVaccinationDialogType;
export const selectChildVaccinationInputs = (state) =>
  state.vaccination.childVaccinationForm.inputs;
export const selectChildVaccinationStatus = (state) =>
  state.vaccination.childVaccinationStatus;
export const selectVaccineTradeNames = (state) =>
  state.vaccination.vaccineTradeNames;
export const selectVaccines = (state) => state.vaccination.vaccines;
export const selectAddNewVaccineFormInputs = (state) =>
  state.vaccination.addNewVaccineForm.inputs;
export const selectChildFetchingStatus = (state) =>
  state.vaccination.childFetchingStatus;
export const selectChildFetchingError = (state) =>
  state.vaccination.childFetchingError;

export const selectGrowthInputs = (state) => state.growth.growthInput;
export const selectAddGrowthStatus = (state) => state.growth.addGrowthStatus;
export const selectGrowthFetchingStatus = (state) =>
  state.growth.growthFetchingStatus;
export const selectStdGraphs = (state) => state.growth.standardGraphs;
export const selectGrowthInfo = (state) => state.growth.growthInfo;
export const selectHeightInfo = (state) => state.growth.heightInfo;
export const selectWeightInfo = (state) => state.growth.weightInfo;
export const selectHcwInfo = (state) => state.growth.hcwInfo;
export const selectUser = (state) => state.user.user;
export const selectGrowthData = (state) =>
  state.vaccination.children[0].ChildGrowthInformations.slice(-1)[0];

export const selectAllGrowthInfo = (state) => state.growth.originalGrowthInfo;
