import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      console.log(authenticated);
      if (authenticated) {
        return <Component {...props} authenticated />;
      }
      const toObj = {
        pathname: '/login',
        state: { from: props.location },
      };
      if (!authenticated) return <Redirect to={toObj} />;
      return <Redirect to="/error/404" />;
    }}
  />
);

AuthenticatedRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.any,
  location: PropTypes.any,
};

export default AuthenticatedRoute;
