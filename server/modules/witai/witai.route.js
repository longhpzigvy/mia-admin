import express from 'express';
import WitAIController from './witai.controller';
import EntitiesRouter from '../entities/entities.route';

class WitAIRouter {
  constructor() {
    this.controller = WitAIController;
    this.router = express.Router();
    this.router.post('/samples', this.controller.insertSample);
    this.router.get('/samples', this.controller.getAllSamples);
    this.router.delete('/samples', this.controller.removeSample);
    this.router.use('/entities', EntitiesRouter.router);
  }
}

export default new WitAIRouter();
