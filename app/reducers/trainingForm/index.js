import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// import action type
export const TRAINING_FORM_UPDATE_FIELD = 'trainingForm/UPDATE_FIELD';
export const TRAINING_FORM_UPDATE_ENTITY = 'trainingForm/UPDATE_ENTITY';
export const TRAINING_FORM_REMOVE_ENTITY = 'trainingForm/REMOVE_ENTITY';
export const TRAINING_FORM_ADD_ENTITY = 'trainingForm/ADD_ENTITY';
export const TRAINING_FORM_VALIDATE_ENTITY = 'trainingForm/VALIDATE_ENTITY';

// initialState
const initialState = fromJS({
  userSay: '',
  intent: null,
  selectedText: '',
  start: 0,
  end: 0,
  entity: null,
  value: null,
  response: '',
  entities: [
    // {
    //   entity: '',
    //   value: '',
    //   start: null,
    //   end: null,
    //   response: '',
    // },
  ],
});

// action creator
export const updateField = (field, value) => ({
  type: TRAINING_FORM_UPDATE_FIELD,
  payload: {
    field,
    value,
  },
});


export const updateEntity = (index, entity) => ({
  type: TRAINING_FORM_UPDATE_ENTITY,
  payload: {
    index,
    entity,
  },
});

export const addEntity = entity => ({
  type: TRAINING_FORM_ADD_ENTITY,
  payload: {
    entity,
  },
});

export const validateResponse = () => ({
  type: TRAINING_FORM_VALIDATE_ENTITY,
});

export const actions = {
  updateField,
  updateEntity,
  addEntity,
  validateResponse,
};

// selector
const getFormData = state => state.trainingForm;
export const selectFormData = createSelector(
  getFormData,
  trainingForm => trainingForm.toJS(),
);
export const selectFieldValue = ({ trainingForm }, fieldName) => trainingForm.get(fieldName);

// reducer
function authReducer(state = initialState, action) {
  switch (action.type) {
    case TRAINING_FORM_UPDATE_FIELD: {
      const { field, value } = action.payload;
      return state.set(field, value);
    }
    case TRAINING_FORM_ADD_ENTITY: {
      const { entity } = action.payload;
      return state.set('entities', state.get('entities').push(entity));
    }
    case TRAINING_FORM_REMOVE_ENTITY: {
      const { index } = action.payload;
      return state.deleteIn(['entities', index]);
    }
    default:
      return state;
  }
}

export default authReducer;
