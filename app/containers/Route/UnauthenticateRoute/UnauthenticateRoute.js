import { connect } from 'react-redux';
import UnauthenticateRoute from '../../../components/Route/UnauthenticateRoute';
import { checkAuthenticatedStatus } from '../../../reducers/auth';

const mapStateToProps = state => ({
  authenticated: checkAuthenticatedStatus(state),
});

export default connect(mapStateToProps)(UnauthenticateRoute);
