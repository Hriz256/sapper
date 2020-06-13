import {GraphicsRectType} from "../typing/types";
import {Graphics} from "pixi.js";

const createBg = ({posX, posY, width, height}: GraphicsRectType): Graphics => {
    const graphics = new Graphics();

    graphics.beginFill(0xb3b3b3);
    graphics.drawRect(posX, posY, width, height);
    graphics.endFill();
    graphics.interactive = true;

    return graphics;
};

export {createBg};
