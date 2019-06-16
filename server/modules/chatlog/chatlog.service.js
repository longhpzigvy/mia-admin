import chatLogCollection from './chatlog.model';
import BaseService from '../base/base.service';

class ChatLogService extends BaseService {
  constructor() {
    super(chatLogCollection);
  }
}

export default new ChatLogService();
