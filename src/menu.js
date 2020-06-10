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

class Timer {
    constructor({tileSize, fieldWidth}) {
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.date = new Date();
        this.allowUpdate = false;
    }

    setBg() {
        const bg = new PIXI.Sprite.from('assets/nums_background.svg');

        bg.anchor.set(1, 0.5);
        bg.width = this.tileSize * 3;
        bg.height = this.tileSize * 1.6;

        this.timerContainer.addChild(bg);
    }

    create() {
        this.timerContainer = new PIXI.Container();
        this.timerContainer.position.x = (this.tileSize * 0.7 * 2 + this.tileSize * this.fieldWidth) - this.tileSize * 0.9;
        this.timerContainer.position.y = (this.tileSize * 0.7 * 2 + this.tileSize * 2) / 2;

        const numberTextures = Array.from({length: 10}, (_, index) => {
            return PIXI.Texture.from(`d${index}.svg`)
        });

        this.setBg();

        this.numbers = Array.from({length: 3}, (_, index) => {
            const number = new PIXI.AnimatedSprite(numberTextures);

            number.anchor.set(1, 0.5);
            number.gotoAndStop(0);
            number.width = this.tileSize * 0.9;
            number.height = this.tileSize * 1.4;
            number.x -= this.tileSize * 0.95 * index + 4;
            number.y = 0;

            this.timerContainer.addChild(number);

            return number;
        });
    }

    getContainer() {
        return this.timerContainer;
    }

    update() {
        const newDate = `${Math.floor((Date.now() - this.date) / 1000)}`;

        if (this.allowUpdate) {
            this.numbers[0].gotoAndStop(+newDate.slice(-1));
            this.numbers[1].gotoAndStop(+newDate.slice(-2, -1));
            this.numbers[2].gotoAndStop(+newDate.slice(-3, -2));
        }
    }

    reset() {
        Array.from(this.numbers, number => number.gotoAndStop(0));
    }

    stop() {
        this.allowUpdate = false;
    }

    start() {
        this.date = Date.now();
        this.allowUpdate = true;
    }
}

export {createSmile, Timer};

