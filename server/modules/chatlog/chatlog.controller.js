import BaseController from '../base/base.controller';
import ChatLogService from './chatlog.service';

class ChatLogController extends BaseController {
  constructor() {
    super(ChatLogService);
  }
}

export default new ChatLogController();
