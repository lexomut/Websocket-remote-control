import robot from 'robotjs';
import { type } from 'os';
export type Action = 'up'|'down'|'left'|'right' | 'position'

const screenSize = robot.getScreenSize();

export async function mouse( action:Action,value:string|number=0) {
    const mousePos = robot.getMousePos();

    if (action==='position') {
        return `mouse_position {${mousePos.x}},{${mousePos.y}}`;
    }

    const {x,y}=move[action](+value);
    await robot.moveMouse(mousePos.x+x, mousePos.y+y);

    return 'mouse '+action+' ' +(value||'');

}

export const move = {
    up : (value:number) => {
        return {x: 0, y: -value};
    },
    down  : (value:number) => {
        return {x: 0, y: value};
    },
    left : (value:number) => {
        return {y: 0, x: -value};
    },
    right  : (value:number) => {
        return {y: 0, x: value};
    },
    position:() => {
        return {x: 0, y: 0};
    }
};

