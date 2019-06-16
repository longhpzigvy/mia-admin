/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';
import SpinnerLoading from 'components/PageLoading';
import _get from 'lodash/get';
import { actions as authActions } from 'reducers/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class LoginCallBack extends React.PureComponent {
  componentDidMount() {
    const { history, loginSuccess, getUserProfile } = this.props;

    const token = _get(this.props, 'match.params.token', null);
    const userId = _get(this.props, 'match.params.userId', null);
    const email = _get(this.props, 'match.params.email', null);
    const verifiedAt = JSON.parse(
      _get(this.props, 'match.params.verifiedAt', 'false'),
    );

    if (token && userId && email) {
      loginSuccess({
        token, userId, email, verifiedAt,
      });
      // getUserProfile(userId);
      // history.push('/');
      window.location.href = 'https://www.messenger.com/t/1620637394734647';
    } else {
      history.push('/login');
    }
  }

  render() {
    return <SpinnerLoading />;
  }
}

LoginCallBack.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loginSuccess: PropTypes.func.isRequired,
  // getUserProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  loginSuccess: authActions.loginSuccess,
  // getUserProfile: userActions.requestUserSingle,
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginCallBack);
