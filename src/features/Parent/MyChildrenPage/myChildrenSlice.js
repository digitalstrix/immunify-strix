import { createSlice } from "@reduxjs/toolkit";
import { excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
import * as SubscrptionApi from "../../../api/subscriptionApi";
import { setLoading } from "../../Common/commonSlice";

const REDUCER_DOMAIN = "MyChildren";

export const myChildrenSlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    myChildren: [],
    retrievingMyChildrenStatus: "idle",
    retrievingMyChildrenError: null,
    myChildrenServicePlansList: [],
    retrievingMyChildrenServicePlansListStatus: "idle",
    retrievingMyChildrenServicePlansListError: null,
    myChildrenQRCodes: [],
    retrievingMyChildrenQRCodesStatus: "idle",
    retrievingMyChildrenQRCodesError: null,
    editingChildStatus: "idle",
    editingChildError: null,
    addingChildStatus: "idle",
    addingChildError: null,
    selectedChildAllInfo: {
      ChildVaccinationDetails: [],
    },
    retrievingSelectedChildAllInfoStatus: "idle",
    retrievingSelectedChildAllInfoError: null,
    selectedChildVacSchedulePercentage: [],
    retrievingSelectedChildVacSchedulePercentageStatus: "idle",
    retrievingSelectedChildVacSchedulePercentageError: null,
  },
  reducers: {
    setMyChildren: (state, action) => {
      state.myChildren = action.payload;
    },
    setRetrievingMyChildrenStatus: (state, action) => {
      state.retrievingMyChildrenStatus = action.payload;
    },
    setRetrievingMyChildrenError: (state, action) => {
      state.retrievingMyChildrenError = action.payload;
    },
    setMyChildrenServicePlansList: (state, action) => {
      state.myChildrenServicePlansList = action.payload;
    },
    setRetrievingMyChildrenServicePlansListStatus: (state, action) => {
      state.retrievingMyChildrenServicePlansListStatus = action.payload;
    },
    setRetrievingMyChildrenServicePlansListError: (state, action) => {
      state.retrievingMyChildrenServicePlansListError = action.payload;
    },
    setMyChildrenQRCodes: (state, action) => {
      state.myChildrenQRCodes = action.payload;
    },
    setRetrievingMyChildrenQRCodesStatus: (state, action) => {
      state.retrievingMyChildrenQRCodesStatus = action.payload;
    },
    setRetrievingMyChildrenQRCodesError: (state, action) => {
      state.retrievingMyChildrenQRCodesError = action.payload;
    },
    setEditingChildStatus: (state, action) => {
      state.editingChildStatus = action.payload;
    },
    setEditingChildError: (state, action) => {
      state.editingChildError = action.payload;
    },
    setAddingChildStatus: (state, action) => {
      state.addingChildStatus = action.payload;
    },
    setAddingChildError: (state, action) => {
      state.addingChildError = action.payload;
    },
    setSelectedChildAllInfo: (state, action) => {
      state.selectedChildAllInfo = action.payload;
    },
    setRetrievingSelectedChildAllInfoStatus: (state, action) => {
      state.retrievingSelectedChildAllInfoStatus = action.payload;
    },
    setRetrievingSelectedChildAllInfoError: (state, action) => {
      state.retrievingSelectedChildAllInfoError = action.payload;
    },
    setSelectedChildVacSchedulePercentage: (state, action) => {
      state.selectedChildVacSchedulePercentage = action.payload;
    },
    setRetrievingSelectedChildVacSchedulePercentageStatus: (state, action) => {
      state.retrievingSelectedChildVacSchedulePercentageStatus = action.payload;
    },
    setRetrievingSelectedChildVacSchedulePercentageError: (state, action) => {
      state.retrievingSelectedChildVacSchedulePercentageError = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setMyChildren,
  setRetrievingMyChildrenStatus,
  setRetrievingMyChildrenError,
  setMyChildrenQRCodes,
  setRetrievingMyChildrenQRCodesStatus,
  setRetrievingMyChildrenQRCodesError,
  setEditingChildStatus,
  setEditingChildError,
  setAddingChildStatus,
  setAddingChildError,
  setSelectedChildAllInfo,
  setRetrievingSelectedChildAllInfoStatus,
  setRetrievingSelectedChildAllInfoError,
  setSelectedChildVacSchedulePercentage,
  setRetrievingSelectedChildVacSchedulePercentageStatus,
  setRetrievingSelectedChildVacSchedulePercentageError,
  setMyChildrenServicePlansList,
  setRetrievingMyChildrenServicePlansListStatus,
  setRetrievingMyChildrenServicePlansListError,
} = myChildrenSlice.actions;

export const getMyChildren = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingMyChildrenStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingMyChildrenError(null));
      const response = await ImmunifyApi.getMyChildren(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setMyChildren(data));
        dispatch(setRetrievingMyChildrenStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingMyChildrenStatus("failed"));
      dispatch(setRetrievingMyChildrenError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingMyChildrenStatus("idle"))
      );
    }
  };
};

export const getMyChildrenServicePlans = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingMyChildrenServicePlansListStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingMyChildrenServicePlansListError(null));
      const { status, data } =
        await SubscrptionApi.getMyChildrenServicePlansAsync(payload);
      if (status && status === 200) {
        dispatch(setMyChildrenServicePlansList(data));
        dispatch(setRetrievingMyChildrenServicePlansListStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingMyChildrenServicePlansListStatus("failed"));
      dispatch(setRetrievingMyChildrenServicePlansListError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingMyChildrenServicePlansListStatus("idle"))
      );
    }
  };
};

export const addChildByParent = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setAddingChildStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setAddingChildError(null));
      const response = await ImmunifyApi.addChildByParent(payload);
      if (response && response.status === 201) {
        dispatch(setAddingChildStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setAddingChildStatus("failed"));
      dispatch(setAddingChildError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setAddingChildStatus("idle")));
    }
  };
};

export const getMyChildrenQRCodesAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingMyChildrenQRCodesStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingMyChildrenQRCodesError(null));
      const response = await ImmunifyApi.getMyChildrenQRCodes(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setMyChildrenQRCodes(data));
        dispatch(setRetrievingMyChildrenQRCodesStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingMyChildrenQRCodesStatus("failed"));
      dispatch(setRetrievingMyChildrenQRCodesError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingMyChildrenQRCodesStatus("idle"))
      );
    }
  };
};

export const editChildAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setEditingChildStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setEditingChildError(null));
      const response = await ImmunifyApi.editChildDetails(payload);
      if (response && response.status === 200) {
        dispatch(getMyChildren({ parentId: payload.parentId }));
        dispatch(setEditingChildStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setEditingChildStatus("failed"));
      dispatch(setEditingChildError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setEditingChildStatus("idle")));
    }
  };
};

export const getSingleChildInfo = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setRetrievingSelectedChildAllInfoStatus("loading"));
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedChildAllInfoError(null));
      const response = await ImmunifyApi.getSingleChildInfo(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSelectedChildAllInfo(data));
        dispatch(getSingleChildSchedulePercentage(payload.childId));
        dispatch(setRetrievingSelectedChildAllInfoStatus("succeeded"));
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedChildAllInfoStatus("failed"));
      dispatch(setRetrievingSelectedChildAllInfoError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedChildAllInfoStatus("idle"))
      );
    }
  };
};

export const getSingleChildSchedulePercentage = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(
        setRetrievingSelectedChildVacSchedulePercentageStatus("loading")
      );
      dispatch(setLoading(true));
      dispatch(setRetrievingSelectedChildVacSchedulePercentageError(null));
      const response = await ImmunifyApi.getChildVacSchedulePercentage(payload);
      if (response && response.status === 200) {
        const data = await response.json();
        dispatch(setSelectedChildVacSchedulePercentage(data));
        dispatch(
          setRetrievingSelectedChildVacSchedulePercentageStatus("succeeded")
        );
      } else {
      }
    } catch (err) {
      dispatch(setRetrievingSelectedChildVacSchedulePercentageStatus("failed"));
      dispatch(setRetrievingSelectedChildVacSchedulePercentageError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() =>
        dispatch(setRetrievingSelectedChildVacSchedulePercentageStatus("idle"))
      );
    }
  };
};

export default myChildrenSlice.reducer;
