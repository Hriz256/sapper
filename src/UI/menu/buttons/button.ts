import {Container, TextStyle, Text} from "pixi.js";
import {IButton} from "../../../typing/interfaces";
import {ButtonType, GraphicsRectType} from "../../../typing/types";
import {createBg} from "../../createBg";
import {Subscriber} from "../../../logic/subscriber";

class Button extends Subscriber implements IButton {
    readonly height: number;
    readonly posX: number;
    readonly posY: number;
    readonly text: string;
    readonly width: number;
    readonly anchorY: number;
    readonly bgVisibility: boolean;
    readonly fontSize: number;
    button: Text;

    constructor({width, height, text, posX, posY, anchorY, fontSize, bgVisibility = true}: ButtonType & GraphicsRectType) {
        super();

        this.width = width;
        this.height = height;
        this.text = text;
        this.posX = posX;
        this.posY = posY;
        this.anchorY = anchorY;
        this.fontSize = fontSize;
        this.bgVisibility = bgVisibility;
    }

    create(): Container {
        const container = new Container();

        if (this.bgVisibility) {
            const bg = createBg({
                width: this.width,
                height: this.height,
                posX: this.posX,
                posY: this.posY
            });

            container.addChild(bg);
        }

        container.addChild(this.setText());

        return container;
    }

    setText(): Text {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: this.fontSize,
            fontWeight: 'bold',
            fill: ['#ffffff', '#ff6c62'],
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });

        this.button = new Text(this.text, style);
        this.button.anchor.set(0.5, this.anchorY);
        this.button.interactive = true;
        this.button.buttonMode = true;
        this.button.x = this.posX + this.width / 2;
        this.button.y = this.posY + this.height * this.anchorY;

        return this.button;
    }
}

export {Button};
