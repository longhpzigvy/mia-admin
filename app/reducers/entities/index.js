import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

// import action type
export const ENTITIES_ADD = 'entities/ADD';
export const ENTITIES_REMOVE = 'entities/REMOVE';
export const ENTITIES_UPDATE = 'entities/UPDATE';

// initialState
const initialState = fromJS({
  entityList: {},
  entityNameList: [],
});


// action creator
export const addNewEntity = ({
  name, values, doc,
  lookups, id, builtin, isNew = false,
}) => ({
  type: ENTITIES_ADD,
  payload: {
    id,
    doc,
    name,
    values,
    lookups,
    builtin,
    isNew,
    isUpdated: false,
  },
});

export const removeEntity = entityName => ({
  type: ENTITIES_REMOVE,
  payload: {
    entityName,
  },
});

export const updateEntity = ({
  name, values, doc,
  lookups, id, builtin,
  isNew = false,
  isUpdated = false,
}) => ({
  type: ENTITIES_UPDATE,
  payload: {
    id,
    doc,
    name,
    values,
    lookups,
    builtin,
    isNew,
    isUpdated,
  },
});

export const actions = {
  addNewEntity,
  removeEntity,
  updateEntity,
};

// selector
export const getEntities = state => state.entities;
export const getEntityByName = (
  { entities }, entityName,
) => entities.getIn(['entityList', entityName], null).toJS();
export const getEntityNameList = ({ entities }) => entities.get('entityNameList').toJS();
export const getEntityList = createSelector(
  getEntities,
  (entities) => {
    const entityNameList = entities.get('entityNameList').toJS();
    const entityList = entities.get('entityList').toJS();
    return entityNameList.map(name => entityList[name]);
  }
);
export const getIntent = createSelector(
  getEntityList,
  (entities) => {
    const intent = entities.find(entity => entity.name === 'intent') || {};
    return intent.values || [];
  },
);
export const getUserEntity = createSelector(
  getEntityList,
  entities => entities.filter(entity => !entity.builtin && entity.name !== 'intent'),
);

// reducer
function authReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_ADD: {
      const entity = action.payload;
      const newEntityNameList = state.get('entityNameList').push(entity.name);
      return state.set('entityNameList', newEntityNameList)
        .setIn(['entityList', entity.name], entity);
    }
    case ENTITIES_REMOVE: {
      const { entityName } = action.payload;
      const newEntityNameList = state.get('entityNameList').filter(name => name !== entityName);
      return state.deleteIn(['entityList', entityName])
        .set('entityNameList', newEntityNameList);
    }
    case ENTITIES_UPDATE: {
      const entity = action.payload;
      return state.setIn(['entityList', entity.name], entity);
    }
    default:
      return state;
  }
}

export default authReducer;
