import { all, take, put } from 'redux-saga/effects';
import { configAxios } from '../api/config';
import { REHYDRATE_COMPLETE, CLEAR_TRANSACTION } from '../reducers';
import authSaga from './auth';
import socketioSaga from './socketio';
import entitiesSaga from './entities';
import trainingFormSaga from './trainingForm';

export default function* rootSagas() {
  configAxios();
  yield take(REHYDRATE_COMPLETE);
  yield put({
    type: CLEAR_TRANSACTION,
  });
  yield all([
    authSaga(),
    socketioSaga(),
    entitiesSaga(),
    trainingFormSaga(),
  ]);
}
