import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator, extractDate, excuteAfterGivenDelay } from '../../../utils/commonUtils';
import ImmunifyApi from '../../../api/immunifyApi';
import { setLoading } from '../../Common/commonSlice';

const REDUCER_DOMAIN = 'manageCards';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

// export const getQrCodes = createAsyncThunk(prefixEventName('fetchQrCodes'), async (payload) => {
//     const response = await ImmunifyApi.getQrCodes(payload);
//     return response.json();
// });

export const getArtworks = createAsyncThunk(prefixEventName('getArtworks'), async (payload) => {
    const response = await ImmunifyApi.getArtworks(payload);
    return response.json();
});

export const manageCardsSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        qrCodeGenerationStatus: 'idle',
        qrCodeGenerationError: null,
        printCardStatus: 'idle',
        printCardError: null,
        codeDetails: {},
        pdfUrl: null,
        artworks: [],
        artworkDetails: {

        }
    },
    reducers: {
        setQrCodeGenerationStatus: (state, action) => {
            state.qrCodeGenerationStatus = action.payload;
        },
        setQrCodeGenerationError: (state, action) => {
            state.qrCodeGenerationError = action.payload;
        },
        updateCodeDetails: (state, action) => {
            const { id, data } = action.payload;
            state.codeDetails[id] = data;
        },
        setPdfUrl: (state, action) => {
            state.pdfUrl = action.payload;
        },
        setPrintCardStatus: (state, action) => {
            state.printCardStatus = action.payload;
        },
        setPrintCardError: (state, action) => {
            state.printCardError = action.payload;
        }
    },
    extraReducers: {
        [getArtworks.fulfilled]: (state, action) => {
            state.artworks = action.payload;
        }
    }
});

export const {
    setQrCodeGenerationStatus,
    setQrCodeGenerationError,
    updateCodeDetails,
    setPdfUrl,
    setPrintCardStatus,
    setPrintCardError
} = manageCardsSlice.actions;

export const getQrCodes = (payload) => {
    return async (dispatch) => {
        try {
            const response = await ImmunifyApi.getQrCodes(payload);
            const data = await response.json();
            dispatch(updateCodeDetails({ id: payload.vacId, data: data.filter(({ remainingCount }) => !!remainingCount) }));
        } catch (err) {
            // todo handle this
        } finally {

        }
    };
}

export const generateQrCodes = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setQrCodeGenerationStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.generateQrCodes(payload);
            if (response && response.status === 201) {
                dispatch(setQrCodeGenerationStatus('succeeded'));
                dispatch(getQrCodes({ vacId: payload.vacId }));
                // update store based on the results
            } else {
                dispatch(setQrCodeGenerationStatus('failed'));
            }
        } catch (err) {
            dispatch(setQrCodeGenerationStatus('failed'));
            dispatch(setQrCodeGenerationError(err));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setQrCodeGenerationStatus('idle'));
                dispatch(setQrCodeGenerationError(null));
                dispatch(setLoading(false));
            });
        }
    };
};

export const printCards = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setPrintCardStatus('loading'));
            dispatch(setLoading(true));
            const response = await ImmunifyApi.printCards(payload);
            if (response && response.status === 200) {
                const { urls } = await response.json();
                dispatch(setPdfUrl(urls));
                dispatch(setPrintCardStatus('succeeded'));
                dispatch(getQrCodes({ vacId: payload.vacId }));
            } else {
                dispatch(setPrintCardStatus('failed'));
            }
        } catch (err) {
            dispatch(setPrintCardStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setPrintCardStatus('idle'));
                dispatch(setLoading(false));
            })
        }

    };
};



export default manageCardsSlice.reducer;
