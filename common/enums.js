import keyBy from 'lodash/keyBy';

export const VALIDATION_ERROR_MESSAGE = {
  REQUIRED: 'Required',
  INVALID: 'Invalid',
  TOO_SHORT: 'Too Short',
  TOO_LONG: 'Too Long',
  PHONE_INVALID: 'Phone number is not valid',
  PASSWORD_INVALID:
    'Password (UpperCase, LowerCase and Number) with length 6 and 50 character',
  CONFIRM_PASSWORD: 'The confirm password is not the same the password',
};

export const VALIDATION_TYPE = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD',
  STRING: 'STRING',
};

export const TICKET_STATUS = [
  {
    value: 'created',
    title: 'Created',
  },
  {
    value: 'canceled',
    title: 'Canceled',
  },
  {
    value: 'pending',
    title: 'Pending',
  },
  {
    value: 'confirmed',
    title: 'Confirmed',
  },
  {
    value: 'resolved',
    title: 'Resolved',
  },
];

export const ROLES = [
  {
    title: 'Admin',
    value: 'ADMIN',
  },
  {
    title: 'User',
    value: 'USER',
  },
];

export const ROLES_BY_VALUE = keyBy(ROLES, 'value');
