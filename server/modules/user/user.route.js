import passport from 'passport';
import BaseRouter from '../base/base.route';
import UserController from './user.controller';
import { ROLES_BY_VALUE } from '../../../common/enums';
import { allow } from '../../middlewares/verifyMiddlewares';

const {
  ADMIN: { value: ADMIN_ROLE },
} = ROLES_BY_VALUE;

class UserRouter extends BaseRouter {
  constructor() {
    super(UserController);
    this.router.post('/', allow(ADMIN_ROLE), UserController.createUser);
    this.router.put(
      '/assign-role/:id',
      allow(ADMIN_ROLE),
      UserController.assignRoles,
    );

    this.router.get(
      '/profile/:id',
      passport.authenticate('jwt', { session: false }),
      UserController.getUserProfile,
    );

    this.router.put(
      '/profile/:id',
      passport.authenticate('jwt', { session: false }),
      UserController.updateUserProfile,
    );
    this.router.post(
      '/changePassword',
      passport.authenticate('jwt', { session: false }),
      UserController.changePassword,
    );
    this.router.post(
      '/createPassword',
      passport.authenticate('jwt', { session: false }),
      UserController.createPassword,
    );
  }
}

export default new UserRouter();
