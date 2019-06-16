import pick from 'lodash/pick';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import moment from 'moment';
import { hashFunc } from '../../utils/bcrypt';
import userCollection from './user.model';
import BaseService from '../base/base.service';
import {
  sendUserVerifyMail,
  sendUserRegisterSuccessMail,
} from '../../mail';

const { SECRET_KEY_JWT } = process.env;
const JWT_OPTIONS = {
  expiresIn: '1d',
};

class UserService extends BaseService {
  constructor() {
    super(userCollection);
  }

  getByEmail(email) {
    return userCollection.findOne({ email }).exec();
  }

  async getUserProfile(user) {
    const { password } = user;
    const isNewlyLoginAsSocialNetwork = !password;
    const profile = pick(user, ['profile', 'address', 'email']);
    return {
      ...profile,
      isNewlyLoginAsSocialNetwork,
    };
  }

  async updateUserProfile(user, newUpdate) {
    const newModel = newUpdate;
    _.assign(user, newModel);

    const savedModel = await user.save();
    return this.getUserProfile(savedModel);
  }

  async createPassword(user, password) {
    const hash = await hashFunc(password);
    const newUpdate = { password: hash };
    return this.updateUserProfile(user, newUpdate);
  }

  async sendVericationEmail(email) {
    const { DOMAIN } = process.env;
    if (DOMAIN) {
      const user = await this.collection.findOne({ email }).exec();
      if (!user) {
        throw new Error('User does not exists');
      }
      const { _id: userId } = user;
      const token = jwt.sign({ userId }, SECRET_KEY_JWT, JWT_OPTIONS);
      const vericationLink = `${DOMAIN}/api/users/verify/${token}`;
      sendUserVerifyMail(user, vericationLink);
    }
  }

  async verifyAccount(token) {
    const data = jwt.verify(token, SECRET_KEY_JWT, JWT_OPTIONS);
    const { userId } = data;
    const user = await this.collection.findOne({ _id: userId }).exec();
    const { verifiedAt } = user;
    if (verifiedAt) {
      throw new Error('Account is verified');
    }
    user.verifiedAt = moment().utc().format();
    await user.save();
    sendUserRegisterSuccessMail(user);
  }
}

export default new UserService();
