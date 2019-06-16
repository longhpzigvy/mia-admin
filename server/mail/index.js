import nodemailer from 'nodemailer';
import Mustache from 'mustache';
import mapValues from 'lodash/mapValues';
import EmailTemplate from './email-templates';

const {
  contactMessagePostedMail,
  userPasswordChangedMail,
  userPasswordCreatedMail,
  userProfileUpdatedMail,
  userRegisterSucceedMail,
  userVerifyMail,
  checkoutSuccessMail,
  orderStatusChangedMail,
  subscriptionNotificationMail,
} = EmailTemplate;

const {
  MAIL_SERVER_SERVICE,
  MAIL_SERVER_EMAIL,
  MAIL_SERVER_PASSWORD,
} = process.env;
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
const transporter = nodemailer.createTransport({
  service: MAIL_SERVER_SERVICE,
  secure: false,
  auth: {
    user: MAIL_SERVER_EMAIL, // generated ethereal user
    pass: MAIL_SERVER_PASSWORD, // generated ethereal password
  },
});

// setup email data with unicode symbols
const mailOptions = {
  from: `"Mia Consults" <${MAIL_SERVER_EMAIL}>`, // sender address
  to: 'longhp@zigvy.com', // list of receivers
};

const createContentFromTemplate = (template, data) => mapValues(template, prop => Mustache.render(prop, data));

const sendEmail = ({ to, template, data }) => {
  const content = createContentFromTemplate(template, data);
  transporter.sendMail(
    {
      ...mailOptions,
      ...content,
      to,
    },
    (error, info) => {
      // eslint-disable-line
      if (error) {
        return console.log(error);
      }
      return console.log('Message sent: %s', info.messageId);
    },
  );
};

export const sendUpdateProfileMail = (user) => {
  sendEmail({
    to: user.email,
    template: userProfileUpdatedMail,
    data: { user },
  });
};

export const sendCreatePasswordMail = (user) => {
  sendEmail({
    to: user.email,
    template: userPasswordCreatedMail,
    data: { user },
  });
};

export const sendChangePasswordMail = (user) => {
  sendEmail({
    to: user.email,
    template: userPasswordChangedMail,
    data: { user },
  });
};

export const sendUserRegisterSuccessMail = (user) => {
  sendEmail({
    to: user.email,
    template: userRegisterSucceedMail,
    data: { user },
  });
};

export const sendUserVerifyMail = (user, vericationLink) => {
  sendEmail({
    to: user.email,
    template: userVerifyMail,
    data: { user, vericationLink },
  });
};

const sendPostContactMessageMail = (contact) => {
  sendEmail({
    to: MAIL_SERVER_EMAIL, // ! we need to create a new admin email, I use the same email for testing
    template: contactMessagePostedMail,
    data: { contact },
  });
};

const sendCheckoutSucceedMail = (user, order) => {
  sendEmail({
    to: user.email,
    template: checkoutSuccessMail,
    data: { user, order },
  });
};

const sendOrderStatusChangedMail = (user, order) => {
  sendEmail({
    to: user.email,
    template: orderStatusChangedMail,
    data: { user, order },
  });
};

const sendNotificationToSubscriber = (receivers, content) => {
  sendEmail({
    to: receivers,
    template: subscriptionNotificationMail,
    data: { content },
  });
};

export default {
  sendUpdateProfileMail,
  sendPostContactMessageMail,
  sendCreatePasswordMail,
  sendChangePasswordMail,
  sendUserRegisterSuccessMail,
  sendCheckoutSucceedMail,
  sendOrderStatusChangedMail,
  sendUserVerifyMail,
  sendNotificationToSubscriber,
};
