import {ISmile} from "../../typing/interfaces";
import {AnimatedSprite} from "pixi.js";
import {SmileType} from "../../typing/types";
import {Subscriber} from "../../logic/subscriber";

class Smile extends Subscriber implements ISmile {
    readonly fieldWidth: number;
    readonly textures: object;
    readonly tileSize: number;
    smile: AnimatedSprite;

    constructor({tileSize, fieldWidth, textures}: SmileType) {
        super();

        this.textures = textures;
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
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
            this.smile.gotoAndStop(1);
            this.restart();
        });

        return this.smile;
    }

    restart(): void {
        this.sendAction({action: 'reset', to: 'timer'});
        this.sendAction({action: 'update', to: 'minesCount', value: 10});
        this.sendAction({action: 'restart', to: 'field'});

        setTimeout(this.setInitFrame.bind(this), 150);
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
