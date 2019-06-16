import passport from 'passport';
import get from 'lodash/get';
import UserModel from '../modules/user/user.model';

export const authenticateMiddleware = passport.authenticate('jwt', { session: false });

/**
 * authenication middleware, check header and authenticate if needed
 */
export const authenticateApi = (req, res, next) => {
  const authorization = get(req, 'headers.authorization');
  if (authorization) {
    authenticateMiddleware(req, res, next);
  } else {
    next();
  }
};

/**
 * In the future, Check rules (namespace, user role) if needed
 */
export const authenticateSocketIO = async (socket) => {
  const {
    decoded_token: { _id: userId },
  } = socket;
  const user = await UserModel.findOne({ _id: userId }).exec();
  return { authenticated: true, data: user };
};
