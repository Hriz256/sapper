import {Tile} from "../tile/tile";
import {ConfigType} from "../types";
import {Container} from "pixi.js";
import {IField, ITile} from "../interfaces";

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
        Array.from({length: this.fieldWidth}, (_, indexY) => {

            Array.from({length: this.fieldHeight}, (_, indexX) => {
                this.tiles[indexY][indexX].resetTile();
            })

        });

        this.tilesLeft = this.fieldHeight * this.fieldHeight - this.mineQuantity;
        this.setMines();
    }

    decreaseTilesLeft(isLose: boolean): void {
        this.tilesLeft--;

        if (!this.tilesLeft) {
            if (isLose) {
                // this.smile.setLoseFrame()
            } else {
                // this.smile.setWinFrame();

                Array.from({length: this.fieldWidth}, (_, indexY) => {

                    Array.from({length: this.fieldHeight}, (_, indexX) => {
                        const tileInstance = this.tiles[indexY][indexX];

                        if (tileInstance.currentState === tileInstance.states.notPressedMine) {
                            tileInstance.tile.gotoAndStop(tileInstance.states.flag);
                            tileInstance.tile.interactive = false;
                        }
                    })

                });
            }

            // this.timer.stop();
        }
    }

    getRandomTile(): ITile {
        const randomRow = Math.floor(Math.random() * this.fieldWidth);
        const randomColumn = Math.floor(Math.random() * this.fieldHeight);

        return this.tiles[randomRow][randomColumn];
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

    getSurroundingTiles(tile: ITile): Array<ITile> {
        const tileList = [];

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

    openDispatch(isGameOver: boolean, tile: ITile): void {
        isGameOver ? this.openAllCells() : this.openEmptyTiles(tile);
    }

    openAllCells(): void {
        Array.from({length: this.fieldWidth}, (_, indexY) => {

            Array.from({length: this.fieldHeight}, (_, indexX) => {
                const tile: ITile = this.tiles[indexY][indexX];

                !tile.isOpened() && tile.open(false, true);
            })

        });
    }

    openEmptyTiles(tile: ITile): void {
        const tileList = [tile];
        let surroundingTiles;
        let currentTile;

        while (tileList.length) {
            currentTile = tileList[0];
            surroundingTiles = this.getSurroundingTiles(currentTile);

            while (surroundingTiles.length) {
                currentTile = surroundingTiles.shift();

                if (currentTile.isOpened()) {
                    continue;
                }

                currentTile.open(false, false);
                !currentTile.getValue() && tileList.push(currentTile);
            }

            tileList.shift();
        }
    }
}

export {Field};
