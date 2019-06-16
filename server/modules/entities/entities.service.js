import axios from 'axios';
import entitiesCollection from './entities.model';
import BaseService from '../base/base.service';

const WIT_AI_BASE_URL = 'https://api.wit.ai';

class EntitiesService extends BaseService {
  constructor() {
    super(entitiesCollection);
    this.insert.bind(this);
  }

  getByName(name) {
    return this.collection
      .findOne({
        name,
        $or: [
          { deleted: { $exists: false } },
          { deleted: { $exists: true, $in: [false] } },
        ],
      })
      .exec();
  }

  async insert(entity) {
    const existingEntity = await this.getByName(entity);
    if (existingEntity) return existingEntity;
    const response = await axios.post(
      `${WIT_AI_BASE_URL}/entities`,
      {
        id: entity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WIT_AI_TOKEN}`,
        },
      }
    );
    return this.collection.create(response.data);
  }
}

export default new EntitiesService();
