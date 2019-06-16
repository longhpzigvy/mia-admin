import styled from 'styled-components';

export const EntityListWrapper = styled.div`
  width: 100%;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const EntityListHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
`;

export const EntityTable = styled.table`
  width: 100%;
  text-align: left;
  word-break: break-word;
`;

export const EntityTableHeader = styled.thead`
  font-weight: bold;
  border-bottom: 2px solid #ccc;
`;

export const EntityTableHeaderCell = styled.th`
  width: calc(100% / 3);
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
`;

export const EntityTableBody = styled.tbody``;

export const EntityTableRow = styled.tr`
  &:nth-child(even) {
    background: #f5f6f7;
  }
  border-bottom: 1px solid #ccc;
`;

const EntityTableCell = styled.td`
  width: calc(100% / 3);
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`;

export const EntityNameCell = styled(EntityTableCell)`
  
`;

export const EntityDescCell = styled(EntityTableCell)`
  width: calc(100% / 3);
`;

export const EntityValueCell = styled(EntityTableCell)`
  width: calc(100% / 3);
`;

export const EntityNameCellWrapper = styled.a`
  cursor: pointer;
  &:hover i {
    color: #4183c4;
  }
  &:hover .entity-name {
    box-shadow: 0 0 1px 1px #4183c4;
  }
`;

export const EntityNameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  & i {
    font-size: 12px;
    margin-left: 5px;
    font-weight: bold;
    transition: .3s ease;
  }
`;

export const EntityName = styled.div`
  transition: .3s ease;
  padding: 3px 5px;
  background-color: ${props => props.bgColor};
  border-radius: .25em;
  font-weight: bold;
`;

export const EntityLookupStrategy = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

export const EntityLookupStrategyTitle = styled.div`
  margin-right: 10px;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
`;

export const EntityLookupStrategyBadge = styled.div`
  background-color: #4183c4;
  border-radius: 10px;
  padding: 2px 10px;
  color: white;
  text-transform: lowercase;
`;
