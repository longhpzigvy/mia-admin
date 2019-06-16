import createSocketIO from 'socket.io';
import socketioJwt from 'socketio-jwt';
import Logger from '../logger';

const ACTION_MESSAGE = 'ACTION_MESSAGE';

class SocketIOServer {
  constructor(authenticate) {
    this.authenticate = authenticate;
  }

  connect(server) {
    const socketIO = createSocketIO(server);

    socketIO.use(
      socketioJwt.authorize({
        secret: process.env.SECRET_KEY_JWT,
        handshake: true,
        timeout: 15000,
      }),
    );

    socketIO.on('connection', async (socket) => {
      const { authenticated, data: user } = await this.authenticate(socket);
      if (authenticated) {
        const { email } = user;
        Logger.info('[SocketIO]: %s has been connected', email);
      } else {
        Logger.warning('[SocketIO]: user unauthorized');
        socket.disconnect();
      }
    });

    this.socketIO = socketIO;
    return socketIO;
  }

  emitActionMessage(action) {
    this.socketIO.emit(ACTION_MESSAGE, action);
  }
}

export default SocketIOServer;
