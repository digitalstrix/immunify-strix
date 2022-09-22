import moment from "moment";

export const selectAddGrowthStatus = (state) => state.ParentSideChildGrowth.addGrowthStatus;
export const selectGrowthFetchingStatus = (state) => state.ParentSideChildGrowth.growthFetchingStatus;
export const selectAddGrowthError = (state) => state.ParentSideChildGrowth.addGrowthError;
export const selectGrowthFetchingError = (state) => state.ParentSideChildGrowth.growthFetchingError;
export const selectGrowthInfoDeletingStatus = (state) => state.ParentSideChildGrowth.deletingGrowthStatus;
export const selectGrowthInfoDeletingError = (state) => state.ParentSideChildGrowth.deletingGrowthError;

export const selectHeightRawData = (state) => {
  const raw = state.ParentSideChildGrowth.originalGrowthInfo.HeightGrowth;
  const data =
    raw &&
    raw.length > 0 &&
    raw.map((i) => {
      const { id, height, date, childId } = i;
      return { id, childId, height, date: moment(date).format("YYYY-MM-DD") };
    });
  return data;
};
export const selectWeightRawData = (state) => {
  const raw = state.ParentSideChildGrowth.originalGrowthInfo.WeightGrowth;
  const data =
    raw &&
    raw.length > 0 &&
    raw.map((i) => {
      const { id, weight, date, childId } = i;
      return { id, childId, weight, date: moment(date).format("YYYY-MM-DD") };
    });
  return data;
};
export const selectHcRawData = (state) => {
  const raw = state.ParentSideChildGrowth.originalGrowthInfo.HcwGrowth;
  const data =
    raw &&
    raw.length > 0 &&
    raw.map((i) => {
      const { id, hcw, date, childId } = i;
      return { id, childId, hcw, date: moment(date).format("YYYY-MM-DD") };
    });
  return data;
};