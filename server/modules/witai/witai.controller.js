import httpStatus from 'http-status';
import BaseController from '../base/base.controller';
import WitAIService from './witai.service';

class WitAIController extends BaseController {
  constructor() {
    super(WitAIService);
  }

  insertSample = async (req, res) => {
    try {
      const data = req.body;
      // create new example and post it to wit.ai for training
      const result = await this.service.createSample(data);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  removeSample = async (req, res) => {
    try {
      // text = user input
      const { text } = req.body;
      // create new example and post it to wit.ai for training
      const result = await this.service.removeSample(text);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }

  getAllSamples = async (req, res) => {
    try {
      const result = await this.service.fetchSamples();
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return super.handleError(res, error);
    }
  }
}

export default new WitAIController();
