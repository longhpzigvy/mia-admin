import BaseController from '../base/base.controller';
import EntitiesService from './entities.service';

class EntitiesController extends BaseController {
  constructor() {
    super(EntitiesService);
  }
}

export default new EntitiesController();
