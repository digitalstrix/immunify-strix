import { createSelector } from "reselect";
import { getChildBelongsNutritions } from "../../../../utils/childUtils";

export const getSelectedChildInfo = (state) => state.myChildren.selectedChildAllInfo;
export const selectCommonLoadingState = (state) => state.common.loading;

const childDetailsSelector = (state) => {
  return {
    dateOfBirth: state.myChildren.selectedChildAllInfo?.BirthInformation?.dateOfBirth ?? null,
    customNutritions: state.nutrition?.customNutritionPlan,
  };
};

export const childBelongsNutritions = createSelector(
  childDetailsSelector,
  (info) => getChildBelongsNutritions(info)
);

export const childBreakFirstFeed = (state) => state.nutrition?.breakFirst ?? [];
export const childLunchFeed = (state) => state.nutrition?.lunch ?? [];
export const childDinnerFeed = (state) => state.nutrition?.dinner ?? [];
