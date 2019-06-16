import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LoginWrapper,
  LoginCard,
  LoginInput,
  LoginLabel,
  LoginInputWrapper,
  LoginTitle,
  LoginBtn,
  LoginFBBtn,
  LoginFooter,
  LoginFooterText,
  LoginFooterLink,
  LoginSpinner,
  LoginErrorMessage,
} from './styles';

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    errorMessage: '',
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

  login = () => {
    const { email, password } = this.state;
    const { login } = this.props;
    login(email, password);
  }

  renderLoginBtn = () => {
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <LoginBtn>
          <LoginSpinner />
          Logging in
        </LoginBtn>
      );
    }
    return (
      <LoginBtn
        onClick={this.login}
      >
        Login
      </LoginBtn>
    );
  }

  render() {
    const { email, password } = this.state;
    const { errorMessage } = this.props;

    return (
      <LoginWrapper>
        <LoginCard>
          <LoginTitle>Mia Consult</LoginTitle>
          <LoginInputWrapper>
            <LoginLabel>Email</LoginLabel>
            <LoginInput
              type="email"
              value={email}
              onChange={this.handleInputChanged('email')}
            />
          </LoginInputWrapper>
          <LoginInputWrapper>
            <LoginLabel>Password</LoginLabel>
            <LoginInput
              type="password"
              value={password}
              onChange={this.handleInputChanged('password')}
            />
          </LoginInputWrapper>
          {errorMessage ? (
            <LoginErrorMessage>
              {errorMessage}
            </LoginErrorMessage>
          ) : null}
          {this.renderLoginBtn()}
          <LoginFBBtn href="api/auth/login/facebook">
            <i className="icon-facebook" />
            Login with Facebook
          </LoginFBBtn>
          <LoginFooter>
            <LoginFooterText>Don't have an account?</LoginFooterText>
            <LoginFooterLink href="/register">
              Register now!
            </LoginFooterLink>
          </LoginFooter>
        </LoginCard>
      </LoginWrapper>
    );
  }
}

export default Login;
