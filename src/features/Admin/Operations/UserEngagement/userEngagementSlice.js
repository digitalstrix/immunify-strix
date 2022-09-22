import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { eventNameGenerator, excuteAfterGivenDelay } from "../../../../utils/commonUtils";
import ImmunifyApi from "../../../../api/immunifyApi";
import EngagementApi from '../../../../api/engagementApi';
import { setLoading } from '../../../Common/commonSlice';

const BASE_URL = process.env.REACT_APP_USER_ENGUAGEMENT_API_URI;

const REDUCER_DOMAIN = "userEnguagement";

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

const EMAIL = 'EMAIL';
const PUSHNOTIFICATION = 'PUSHNOTIFICATION';

export const getSentEmails = createAsyncThunk(
    prefixEventName('getSentEmails'),
    async (payload) => {
			const response = await EngagementApi.getSentEmails(payload);
			return response.json();
    }
);

export const getSentNotifications = createAsyncThunk(
    prefixEventName('getSentNotifications'),
    async (payload) => {
			const response = await EngagementApi.getSentNotifications(payload);
			return response.json();
    }
);

export const getDraftEmails = createAsyncThunk(
    prefixEventName('getDraftEmails'),
    async (payload) => {
			const response = await EngagementApi.getDraftEmails(payload);
			return response.json();
    }
);

export const getDraftNotifications = createAsyncThunk(
    prefixEventName('getDraftNotifications'),
    async (payload) => {
			const response = await EngagementApi.getDraftNotifications(payload);
			return response.json();
    }
);

export const getCountries = createAsyncThunk(
  prefixEventName("getCountries"),
  async () => {
    const response = await ImmunifyApi.getCountries();
    return response.json();
  }
);

export const getSearchUsers = createAsyncThunk(
  prefixEventName('getSearchUsers'),
  async (payload) => {
    const response = await EngagementApi.getSearchUsers(payload);
    return response.json();
  }
)

const userEngagementSlice = createSlice({
	name: REDUCER_DOMAIN,
	initialState: {
		sentEmails: [],
		sentNotifications: [],
		draftEmails: [],
		draftNotifications: [],
		loadingStatus: 'idle',
		loadingSMStatus: 'idle',
		loadingDMStatus: 'idle',
		loadingSPStatus: 'idle',
		loadingDPStatus: 'idle',
		loadingError: null,
		getSentEmailsStatus: 'idle',
		getSentNotificationsStatus: 'idle',
		getDraftEmailsStatus: 'idle',
		getDraftNotificationsStatus: 'idle',
		getSentTestEmailsNotificationsStatus: 'idle', //
    getSentAllEmailsNotificationsStatus: 'idle', //
		getSentAllCountryEmailsNotificationsStatus: 'idle', //
		getSendForAllCountryEmailsNotificationsStatus: 'idle', //
		getDraftMessagesEmailsNotificationsStatus: 'idle', //
		getUpdateDraftEmailsNotificationsStatus: 'idle', //
    getDeletMessageStatus: 'idle', //
    getUploadImageStatus: 'idle', //
    seachUserLoadingStatus: 'idle', //
    getSingleMessageStatus: 'idle', //
		getDraftTestEmailsStatus: 'idle',
		getDraftTestNotificationsStatus: 'idle',
		countries: [],
    countryLoadingStatus: "idle",
    countryLoadingError: null,
    imageUrl: null,
    searchedUser: null,
	},
	reducers: {
		setSendForTestingStatus: (state, action) => {
			state.getSentTestEmailsNotificationsStatus = action.payload;
      state.imageUrl = null;
		},

    setSendForAllStatus: (state, action) => {
			state.getSentAllEmailsNotificationsStatus = action.payload;
      state.imageUrl = null;
		},

		setSendForAllCountryStatus: (state, action) => {
			state.getSentAllCountryEmailsNotificationsStatus = action.payload;
      state.imageUrl = null;
		},

		setSendToParentStatus: (state, action) => {
			state.getSendForAllCountryEmailsNotificationsStatus = action.payload;
      state.imageUrl = null;
		},

		setDraftMessagesStatus: (state, action) => {
			state.getDraftMessagesEmailsNotificationsStatus = action.payload;
      state.imageUrl = null;
		},

		setUpdateDraftStatus: (state, action) => {
			state.getUpdateDraftEmailsNotificationsStatus = action.payload;
      state.imageUrl = null;
		},

    setDeletMessageStatus: (state, action) => {
      state.getDeletMessageStatus = action.payload;
    },

    setUploadImageStatus: (state, action) => {
      // state.imageUrl = action.payload;
      state.getUploadImageStatus = action.payload;
    },

    setImage: (state, action) => {
      state.imageUrl = action.payload;
    },

    setSingleMessageStatus: (state, action) => {
      state.getSingleMessageStatus = action.payload;
      state.imageUrl = null;
    },
		
		// setGetSentNotificationsStatus: (state, action) => {
		// 	state.getSentNotificationsStatus = action.payload;
		// },
		// setGetDraftEmailsStatus: (state, action) => {
		// 	state.getSentEmailsStatus = action.payload;
		// },
		// setGetDraftNotificationsStatus: (state, action) => {
		// 	state.getSentNotificationsStatus = action.payload;
		// },
	},
	extraReducers: {
		[getSentEmails.pending]: (state, action) => {
			state.loadingSMStatus = 'loading';
		},
		[getSentEmails.fulfilled]: (state, action) => {
			state.sentEmails = action.payload;
			state.loadingSMStatus = 'succeeded';
		},
		[getSentEmails.rejected]: (state, action) => {
			state.loadingSMStatus = 'failed';
		},

		[getSentNotifications.pending]: (state, action) => {
			state.loadingSPStatus = 'loading';
		},
		[getSentNotifications.fulfilled]: (state, action) => {
			state.sentNotifications = action.payload;
			state.loadingSPStatus = 'succeeded';
		},
		[getSentNotifications.rejected]: (state, action) => {
			state.loadingSPStatus = 'failed';
		},

		[getDraftEmails.pending]: (state, action) => {
			state.loadingDMStatus = 'loading';
		},
		[getDraftEmails.fulfilled]: (state, action) => {
			state.draftEmails = action.payload;
			state.loadingDMStatus = 'succeeded';
		},
		[getDraftEmails.rejected]: (state, action) => {
			state.loadingDMStatus = 'failed';
		},

		[getDraftNotifications.pending]: (state, action) => {
			state.loadingDPStatus = 'loading';
		},
		[getDraftNotifications.fulfilled]: (state, action) => {
			state.draftNotifications = action.payload;
			state.loadingDPStatus = 'succeeded';
		},
		[getDraftNotifications.rejected]: (state, action) => {
			state.loadingDPStatus = 'failed';
		},

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

    [getSearchUsers.pending]: (state, action) => {
			state.seachUserLoadingStatus = "pending";
		},
		[getSearchUsers.fulfilled]: (state, action) => {
			state.searchedUser = action.payload;
			state.seachUserLoadingStatus = "success";
		},
		[getSearchUsers.rejected]: (state, action) => {
		  state.seachUserLoadingStatus = "failed";
		},
	},
});

const {
  setSendForTestingStatus,
  setSendForAllStatus,
  setSendForAllCountryStatus,
	setSendToParentStatus,
	setDraftMessagesStatus,
	setUpdateDraftStatus,
  setDeletMessageStatus,
  setUploadImageStatus,
  setImage,
  setSingleMessageStatus,
	// setGetSentNotificationsStatus,
	// setGetDraftEmailsStatus,
	// setGetDraftNotificationsStatus,
} = userEngagementSlice.actions;

export const sendForTestingAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSendForTestingStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.sendForTesting(payload);
      if (response && response.status === 200) {
        dispatch(setSendForTestingStatus('succeeded'));
		    alert('test send successfull');
        // dispatch(getSentEmails());
      } else {
        dispatch(setSendForTestingStatus('failed'));
		    alert('test send failed')
      }
    } catch (err) {
      dispatch(setSendForTestingStatus('failed'));
			alert('test send failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setSendForTestingStatus('idle'));
      });
    }
  };
};

export const sendForAllAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSendForAllStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.sendToAll(payload);
      if (response && response.status === 200) {
        dispatch(setSendForAllStatus('succeeded'));
		    alert('send successfull');
        if (payload.messageId) {
          dispatch(deletMessageAsync2({ messageId: payload.messageId }))
        }
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else if (response && response.status === 404) {
        dispatch(setSendToParentStatus('failed'));
		    alert('send failed! not found data')
      } else {
        dispatch(setSendForAllStatus('failed'));
		    alert('send failed')
      }
    } catch (err) {
      dispatch(setSendForAllStatus('failed'));
	    alert('send failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setSendForAllStatus('idle'));
      });
    }
  };
};

export const sendToAllCountryAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSendForAllCountryStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.sendToAllCountry(payload);
      if (response && response.status === 200) {
        dispatch(setSendForAllCountryStatus('succeeded'));
		    alert('send successfull');
        if (payload.messageId) {
          dispatch(deletMessageAsync2({ messageId: payload.messageId }))
        }
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else if (response && response.status === 404) {
        dispatch(setSendToParentStatus('failed'));
		    alert('send failed! not found data')
      } else {
        dispatch(setSendForAllCountryStatus('failed'));
		    alert('send failed')
      }
    } catch (err) {
      dispatch(setSendForAllCountryStatus('failed'));
	    alert('send failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setSendForAllCountryStatus('idle'));
      });
    }
  };
};

export const sendToParentAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSendToParentStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.sendToParent(payload);
      if (response && response.status === 200) {
        dispatch(setSendToParentStatus('succeeded'));
		    alert('send successfull');
        if (payload.messageId) {
          dispatch(deletMessageAsync2({ messageId: payload.messageId }))
        }
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else if (response && response.status === 404) {
        dispatch(setSendToParentStatus('failed'));
		    alert('send failed! not found data')
      } else {
        dispatch(setSendToParentStatus('failed'));
		    alert('send failed')
      }
    } catch (err) {
      dispatch(setSendToParentStatus('failed'));
	    alert('send failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setSendToParentStatus('idle'));
      });
    }
  };
};

export const draftMessagesAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDraftMessagesStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.draftMessages(payload);
      if (response && response.status === 201) {
        dispatch(setDraftMessagesStatus('succeeded'));
		    alert('draft successfull!');
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else {
        dispatch(setDraftMessagesStatus('failed'));
		    alert('draft failed')
      }
    } catch (err) {
      dispatch(setDraftMessagesStatus('failed'));
	    alert('draft failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setDraftMessagesStatus('idle'));
      });
    }
  };
};

export const updateDraftAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdateDraftStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.updateDraft(payload);
      if (response && (response.status === 200 || response.status === 204)) {
        dispatch(setUpdateDraftStatus('succeeded'));
		    alert('update successfull');
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else {
        dispatch(setUpdateDraftStatus('failed'));
		    alert('update failed')
      }
    } catch (err) {
      dispatch(setUpdateDraftStatus('failed'));
	    alert('update failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setUpdateDraftStatus('idle'));
      });
    }
  };
};

export const deletMessageAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeletMessageStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.deletMessage(payload);
      if (response && response.status === 200) {
        dispatch(setDeletMessageStatus('succeeded'));
		    alert('delete successfull');
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else {
        dispatch(setDeletMessageStatus('failed'));
		    alert('delete failed')
      }
    } catch (err) {
      dispatch(setDeletMessageStatus('failed'));
	    alert('delete failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setDeletMessageStatus('idle'));
      });
    }
  };
};

export const deletMessageAsync2 = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setDeletMessageStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.deletMessage(payload);
      if (response && response.status === 200) {
        dispatch(setDeletMessageStatus('succeeded'));
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else {
        dispatch(setDeletMessageStatus('failed'));
      }
    } catch (err) {
      dispatch(setDeletMessageStatus('failed'));
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setDeletMessageStatus('idle'));
      });
    }
  };
};

// uploadImageAsync

export const uploadImageAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUploadImageStatus('loading'));
      dispatch(setLoading(true));
      axios.post( `${BASE_URL}/enguagement/upload-get-url`, payload, {
        headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
        }
      })
        .then( ( response ) => {if ( 200 === response.status ) {
          if( response.data.error ) {
          if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
            dispatch(setUploadImageStatus('failed'));
            alert( 'Max size: 2MB' );
          } else {
            alert( response.data.error );
            dispatch(setUploadImageStatus('failed'));
          }
          } else {
          let fileName = response.data;
          dispatch(setImage(fileName.location))
          console.log( 'fileName', fileName );
            alert( 'File Uploaded', '#3089cf' );
          }
          dispatch(setUploadImageStatus('success'));
        }
        }).catch( ( error ) => {
        alert( error );
        dispatch(setUploadImageStatus('failed'));
      });
    } catch (err) {
      dispatch(setUploadImageStatus('failed'));
	    alert('failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setUploadImageStatus('idle'));
      });
    }
  };
};

export const singleMessageAsync = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setSingleMessageStatus('loading'));
      dispatch(setLoading(true));
      const response = await EngagementApi.singleMessage(payload);
      if (response && response.status === 200) {
        dispatch(setSingleMessageStatus('succeeded'));
		    alert('send successfull');
        dispatch(getSentEmails({ messageType: EMAIL, mode: 'SENT' }));
        dispatch(getSentNotifications({ messageType: PUSHNOTIFICATION, mode: 'SENT'  }));
        dispatch(getDraftEmails({ messageType: EMAIL, mode: 'DRAFT'  }));
        dispatch(getDraftNotifications({ messageType: PUSHNOTIFICATION, mode: 'DRAFT'  }));
      } else {
        dispatch(setSingleMessageStatus('failed'));
		    alert('send failed')
      }
    } catch (err) {
      dispatch(setSingleMessageStatus('failed'));
	    alert('send failed')
    } finally {
      excuteAfterGivenDelay(() => {
        dispatch(setLoading(false));
        dispatch(setSingleMessageStatus('idle'));
      });
    }
  };
};

export default userEngagementSlice.reducer;