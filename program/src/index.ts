import { InstanceManager } from '@sallar-network/client';
import { GreetingFromClient, GreetingFromServer } from '@shared/greetings';
import io from 'socket.io-client';

const ClientNick = 'Max';

const program = new InstanceManager(io);

program.on(
  'say-hello',
  async (greetings_from_server: GreetingFromServer, manager) => {
    console.log(
      `Server ${greetings_from_server.server_nick} said hello to ${ClientNick}. Time to reply...`
    );

    const greetings: GreetingFromClient = { client_nick: ClientNick };
    manager.emit('hello', greetings);
  }
);
