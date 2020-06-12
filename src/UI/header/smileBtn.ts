import {IField, IMinesCounter, ISmile, ITimer} from "../../typing/interfaces";
import {AnimatedSprite} from "pixi.js";
import {SmileType} from "../../typing/types";

class Smile implements ISmile {
    readonly fieldWidth: number;
    readonly textures: object;
    readonly tileSize: number;
    smile: AnimatedSprite;
    timer: ITimer;
    minesCount: IMinesCounter;
    field: IField;

    constructor({tileSize, fieldWidth, textures, field, timer, minesCount}: SmileType) {
        this.textures = textures;
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.field = field;
        this.timer = timer;
        this.minesCount = minesCount;
    }

    create(): AnimatedSprite {
        this.smile = new AnimatedSprite(Object.values(this.textures));

        this.smile.gotoAndStop(0);
        this.smile.anchor.set(0.5);
        this.smile.width = this.tileSize * 1.6;
        this.smile.height = this.tileSize * 1.6;
        this.smile.x = (this.tileSize * 0.7 * 2 + this.tileSize * this.fieldWidth) / 2;
        this.smile.y = (this.tileSize * 0.7 * 2 + this.tileSize * 2) / 2;
        this.smile.interactive = true;
        this.smile.buttonMode = true;

        this.smile.on('pointerup', () => {
            this.restart();

            setTimeout(this.setInitFrame.bind(this), 150);
        });

        return this.smile;
    }

    restart(): void {
        this.smile.gotoAndStop(1);
        this.timer.reset();
        this.minesCount.update(10);
        this.field.restart();
    }

    setInitFrame(): void {
        this.smile.gotoAndStop(0);
    }

    setWinFrame(): void {
        this.smile.gotoAndStop(3);
    }

    setLoseFrame(): void {
        this.smile.gotoAndStop(2);
    }
}

export {Smile};
