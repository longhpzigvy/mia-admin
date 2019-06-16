import { connect } from 'react-redux';
import ThankForRegistering from 'components/ThankForRegistering';
import { createStructuredSelector } from 'reselect';
import {
  actions,
  getVerifyingEmail,
  getIsSendingEmail,
  getVerifyEmailError,
} from '../../reducers/auth';

const mapStateToProps = createStructuredSelector({
  verifyingEmail: getVerifyingEmail,
  isSending: getIsSendingEmail,
  error: getVerifyEmailError,
});

const mapDispatchToProps = {
  sendVericationEmail: actions.sendVericationEmail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThankForRegistering);
