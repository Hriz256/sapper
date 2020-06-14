import {ITile} from "./interfaces";

export type ConfigType = {
    textures?: object | null
    mineQuantity?: number
    tileSize: number
    fieldWidth: number
    fieldHeight?: number
}

export type StatesType = {
    pressedMine: number
    init: number
    default: number
    flag: number
    notPressedMine: number
    wrongMine: number
};

export type CounterType = {
    anchorX?: number
    posX: number
}

export type ActionData = {
    action: string
    to: string
    value?: any
}

export type TileType = {
    tileSize: number
    textures: object
    x: number
    y: number
}

export type GraphicsRectType = {
    width: number
    height: number
    posX: number
    posY: number
}

export type ButtonType = {
    fontSize: number
    text: string
    anchorY: number
    bgVisibility?: boolean
}

export type OpenDispatchType = {
    isGameOver: boolean
    tile: ITile
}
