import BaseRouter from '../base/base.route';
import EntitiesController from './entities.controller';

class EntitiesRouter extends BaseRouter {
  constructor() {
    super(EntitiesController);
  }
}

export default new EntitiesRouter();
