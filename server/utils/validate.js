import httpStatus from 'http-status';
import APIError, { ERROR_MESSAGE } from './APIError';
import { VALIDATION_TYPE } from '../../common/enums';
import { VALIDATION } from '../../common/validationEnums';

const { email, password, string } = VALIDATION;
const { VALIDATION_MATCH_FAIL } = ERROR_MESSAGE;

const check = async (value, type) => {
  let valid = true;
  switch (type) {
    case VALIDATION_TYPE.EMAIL:
      valid = await email.isValid(value);
      break;
    case VALIDATION_TYPE.PASSWORD:
      valid = await password.isValid(value);
      break;
    case VALIDATION_TYPE.STRING:
      valid = await string.isValid(value);
      break;
    default:
      valid = false;
  }

  if (!valid) {
    const errorMessage = `${type}: ${VALIDATION_MATCH_FAIL}`;
    throw new APIError(errorMessage, httpStatus.BAD_REQUEST);
  }
};

export default check;
