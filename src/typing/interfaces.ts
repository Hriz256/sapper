import {AnimatedSprite, Container} from "pixi.js";
import {StatesType} from "./types";

export interface IConfig {
    readonly tileSize: number
    readonly textures: object
}

export interface ITile {
    readonly tileSize: number;
    readonly textures: object;
    readonly x: number;
    readonly y: number;
    readonly openDispatchCallback: (isGameOver: boolean, tile: ITile) => void;
    readonly tilesLeftCallback: (isLose: boolean) => void;
    readonly timer: () => void;
    readonly states: StatesType;
    currentState: number;
    tile: AnimatedSprite;
    create: () => void;
    setValue: (value: number) => void;
    setFlag: () => void;
    getValue: () => number;
    isOpened: () => boolean;
    resetTile: () => void;
    open: (byUser: boolean, isGameOver: boolean) => void
}

export interface IField {
    readonly tileSize: number;
    readonly fieldWidth: number;
    readonly fieldHeight: number;
    readonly mineQuantity: number;
    readonly textures: object;
    tilesLeft: number;
    timer: object;
    tiles: ITile[][];
    smile: object;
    create: () => Container,
    restart: () => void,
    decreaseTilesLeft: (isLose: boolean) => void;
    getRandomTile: () => any;
    setMines: () => void;
    updateSurroundingTiles: (tile) => void
}

export interface ITimer {
    readonly tileSize: number
    readonly textures: object
    readonly fieldWidth: number
    date: number
    allowUpdate: boolean
    numbers: Array<AnimatedSprite>
}

export interface ISmile {
    readonly tileSize: number
    readonly textures: object
    readonly fieldWidth: number
    smile: AnimatedSprite;
}
