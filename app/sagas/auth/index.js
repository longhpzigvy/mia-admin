import {
  call, put, select,
  takeLatest,
} from 'redux-saga/effects';
import _get from 'lodash/get';
import { push } from 'connected-react-router';
import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';
import * as AuthApi from '../../api/auth';
import { configToken } from '../../api/config';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_CHANGE_PASSWORD,
  AUTH_CREATE_PASSWORD,
  AUTH_SEND_VERICATION_EMAIL,
  actions as authActions,
  getToken,
  getVerifyingEmail,
} from '../../reducers/auth';

// login handler
function* login({ payload }) {
  const { email: loginEmail, password } = payload;
  const { response, error } = yield call(AuthApi.login, loginEmail, password);

  // login error
  if (error) {
    yield put(authActions.setVerifyingEmail(null));
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.loginFail(message));
    return;
  }

  const { data = {} } = response;
  const {
    email,
    role,
    token,
    userId,
    verifiedAt,
  } = data;

  // unverified account
  // if (!verifiedAt) {
  //   yield put(authActions.loginFail('Please verify your account'));
  //   yield put(authActions.setVerifyingEmail(email));
  //   return;
  // }

  // dispatch authInfo
  yield put(
    authActions.loginSuccess({
      email,
      role,
      token,
      userId,
      verifiedAt,
    })
  );
}

// registration handler
function* register({ payload }) {
  const { email, password } = payload;
  const { error } = yield call(AuthApi.register, email, password);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.registerFail(message));
    return;
  }
  yield put(authActions.registerSucces());
  yield put(authActions.setVerifyingEmail(email));
  yield put(push('/greeting'));
}

// change password handler
function* changePassword({ payload }) {
  const { oldPassword, newPassword } = payload;
  const { error } = yield call(AuthApi.changePassword, oldPassword, newPassword);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.changePasswordFail(message));
    return;
  }

  yield put(authActions.changePasswordSuccess());
  yield put(authActions.logout());
}

// create new password handler
// this function will handle when user update his/her password
function* createPassword({ payload }) {
  const { newPassword } = payload;
  const { error } = yield call(AuthApi.createPassword, newPassword);

  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.createPasswordFail(message));
    return;
  }

  yield put(authActions.createPasswordSuccess());
  yield put(authActions.logout());
}

function* sendVericationEmail() {
  const verifyingEmail = yield select(getVerifyingEmail);
  const { error } = yield call(
    AuthApi.sendVericationEmail,
    verifyingEmail,
  );
  if (error) {
    const message = _get(error, 'response.data.message', DEFAULT_ERROR_MESSAGE); // this line of code needs to refactor
    yield put(authActions.sendVericationEmailFail(message));
    return;
  }

  yield put(authActions.sendVericationEmailSuccess());
}

export function* configAxiosForAuthenticate() {
  const token = yield select(getToken);

  configToken(token);
}

function* authFlow() {
  yield takeLatest(AUTH_LOGIN, login);
  yield takeLatest(
    [AUTH_LOGIN_SUCCESS, AUTH_LOGOUT],
    configAxiosForAuthenticate,
  );
  yield takeLatest(AUTH_REGISTER, register);
  yield takeLatest(AUTH_CHANGE_PASSWORD, changePassword);
  yield takeLatest(AUTH_CREATE_PASSWORD, createPassword);
  yield takeLatest(AUTH_SEND_VERICATION_EMAIL, sendVericationEmail);
}

export default authFlow;
