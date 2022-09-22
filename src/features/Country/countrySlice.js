import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventNameGenerator } from "../../utils/commonUtils";
import ImmunifyApi from "../../api/immunifyApi";

const REDUCER_DOMAIN = "country";

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const getCountries = createAsyncThunk(
  prefixEventName("getCountries"),
  async () => {
    const response = await ImmunifyApi.getCountries();
    console.log(response);
    return response.json();
  }
);

export const nonapproval = createAsyncThunk(
  prefixEventName("nonapproval"),
  async () => {
    const response = await ImmunifyApi.getNonApprovalDocs();
    return response;
  }
);

const countrySlice = createSlice({
  name: REDUCER_DOMAIN,
  initialState: {
    countries: [],
    countryLoadingStatus: "idle",
    countryLoadingError: null,
  },
  reducers: {},
  extraReducers: {
    [getCountries.pending]: (state, action) => {
      state.countryLoadingStatus = "pending";
    },
    [getCountries.fulfilled]: (state, action) => {
      state.countries = action.payload;
      state.countryLoadingStatus = "success";
    },
    [getCountries.rejected]: (state, action) => {
      state.countryLoadingStatus = "failed";
    },
  },
});

export default countrySlice.reducer;
