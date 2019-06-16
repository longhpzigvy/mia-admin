import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const UnauthenticateRoute = ({
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (!authenticated) {
        return <Component {...props} authenticated />;
      }

      const { from } = props.location.state || { from: { pathname: '/' } };

      return <Redirect to={from} />;
    }}
  />
);

UnauthenticateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.any,
  location: PropTypes.any,
};

UnauthenticateRoute.defaultProps = {
  component: () => {},
};

export default UnauthenticateRoute;
