import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import {
  TrainEntityWrapper,
  TrainMiaResponseInput,
  TrainResponseWrapper,
  TrainSelectWrapper,
  ResponseBoxWrapper,
} from './styles';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const ReactSelectStyle = {
  container: base => ({
    ...base,
    width: '33%',
    flex: 1,
    border: 'none',
    outline: 'none',
  }),
  control: (base, { isDisabled }) => ({
    ...base,
    boxShadow: 'none',
    border: isDisabled ? 'none' : '1px solid black',
    outline: 'none',
  }),
};

class ResponseBox extends Component {
  static propTypes = {
    updateField: PropTypes.func.isRequired,
    response: PropTypes.string,
    selectedText: PropTypes.string,
    entity: PropTypes.objectOf(PropTypes.any),
    value: PropTypes.objectOf(PropTypes.any),
    entityItem: PropTypes.objectOf(PropTypes.any),
    isDisabled: PropTypes.bool,
  }

  static defaultProps = {
    selectedText: '',
    response: '',
    entity: {},
    value: '',
    isDisabled: false,
  }

  static getDerivedStateFromProps(props, state) {
    const { entityList } = props;
    const selectedEntity = props.entity || {};
    const entityOptions = entityList.map(entity => ({
      value: entity.name,
      label: entity.name,
    }));

    const currentEntity = entityList
      .find(entity => entity.name === (selectedEntity).value) || {};
    const valueOptions = (currentEntity.values || []).map(v => ({
      value: v.value,
      label: v.value,
    }));
    return {
      ...state,
      entityOptions,
      valueOptions,
    };
  }

  state = {
    entityOptions: [],
    valueOptions: [],
  }

  handleMiaResponseInput = ({ target }) => {
    const { updateField } = this.props;
    updateField('response', target.value);
  }


  handleValueCreated = (value) => {
    const { updateField } = this.props;
    const { valueOptions } = this.state;
    const newOption = {
      value,
      label: value,
    };

    updateField('value', newOption);
    this.setState({
      valueOptions: [...valueOptions, newOption],
    });
  }

  handleEntitySelected = (entity) => {
    const { updateField } = this.props;
    updateField('entity', entity);
  }

  handleValueSelected = (value) => {
    const { updateField } = this.props;
    updateField('value', value);
  }

  handleEntityCreated = (entity) => {
    const { updateField } = this.props;
    const { entityOptions } = this.state;
    const newOption = {
      value: entity,
      label: entity,
    };
    updateField('entity', newOption);
    this.setState({
      entityOptions: [...entityOptions, newOption],
    });
  }

  renderEntityBox = () => {
    const { entityOptions } = this.state;
    const {
      selectedText,
      isDisabled, entityItem,
    } = this.props;
    const { entity } = entityItem || this.props;
    const entityPlaceholderMessage = `Select or add a new entity ${selectedText ? `for ${selectedText}` : ''}`;

    return (
      <TrainEntityWrapper>
        <CreatableSelect
          isSearchable
          isClearable
          isDisabled={isDisabled || !selectedText}
          value={entity}
          options={entityOptions}
          placeholder={entityPlaceholderMessage}
          styles={ReactSelectStyle}
          onChange={this.handleEntitySelected}
          onCreateOption={this.handleEntityCreated}
        />
      </TrainEntityWrapper>
    );
  }


  renderValueBox = () => {
    const { valueOptions } = this.state;
    const { isDisabled, entityItem } = this.props;
    const { value, entity } = entityItem || this.props;

    return (
      <TrainEntityWrapper>
        <CreatableSelect
          isSearchable
          isClearable
          isDisabled={isDisabled || !entity}
          value={value}
          options={valueOptions}
          placeholder="Select a value for this entity"
          styles={ReactSelectStyle}
          onChange={this.handleValueSelected}
          onCreateOption={this.handleValueCreated}
        />
      </TrainEntityWrapper>
    );
  }

  renderResponseBox = () => {
    const { isDisabled, entityItem } = this.props;
    const { response, entity } = entityItem || this.props;

    return (
      <TrainResponseWrapper>
        <TrainMiaResponseInput
          disabled={isDisabled}
          placeholder="Mia response"
          value={response}
          onChange={this.handleMiaResponseInput}
        />
      </TrainResponseWrapper>
    );
  }

  render() {
    const { isDisabled } = this.props;

    return (
      <ResponseBoxWrapper
        isDisabled={!!isDisabled}
      >
        <TrainSelectWrapper>
          {this.renderEntityBox()}
          {this.renderValueBox()}
        </TrainSelectWrapper>
        {this.renderResponseBox()}
      </ResponseBoxWrapper>
    );
  }
}

ResponseBox.propTypes = {

};

export default ResponseBox;
