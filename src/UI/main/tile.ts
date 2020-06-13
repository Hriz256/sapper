import {AnimatedSprite} from 'pixi.js'
import InteractionEvent = PIXI.interaction.InteractionEvent;
import {ITile} from "../../typing/interfaces";
import {StatesType, TileType} from "../../typing/types";
import {Subscriber} from "../../logic/subscriber";

class Tile extends Subscriber implements ITile {
    readonly states: StatesType;
    readonly textures: object;
    readonly tileSize: number;
    readonly x: number;
    readonly y: number;
    currentState: number;
    tile: AnimatedSprite;

    constructor({tileSize, textures, x, y}: TileType) {
        super();

        this.tileSize = tileSize;
        this.textures = textures;
        this.x = x;
        this.y = y;

        this.states = {
            init: 0,
            pressedMine: 9,
            notPressedMine: 10,
            wrongMine: 11,
            flag: 12,
            default: 13
        };

        this.currentState = 0;
    }

    create(): void {
        this.tile = new AnimatedSprite(Object.values(this.textures));

        this.tile.gotoAndStop(Object.values(this.textures).length - 1);
        this.tile.anchor.set(0);
        this.tile.width = this.tileSize;
        this.tile.height = this.tileSize;
        this.tile.x = this.tileSize * 0.7 + this.tileSize * this.x;
        this.tile.y = this.tileSize * 0.7 * 2 + this.tileSize * (this.y + 2);
        this.tile.buttonMode = true;
        this.setInteractive(true);
        this.tile.on('pointerdown', this.buttonDown.bind(this))
    }

    buttonDown(event: InteractionEvent): void {
        this.sendAction({action: 'start', to: 'timer'});

        !event.data.button ?
            !this.isSetFlag() && this.open(true, false) :
            this.setFlag(true, !this.isSetFlag());
    }

    setFlag(interactive: boolean, active: boolean): void {
        this.tile.gotoAndStop(active ? this.states.flag : this.states.default);
        this.tile.interactive = interactive;
        this.sendAction({action: 'getQuantityFlags', to: 'field'});
    }

    setInteractive(interactive: boolean): void {
        this.tile.interactive = interactive;
    }

    isSetFlag(): boolean {
        return this.tile.currentFrame === this.states.flag;
    }

    setValue(value: number): void {
        this.currentState = value;
    }

    getValue(): number {
        return this.currentState;
    }

    isOpened(): boolean {
        return this.tile.currentFrame === this.currentState;
    }

    resetTile(): void {
        this.setValue(0);
        this.tile.gotoAndStop(this.states.default);
        this.setInteractive(true);
    }

    open(byUser: boolean, isGameOver: boolean = false): void {
        switch (this.getValue()) {
            case this.states.notPressedMine:
                byUser && this.setValue(this.states.pressedMine);
                this.tile.currentFrame === this.states.flag && this.setValue(this.states.flag);

                this.tile.gotoAndStop(this.currentState);
                !isGameOver && this.sendAction({action: 'openDispatch', to: 'field', value: {isGameOver: true, tile: this}});

                break;
            case this.states.init:
                if (isGameOver && this.tile.currentFrame === this.states.flag) {
                    this.setValue(this.states.wrongMine);
                }

                this.tile.gotoAndStop(this.currentState);
                this.sendAction({action: 'decreaseTilesLeft', to: 'field', value: isGameOver});
                !isGameOver && this.sendAction({action: 'openDispatch', to: 'field', value: {isGameOver: false, tile: this}});

                break;
            default:
                if (isGameOver && this.tile.currentFrame === this.states.flag) {
                    this.setValue(this.states.wrongMine);
                }

                this.tile.gotoAndStop(this.currentState);
                this.sendAction({action: 'decreaseTilesLeft', to: 'field', value: isGameOver});
        }

        this.setInteractive(false);
    }
}

export {Tile};
