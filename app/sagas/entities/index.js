import {
  all, call,
  select, put,
} from 'redux-saga/effects';
import { getAllEntities } from '../../api/bot';
import {
  addNewEntity, getEntityNameList,
} from '../../reducers/entities';

export function* fetchEntitiesList() {
  const { response, error } = yield call(getAllEntities);
  const { data } = response;
  const { result = [], totalRecord = 0 } = data;
  const entityList = yield select(getEntityNameList);

  if (error) {
    console.log('[ENTITIES] Unable to download entities');
    console.log(error);
    return;
  }

  // if entityList is updated -> ignore
  // TODO, better algorithm to update entityList
  // because what if we remove an old entity and add new one?
  if (entityList.length === totalRecord) return;

  for (let i = 0; i < totalRecord; i += 1) {
    yield put(addNewEntity(result[i]));
  }
}

export default function* entitiesSaga() {
  yield all([
    fetchEntitiesList(),
  ]);
}
