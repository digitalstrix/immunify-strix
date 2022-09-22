import { CHILD_MILESTONE } from "./constants";
import { createSelector } from "reselect";
import { getSelectedChildName } from "../../../../utils/selectorUtils";
import {
  getChildMilestone,
  getChildMilestoneAge,
  mapMilestoneImages,
} from "../../../../utils/childUtils";

export const getSelectedChildInfo = (state) => state.myChildren.selectedChildAllInfo;
export const selectCommonLoadingState = (state) => state.common.loading;
const staticsMilestones = () => CHILD_MILESTONE;

export const childMilestoneAge = createSelector(
  (state) => state.myChildren.selectedChildAllInfo,
  (child) => getChildMilestoneAge(child)
);

const childMilestoneImages = (state) => state.childMilestone.milestoneImages;
export const milestonePercentage = (state) => state.childMilestone.milestonePercentage;

export const childMilestone = createSelector(
  staticsMilestones,
  childMilestoneAge,
  childMilestoneImages,
  getSelectedChildName,
  (milestones, age, images, name) =>
    getChildMilestone(milestones, age, images, name)
);

export const getChildBelongsParent = (state) => {
  return {
    id: state.myChildren.selectedChildAllInfo?.Person?.id ?? null,
    country: state.myChildren.selectedChildAllInfo?.Person?.country ?? null,
  };
};

export const selectedMilestoneImage = (image, atAge, atAgeUnit) => {
  if (!image) {
    return mapMilestoneImages()[atAgeUnit].filter((e) => e.atAge === atAge)[0]
      .image;
  }
  return image.singedUrl;
};