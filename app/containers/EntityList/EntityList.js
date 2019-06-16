import { connect } from 'react-redux';
import EntityList from '../../components/EntityList';
import { getUserEntity } from '../../reducers/entities';

const mapStateToProps = state => ({
  entityList: getUserEntity(state),
});

export default connect(mapStateToProps)(EntityList);
