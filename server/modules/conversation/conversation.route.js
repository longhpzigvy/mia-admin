import BaseRouter from '../base/base.route';
import ConversationController from './conversation.controller';

class ConversationRouter extends BaseRouter {
  constructor() {
    super(ConversationController);
  }
}

export default new ConversationRouter();
