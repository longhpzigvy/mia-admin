import BaseController from '../base/base.controller';
import ConversationService from './conversation.service';

class ConversationController extends BaseController {
  constructor() {
    super(ConversationService);
  }
}

export default new ConversationController();
