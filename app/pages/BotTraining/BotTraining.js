import React from 'react';
import TrainingBox from '../../containers/TrainingBox';
import EntityList from '../../containers/EntityList';
import { BotTrainningWrapper, Seperator } from './styles';

const BotTraining = () => (
  <BotTrainningWrapper>
    <TrainingBox />
    <Seperator />
    <EntityList />
  </BotTrainningWrapper>
);

export default BotTraining;
