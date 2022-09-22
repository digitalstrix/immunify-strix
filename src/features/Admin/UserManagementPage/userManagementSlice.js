import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {Alert} from '@material-ui/lab'
import axios from 'axios';
import { eventNameGenerator, excuteAfterGivenDelay } from "../../../utils/commonUtils";
import ImmunifyApi from "../../../api/immunifyApi";
// import { setLoading } from '../../../Common/commonSlice';

const REDUCER_DOMAIN = "userManagement";

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const getCountries = createAsyncThunk(
  	prefixEventName("getCountries"),
  	async () => {
    	const response = await ImmunifyApi.getCountries();
    	return response.json();
  	}
);

export const getUsersAddedByAdmin = createAsyncThunk(
    prefixEventName('getUsersAddedByAdmin'),
    async (payload) => {
		const response = await ImmunifyApi.getAdminAddedUsers(payload);
		return response.json();
    }
);

const userManagementSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
		loadingAddAdminStatus: 'idle',
		countries: [],
		countryLoadingStatus: "idle",
		countryLoadingError: null,
		users: [],
		usersLoadingStatus: "idle",
    	usersLoadingError: null,
		loadingUpdateAdminStatus: 'idle',
  	},
	reducers: {
		setAddAdminStatus: (state, action) => {
			state.loadingAddAdminStatus = action.payload;
		},
		setUpdateAdminStatus: (state, action) => {
			state.loadingUpdateAdminStatus = action.payload;
		},
	},
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

		[getUsersAddedByAdmin.pending]: (state, action) => {
			state.usersLoadingStatus = "pending";
		},
		[getUsersAddedByAdmin.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.usersLoadingStatus = "success";
		},
		[getUsersAddedByAdmin.rejected]: (state, action) => {
			state.usersLoadingStatus = "failed";
		},
	},
});

const {
	setAddAdminStatus,
	setUpdateAdminStatus,
} = userManagementSlice.actions;

export const addAdminUserAsync = (payload) => {
  	return async (dispatch) => {
    	try {
      		dispatch(setAddAdminStatus('loading'));
			const {createdBy} = payload;
      		const response = await ImmunifyApi.addAdmin(payload);
      		if (response && response.status === 201) {
        		dispatch(setAddAdminStatus('succeeded'));
				dispatch(getUsersAddedByAdmin({createdBy}));
      		} else {
       	 		dispatch(setAddAdminStatus('failed'));
      		}
    	} catch (err) {
      		dispatch(setAddAdminStatus('failed'));
    	} finally {
      		excuteAfterGivenDelay(() => {
				setTimeout(() => {
					dispatch(setAddAdminStatus('idle'));
				}, 5000);
        		
      		});
    	}
  	};
};

export const updateAdminUserAsync = (payload) => {
  	return async (dispatch) => {
    	try {
      		dispatch(setUpdateAdminStatus('loading'));
			const {createdBy} = payload;
      		const response = await ImmunifyApi.updateAdmin(payload);
      		if (response && response.status === 200) {
				
        		dispatch(setUpdateAdminStatus('succeeded'));
				dispatch(getUsersAddedByAdmin({createdBy}));
      		} else {
        		dispatch(setUpdateAdminStatus('failed'));
		    	alert('Update failed')
      		}
    	} catch (err) {
      		dispatch(setUpdateAdminStatus('failed'));
			alert('Update failed')
    	} finally {
      		excuteAfterGivenDelay(() => {
				setTimeout(() => {
					dispatch(setUpdateAdminStatus('idle'));
				}, 5000);
        		
      		});
    	}
  	};
};

export default userManagementSlice.reducer;