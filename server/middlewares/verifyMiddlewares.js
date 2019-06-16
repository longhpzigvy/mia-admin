import indexOf from 'lodash/indexOf';
import httpStatus from 'http-status';

/**
 * check role middleware - This one called after authentication middleware
 * user's passed from authentication middleware (req.user.role)
 */

export const allow = role => (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  const { role: userRole } = user;
  const roles = Array.isArray(role) ? role : [role];

  if (indexOf(roles, userRole) === -1) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }

  return next();
};

export const deny = role => (req, res, next) => {
  const { user } = req;

  if (!user) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  const { role: userRole } = user;
  const roles = Array.isArray(role) ? role : [role];

  if (indexOf(roles, userRole) !== -1) {
    return res.sendStatus(httpStatus.FORBIDDEN);
  }

  return next();
};
