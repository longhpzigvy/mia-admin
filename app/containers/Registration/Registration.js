import { connect } from 'react-redux';
import Registration from '../../components/Registration';
import { selectErrorMessage, getIsLoading, register } from '../../reducers/auth';

const mapStateToProps = state => ({
  errorMessage: selectErrorMessage(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
