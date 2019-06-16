import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import AuthController from './modules/auth/auth.controller';
import { compareFunc } from './utils/bcrypt';
import UserModel from './modules/user/user.model';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => {
      UserModel.findOne({ email }).exec(async (err, user) => {
        if (err) {
          return cb(err, false, { message: 'Something is wrong' });
        }

        if (!user) {
          return cb(false, false, { message: 'User with email not found' });
        }

        if (!user.password) {
          return cb(false, false, {
            message:
              'You should login with your linked account and create password',
          });
        }

        const checkPassword = await compareFunc(password, user.password);

        if (!checkPassword) {
          return cb(false, false, { message: 'Incorrect password.' });
        }

        return cb(null, user, {
          message: 'Logged In Successfully',
        });
      });
    },
  ),
);

// this strategy handle these methods that needs authorization such as insert, update methods
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_JWT,
      passReqToCallback: true,
    },
    (req, payload, done) => {
      const { _id } = payload;
      UserModel.findById(_id).exec((err, user) => {
        if (err || !user) {
          done(err, false, { message: 'Something is wrong' });
        }
        req.user = user;
        done(false, user);
      });
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/api/auth/login/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    AuthController.handlePassportStrategy,
  ),
);

export default passport;
