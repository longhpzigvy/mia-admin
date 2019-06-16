import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError, { ERROR_MESSAGE } from './APIError';

const { INTERNAL_SERVER_ERROR } = ERROR_MESSAGE;
const SALT_ROUND = 10;

const handleError = (error) => {
  console.error('ERROR - server/utils/bcrypt.js', error);
  throw new APIError(INTERNAL_SERVER_ERROR, httpStatus.INTERNAL_SERVER_ERROR);
};

export const hashFunc = plaintextPassword => bcrypt
  .hash(plaintextPassword, SALT_ROUND)
  .then(hash => hash)
  .catch(error => handleError(error));

export const compareFunc = (plaintextPassword, hash) => bcrypt
  .compare(plaintextPassword, hash)
  .then(res => res)
  .catch(error => handleError(error));
