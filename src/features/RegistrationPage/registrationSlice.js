import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  concatNames,
  formatDate,
  extractDate,
  calculateAge,
  excuteAfterGivenDelay
} from '../../utils/commonUtils';
import ImmunifyApi from '../../api/immunifyApi';
import { parents } from './temp-data';
import {
  PARENT_FORM_TEXT_INPUTS,
  CHILD_FORM_TEXT_INPUTS,
  CHILD_FORM_INPUTS,
  RELATIONSHIPS,
  GENDERS,
  ERROR_MESSAGES
} from '../../constants/registrationConstants';
import { createUpdatedChildPayload } from '../../utils/registrationUtils';
import { setLoading } from '../Common/commonSlice';

const REDUCER_DOMAIN = 'registration';

// const prefixEventName = eventNameGenerator(REDUCER_DOMAIN);

// export const getCountries = createAsyncThunk(prefixEventName('getCountries'), async () => {
//   const response = await ImmunifyApi.getCountries();
//   console.log(response);
//   return response.json();
// });

// export const addParent = createAsyncThunk(prefixEventName('addParent'), async (data) => {
//   console.log(data);
//   const response = await ImmunifyApi.addParent(data);
//   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%')
//   console.log(response);

// });

const generateInitalParentFormState = () => ({
  relativeId: '',
  inputs: {
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    contact: '',
    country: {},
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    gender: ''
  },
  errors: {
    firstName: null,
    lastName: null,
    idNumber: null,
    email: null,
    contact: null,
    address1: null,
    city: null,
    postalCode: null,
    gender: null
  },
  checks: {
    checkedNoEmail: false,
    checkedNoESmartPhone: false,
  }
});

const generateInitialChildFormState = () => ({
  inputs: {
    relationship: '',
    gender: '',
    firstName: '',
    middleName: '',
    lastName: '',
    hospital: '',
    dateOfBirth: formatDate(),
    country: '',
    city: ''
  },
  errors: {
    relationship: null,
    gender: null,
    firstName: null,
    middleName: null,
    lastName: null,
    hospital: null,
    dateOfBirth: null,
    country: null,
    city: null
  },

});

const getInitialState = () => ({
  parents: [],
  children: {},
  childForm: generateInitialChildFormState(),
  parentForm: generateInitalParentFormState(),
  displayParentRegDialog: false,
  displayParentEditDialog: false,
  displayChildRegDialog: false,
  createParentError: null,
  createParentStatus: 'idle',
  updateParentError: null,
  updateParentStatus: 'idle',
  addChildStatus: 'idle',
  addChildError: null,
  childrenFetchingStatus: 'idle',
  childrenFetchingError: null,
  childFetchingStatus: 'idle',
  childFetchingError: null,
  childUpdatingStatus: 'idle',
  childUpdatingError: null,
  displayChildDetailDialog: false,
  parentSearchStatus: 'idle',
  parentSearchError: null,
  childDetailDialogType: '',
  selectedChild: null,
  activateCardStatus: 'idle',
  activateCardError: null,
  scannedCard: null,
});

export const registrationSlice = createSlice({
    name: REDUCER_DOMAIN,
    initialState: getInitialState(),
    reducers: {
      addParent: (state, action) => {
        state.parents = [...state.parents, action.payload];
      },
      updateChildren: (state, action) => {
        const childrenMap = state.children;
        if (action.payload instanceof Array) {
          let children = action.payload;
          children = children.map(child => ({
            ...child,
            age: calculateAge(child.BirthInformation.dateOfBirth),
            dateOfBirth: extractDate(child.BirthInformation.dateOfBirth),
            createdAt: extractDate(child.createdAt)
          }));
          if (children.length > 0) {
            const [{ parentId }] = children;
            childrenMap[parentId] = children;
          }
        } else {
          const child = action.payload;
          child.age = calculateAge(child.BirthInformation.dateOfBirth);
          child.dateOfBirth = extractDate(child.BirthInformation.dateOfBirth);
          child.createdAt = extractDate(child.createdAt);
          const { id: childId, parentId } = child;          
          const existingChildren = childrenMap[parentId];
          if (existingChildren) {
            const index = existingChildren.findIndex(({ id }) => id === childId);
            if (index !== -1) {
              existingChildren[index] = child;
            } else {
              existingChildren.push(child);
            }
          } else {
            childrenMap[parentId] = [child];
          }
        }        
      },
      updateGivenParent: (state, action) => {
        const updatedParent = action.payload;

        const index = state.parents.findIndex(({ id }) => id === updatedParent.id);
        console.log('index: ' + index);
        if (index !== -1) {
          state.parents[index] = updatedParent;
        }
      },
      updateInputs: (state, action) => {
        state.parentForm.inputs = action.payload;
      },
      updateParentCityInput: (state, action) => {
        state.parentForm.inputs.city = action.payload
      },
      updateParentStateInput: (state, action) => {
        state.parentForm.inputs.state = action.payload
      },
      updateParentAddress2Input: (state, action) => {
        state.parentForm.inputs.address2 = action.payload
      },
      updateErrors: (state, action) => {
        state.parentForm.errors = action.payload;
      },
      updateChecks: (state, action) => {
        state.parentForm.checks = action.payload;
      },
      updateChildFromInputs: (state, action) => {
        state.childForm.inputs = action.payload;
      },
      updateChildFromErrors: (state, action) => {
        state.childForm.errors = action.payload;
      },
      updateChildFormRelativeId: (state, action) => {
        state.childForm.relativeId = action.payload;
      },
      setDisplayParentRegDialog: (state, action) => {
        state.displayParentRegDialog = action.payload;
      },
      setCreateParentError: (state, action) => {
        state.createParentError = action.payload;
      },
      setCreateParentStatus: (state, action) => {
        state.createParentStatus = action.payload;
      },
      setUpdateParentError: (state, action) => {
        state.updateParentError = action.payload;
      },
      setUpdateParentStatus: (state, action) => {
        state.updateParentStatus = action.payload;
      },
      setAddChildStatus: (state, action) => {
        state.addChildStatus = action.payload;
      },
      setAddChildError: (state, action) => {
        state.addChildError = action.payload;
      },
      setChildUpdatingStatus: (state, action) => {
        state.childUpdatingStatus = action.payload;
      },
      setChildUpdatingError: (state, action) => {
        state.childUpdatingError = action.payload;
      },
      setDisplayParentEditDialog: (state, action) => {
        state.displayParentEditDialog = action.payload;
      },
      setDisplayChildRegDialog: (state, action) => {
        state.displayChildRegDialog = action.payload;
      },
      initParentFormForUpdate: (state, action) => {
        const parentForm = generateInitalParentFormState();
        const { data: { country, isAnalogUser, managedByThirdParty, id, gender }, countries } = action.payload;
        const inputs = PARENT_FORM_TEXT_INPUTS.map(input => ({
          [input]: action.payload.data[input],
        })).reduce((acc, val) => ({ ...acc, ...val }), {});
        parentForm.inputs = inputs;
        parentForm.inputs.country = countries.find(({ id }) => id === country);
        parentForm.checks.checkedNoEmail = !managedByThirdParty && isAnalogUser;
        parentForm.checks.checkedNoESmartPhone = managedByThirdParty;
        parentForm.inputs.id = id;
        parentForm.inputs.gender = gender;
        state.parentForm = parentForm;
      },
      initChildFormForUpdate: (state, action) => {
        const childForm = generateInitialChildFormState();        
        const inputs = CHILD_FORM_TEXT_INPUTS.map(input => ({
          [input]: action.payload.child[input],
        })).reduce((acc, val) => ({ ...acc, ...val }), {});

        const {
          id,
          parentId,
          BirthInformation: { hospital, city, country, dateOfBirth },
          Relationships: [{ relationship }],
          gender
        } = action.payload.child;
        inputs.id = id;
        inputs[CHILD_FORM_INPUTS.HOSPITAL.NAME] = hospital;
        inputs[CHILD_FORM_INPUTS.CITY.NAME] = city;
        inputs[CHILD_FORM_INPUTS.RELATIONSHIP.NAME] = RELATIONSHIPS.find(({ value }) => value === relationship);
        inputs[CHILD_FORM_INPUTS.GENDER.NAME] = GENDERS.find(({ value }) => value === gender);
        inputs[CHILD_FORM_INPUTS.COUNTRY.NAME] = action.payload.countries.find(({ id }) => id === country);

        const dateMatchings = dateOfBirth.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/);
        if (dateMatchings) {
          inputs[CHILD_FORM_INPUTS.DATE_OF_BIRTH.NAME] = dateMatchings[0];
        }

        childForm.inputs = inputs;
        childForm.relativeId = parentId;
        state.childForm = childForm;
        console.log('((((((((((((((((((((((((((9')

      },
      setChildrenFetchingStatus: (state, action) => {
        state.childrenFetchingStatus = action.payload;
      },
      setChildrenFetchingError: (state, action) => {
        state.childrenFetchingError = action.payload;
      },
      setChildFetchingStatus: (state, action) => {
        state.childFetchingStatus = action.payload;
      },
      setChildFetchingError: (state, action) => {
        state.childFetchingError = action.payload;
      },
      setDisplayChildDetailDialog: (state, action) => {
        const [isOpen, type] = action.payload;
        state.displayChildDetailDialog = isOpen;
        state.childDetailDialogType = isOpen ? type : '';
      },
      initForm: (state, action) => {
        if (action.payload === 'child') {
          state.childForm = generateInitialChildFormState();
        } else {
          state.parentForm = generateInitalParentFormState();
        }
      },
      setParentSearchStatus: (state, action) => {
        state.parentSearchStatus = action.payload;
      },
      setParentSearchError: (state, action) => {
        state.parentSearchError = action.payload;
      },
      updateParents: (state, action) => {
        state.parents = action.payload;
      },
      setSelectedChild: (state, action) => {
        state.selectedChild = action.payload;
      },
      setActivateCardStatus: (state, action) => {
        state.activateCardStatus = action.payload;
      },
      setActivateCardError: (state, action) => {
        state.activateCardError = action.payload;
      },
      setScannedCard: (state, action) => {
        state.scannedCard = action.payload;
      },
      initRegistration: (state, action) => {
        Object.entries(getInitialState()).forEach(([key, value])=>{
            state[key] = value;
        });
      }
    },
    // extraReducers: {
    //   [getCountries.pending]: (state, action) => {
    //     state.countryLoadingStatus = 'pending';
    //   },
    //   [getCountries.fulfilled]: (state, action) => {
    //     state.countries = action.payload;
    //     state.countryLoadingStatus = 'success';
    //   },
    //   [getCountries.rejected]: (state, action) => {
    //     state.countryLoadingStatus = 'failed';
    //   }

    // }
});

export const {
  updateInputs, updateErrors, updateChecks,
  addParent, setDisplayParentRegDialog,
  setCreateParentError, setCreateParentStatus,
  setUpdateParentError, setUpdateParentStatus,
  setDisplayParentEditDialog,
  setDisplayChildRegDialog,
  initParentFormForUpdate,
  updateGivenParent,
  updateChildFromInputs, updateChildFromErrors, updateChildFormRelativeId,
  updateChildren, setAddChildError, setAddChildStatus,
  setChildrenFetchingStatus, setChildrenFetchingError,
  setDisplayChildDetailDialog, initChildFormForUpdate,
  setChildFetchingStatus, setChildFetchingError,
  setChildUpdatingStatus, setChildUpdatingError,
  initForm, 
  setParentSearchError, setParentSearchStatus, updateParents,
  setSelectedChild,
  setActivateCardError, setActivateCardStatus,
  setScannedCard,
  initRegistration,
  updateParentCityInput,
  updateParentStateInput,
  updateParentAddress2Input,
} = registrationSlice.actions;

export const createParent = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setCreateParentStatus('loading'));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.addParent(payload);

      if (response.status === 201) {
        const parent = await response.json();
        dispatch(addParent({ ...parent, name: concatNames(parent)}));
        dispatch(setCreateParentStatus('succeeded'));
        dispatch(initForm());
      } else {
        //todo handle errors
        if (response.status === 409 || response.status === 400) {
          const { fields, messages } = await response.json();
          if (fields) {
            const errors = { ...getState().registration.parentForm.errors };
            fields.forEach((field, index) => errors[field] = messages[index]);
            dispatch(updateErrors(errors));
          }          
        }
        dispatch(setCreateParentStatus('failed'));
      }
    } catch(err) {
      dispatch(setCreateParentStatus('failed'));
      dispatch(setCreateParentError(err));
      console.error(err);
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setCreateParentStatus('idle')));
    }
  };
};

export const addChild = (payload) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setAddChildStatus('loading'));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.addChild(payload);
      if (response.status === 201) {
        const child = await response.json();
        dispatch(setAddChildStatus('succeeded'));
        dispatch(updateChildren(child));
        const childrenResponse = await ImmunifyApi.getChildrenByParent({ parentId: child.parentId });
        if (childrenResponse.status === 200) {
          const children = await childrenResponse.json();
          dispatch(updateChildren(children));
          dispatch(initForm('child'));
        } else {
          //todo need to handle error
        }       
      } else {

      }
    } catch(err) {
      dispatch(setAddChildStatus('error'));
      dispatch(setAddChildError(err));
      console.error(err);
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setAddChildStatus('idle')));     
    }
  };
}

export const updateChild = (payload) => {
  return async (dispatch, getState) => {
    dispatch(setChildUpdatingStatus('loading'));
    dispatch(setLoading(true));
    dispatch(setChildUpdatingError(null));
    try {
      const response = await ImmunifyApi.updateChild(payload);
      if (response.status === 200) {
        const { bio: { id: childId, parentId }} = payload;
        const children = getState().registration.children;
        const child = children[parentId].find(({ id }) => id === childId);
        dispatch(updateChildren(createUpdatedChildPayload(child, payload)));
        dispatch(setChildUpdatingStatus('succeeded'));
        dispatch(initForm('child'));
      }
    } catch(err) {
      dispatch(setChildUpdatingStatus('failed'));
      dispatch(setChildUpdatingError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setChildUpdatingStatus('idle')));      
    }
  };
};

export const fetchChildren = (payload) => {
  return async (dispatch, getState) => {
    const existingChildren = getState().registration.children[payload.parentId];
    if (!existingChildren || existingChildren.length === 0) {
      try {
        dispatch(setChildrenFetchingStatus('loading'));
        dispatch(setLoading(true));
        const response = await ImmunifyApi.getChildrenByParent(payload);
        if (response.status === 200) {
          let children = await response.json();          
          dispatch(updateChildren(children));
          dispatch(setChildrenFetchingStatus('succeeded'));
        } else {
  
        }
      } catch(err) {
        dispatch(setChildrenFetchingError('error'));
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    }    
  };
}

export const initChildEditDialog = (payload) => {
  return async (dispatch, getState) => {
    const { id: childId } = payload;
    const { childForm: { relativeId }, children } = getState().registration;
    const childrenOfParent = children[relativeId];    
    let fetchChildData = true;

    if (childrenOfParent && childrenOfParent instanceof Array) {
      const child = childrenOfParent.find(({ id }) => id === childId);
      if (child && child.Person) {
        fetchChildData = false;
        dispatch(initChildFormForUpdate({ child, countries: getState().country.countries }));
      }
    }

    if (fetchChildData) {      
      try {       
        dispatch(setChildFetchingStatus('loading'));
        dispatch(setLoading(true));
        dispatch(setChildFetchingError(null));
        const response = await ImmunifyApi.getChild({ childId });        
        if (response.status === 200) {
          const child = await response.json();
          dispatch(updateChildren(child));
          dispatch(initChildFormForUpdate({ child, countries: getState().country.countries }));
          dispatch(setChildFetchingStatus('succeeded'));  
        } else {
  
        }
      } catch (err) {
        dispatch(setChildFetchingStatus('error'));
        dispatch(setChildFetchingError(err));
      } finally {
        dispatch(setLoading(false));
      }
    }    
  };
}

export const updateParent = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setUpdateParentStatus('loading'));
      dispatch(setLoading(true));
      dispatch(setUpdateParentError(null));
      const response = await ImmunifyApi.updateParent(payload);
      if (response.status === 200) {
        const [ parent ] = await response.json();

        dispatch(updateGivenParent({ ...parent, name: concatNames(parent)}));
        dispatch(setUpdateParentStatus('succeeded'));
        dispatch(initForm());
      } else {
        dispatch(setUpdateParentStatus('failed'));
      }

    } catch(err) {
      console.error(err);
      dispatch(setUpdateParentStatus('failed'));
      dispatch(setUpdateParentError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setUpdateParentStatus('idle')));
    }
  };
}

export const searchParent = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setParentSearchStatus('loading'));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.searchParent(payload);
      if (response.status === 200) {
        let parents = await response.json();
        parents = parents.map(parent => ({ ...parent, name: concatNames(parent) }));
        dispatch(updateParents(parents));
        dispatch(setParentSearchStatus('succeeded'));
      }
    } catch(err) {
      dispatch(setParentSearchStatus('failed'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const activateCard = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setActivateCardError(null));
      dispatch(setActivateCardStatus('loading'));
      dispatch(setLoading(true));
      const response = await ImmunifyApi.activateCard(payload);
      if (response.status === 201) {
        dispatch(setActivateCardStatus('succeeded'));
      } else {
        const error = await response.json();
        dispatch(setActivateCardError(error));
        dispatch(setActivateCardStatus('failed'));
      }
    } catch(err) {
      dispatch(setActivateCardStatus('failed'));
      dispatch(setActivateCardError(err));
    } finally {
      dispatch(setLoading(false));
      excuteAfterGivenDelay(() => dispatch(setActivateCardStatus('idle')));
    }
  };
};



export default registrationSlice.reducer;
