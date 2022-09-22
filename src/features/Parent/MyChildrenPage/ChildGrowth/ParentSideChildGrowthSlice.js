import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import { setLoading } from "../../../Common/commonSlice";
import { processGrowthData } from "../../../../utils/growthUtils";

const REDUCER_DOMAIN = "ParentSideChildGrowth";

const getInitialState = () => ({
  originalGrowthInfo: [],
  growthInfo: [],
  heightInfo: [],
  weightInfo: [],
  hcwInfo: [],
  standardGraphs: {
    hcw: [],
    height: [],
    weight: [],
  },
  growthFetchingStatus: "idle",
  growthFetchingError: null,
  addGrowthStatus: "idle",
  addGrowthError: null,
  deletingGrowthStatus: "idle",
  deletingGrowthError: null,
  growthInput: {
    hcw: null,
    height: null,
    weight: null,
  },
});

export const parentSideChildGrowthSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: getInitialState(),
  reducers: {
    updateGrowthInfo: (state, action) => {
      const { growthInfo, standardGraphs } = action.payload;
      state.originalGrowthInfo = growthInfo;
      const { HeightGrowth, WeightGrowth, HcwGrowth } = growthInfo;
      let allGrowthData = HeightGrowth.concat(WeightGrowth);
      allGrowthData = allGrowthData.concat(HcwGrowth);
      state.growthInfo = processGrowthData(allGrowthData);
      state.heightInfo = processGrowthData(HeightGrowth);
      state.weightInfo = processGrowthData(WeightGrowth);
      state.hcwInfo = processGrowthData(HcwGrowth);
      state.standardGraphs = standardGraphs;
    },
    setGrowthFetchingStatus: (state, action) => {
      state.growthFetchingStatus = action.payload;
    },
    setGrowthFetchingError: (state, action) => {
      state.growthFetchingError = action.payload;
    },
    setAddGrowthStatus: (state, action) => {
      state.addGrowthStatus = action.payload;
    },
    setAddGrowthError: (state, action) => {
      state.addGrowthError = action.payload;
    },
    setDeletingGrowthStatus: (state, action) => {
      state.deletingGrowthStatus = action.payload;
    },
    setDeletingGrowthError: (state, action) => {
      state.deletingGrowthError = action.payload;
    },
    updateGrowthInput: (state, action) => {
      state.growthInput = action.payload;
    },
    initGrowth: (state, action) => {
      Object.entries(getInitialState()).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
  extraReducers: {},
});

export const {
  initGrowth,
  updateGrowthInfo,
  setGrowthFetchingStatus,
  setGrowthFetchingError,
  setAddGrowthStatus,
  setAddGrowthError,
  updateGrowthInput,
  setDeletingGrowthStatus,
  setDeletingGrowthError
} = parentSideChildGrowthSlice.actions;

export const getSelectedChildGrowthInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setGrowthFetchingStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setGrowthFetchingError(null));
      const response = await ImmunifyApi.getSelectedChildGrowthInfo(payload);
      if (response && response.status === 200) {
        const growth = await response.json();
        dispatch(updateGrowthInfo(growth));
        dispatch(setGrowthFetchingStatus("succeeded"));
      } else {
        //todo handle
      }
    } catch (err) {
      dispatch(setGrowthFetchingError(err));
      dispatch(setGrowthFetchingStatus("failed"));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setGrowthFetchingStatus("idle")));
    }
  };
};

export const addChildGrowthInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setAddGrowthStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setAddGrowthError(null));
      const response = await ImmunifyApi.addGrowthInfo(payload);
      if (response && (response.status === 201 || response.status === 200)) {
        dispatch(setAddGrowthStatus("succeeded"));
      } else {
        // todo handle
      }
    } catch (err) {
      dispatch(setAddGrowthError(err));
      dispatch(setAddGrowthStatus("failed"));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setAddGrowthStatus("idle")));
    }
  };
};

export const deleteChildGrowthInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeletingGrowthStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setDeletingGrowthError(null));
      const response = await ImmunifyApi.deleteChildGrowthInfo(payload);
      if (response && (response.status === 201 || response.status === 200)) {
        dispatch(setDeletingGrowthStatus("succeeded"));
      } else {
        // todo handle
      }
    } catch (err) {
      dispatch(setDeletingGrowthError(err));
      dispatch(setDeletingGrowthStatus("failed"));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setDeletingGrowthStatus("idle")));
    }
  };
};


export default parentSideChildGrowthSlice.reducer;
