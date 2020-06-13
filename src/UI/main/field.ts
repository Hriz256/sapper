import {Tile} from "./tile";
import {ConfigType, OpenDispatchType} from "../../typing/types";
import {Container} from "pixi.js";
import {IField, ITile, ITimer} from "../../typing/interfaces";
import {Subscriber} from "../../logic/subscriber";
import {mediator} from "../../logic/mediator";

class Field extends Subscriber implements IField {
    readonly fieldHeight: number;
    readonly fieldWidth: number;
    readonly mineQuantity: number;
    readonly textures: object;
    readonly tileSize: number;
    tiles: ITile[][];
    tilesLeft: number;
    timer: ITimer;

    constructor({textures, tileSize, fieldWidth, fieldHeight, mineQuantity}: ConfigType) {
        super();

        this.textures = textures;
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.mineQuantity = mineQuantity;
        this.tilesLeft = this.fieldHeight * this.fieldHeight - this.mineQuantity;
    }

    create(): Container {
        const container = new Container();

        this.tiles = Array.from({length: this.fieldWidth}, (_, indexX) => {

            return Array.from({length: this.fieldHeight}, (_, indexY) => {
                const tileInstance = new Tile({
                    textures: this.textures,
                    tileSize: this.tileSize,
                    x: indexX,
                    y: indexY,
                });

                mediator.register(tileInstance, `tileInstance[${indexX}][${indexY}]`);

                tileInstance.create();

                container.addChild(tileInstance.tile);

                return tileInstance;
            });

        });

        this.sendAction({action: 'update', to: 'minesCount', value: 10});
        this.setMines();

        return container;
    }

    getQuantityFlags(): void {
        const quantityFlags = this.getTiles().filter(tile => tile.isSetFlag()).length;

        this.sendAction({action: 'update', to: 'minesCount', value: this.mineQuantity - quantityFlags});
    }

    restart(): void {
        Array.from(this.getTiles(), tile => tile.resetTile());

        this.tilesLeft = this.fieldHeight * this.fieldHeight - this.mineQuantity;
        this.setMines();
    }

    decreaseTilesLeft(isLose: boolean): void {
        this.tilesLeft--;

        if (!this.tilesLeft) {
            if (isLose) {
                this.sendAction({action: 'setLoseFrame', to: 'smile'});
            } else {
                this.sendAction({action: 'setWinFrame', to: 'smile'});
                this.setFlagsOnMines();
            }

            this.sendAction({action: 'stop', to: 'timer'});
        }
    }

    setFlagsOnMines(): void {
        const mines: Array<ITile> = this.getTiles().filter(tile => tile.currentState === tile.states.notPressedMine);

        Array.from(mines, mine => mine.setFlag(false, true));
    }

    toggleTilesInteractive(interactive: boolean): void {
        Array.from(this.getTiles(), tile => tile.setInteractive(interactive));
    }

    getRandomTile(): ITile {
        const tiles: Array<ITile> = this.getTiles();

        return tiles[Math.floor(Math.random() * tiles.length)];
    }

    setMines(): void {
        let tile: ITile = this.getRandomTile();

        Array.from({length: this.mineQuantity}, () => {
            while (tile.getValue() === tile.states.notPressedMine) {
                tile = this.getRandomTile();
            }

            tile.setValue(tile.states.notPressedMine);
            this.updateSurroundingTiles(tile);
        });
    }

    updateSurroundingTiles(tile: ITile): void {
        const tilesWithoutMines: Array<ITile> = this.getSurroundingTiles(tile).filter(tile => {
            return tile.getValue() !== tile.states.notPressedMine;
        });

        Array.from(tilesWithoutMines, tile => tile.setValue(tile.getValue() + 1));
    };

    getSurroundingTiles(tile: ITile): Array<ITile> {
        const tileList: Array<ITile> = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                const row = tile.x + x;
                const column = tile.y + y;

                if (!x && !y) {
                    continue;
                }

                if (row < 0 || row >= this.fieldWidth || column < 0 || column >= this.fieldHeight) {
                    continue;
                }

                tileList.push(this.tiles[row][column]);
            }
        }

        return tileList;
    }

    openDispatch({isGameOver, tile}: OpenDispatchType): void {
        this.openCells(isGameOver ? this.getTiles() : this.getSurroundingTiles(tile), isGameOver);
    }

    openCells(tiles: Array<ITile>, isGameOver: boolean) {
        Array.from(tiles, tile => {
            !tile.isOpened() && tile.open(false, isGameOver)
        });

        this.getQuantityFlags();
    }

    getTiles(): Array<ITile> {
        return this.tiles.reduce((acc, tile) => [...acc, ...tile], []);
    }
}

export {Field};
