import React from 'react';
import PropTypes from 'prop-types';
import {
  EntityTableRow,
  EntityDescCell,
  EntityNameCell,
  EntityValueCell,
  EntityNameWrapper,
  EntityName,
  EntityLookupStrategy,
  EntityNameCellWrapper,
  EntityLookupStrategyTitle,
  EntityLookupStrategyBadge,
} from './styles';

const EntityRow = ({
  entityName,
  entityTheme,
  lookupStrategy,
  description,
  values,
}) => (
  <EntityTableRow>
    <EntityNameCell>
      <EntityNameCellWrapper>
        <EntityNameWrapper>
          <EntityName
            className="entity-name"
            bgColor={entityTheme}
          >
            {entityName}
          </EntityName>
          <i className="icon-chevron-right" />
        </EntityNameWrapper>
        {
          lookupStrategy ? (
            <EntityLookupStrategy>
              <EntityLookupStrategyTitle>LOOKUP STRATEGIES</EntityLookupStrategyTitle>
              <EntityLookupStrategyBadge>{lookupStrategy}</EntityLookupStrategyBadge>
            </EntityLookupStrategy>
          ) : null
        }
      </EntityNameCellWrapper>
    </EntityNameCell>
    <EntityDescCell>{description}</EntityDescCell>
    <EntityValueCell>{values.join`, `}</EntityValueCell>
  </EntityTableRow>
);

EntityRow.propTypes = {
  entityName: PropTypes.string.isRequired,
  lookupStrategy: PropTypes.string,
  entityTheme: PropTypes.string,
  description: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
};

EntityRow.defaultProps = {
  lookupStrategy: '',
  description: '',
  values: [],
  entityTheme: 'rgba(208, 222, 251, 0.5)',
};

export default EntityRow;
