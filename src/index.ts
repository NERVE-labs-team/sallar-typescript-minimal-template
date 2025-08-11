import { InstanceManager, ProgramObject } from '@sallar-network/server';
import * as dotenv from 'dotenv';
import { GreetingFromServer, GreetingFromClient } from 'shared/greetings';

const ServerNick = 'Bob';

(async () => {
  dotenv.config();

  const manager = new InstanceManager({
    public_path: `./public`,
    http_port: Number(process.env.PORT),
    dev_mode: process.env.DEV_MODE === 'true',
    node_manager_server: process.env.NODE_MANAGER_SERVER,
    program_token: process.env.PROGRAM_TOKEN,
  });

  manager.on('hello', (greetings: ProgramObject<GreetingFromClient>) => {
    console.log(
      `Client ${greetings.client_nick} said hello to ${ServerNick} too time ${greetings.count}`
    );

    const returnGreetings: GreetingFromServer = {
      server_nick: ServerNick,
      count: greetings.count,
    };
    manager.emit('say-hello', returnGreetings, greetings.worker_id);
  });

  await manager.launch(({ worker_id }, manager) => {
    console.log(`Time for ${ServerNick} to say hello to the new client`);

    const greetings: GreetingFromServer = { server_nick: ServerNick, count: 0 };
    manager.emit('say-hello', greetings, worker_id);
  });
})();
