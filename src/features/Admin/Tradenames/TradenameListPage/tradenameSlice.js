import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ImmunifyApi from "../../../../api/immunifyApi";
import { eventNameGenerator, excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import { setLoading } from "../../../Common/commonSlice";

const REDUCER_DOMAIN = "tradenames";
const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const loadVaccines = createAsyncThunk(prefixEventName("loadVaccines"), async (payload) => {
  const response = await ImmunifyApi.getSearchableVaccine(payload);
  return response.json();
});

export const loadManufacturers = createAsyncThunk(prefixEventName("loadManufacturers"), async () => {
  const response = await ImmunifyApi.getManufacturers();
  return response.json();
});

export const loadTradenames = createAsyncThunk(prefixEventName("loadTradenames"), async () => {
  const response = await ImmunifyApi.getTradenames();
  return response.json();
});

export const loadPendingTradenames = createAsyncThunk(prefixEventName("loadPendingTradenames"), async () => {
  const response = await ImmunifyApi.getPendingTradenames();
  return response.json();
});

export const addTradenamebackup = createAsyncThunk(prefixEventName("addTradename"), async (payload, thunkAPI) => {
  const response = await ImmunifyApi.addTradenames(payload);
  return response.json();
});

export const tradenameSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    tradenames: [],
    tradenamesLoadingStatus: "idle",
    pendingTradenames: [],
    pendingTradenamesLoadingStatus: "idle",
    tradenamesAddingStatus: "idle",
    tradenameDeletingStatus: "idle",
    tradenameApproveStatus: "idle",
    tradenameRejectStatus: "idle",
    vaccines: [],
    vaccinesLoadingStatus: "idle",
    manufacuturers: [],
    manufacturersLoadingStatus: "idle",
  },
  reducers: {
    setAddNewTradenameStatus: (state, action) => {
      state.tradenamesAddingStatus = action.payload;
    },
    setDeleteTradenameStatus: (state, action) => {
      state.tradenameDeletingStatus = action.payload;
    },
    setApproveTradenameStatus: (state, action) => {
      state.tradenameApproveStatus = action.payload;
    },
    setRejectTradenameStatus: (state, action) => {
      state.tradenameRejectStatus = action.payload;
    },
  },
  extraReducers: {
    [loadVaccines.pending]: (state, action) => {
      state.vaccinesLoadingStatus = "loading";
    },
    [loadVaccines.fulfilled]: (state, action) => {
      state.vaccinesLoadingStatus = "succeeded";
      state.vaccines = action.payload;
    },
    [loadVaccines.rejected]: (state, action) => {
      state.vaccinesLoadingStatus = "failed";
    },
    [loadManufacturers.pending]: (state, action) => {
      state.manufacturersLoadingStatus = "loading";
    },
    [loadManufacturers.fulfilled]: (state, action) => {
      state.manufacturersLoadingStatus = "succeeded";
      state.manufacuturers = action.payload;
    },
    [loadManufacturers.rejected]: (state, action) => {
      state.manufacturersLoadingStatus = "failed";
    },
    [loadTradenames.pending]: (state, action) => {
      state.tradenamesLoadingStatus = "loading";
    },
    [loadTradenames.fulfilled]: (state, action) => {
      state.tradenamesLoadingStatus = "succeeded";
      state.tradenames = action.payload;
    },
    [loadTradenames.rejected]: (state, action) => {
      state.tradenamesLoadingStatus = "failed";
    },
    [loadPendingTradenames.pending]: (state, action) => {
      state.pendingTradenamesLoadingStatus = "loading";
    },
    [loadPendingTradenames.fulfilled]: (state, action) => {
      state.pendingTradenamesLoadingStatus = "succeeded";
      state.pendingTradenames = action.payload;
    },
    [loadPendingTradenames.rejected]: (state, action) => {
      state.pendingTradenamesLoadingStatus = "failed";
    },
  },
});

export const { setAddNewTradenameStatus, setDeleteTradenameStatus, setApproveTradenameStatus, setRejectTradenameStatus } = tradenameSlice.actions;

export const addTradename = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setAddNewTradenameStatus("loading"));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.addTradenames(payload);
      if (response && response.status === 200) {
        dispatch(setAddNewTradenameStatus("succeeded"));
      } else {
        dispatch(setAddNewTradenameStatus("failed"));
      }
    } catch (error) {
      dispatch(setAddNewTradenameStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setAddNewTradenameStatus("idle"));
        dispatch(setLoading(false));
      });
    }
  };
};

export const deleteTradename = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeleteTradenameStatus("loading"));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.deleteTradenames(payload);

      if (response && response.status === 204) {
        dispatch(setDeleteTradenameStatus("succeeded"));
      } else if (response && response.status === 400) {
        response.text().then((data) => {
          console.log("response", data);
        });
      } else {
        dispatch(setDeleteTradenameStatus("failed"));
      }
    } catch (error) {
      dispatch(setDeleteTradenameStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setDeleteTradenameStatus("idle"));
        dispatch(setLoading(false));
      });
    }
  };
};

export const approveTradename = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setApproveTradenameStatus("loading"));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.approveTradenames(payload);
      if (response && response.status === 204) {
        dispatch(setApproveTradenameStatus("succeeded"));
      } else {
        dispatch(setApproveTradenameStatus("failed"));
      }
    } catch (error) {
      dispatch(setApproveTradenameStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setApproveTradenameStatus("idle"));
        dispatch(setLoading(false));
      });
    }
  };
};

export const rejectTradename = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRejectTradenameStatus("loading"));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.approveTradenames(payload);
      if (response && response.status === 204) {
        dispatch(setRejectTradenameStatus("succeeded"));
      } else {
        dispatch(setRejectTradenameStatus("failed"));
      }
    } catch (error) {
      dispatch(setRejectTradenameStatus("failed"));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setRejectTradenameStatus("idle"));
        dispatch(setLoading(false));
      });
    }
  };
};

export default tradenameSlice.reducer;
