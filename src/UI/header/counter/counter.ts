import {ICounter} from "../../../typing/interfaces";
import {AnimatedSprite, Container, Sprite} from "pixi.js";
import {ConfigType, CounterType} from "../../../typing/types";

class Counter implements ICounter {
    anchorX: number;
    fieldWidth: number;
    tileSize: number;
    textures: object;
    numbers: Array<AnimatedSprite>;
    posX: number;

    constructor({textures, tileSize, fieldWidth, anchorX, posX}: ConfigType & CounterType) {
        this.anchorX = anchorX;
        this.textures = textures;
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.posX = posX;
    }

    setBg(container: Container): void {
        const bg = new Sprite(this.textures['nums_background.svg']);

        bg.anchor.set(this.anchorX, 0.5);
        bg.width = this.tileSize * 3;
        bg.height = this.tileSize * 1.6;

        container.addChild(bg);
    }

    create(): Container {
        const container = new Container();
        container.position.x = this.posX;
        container.position.y = (this.tileSize * 0.7 * 2 + this.tileSize * 2) / 2;

        this.setBg(container);

        this.numbers = Array.from({length: 3}, (_, index) => {
            const number = new AnimatedSprite(Object.values(this.textures));

            number.anchor.set(this.anchorX, 0.5);
            number.gotoAndStop(0);
            number.width = this.tileSize * 0.9;
            number.height = this.tileSize * 1.4;
            number.x = this.anchorX ?
                number.x - (this.tileSize * 0.95 * index + 4) :
                number.x + this.tileSize * 0.95 * index + 4;
            number.y = 0;

            container.addChild(number);

            return number;
        });

        return container;
    }
}

export {Counter}
