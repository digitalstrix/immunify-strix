import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from "../../../Common/commonSlice";

const REDUCER_DOMAIN = "Milestone";

export const childMilestone = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    childMilestoneDetails: [],
    milestoneImages: [],
    milestonePercentage: [],
    selectedMilestone: {},
    retrieveChildMilestoneDetailsStatus: "idle",
    retrieveChildMilestoneDetailsError: null,
    retrieveChildMilestoneImagesStatus: "idle",
    retrieveChildMilestoneImagesError: null,
    retrieveChildMilestonePercentageStatus: "idle",
    retrieveChildMilestonePercentageError: null,
    updateMilestoneStatus: "idle",
    updateMilestoneError: null,
  },
  reducers: {
    setChildMilestoneDetails: (state, action) => {
      state.childMilestoneDetails = action.payload;
    },
    setMilestoneImages: (state, action) => {
      state.milestoneImages = action.payload;
    },
    setMilestonePercentage: (state, action) => {
      state.milestonePercentage = action.payload;
    },
    setSelectedMilestone: (state, action) => {
      state.selectedMilestone = action.payload;
    },
    setRetrieveChildMilestoneImagesStatus: (state, action) => {
      state.retrieveChildMilestoneImagesStatus = action.payload;
    },
    setRetrieveChildMilestoneImagesError: (state, action) => {
      state.retrieveChildMilestoneImagesError = action.payload;
    },
    setRetrieveChildMilestonePercentageStatus: (state, action) => {
      state.retrieveChildMilestonePercentageStatus = action.payload;
    },
    setRetrieveChildMilestonePercentageError: (state, action) => {
      state.retrieveChildMilestonePercentageError = action.payload;
    },
    setRetrieveChildMilestoneDetailsStatus: (state, action) => {
      state.retrieveChildMilestoneDetailsStatus = action.payload;
    },
    setRetrieveChildMilestoneDetailsError: (state, action) => {
      state.retrieveChildMilestoneDetailsError = action.payload;
    },
    setUpdateMilestoneStatus: (state, action) => {
      state.updateMilestoneStatus = action.payload;
    },
    setUpdateMilestoneError: (state, action) => {
      state.updateMilestoneError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setChildMilestoneDetails,
  setMilestoneImages,
  setMilestonePercentage,
  setSelectedMilestone,
  setRetrieveChildMilestoneImagesStatus,
  setRetrieveChildMilestoneImagesError,
  setRetrieveChildMilestonePercentageStatus,
  setRetrieveChildMilestonePercentageError,
  setRetrieveChildMilestoneDetailsStatus,
  setRetrieveChildMilestoneDetailsError,
  setUpdateMilestoneStatus,
  setUpdateMilestoneError,
} = childMilestone.actions;

export const getChildMilestoneImages = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrieveChildMilestoneImagesStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrieveChildMilestoneImagesError(null));
      const response = await ImmunifyApi.getChildMilestoneImages(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setMilestoneImages(data));
        dispatch(setRetrieveChildMilestoneImagesStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrieveChildMilestoneImagesStatus("failed"));
      dispatch(setRetrieveChildMilestoneImagesError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrieveChildMilestoneImagesStatus("idle"))
      );
    }
  };
};

export const getChildMilestonePercentage = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrieveChildMilestonePercentageStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrieveChildMilestonePercentageError(null));
      const response = await ImmunifyApi.getChildMilestonePercentage(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setMilestonePercentage(data));
        dispatch(setRetrieveChildMilestonePercentageStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrieveChildMilestonePercentageStatus("failed"));
      dispatch(setRetrieveChildMilestonePercentageError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrieveChildMilestonePercentageStatus("idle"))
      );
    }
  };
};

export const getChildMilestoneDetails = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrieveChildMilestoneDetailsStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrieveChildMilestoneDetailsError(null));
      const response = await ImmunifyApi.getSelectedChildMilestones(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setChildMilestoneDetails(data));
        dispatch(setRetrieveChildMilestoneDetailsStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrieveChildMilestoneDetailsStatus("failed"));
      dispatch(setRetrieveChildMilestoneDetailsError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrieveChildMilestoneDetailsStatus("idle"))
      );
    }
  };
};

export const updateChildMilestoneAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdateMilestoneStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setUpdateMilestoneError(null));
      const {
        childId,
        atAge,
        atAgeUnit,
        milestoneCompletedByChild,
        cbId,
        description,
        actionType,
      } = payload;
      const response = await ImmunifyApi.updateChildMilestones({
        cbId,
        milestoneCompletedByChild,
        childId,
        description,
      });
      if (response && response.status === 200) {
        dispatch(
          getChildMilestoneDetails({
            childId,
            atAgeUnit,
            atAge,
          })
        );
        dispatch(getChildMilestonePercentage(childId));
        dispatch(setUpdateMilestoneStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setUpdateMilestoneStatus("failed"));
      dispatch(setUpdateMilestoneError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setUpdateMilestoneStatus("idle")));
    }
  };
};

export default childMilestone.reducer;
