import { connect } from 'react-redux';
import Login from '../../components/Login';
import { selectErrorMessage, getIsLoading, login } from '../../reducers/auth';

const mapStateToProps = state => ({
  errorMessage: selectErrorMessage(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  login,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
