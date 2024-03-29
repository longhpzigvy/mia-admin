import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import UserService from './user.service';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';
import check from '../../utils/validate';
import { VALIDATION_TYPE } from '../../../common/enums';
import { hashFunc, compareFunc } from '../../utils/bcrypt';
import {
  sendCreatePasswordMail,
  sendChangePasswordMail,
  sendUpdateProfileMail,
} from '../../mail';

class UserController extends BaseController {
  constructor() {
    super(UserService);
  }

  insert = async (req, res) => {
    try {
      const { email, password } = req.body;

      await check(email, VALIDATION_TYPE.EMAIL);
      await check(password, VALIDATION_TYPE.PASSWORD);

      const isEmailExist = await UserService.getByEmail(email);

      if (isEmailExist) {
        const { EMAIL_EXIST } = ERROR_MESSAGE;
        throw new APIError(EMAIL_EXIST, httpStatus.BAD_REQUEST);
      }

      const hash = await hashFunc(password);

      const user = {
        email,
        password: hash,
      };

      const userDoc = await UserService.insert(user);
      UserService.sendVericationEmail(email);

      return res.status(httpStatus.OK).json(userDoc);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async createUser(req, res) {
    try {
      const data = req.body;

      const newUser = await this.service.insert(data);

      return res.status(httpStatus.OK).send(newUser);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async assignRoles(req, res) {
    try {
      const {
        user,
        body: { newRole },
      } = req;

      await user.set('role', newRole);

      return res.status(httpStatus.OK).send(user);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async getUserProfile(req, res) {
    try {
      const { model } = req;
      const userProfile = await UserService.getUserProfile(model);

      return res.status(httpStatus.OK).send(userProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async updateUserProfile(req, res) {
    try {
      const { model } = req;
      const newUpdate = req.body;
      const newUserProfile = await UserService.updateUserProfile(
        model,
        newUpdate,
      );
      sendUpdateProfileMail(newUserProfile);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }


  async changePassword(req, res) {
    try {
      const { user } = req;
      const { oldPassword, newPassword } = req.body;
      await check(oldPassword, VALIDATION_TYPE.STRING);
      await check(newPassword, VALIDATION_TYPE.PASSWORD);

      if (!user.password) {
        return this.createPassword(req, res);
      }

      const checkPassword = await compareFunc(oldPassword, user.password);

      if (!checkPassword) {
        const { PASSWORD_INCORRECT } = ERROR_MESSAGE;
        throw new APIError(PASSWORD_INCORRECT, httpStatus.FORBIDDEN);
      }

      user.password = await hashFunc(newPassword);

      const result = await user.save();
      sendChangePasswordMail(user);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  async createPassword(req, res) {
    try {
      const { user } = req;
      const { newPassword } = req.body;
      await check(newPassword, VALIDATION_TYPE.PASSWORD);
      const newUserProfile = await UserService.createPassword(
        user,
        newPassword,
      );
      sendCreatePasswordMail(user);
      return res.status(httpStatus.OK).send(newUserProfile);
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new UserController();
