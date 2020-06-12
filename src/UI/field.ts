import {Tile} from "./tile";
import {ConfigType} from "../typing/types";
import {Container} from "pixi.js";
import {IField, ITile} from "../typing/interfaces";

class Field implements IField {
    readonly fieldHeight: number;
    readonly fieldWidth: number;
    readonly mineQuantity: number;
    readonly textures: object;
    readonly tileSize: number;
    smile: object;
    tiles: ITile[][];
    tilesLeft: number;
    timer: object;

    constructor({textures, tileSize, fieldWidth, fieldHeight, mineQuantity}: ConfigType) {
        this.textures = textures;
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.mineQuantity = mineQuantity;
        this.tilesLeft = this.fieldHeight * this.fieldHeight - this.mineQuantity;
    }

    create(): Container {
        // this.smile = smile;
        // this.timer = timer;

        const container = new Container();

        this.tiles = Array.from({length: this.fieldWidth}, (_, indexX) => {

            return Array.from({length: this.fieldHeight}, (_, indexY) => {
                const tileInstance = new Tile({
                    textures: this.textures,
                    tileSize: this.tileSize,
                    x: indexX,
                    y: indexY,
                    openDispatchCallback: this.openDispatch.bind(this),
                    tilesLeftCallback: this.decreaseTilesLeft.bind(this),
                    // timer
                });

                tileInstance.create();

                container.addChild(tileInstance.tile);

                return tileInstance;
            });

        });

        this.setMines();

        return container;
    }

    restart(): void {
        Array.from(this.getTiles(), tile => tile.resetTile());

        this.tilesLeft = this.fieldHeight * this.fieldHeight - this.mineQuantity;
        this.setMines();
    }

    decreaseTilesLeft(isLose: boolean): void {
        this.tilesLeft--;
        console.log(this.tilesLeft, 'left')

        if (!this.tilesLeft) {
            if (isLose) {
                // this.smile.setLoseFrame()
            } else {
                // this.smile.setWinFrame();

                this.setFlagsOnMines();
            }

            // this.timer.stop();
        }
    }

    setFlagsOnMines(): void {
        const mines: Array<ITile> = this.getTiles().filter(tile => tile.currentState === tile.states.notPressedMine);

        Array.from(mines, mine => {
            mine.tile.gotoAndStop(mine.states.flag);
            mine.tile.interactive = false;
        });
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
        const surroundingTiles: Array<ITile> = this.getSurroundingTiles(tile);

        Array.from(surroundingTiles, tile => {
            tile.getValue() !== tile.states.notPressedMine && tile.setValue(tile.getValue() + 1)
        })
    };

    openDispatch(isGameOver: boolean, tile: ITile): void {
        this.openCells(isGameOver ? this.getTiles() : this.getSurroundingTiles(tile), isGameOver);
    }

    openCells(tiles: Array<ITile>, isGameOver: boolean) {
        Array.from(tiles, tile => {
            !tile.isOpened() && tile.open(false, isGameOver)
        });
    }

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

    getTiles(): Array<ITile> {
        return this.tiles.reduce((acc, tile) => [...acc, ...tile], []);
    }
}

export {Field};
