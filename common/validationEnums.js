import * as Yup from 'yup';
import { VALIDATION_ERROR_MESSAGE } from './enums';

const {
  REQUIRED,
  INVALID,
  TOO_SHORT,
  TOO_LONG,
  PASSWORD_INVALID,
  CONFIRM_PASSWORD,
} = VALIDATION_ERROR_MESSAGE;
const email = Yup.string()
  .required(REQUIRED)
  .email(INVALID);

// Password (UpperCase, LowerCase and Number)) with length between 6 and 50 characters
const password = Yup.string()
  .required(REQUIRED)
  .min(6, TOO_SHORT)
  .max(50, TOO_LONG)
  // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, PASSWORD_INVALID);
  .matches(/^.+$/, PASSWORD_INVALID);

const confirmPassword = Yup.string()
  .required(REQUIRED)
  .oneOf([Yup.ref('password'), null], CONFIRM_PASSWORD);

const name = Yup.string()
  .required(REQUIRED)
  .min(1, TOO_SHORT)
  .max(100, TOO_LONG)
  .matches(/^[a-zA-Z ]+$/, INVALID);

/* Phone Valid formats:
    (123) 456-7890
    (123)456-7890
    123-456-7890
    123.456.7890
    1234567890
    +31636363634
    075-63546725
  */

const phone = Yup.string()
  .required(REQUIRED)
  .matches(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, // eslint-disable-line
    INVALID,
  );
const string = Yup.string().required(REQUIRED);

const postCode = Yup.string()
  .required(REQUIRED)
  .min(4, TOO_SHORT)
  .max(6, TOO_LONG)
  .matches(/[0-9]/, INVALID);

export const VALIDATION = {
  email,
  password,
  name,
  phone,
  string,
  confirmPassword,
  postCode,
};
