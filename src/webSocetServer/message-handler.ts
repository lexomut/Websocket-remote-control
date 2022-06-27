import { Action, mouse } from './mouse';
import { draw } from './draw';
import { Duplex } from 'stream';
import { print } from './print';

export async function messageHandler(stream: Duplex, chunk:Buffer) {
    let message = chunk.toString();

    let answer;
    try {
        const [command, firstArg, secondArg] = message.split(' ');
        const [module, action] = command.split('_');
        switch (module) {
            case 'mouse' : {
                answer = await mouse(action as Action, firstArg);
                break;
            }
            case 'draw' : {
                answer = await draw(action as Action, +firstArg ,+secondArg);
                break;
            }

            case 'prnt' : {
                answer = await print();
                break;
            }
            default: {
                console.log('command not found');
            }
        }
        stream.write(answer||'\0');
        console.log(message);

    } catch (e) {
        throw e;
    }


}
