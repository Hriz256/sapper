import * as PIXI from "pixi.js";

const createSmile = ({tileSize, fieldWidth}) => {
    const smileTextures = Array.from({length: 3}, (_, index) => {
        return PIXI.Texture.from(`face_${index}.svg`)
    });

    const smile = new PIXI.AnimatedSprite(smileTextures);

    smile.gotoAndStop(0);
    smile.anchor.set(0.5);
    smile.width = tileSize * 1.6;
    smile.height = tileSize * 1.6;
    smile.x = (tileSize * 0.7 * 2 + tileSize * fieldWidth) / 2;
    smile.y = (tileSize * 0.7 * 2 + tileSize * 2) / 2;
    smile.interactive = true;
    smile.buttonMode = true;

    smile.on('pointerup', () => {
        smile.gotoAndStop(1);

        setTimeout(() => smile.gotoAndStop(0), 150);
    });

    return smile;
};

const createTimer = ({tileSize, fieldWidth}) => {
    const timerContainer = new PIXI.Container();
    timerContainer.position.x = (tileSize * 0.7 * 2 + tileSize * fieldWidth) - tileSize * 0.9;
    timerContainer.position.y = (tileSize * 0.7 * 2 + tileSize * 2) / 2;

    const numberTextures = Array.from({length: 10}, (_, index) => {
        return PIXI.Texture.from(`d${index}.svg`)
    });

    const bg = new PIXI.Sprite.from('assets/nums_background.svg');

    bg.anchor.set(1, 0.5);
    bg.width = tileSize * 3;
    bg.height = tileSize * 1.6;

    timerContainer.addChild(bg);

    const numbers = Array.from({length: 3}, (_, index) => {
        const number = new PIXI.AnimatedSprite(numberTextures);

        number.anchor.set(1, 0.5);
        number.gotoAndStop(0);
        number.width = tileSize * 0.9;
        number.height = tileSize * 1.4;
        number.x -= tileSize * 0.95 * index + 4;
        number.y = 0;

        timerContainer.addChild(number);
    });

    return {
        getContainer() {
            return timerContainer
        },

        updateTimer() {

        },

        resetTimer() {

        },

        startTimer() {

        }
    };
};

export {createSmile, createTimer};

