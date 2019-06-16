import { connect } from 'react-redux';
import AuthenticatedRoute from '../../../components/Route/AuthenticatedRoute';
import { checkAuthenticatedStatus } from '../../../reducers/auth';

const mapStateToProps = state => ({
  authenticated: checkAuthenticatedStatus(state),
});

export default connect(mapStateToProps)(AuthenticatedRoute);
