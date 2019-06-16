import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RegistrationWrapper,
  RegistrationCard,
  RegistrationInput,
  RegistrationLabel,
  RegistrationInputWrapper,
  RegistrationTitle,
  RegistrationBtn,
  RegistrationFooter,
  RegistrationFooterText,
  RegistrationFooterLink,
  RegistrationSpinner,
  RegistrationErrorMessage,
} from './styles';

class Registration extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  state = {
    email: '',
    password: '',
  }

  handleInputChanged = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  register = () => {
    const { email, password } = this.state;
    const { register } = this.props;
    register(email, password);
  }

  renderRegisterBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <RegistrationBtn>
          <RegistrationSpinner />
          Registering
        </RegistrationBtn>
      );
    }
    return (
      <RegistrationBtn
        onClick={this.register}
      >
        Register
      </RegistrationBtn>
    );
  }

  render() {
    const { email, password } = this.state;
    const { errorMessage } = this.props;

    return (
      <RegistrationWrapper>
        <RegistrationCard>
          <RegistrationTitle>Mia Consult</RegistrationTitle>
          <RegistrationInputWrapper>
            <RegistrationLabel>Email</RegistrationLabel>
            <RegistrationInput
              type="email"
              value={email}
              onChange={this.handleInputChanged('email')}
            />
          </RegistrationInputWrapper>
          <RegistrationInputWrapper>
            <RegistrationLabel>Password</RegistrationLabel>
            <RegistrationInput
              type="password"
              value={password}
              onChange={this.handleInputChanged('password')}
            />
          </RegistrationInputWrapper>
          {errorMessage ? (
            <RegistrationErrorMessage>
              {errorMessage}
            </RegistrationErrorMessage>
          ) : null}
          {this.renderRegisterBtn()}
          <RegistrationFooter>
            <RegistrationFooterText>Already had an account?</RegistrationFooterText>
            <RegistrationFooterLink href="/login">
              Login now!
            </RegistrationFooterLink>
          </RegistrationFooter>
        </RegistrationCard>
      </RegistrationWrapper>
    );
  }
}

export default Registration;
