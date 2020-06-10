import * as PIXI from "pixi.js";

const createWalls = ({tileSize, fieldHeight, fieldWidth, frameContainer}) => {
    const borderVertLeft = new PIXI.Sprite.from('assets/border_vert.png');
    borderVertLeft.height = tileSize * 0.7 * 3 + tileSize * (fieldHeight + 2);
    borderVertLeft.width = tileSize * 0.7;

    const borderVertRight = new PIXI.Sprite.from('assets/border_vert.png');
    borderVertRight.height = tileSize * 0.7 * 3 + tileSize * (fieldHeight + 2);
    borderVertRight.width = tileSize * 0.7;
    borderVertRight.x = tileSize * 0.7 + tileSize * fieldWidth;

    const borderHorUp = new PIXI.Sprite.from('assets/border_hor.png');
    borderHorUp.height = tileSize * 0.7;
    borderHorUp.width = tileSize * 0.7 * 2 + tileSize * fieldWidth;

    const borderHorMiddle = new PIXI.Sprite.from('assets/border_hor.png');
    borderHorMiddle.height = tileSize * 0.7;
    borderHorMiddle.width = tileSize * 0.7 * 2 + tileSize * fieldWidth;
    borderHorMiddle.y = tileSize * 0.7 + tileSize * 2;

    const borderHorBottom = new PIXI.Sprite.from('assets/border_hor.png');
    borderHorBottom.height = tileSize * 0.7;
    borderHorBottom.width = tileSize * 0.7 * 2 + tileSize * fieldWidth;
    borderHorBottom.y = tileSize * 0.7 * 2 + tileSize * (fieldHeight + 2);

    Array.from([borderVertLeft, borderVertRight, borderHorUp, borderHorBottom, borderHorMiddle], wall => {
        wall.anchor.set(0);

        frameContainer.addChild(wall);
    });
};


const createCorner = ({tileSize, fieldHeight, fieldWidth, frameContainer}) => {
    const cornerBottomLeft = new PIXI.Sprite.from('assets/corner_bottom_left.png');
    cornerBottomLeft.x = 0;
    cornerBottomLeft.y = tileSize * 0.7 * 2 + tileSize * (fieldHeight + 2);

    const cornerBottomRight = new PIXI.Sprite.from('assets/corner_bottom_right.png');
    cornerBottomRight.x = tileSize * 0.7 + tileSize * fieldWidth;
    cornerBottomRight.y = tileSize * 0.7 * 2 + tileSize * (fieldHeight + 2);

    const cornerUpLeft = new PIXI.Sprite.from('assets/corner_up_left.png');
    cornerUpLeft.x = 0;
    cornerUpLeft.y = 0;

    const cornerUpRight = new PIXI.Sprite.from('assets/corner_up_right.png');
    cornerUpRight.x = tileSize * 0.7 + tileSize * fieldWidth;
    cornerUpRight.y = 0;


    const crossroadsLeft = new PIXI.Sprite.from('assets/crossroads_left.png');
    crossroadsLeft.x = 0;
    crossroadsLeft.y = tileSize * 0.7 + tileSize * 2;

    const crossroadsRight = new PIXI.Sprite.from('assets/crossroads_right.png');
    crossroadsRight.x = tileSize * 0.7 + tileSize * fieldWidth;
    crossroadsRight.y = tileSize * 0.7 + tileSize * 2;

    Array.from([
        cornerBottomLeft, cornerBottomRight, cornerUpLeft, cornerUpRight, crossroadsLeft, crossroadsRight
    ], corner => {
        corner.anchor.set(0);
        corner.height = tileSize * 0.7;
        corner.width = tileSize * 0.7;

        frameContainer.addChild(corner);
    });
};


const createFrame = ({tileSize, fieldHeight, fieldWidth}) => {
    const frameContainer = new PIXI.Container();

    createWalls({tileSize, fieldHeight, fieldWidth, frameContainer});
    createCorner({tileSize, fieldHeight, fieldWidth, frameContainer});


    return frameContainer;
};

export {createFrame};
