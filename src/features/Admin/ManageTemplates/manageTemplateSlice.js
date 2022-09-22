import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventNameGenerator, extractDate, excuteAfterGivenDelay } from '../../../utils/commonUtils';
import { generateArtworkUploadPayload } from '../../../utils/manageTemplateUtils';
import ImmunifyApi from '../../../api/immunifyApi';
import { setLoading } from '../../Common/commonSlice';

const REDUCER_DOMAIN = 'manageTemplates';

const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

export const loadFormMetadata = createAsyncThunk(prefixEventName('loadFormMetadata'), async () => {
    const response = await Promise.all([
        ImmunifyApi.getVacStates(),
        ImmunifyApi.getVacCities(),
        ImmunifyApi.getVacNames(),
        ImmunifyApi.getVacTypes()
    ]);
    const mapped = response.map(resp => resp.json());
    return Promise.all(mapped);
});

export const getArtworks = createAsyncThunk(prefixEventName('getArtworks'), async (payload) => {
    const response = await ImmunifyApi.getArtworks(payload);
    return response.json();
});

const METADATA_VALUE_KEYS = [
    { responseKey: 'state', stateKey: 'vacStates' },
    { responseKey: 'city', stateKey: 'vacCities' },
    { responseKey: 'vacName', stateKey: 'vacNames' },
    { responseKey: 'vacType', stateKey: 'vacTypes' },
];

const manageTemplatesSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: {
        vacStates: [],
        vacCities: [],
        vacNames: [],
        vacTypes: [],
        addTemplateStatus: 'idle',
        updateTemplateStatus: 'idle',
        artworks: [],
        artworkDetails: {}
    },
    reducers: {
        setAddTemplateStatus: (state, action) => {
            state.addTemplateStatus = action.payload;
        },
        setUpdateTemplateStatus: (state, action) => {
            state.updateTemplateStatus = action.payload;
        },
        updateArtworkDetails: (state, action) => {
            const { id, data } = action.payload;
            state.artworkDetails[id] = data;
        }
    },
    extraReducers: {
        [loadFormMetadata.fulfilled]: (state, action) => {
            action.payload.forEach((data, index) => {
                const { responseKey, stateKey } = METADATA_VALUE_KEYS[index];
                state[stateKey] = data.filter(record => !!record[responseKey]);
            });
        },
        [getArtworks.fulfilled]: (state, action) => {
            state.artworks = action.payload;
        }
    }
});

export const {
    setAddTemplateStatus,
    updateArtworkDetails,
    setUpdateTemplateStatus
} = manageTemplatesSlice.actions;

export const uploadArtwork = (payload) => {
    return async (dispatch) => {
        try {
            // dispatch(setLoading(true));
            const response = await ImmunifyApi.uploadArtwork(payload);
            const body = await response.json();
        } catch (err) {
            console.log(err);
        } finally {
            // excuteAfterGivenDelay(() => dispatch(setLoading(true)));
        }
    };
}



export const addArtwork = (payload) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setAddTemplateStatus('loading'));
        const { processed, frontImage, backImage } = payload;
        let imagesToUpload = [
            { file: frontImage, uploadSide: 'FRONT', dataKey: 'frontImage' },
            { file: backImage, uploadSide: 'BACK', dataKey: 'backImage' }
        ];
        imagesToUpload = imagesToUpload.filter(({ file }) => file !== null);
        if (imagesToUpload.length > 0) {
            const artworkPromises = imagesToUpload
                .map(image => ImmunifyApi.uploadArtwork(generateArtworkUploadPayload(image)));
            try {
                const response = await Promise.all(artworkPromises);
                const data = await Promise.all(response.map(r => r.json()));
                data.forEach(({ imageUrl }, index) => {
                    const { dataKey } = imagesToUpload[index];
                    processed[dataKey] = imageUrl;
                });
            } catch (err) {
                dispatch(setAddTemplateStatus('failed'));
                excuteAfterGivenDelay(() => {
                    dispatch(setAddTemplateStatus('idle'));
                    dispatch(setLoading(false));
                }, 2);
                return;
            }
        }

        try {
            const response = await ImmunifyApi.addArtwork(processed);
            if (response && response.status === 200) {
                dispatch(setAddTemplateStatus('succeeded'));
            } else {
                dispatch(setAddTemplateStatus('failed'));
            }
        } catch (err) {
            dispatch(setAddTemplateStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setAddTemplateStatus('idle'));
                dispatch(setLoading(false));
            });
        }

    };
};

export const updateArtWork = (payload) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setUpdateTemplateStatus('loading'));
        const {
            processed, frontImage, backImage,
            data: { frontImage: existingFront, backImage: existingBack }
        } = payload;
        let imagesToUpload = [];
        if (frontImage) {
            imagesToUpload.push({ file: frontImage, uploadSide: 'FRONT', dataKey: 'frontImage', key: existingFront });
        }
        if (backImage) {
            imagesToUpload.push({ file: backImage, uploadSide: 'BACK', dataKey: 'backImage', key: existingBack });
        }
        if (imagesToUpload.length > 0) {
            imagesToUpload = imagesToUpload.filter(({ file }) => file !== null);
            if (imagesToUpload.length > 0) {
                const artworkPromises = imagesToUpload
                    .map(image => ImmunifyApi.uploadArtwork(generateArtworkUploadPayload(image)));
                try {
                    const response = await Promise.all(artworkPromises);
                    const data = await Promise.all(response.map(r => r.json()));
                    data.forEach(({ imageUrl }, index) => {
                        const { dataKey } = imagesToUpload[index];
                        processed[dataKey] = imageUrl;
                    });
                } catch (err) {
                    dispatch(setUpdateTemplateStatus('failed'));
                    excuteAfterGivenDelay(() => {
                        dispatch(setUpdateTemplateStatus('idle'));
                        dispatch(setLoading(false));
                    }, 2);
                    return;
                }
            }
        }

        try {
            processed.frontImage = existingFront;
            processed.backImage = existingBack;
            const response = await ImmunifyApi.updateArtwork(processed);
            if (response && response.status === 204) {
                dispatch(setUpdateTemplateStatus('succeeded'));
            }
        } catch (err) {
            dispatch(setUpdateTemplateStatus('failed'));
        } finally {
            excuteAfterGivenDelay(() => {
                dispatch(setUpdateTemplateStatus('idle'));
                dispatch(setLoading(false));
            });
        }
    };
}

export const getSignedUrls = (payload) => {
    return async (dispatch) => {
        try {
            const response = await ImmunifyApi.getSignedUrs(payload);
            if (response && response.status === 200) {
                const data = await response.json();
                dispatch(updateArtworkDetails({ id: payload.id, data }));
            }
        } catch (err) {

        }
    };
}

export default manageTemplatesSlice.reducer;
