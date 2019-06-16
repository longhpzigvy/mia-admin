import axios from 'axios';
import SampleModel from '../modules/witai/witai.model';
import EntitiesModel from '../modules/entities/entities.model';
import Logger from '../logger';

const WIT_AI_BASE_URL = 'https://api.wit.ai';

const syncSamples = async () => {
  Logger.info('[WIT.AI SYNC TASK]: Syncing Samples DB from Wit.ai');

  const sampleCount = await SampleModel.count().exec();
  const samplesRes = await axios.get(
    `${WIT_AI_BASE_URL}/samples?limit=9999&offset=${sampleCount}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
      },
    }
  );
  const samples = [];
  const { data } = samplesRes;
  if (!data.length) {
    Logger.info('[WIT.AI SYNC TASK]: Your Samples DB has been already updated to date');
    return;
  }

  Logger.info(`[WIT.AI SYNC TASK]: Found new ${data.length} samples`);
  Logger.info(`[WIT.AI SYNC TASK]: Syncing ${data.length} samples`);

  for (let i = 0; i < data.length; i += 1) {
    const { entities, text } = data[i];

    const intentName = entities.find(entity => entity.entity === 'intent');
    if (!intentName) continue;

    for (let j = 0; j < entities.length; j += 1) {
      if (entities[j].entity === 'intent') continue;
      samples.push({
        user_input: text,
        intent_name: intentName.value,
        entity_name: entities[j].entity,
        entity_value: entities[j].value,
        response: 'Sorry I cant undetstand this',
      });
    }
  }
  SampleModel.insertMany(samples);
  Logger.info(`[WIT.AI SYNC TASK]: ${data.length} samples have been synced successully!`);
};

// ==============================

const insertEntity = async (entityId) => {
  try {
    const entityRes = await axios.get(
      `${WIT_AI_BASE_URL}/entities/${entityId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    await EntitiesModel.create(entityRes.data);
  } catch (error) {
    Logger.error(`[WIT.AI SYNC TASK]: Unable to insert entity ${entityId}.`);
    Logger.error(`[WIT.AI SYNC TASK]: ERROR ${error}!`);
  }
};

const syncEntities = async () => {
  Logger.info('[WIT.AI SYNC TASK]: Syncing Entities DB from Wit.ai');

  const entityCount = await EntitiesModel.count().exec();
  const entitiesRes = await axios.get(
    `${WIT_AI_BASE_URL}/entities`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
      },
    }
  );
  const entitiyList = [];
  const { data } = entitiesRes;
  if (!data.length || data.length === entityCount) {
    Logger.info('[WIT.AI SYNC TASK]: Your Entities DB has been already updated to date');
    return;
  }

  Logger.info(`[WIT.AI SYNC TASK]: Found new ${data.length} entities`);
  Logger.info(`[WIT.AI SYNC TASK]: Syncing ${data.length} entities`);
  for (let i = entityCount; i < data.length; i += 1) {
    entitiyList.push(insertEntity(data[i]));
  }
  await Promise.all(entitiyList);
  Logger.info(`[WIT.AI SYNC TASK]: ${data.length} records have been synced successully to DB Entities!`);
};

// =================================

const syncWitAIData = () => {
  syncEntities();
  syncSamples();
};

export default syncWitAIData;
