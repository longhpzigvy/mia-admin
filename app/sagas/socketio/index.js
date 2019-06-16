import {
  take, takeEvery, call, put, select,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import socketIOClient from 'socket.io-client';
import {
  getToken,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from '../../reducers/auth';

/* events */
const NEW_MESSAGE = 'NEW_MESSAGE';

let socketConnection;

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const handler = (data) => {
      if (data) {
        emit(data);
      }
    };
    socket.on(NEW_MESSAGE, handler);
    const unsubscribe = () => {
      socket.off(NEW_MESSAGE, handler);
    };
    return unsubscribe;
  });
}

function createSocketConnection(token) {
  const endpoint = process.env.SOCKETIO_ENDPOINT;
  const socket = socketIOClient(endpoint, { query: `token=${token}` });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function* connectFlow() {
  const token = yield select(getToken);
  socketConnection = yield call(createSocketConnection, token);
  const socketChannel = yield call(createSocketChannel, socketConnection);

  // watch message and relay the action
  while (true) {
    const payload = yield take(socketChannel);
    yield put(payload);
  }
}

function* disconnectFlow() {
  socketConnection.disconnect();
}

function* socketIOFlow() {
  yield takeEvery([AUTH_LOGIN_SUCCESS], connectFlow);
  yield takeEvery(AUTH_LOGOUT, disconnectFlow);
}

export default socketIOFlow;
