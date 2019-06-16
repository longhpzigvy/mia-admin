import mongoose from 'mongoose';
import moment from 'moment';
import { ROLES_BY_VALUE } from '../../../common/enums';

const currentDateUtc = () => moment().utc().format();

const {
  USER: { value: USER_ROLE },
} = ROLES_BY_VALUE;
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: false },
    password: { type: String, required: false },
    provider: [{ id: String, name: String, _id: false }],
    displayName: String,
    createdAt: { type: Date, default: currentDateUtc },
    role: { type: String, default: USER_ROLE },
    stripeCustomerId: { type: String, require: false },
    profile: {
      firstName: String,
      lastName: String,
      phone: String,
      dateOfBirth: { type: Date, required: false },
      gender: String,
      address: { type: String, required: false },
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    collection: 'user',
  },
);

export default mongoose.model('User', userSchema);
