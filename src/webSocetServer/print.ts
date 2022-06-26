import robot from 'robotjs';
import Jimp from 'jimp';

export async function print() {
    const mousePos = robot.getMousePos();
    const img = robot.screen.capture(mousePos.x, mousePos.y, 200, 200);
    const jimp = new Jimp({data: img.image, width: img.width, height: img.height});
    const res = await jimp.getBase64Async(Jimp.MIME_PNG);
    return 'prnt_scrn ' + res.split(',')[1];
}
