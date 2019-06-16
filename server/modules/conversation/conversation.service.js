import conversationCollection from './conversation.model';
import BaseService from '../base/base.service';

class ConversationService extends BaseService {
  constructor() {
    super(conversationCollection);
  }
}

export default new ConversationService();
