import React from 'react';
import PropTypes from 'prop-types';
import EntityRow from './EntityRow';
import {
  EntityListWrapper,
  EntityListHeader,
  EntityTable,
  EntityTableHeader,
  EntityTableHeaderCell,
  EntityTableRow,
} from './styles';

const EntityList = ({ entityList }) => {
  const printableEntityList = entityList.map((entity) => {
    const lookups = entity.lookups.join` & `;
    const values = entity.values.map(value => value.value);
    return {
      ...entity,
      lookups,
      values,
    };
  });
  return (
    <EntityListWrapper>
      <EntityListHeader>{`Mia is using ${entityList.length} entities`}</EntityListHeader>
      <EntityTable>
        <EntityTableHeader>
          <EntityTableRow>
            <EntityTableHeaderCell>
              Entity
            </EntityTableHeaderCell>
            <EntityTableHeaderCell>
              Description
            </EntityTableHeaderCell>
            <EntityTableHeaderCell>
              Value
            </EntityTableHeaderCell>
          </EntityTableRow>
        </EntityTableHeader>
        <tbody>
          {printableEntityList.map(entity => (
            <EntityRow
              key={entity.name}
              entityName={entity.name}
              // entityTheme={}
              lookupStrategy={entity.lookups}
              description={entity.doc}
              values={entity.values}
            />
          ))}
        </tbody>
      </EntityTable>
    </EntityListWrapper>
  );
};

EntityList.propTypes = {
  entityList: PropTypes.arrayOf(PropTypes.any),
};

EntityList.defaultProps = {
  entityList: [],
};

export default EntityList;
