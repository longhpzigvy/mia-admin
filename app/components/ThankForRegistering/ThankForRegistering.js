import React from 'react';
import PropTypes from 'prop-types';

import {
  ThankForRegisteringStyled,
  MessageStyled,
  TextLinkStyled,
  ThankForHeader,
  ErrorStyled,
} from './ThankForRegistering.styled';

class ThankForRegistering extends React.PureComponent {
  componentDidMount() {
    const { verifyingEmail, history } = this.props;
    if (!verifyingEmail) {
      history.push('/login');
    }
  }

  onResendEmail = e => {
    e.preventDefault();
    const { sendVericationEmail } = this.props;
    sendVericationEmail();
  };

  render() {
    const { isSending, error } = this.props;
    const sendEmailTxt = isSending ? ' resending' : ' resend';
    return (
      <ThankForRegisteringStyled>
        <ThankForHeader>Register Successfully</ThankForHeader>
        <MessageStyled>
          Thank for registering. A verify email was sent to your email, please
          check your email to complete register.
        </MessageStyled>
        <MessageStyled>
          If you still not received our email, please click
          <TextLinkStyled disabled={isSending} onClick={this.onResendEmail}>
            {sendEmailTxt}
          </TextLinkStyled>.
        </MessageStyled>
        <ErrorStyled>{error}</ErrorStyled>
      </ThankForRegisteringStyled>
    );
  }
}

ThankForRegistering.propTypes = {
  history: PropTypes.object.isRequired,
  verifyingEmail: PropTypes.string,
  sendVericationEmail: PropTypes.func.isRequired,
  isSending: PropTypes.bool,
  error: PropTypes.string,
};

export default ThankForRegistering;
