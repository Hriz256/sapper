import {Container, Sprite} from "pixi.js";
import {ConfigType} from "../../typing/types";
import {createBg} from '../createBg';

const createWalls = ({textures, tileSize, fieldWidth, fieldHeight, container}: ConfigType): void => {
    const borderVertLeft = new Sprite(textures['border_vert.png']);
    borderVertLeft.height = tileSize * 0.7 * 3 + tileSize * (fieldHeight + 2);
    borderVertLeft.width = tileSize * 0.7;

    const borderVertRight = new Sprite(textures['border_vert.png']);
    borderVertRight.height = tileSize * 0.7 * 3 + tileSize * (fieldHeight + 2);
    borderVertRight.width = tileSize * 0.7;
    borderVertRight.x = tileSize * 0.7 + tileSize * fieldWidth;

    const borderHorUp = new Sprite(textures['border_hor.png']);
    borderHorUp.height = tileSize * 0.7;
    borderHorUp.width = tileSize * 0.7 * 2 + tileSize * fieldWidth;

    const borderHorMiddle = new Sprite(textures['border_hor.png']);
    borderHorMiddle.height = tileSize * 0.7;
    borderHorMiddle.width = tileSize * 0.7 * 2 + tileSize * fieldWidth;
    borderHorMiddle.y = tileSize * 0.7 + tileSize * 2;

    const borderHorBottom = new Sprite(textures['border_hor.png']);
    borderHorBottom.height = tileSize * 0.7;
    borderHorBottom.width = tileSize * 0.7 * 2 + tileSize * fieldWidth;
    borderHorBottom.y = tileSize * 0.7 * 2 + tileSize * (fieldHeight + 2);

    Array.from([borderVertLeft, borderVertRight, borderHorUp, borderHorMiddle, borderHorBottom], wall => {
        wall.anchor.set(0);

        container.addChild(wall);
    });
};


const createCorner = ({textures, tileSize, fieldHeight, fieldWidth, container}: ConfigType): void => {
    const cornerBottomLeft = new Sprite(textures['corner_bottom_left.png']);
    cornerBottomLeft.x = 0;
    cornerBottomLeft.y = tileSize * 0.7 * 2 + tileSize * (fieldHeight + 2);

    const cornerBottomRight = new Sprite(textures['corner_bottom_right.png']);
    cornerBottomRight.x = tileSize * 0.7 + tileSize * fieldWidth;
    cornerBottomRight.y = tileSize * 0.7 * 2 + tileSize * (fieldHeight + 2);

    const cornerUpLeft = new Sprite(textures['corner_up_left.png']);
    cornerUpLeft.x = 0;
    cornerUpLeft.y = 0;

    const cornerUpRight = new Sprite(textures['corner_up_right.png']);
    cornerUpRight.x = tileSize * 0.7 + tileSize * fieldWidth;
    cornerUpRight.y = 0;

    const crossroadsLeft = new Sprite(textures['crossroads_left.png']);
    crossroadsLeft.x = 0;
    crossroadsLeft.y = tileSize * 0.7 + tileSize * 2;

    const crossroadsRight = new Sprite(textures['crossroads_right.png']);
    crossroadsRight.x = tileSize * 0.7 + tileSize * fieldWidth;
    crossroadsRight.y = tileSize * 0.7 + tileSize * 2;

    Array.from([
        cornerBottomLeft, cornerBottomRight, cornerUpLeft, cornerUpRight, crossroadsLeft, crossroadsRight
    ], corner => {
        corner.anchor.set(0);
        corner.height = tileSize * 0.7;
        corner.width = tileSize * 0.7;

        container.addChild(corner);
    });
};

const createFrame = (parameters: ConfigType): Container => {
    const container = new Container();

    const bg = createBg({
        posX: parameters.tileSize * 0.7,
        posY: parameters.tileSize * 0.7,
        width: parameters.tileSize * parameters.fieldWidth,
        height: parameters.tileSize * 2
    });

    createWalls({...parameters, container});
    createCorner({...parameters, container});

    container.addChild(bg);

    return container;
};

export {createFrame};
