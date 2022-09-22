import { CHILD_MILESTONE } from "../constants";
import { createSelector } from "reselect";
import { getSelectedChildName } from "../../../../../utils/selectorUtils";
import {
  getCategorizeMilestone,
  getChildMilestone,
  getChildMilestoneAge,
} from "../../../../../utils/childUtils";

// export const selectCommonLoadingState = (state) => state.common.loading;
const staticsMilestones = () => CHILD_MILESTONE;

export const childMilestoneAge = createSelector(
  (state) => state.myChildren.selectedChildAllInfo,
  (child) => getChildMilestoneAge(child)
);

const childMilestoneImages = (state) => state.childMilestone.milestoneImages;
export const milestonePercentage = (state) =>
  state.childMilestone.milestonePercentage;

export const childMilestone = createSelector(
  staticsMilestones,
  childMilestoneAge,
  childMilestoneImages,
  getSelectedChildName,
  (milestones, age, images, name) =>
    getChildMilestone(milestones, age, images, name)
);

export const parentSelectedMilestone = (state) =>
  state.childMilestone.selectedMilestone;

export const selectedMilestone = createSelector(
  childMilestoneImages,
  parentSelectedMilestone,
  (images, selectedMil) => {
    if (images.length === 0) {
      return selectedMil;
    }
    const mappingIndex = images.findIndex((e) => {
      const { atAge, atAgeUnit } = e;
      return atAge === selectedMil.atAge && atAgeUnit === selectedMil.atAgeUnit;
    });
    if (mappingIndex !== -1) {
      return {
        ...selectedMil,
        image: images[mappingIndex],
      };
    }
    return selectedMil;
  }
);

export const categorizeMilestone = createSelector(
  (state) => state.childMilestone,
  (childMilestones) => getCategorizeMilestone(childMilestones)
);

export const isDisableMilestone = (state) => state.childMilestone.selectedMilestone.disabled ?? true;
export const getChildMilestoneUpdatingError = (state) => state.childMilestone.updateMilestoneError;
export const getChildMilestoneUpdatingStatus = (state) => state.childMilestone.updateMilestoneStatus;
export const getChildMilestoneRetrievingStatus = (state) => state.childMilestone.retrieveChildMilestoneDetailsStatus;
export const getChildMilestoneRetrievingError = (state) => state.childMilestone.retrieveChildMilestoneDetailsError;