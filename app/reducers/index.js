/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import trainingForm from './trainingForm';
import entities from './entities';
import history from '../utils/history';

export const REHYDRATE_COMPLETE = 'root/REHYDRATE_COMPLETE';
export const CLEAR_TRANSACTION = 'root/CLEAR_TRANSACTION';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth,
    trainingForm,
    entities,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  return rootReducer;
}
