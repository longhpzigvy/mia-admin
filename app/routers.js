import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthRoute from './containers/Route/AuthenticatedRoute';
import UnauthRoute from './containers/Route/UnauthenticateRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import LoginCallBackPage from './pages/LoginCallback';
import ThankForRegistering from './pages/ThankForRegistering';
import BotTraining from './pages/BotTraining';
import BotPage from './pages/BotPage';


export default class App extends React.PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <UnauthRoute exact path="/login" component={Login} />
        <UnauthRoute exact path="/register" component={Registration} />
        <Route exact path="/greeting" component={ThankForRegistering} />
        <Route
          path="/login/callback/:token/:userId/:email/:verifiedAt"
          component={LoginCallBackPage}
        />
        <AuthRoute exact path="/bot" component={BotPage} />
        <AuthRoute exact path="/bot/entities" component={BotTraining} />
      </Switch>
    );
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
