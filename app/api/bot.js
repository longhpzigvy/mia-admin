/* eslint-disable camelcase */
import axios from 'axios';

export const createNewSample = (text, intent_name, entities) => axios
  .post('witai/samples', {
    text,
    intent_name,
    entities,
  })
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getAllSamples = () => axios
  .get('witai/samples')
  .then(response => ({ response }))
  .catch(error => ({ error }));

export const getAllEntities = () => axios
  .get('witai/entities')
  .then(response => ({ response }))
  .catch(error => ({ error }));
