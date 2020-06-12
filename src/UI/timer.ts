import {ConfigType} from "../typing/types";
import {Container, Sprite, AnimatedSprite} from "pixi.js"
import {ITimer} from "../typing/interfaces";

class Timer implements ITimer {
    fieldWidth: number;
    tileSize: number;
    textures: object;
    date: number;
    allowUpdate: boolean;
    numbers: Array<AnimatedSprite>;

    constructor({textures, tileSize, fieldWidth}: ConfigType) {
        this.textures = textures;
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.date = Date.now();
        this.allowUpdate = false;
    }

    setBg(timerContainer) {
        const bg = new Sprite(this.textures['d10.svg']);

        bg.anchor.set(1, 0.5);
        bg.width = this.tileSize * 3;
        bg.height = this.tileSize * 1.6;

        timerContainer.addChild(bg);
    }

    create(): Container {
        const timerContainer = new Container();
        timerContainer.position.x = (this.tileSize * 0.7 * 2 + this.tileSize * this.fieldWidth) - this.tileSize * 0.9;
        timerContainer.position.y = (this.tileSize * 0.7 * 2 + this.tileSize * 2) / 2;

        this.setBg(timerContainer);

        this.numbers = Array.from({length: 3}, (_, index) => {
            const number = new AnimatedSprite(Object.values(this.textures));

            number.anchor.set(1, 0.5);
            number.gotoAndStop(0);
            number.width = this.tileSize * 0.9;
            number.height = this.tileSize * 1.4;
            number.x -= this.tileSize * 0.95 * index + 4;
            number.y = 0;

            timerContainer.addChild(number);

            return number;
        });

        return timerContainer;
    }


    update(): void {
        const newDate = `${Math.floor((Date.now() - this.date) / 1000)}`;

        if (this.allowUpdate) {
            this.numbers[0].gotoAndStop(+newDate.slice(-1));
            this.numbers[1].gotoAndStop(+newDate.slice(-2, -1));
            this.numbers[2].gotoAndStop(+newDate.slice(-3, -2));
        }
    }

    reset(): void {
        this.stop();
        Array.from(this.numbers, number => number.gotoAndStop(0));
    }

    stop(): void {
        this.allowUpdate = false;
    }

    start(): void {
        this.date = Date.now();
        this.allowUpdate = true;
    }
}

export {Timer};

