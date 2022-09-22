export const selectParents = state => state.registration.parents;
export const selectCountries = state => state.country.countries;
export const selectCountryLoadingStatus = state => state.country.countryLoadingStatus;
export const selectInputs = state => state.registration.parentForm.inputs;
export const selectErrors = state => state.registration.parentForm.errors;
export const selectChecks = state => state.registration.parentForm.checks;
export const selectDisplayParentRegDialog = state => state.registration.displayParentRegDialog;
export const selectCreateParentStatus = state => state.registration.createParentStatus;
export const selectUpdateParentStatus = state => state.registration.updateParentStatus;
export const selectDisplayParentEditDialog = state => state.registration.displayParentEditDialog;
export const selectDisplayChildRegDialog = state => state.registration.displayChildRegDialog;
export const selectChildFromInputs = state => state.registration.childForm.inputs;
export const selectChildFromErrors = state => state.registration.childForm.errors;
export const selectChildFormRelativeId = state => state.registration.childForm.relativeId;
export const selectAddChildStatus = state => state.registration.addChildStatus;
export const selectChildren = state => state.registration.children;
export const selectDisplayChildDetailDialog = state => state.registration.displayChildDetailDialog;
export const selectChildDetailDialogType = state => state.registration.childDetailDialogType;
export const selectChildFetchingStatus = state => state.registration.childFetchingStatus;
export const selectChildUpdatingStatus = state => state.registration.childUpdatingStatus;
export const selectParentSearchStatus = state => state.registration.parentSearchStatus;
export const selectChild = state => state.registration.selectedChild;
export const selectActivateCardStatus = state => state.registration.activateCardStatus;
export const selectActivateCardError = state => state.registration.activateCardError;
export const selectScannedCard = state => state.registration.scannedCard;
export const selectUser = state => state.user.user;
export const getUserType = (state) => {
    if (state.user.user.portalType === 'IMM' && state.user.user.userType === 'ADMIN') {
        return 'IMM_ADMIN'
    } else if (state.user.user.portalType === 'VAC' && state.user.user.userType === 'ADMIN') {
        return 'VAC_ADMIN'
    } else {
        return null
    }
}