import { createSelector } from "reselect";
import { childAge } from "../../../utils/childUtils";

export const getLoggedInUserId = (state) => state.user.user.personId;
export const selectMyChildrenList = (state) => state.myChildren.myChildren;
export const selectMyChildrenQRCodeList = (state) =>
  state.myChildren.myChildrenQRCodes;

const isShowQRCode = (id, qrCodes = []) => {
  const filteredChild = qrCodes.filter((e) => e.id === id);
  if (filteredChild.length !== 1) {
    return false;
  }
  const [{ hasQRCode, qrCode }] = filteredChild;
  return { hasQRCode, qrCode };
};

export const getmyChildren = createSelector(
  selectMyChildrenList,
  selectMyChildrenQRCodeList,
  (children, qrCodes) =>
    children.map((child) => {
      const childQrinfo = isShowQRCode(child.id, qrCodes);
      return {
        ...child,
        ...childQrinfo,
        age: childAge(child.dateOfBirth),
        name: child.firstName.concat(" ", child.lastName),
      };
    })
);

export const selectUpdateChildStatus = (state) => state.myChildren.editingChildStatus;
export const selectUpdateChildError = (state) => state.myChildren.editingChildError;
export const selectAddChildStatus = (state) => state.myChildren.addingChildStatus;
export const selectAddChildError = (state) => state.myChildren.addingChildError;
export const selectCountries = state => state.country.countries;
export const selectChildFromInputs = state => state.registration.childForm.inputs;
export const selectChildFromErrors = state => state.registration.childForm.errors;
export const getSelectedChildInfo = (state) => state.myChildren.selectedChildAllInfo;
export const selectCommonLoadingState = (state) => state.common.loading;

export const selectStdGraphs = (state) => state.ParentSideChildGrowth.standardGraphs;
export const selectGrowthInfo = (state) => state.ParentSideChildGrowth.growthInfo;
export const selectHeightInfo = (state) => state.ParentSideChildGrowth.heightInfo;
export const selectWeightInfo = (state) => state.ParentSideChildGrowth.weightInfo;
export const selectHcwInfo = (state) => state.ParentSideChildGrowth.hcwInfo;


export const selectChildInfoPageLoadingStatus = (state) =>
  state.myChildren.retrievingSelectedChildVacSchedulePercentageStatus ===
    "loading" ||
  state.myChildren.retrievingSelectedChildAllInfoStatus === "loading" ||
  state.ParentSideChildGrowth.growthFetchingStatus === "loading" ||
  state.myChildren.retrievingMyChildrenServicePlansListStatus === "loading"
    ? true
    : false;


