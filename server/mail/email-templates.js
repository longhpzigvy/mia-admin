import fs from 'fs';
import path from 'path';

const getTemplate = templateName => fs.readFileSync(
  path.resolve(__dirname, 'templates', `${templateName}.html`),
  'utf8',
);

// templates
const defaultTemplate = getTemplate('default-template');
const contactMessagePosted = getTemplate('contact-message-posted');
const userPasswordChanged = getTemplate('user-password-changed');
const userPasswordCreated = getTemplate('user-password-created');
const userProfileUpdated = getTemplate('user-profile-updated');
const userRegisterSucceed = getTemplate('user-register-succeed');
const userVerify = getTemplate('user-verify');
const orderContent = getTemplate('order-content');
const orderStatusChanged = getTemplate('order-status-changed');
const SubscriptionNotification = getTemplate('subscription-notification');

const applyDefaultTemplate = content => defaultTemplate.replace('[MAIN_CONTENT]', content);

export default {
  contactMessagePostedMail: {
    subject: 'SwissGetal - Question box',
    html: applyDefaultTemplate(contactMessagePosted),
  },
  userPasswordChangedMail: {
    subject: 'SwissGetal - Your password has been changed',
    html: applyDefaultTemplate(userPasswordChanged),
  },
  userPasswordCreatedMail: {
    subject: 'SwissGetal - Your password has been created',
    html: applyDefaultTemplate(userPasswordCreated),
  },
  userProfileUpdatedMail: {
    subject: 'SwissGetal - Your profile has been updated',
    html: applyDefaultTemplate(userProfileUpdated),
  },
  userRegisterSucceedMail: {
    subject:
      'SwissGetal Wellcome - You have registered SwissGetal account successfully!',
    html: applyDefaultTemplate(userRegisterSucceed),
  },
  userVerifyMail: {
    subject: 'SwissGetal - Verify Your Account',
    html: applyDefaultTemplate(userVerify),
  },
  checkoutSuccessMail: {
    subject: 'SwissGetal - Thank you for your checkout',
    html: applyDefaultTemplate(orderContent),
  },
  orderStatusChangedMail: {
    subject: 'SwissGetal - Order status changed',
    html: applyDefaultTemplate(orderStatusChanged),
  },
  subscriptionNotificationMail: {
    subject: 'SwissGetal - Notification',
    html: applyDefaultTemplate(SubscriptionNotification),
  },
};
