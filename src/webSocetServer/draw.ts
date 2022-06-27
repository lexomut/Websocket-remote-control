import { Action, move } from './mouse';
import robot from 'robotjs';

export function draw(figure: string, width: number, heigth: number) {
    robot.mouseToggle('down','left');
    if (figure==='circle') {
        drawCircle(width);
    }

    let alg: { direction: Action, width: number }[] = [];
    if (figure === 'rectangle') {
        alg = [{direction: 'right', width}, {direction: 'down', width: heigth},
            {direction: 'left', width }, {direction: 'up', width: heigth}];
    }
    if (figure === 'square') {
        alg = [{direction: 'right', width}, {direction: 'down', width}, {direction: 'left', width}, {
            direction: 'up',
            width
        }];
    }
    alg.forEach(({direction, width}) => {
        drawLine(direction, width);
    });
    robot.mouseToggle('up','left');

    return 'draw_'+figure+ ' ' + width + ' ' +(heigth||'');
}


function drawLine(direction: Action, width: number) {
    const mousePos = robot.getMousePos();
    for (let i = 0; i < width; i+=2) {
        const {x, y} = move[direction](i);
        robot.moveMouse(mousePos.x + x, mousePos.y + y);
    }
}


function drawCircle(r:number) {
    const mousePos = robot.getMousePos();
    for (let i = 0; i <= Math.PI * 2; i += 0.02) {
        const x = mousePos.x + (r * Math.cos(i))-r;
        const y = mousePos.y + (r * Math.sin(i));
        robot.dragMouse(x, y);
    };
}
