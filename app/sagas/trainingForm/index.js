import {
  all, call,
  select, put,
  takeLatest,
} from 'redux-saga/effects';
import { createNewSample } from '../../api/bot';
import {
  selectFormData,
  TRAINING_FORM_VALIDATE_ENTITY,
} from '../../reducers/trainingForm';

export function* validateResponse() {
  const formData = yield select(selectFormData);
  const {
    userSay, entities, intent,
    entity, start, end, value, response: userResponse,
  } = formData;
  const newEntity = {
    response: userResponse,
    entity,
    value,
    start,
    end,
  };
  const entityList = entities
    .concat(newEntity)
    .map(_entity => ({
      ..._entity,
      value: (_entity.value || {}).value || '',
      entity: (_entity.entity || {}).value || '',
    }));
  const { response, error } = yield call(createNewSample, userSay, intent.value, entityList);
  if (error) {
    console.log('[TRAINING FORM] Unable to submit new training data due to');
    console.log(error);
  }
  console.log(response.data);
}

export default function* entitiesSaga() {
  yield all([
    takeLatest(TRAINING_FORM_VALIDATE_ENTITY, validateResponse),
  ]);
}
