/* eslint-disable camelcase */

import axios from 'axios';
import moment from 'moment';
import witAiCollection from './witai.model';
import BaseService from '../base/base.service';
import EntityService from '../entities/entities.service';

const WIT_AI_BASE_URL = 'https://api.wit.ai';

class WitAIService extends BaseService {
  constructor() {
    super(witAiCollection);
  }

  /**
   * @params {
   *  Object of {
   *    text: String,
   *    intent_name: String,
   *    entities = [{
   *      entity: String,
   *      value: String,
   *      start: Number,
   *      end: Number
   *    }],
   *  }
   * } data
   */

  createSample = async ({ text, intent_name, entities = [] }) => {
    const cleanEntityList = entities.filter(entity => !!entity.entity);
    const newEntityList = cleanEntityList.map(entity => EntityService.insert(entity.entity));
    await Promise.all(newEntityList);

    await axios.post(
      `${WIT_AI_BASE_URL}/samples`,
      [
        {
          text,
          entities: [
            {
              entity: 'intent',
              value: intent_name,
            },
            ...cleanEntityList,
            // {
            //   entity: entity_name,
            //   value: entity_value,
            //   start,
            //   end,
            // },
          ],
        },
      ],
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );

    const entityPromiseList = entities.map(entity => this.insert({
      user_input: text,
      intent_name,
      entity_name: entity.entity,
      entity_value: entity.value,
      response: entity.response,
    }));

    const result = await Promise.all(entityPromiseList);
    return result;
  }

  /**
   * @params {String} text
   */
  removeSample = async (user_input) => {
    await axios.delete(
      `${WIT_AI_BASE_URL}/samples`,
      [{
        text: user_input,
      }],
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    /**
     * Sample response
     * {
     *   "sent" : true,
     *   "n" : 1 // số samples đã xóa
     * }
     */
    const result = await this.collection.update(
      { user_input },
      { deletedAt: moment().utc().format() },
    ).exec();
    return result;
  }

  fetchSamples = async () => {
    const res = await axios.get(
      `${WIT_AI_BASE_URL}/samples?limit=500`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    const { data } = res;
    return data;
  }
}

export default new WitAIService();
