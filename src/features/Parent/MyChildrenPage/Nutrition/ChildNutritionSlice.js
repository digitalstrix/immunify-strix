import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from "../../../Common/commonSlice";
import { getCategorizeFeed } from "../../../../utils/childUtils";
import {
  BREAKFAST,
  DINNER,
  LUNCH,
  UNCATEGORIZED,
} from "../../../../constants/nutritionConstants";

const REDUCER_DOMAIN = "MyChildren";

export const myChildrenSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    babyFeed: [],
    breakFirst: [],
    customNutritionPlan: [],
    dinner: [],
    lunch: [],
    retrievingSelectedChildNutritionDataStatus: "idle",
    retrievingSelectedChildNutritionDataError: null,
  },
  reducers: {
    setSelectedChildNutritionData: (state, action) => {
      state.customNutritionPlan = action.payload;
      state.breakFirst = getCategorizeFeed(BREAKFAST, action.payload);
      state.lunch = getCategorizeFeed(LUNCH, action.payload);
      state.dinner = getCategorizeFeed(DINNER, action.payload);
      state.babyFeed = getCategorizeFeed(UNCATEGORIZED, action.payload);
    },
    setRetrievingSelectedChildNutritionDataStatus: (state, action) => {
      state.retrievingSelectedChildNutritionDataStatus = action.payload;
    },
    setRetrievingSelectedChildNutritionDataError: (state, action) => {
      state.retrievingSelectedChildNutritionDataError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setSelectedChildNutritionData,
  setRetrievingSelectedChildNutritionDataStatus,
  setRetrievingSelectedChildNutritionDataError,
} = myChildrenSlice.actions;

export const getChildNutritionPlan = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedChildNutritionDataStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedChildNutritionDataError(null));
      const response = await ImmunifyApi.getChildNutritionPlan(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSelectedChildNutritionData(data));
        dispatch(setRetrievingSelectedChildNutritionDataStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedChildNutritionDataStatus("failed"));
      dispatch(setRetrievingSelectedChildNutritionDataError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedChildNutritionDataStatus("idle"))
      );
    }
  };
};

export default myChildrenSlice.reducer;
