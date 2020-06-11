import {Container} from "pixi.js";
import {ITile} from "./interfaces";

export type ConfigType = {
    textures?: object | null
    mineQuantity?: number
    container?: Container
    tileSize: number
    fieldWidth: number
    fieldHeight?: number,
}

export type StatesType = {
    pressedMine: number
    init: number
    default: number
    flag: number
    notPressedMine: number
    wrongMine: number
};

export type TileType = {
    tileSize: number,
    textures: object;
    x: number;
    y: number;
    openDispatchCallback: (isGameOver: boolean, tile: ITile) => void;
    tilesLeftCallback: () => void;
    timer?: () => void;
}
