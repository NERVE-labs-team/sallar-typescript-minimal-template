import { InstanceManager } from '@sallar-network/client';
import { GreetingFromClient, GreetingFromServer } from '@shared/greetings';
import io from 'socket.io-client';

const program = new InstanceManager(io);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

program.on(
  'say-hello',
  async (greetings_from_server: GreetingFromServer, manager) => {
    await sleep(5000);

    const msg = document.getElementById('msg');

    if (msg)
      msg.textContent = `Server ${greetings_from_server.server_nick} said hello to ${program.worker_id} time ${greetings_from_server.count}. Time to reply...`;

    console.log(
      `Server ${greetings_from_server.server_nick} said hello to ${program.worker_id} time ${greetings_from_server.count}. Time to reply...`
    );

    const greetings: GreetingFromClient = {
      client_nick: program.worker_id,
      count: greetings_from_server.count + 1,
    };
    manager.emit('hello', greetings);
  }
);
