import {AnimatedSprite, Container} from "pixi.js";
import {StatesType} from "./types";

export interface ITile {
    readonly tileSize: number
    readonly textures: object
    readonly x: number
    readonly y: number
    readonly openDispatchCallback: (isGameOver: boolean, tile: ITile) => void
    readonly tilesLeftCallback: (isLose: boolean) => void
    readonly timer: () => void
    readonly states: StatesType
    currentState: number
    tile: AnimatedSprite
    create: () => void
    setValue: (value: number) => void
    setFlag: (interactive: boolean, active: boolean) => void
    isSetFlag: () => boolean
    getValue: () => number
    isOpened: () => boolean
    resetTile: () => void
    open: (byUser: boolean, isGameOver: boolean) => void
}

export interface IField {
    readonly tileSize: number
    readonly fieldWidth: number
    readonly fieldHeight: number
    readonly mineQuantity: number
    readonly textures: object
    tilesLeft: number
    timer: ITimer
    smile: ISmile
    minesCount: IMinesCounter
    tiles: ITile[][]
    create: (timer: ITimer, minesCount: IMinesCounter, smile: ISmile) => Container
    restart: () => void
    decreaseTilesLeft: (isLose: boolean) => void
    getRandomTile: () => any
    setMines: () => void
    updateSurroundingTiles: (tile) => void
}

export interface ICounter {
    readonly tileSize: number
    readonly textures: object
    readonly fieldWidth: number
    readonly anchorX: number
    numbers: Array<AnimatedSprite>
    posX: number
    setBg: (container: Container) => void
    create: () => Container
}

export interface ITimer extends ICounter {
    date: number
    allowUpdate: boolean
    update: () => void
    reset: () => void
    stop: () => void
    start: () => void
}

export interface IMinesCounter extends ICounter {
    update: (count: number) => void
    format: (count: number) => string
    getFrameIndex: (formatCount: string) => Array<number>
}

export interface ISmile {
    readonly tileSize: number
    readonly textures: object
    readonly fieldWidth: number
    smile: AnimatedSprite
    timer: ITimer
    create: () => AnimatedSprite
    restart: () => void
    setInitFrame: () => void
    setWinFrame: () => void
    setLoseFrame: () => void
}
