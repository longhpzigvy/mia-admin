/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';
import createFilter from 'redux-persist-transform-filter-immutable';
import createReducer, { REHYDRATE_COMPLETE } from '../reducers';
import rootSagas from '../sagas';
import migrations from './migration';

const sagaMiddleware = createSagaMiddleware();
const authenticationFilter = createFilter('auth');

const autoMerge = (inboundState, originalState, reducedState) => {
  const newState = reducedState;
  if (inboundState && typeof inboundState === 'object') {
    Object.keys(inboundState).forEach((key) => {
      // ignore _persist data
      if (key === '_persist') return;
      // merge inbound state into initial state
      newState[key] = originalState[key].merge(inboundState[key]);
    });
  }
  return newState;
};

const persistConfig = {
  transforms: [
    authenticationFilter,
    immutableTransform({
      whitelist: ['auth', 'entities'],
    }),
  ],
  stateReconciler: autoMerge,
  whitelist: ['auth', 'entities'],
  key: 'root',
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: true }),
  debug: true,
};

export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  /* eslint-enable */

  const store = createStore(
    persistReducer(persistConfig, createReducer({})),
    initialState,
    composeEnhancers(...enhancers),
  );

  const persistor = persistStore(store, null, () => store.dispatch({ type: REHYDRATE_COMPLETE }),);

  // start sagas
  sagaMiddleware.run(rootSagas);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept(['../reducers', '../sagas'], () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return { store, persistor };
}
