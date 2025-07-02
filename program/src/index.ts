import { InstanceManager } from '@sallar-network/client';
import io from 'socket.io-client';

const program = new InstanceManager(io);

program.on('say-hello', async (_, manager) => {
  manager.emit('hello', null);
});
