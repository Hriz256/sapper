import * as PIXI from "pixi.js";
import {Tile} from "./tile";

class Field {
    constructor({tileSize, fieldWidth, fieldHeight, mineQuantity}) {
        this.tileSize = tileSize;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.mineQuantity = mineQuantity;
    }

    create(timer) {
        const field = new PIXI.Container();

        const numbersTextures = Array.from({length: 9}, (_, index) => {
            return PIXI.Texture.from(`number_${index}.svg`)
        });

        const mineTextures = Array.from({length: 3}, (_, index) => {
            return PIXI.Texture.from(`mine_${index}.svg`)
        });

        const tileTextures = Array.from({length: 2}, (_, index) => {
            return PIXI.Texture.from(`state_${index}.svg`)
        });

        this.tiles = Array.from({length: this.fieldWidth}, (_, indexX) => {

            return Array.from({length: this.fieldHeight}, (_, indexY) => {
                const tileInstance = new Tile({
                    textures: [numbersTextures, mineTextures, tileTextures],
                    tileSize: this.tileSize,
                    x: indexX,
                    y: indexY,
                    openDispatchCallback: this.openDispatch.bind(this),
                    timer
                });

                tileInstance.create();

                field.addChild(tileInstance.tile);

                return tileInstance;
            });

        });

        this.setMines();

        return field;
    }

    getRandomTile() {
        const randomRow = Math.floor(Math.random() * this.fieldWidth);
        const randomColumn = Math.floor(Math.random() * this.fieldHeight);

        return this.tiles[randomRow][randomColumn];
    }

    setMines() {
        let tile = this.getRandomTile();

        Array.from({length: this.mineQuantity}, () => {
            while (tile.getValue() === 9) {
                tile = this.getRandomTile();
            }

            tile.setValue(9);
            this.updateSurroundingTiles(tile);
        });
    }

    updateSurroundingTiles(tile) {
        const surroundingTiles = this.getSurroundingTiles(tile);

        Array.from(surroundingTiles, tile => {
            tile.getValue() !== 9 && tile.setValue(tile.getValue() + 1)
        })
    };

    getSurroundingTiles(tile) {
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

    openDispatch({isMine, tile}) {
        isMine ? this.openAllCells() : this.openEmptyTiles(tile);
    }

    openAllCells() {
        Array.from({length: this.fieldWidth}, (_, indexY) => {

            Array.from({length: this.fieldHeight}, (_, indexX) => {
                const tile = this.tiles[indexY][indexX];

                !tile.isOpened() && tile.open();
            })

        });
    }

    openEmptyTiles(tile) {
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

                currentTile.open();

                if (!currentTile.getValue()) {
                    tileList.push(currentTile);
                }
            }

            tileList.shift();
        }
    }
}

export {Field};
