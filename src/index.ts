import { InstanceManager } from '@sallar-network/server';
import * as dotenv from 'dotenv';

(async () => {
  dotenv.config();

  const manager = new InstanceManager({
    public_path: `./public`,
    http_port: Number(process.env.PORT),
    dev_mode: process.env.DEV_MODE === 'true',
    node_manager_server: process.env.NODE_MANAGER_SERVER,
    program_token: process.env.PROGRAM_TOKEN,
  });

  manager.on('hello', ({ worker_id }) => {
    console.log(`Hello from worker ${ worker_id }`);
  });

  await manager.launch((_, manager) => {
    manager.emit('say-hello', null);
  });
})();
