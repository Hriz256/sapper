import {AnimatedSprite, Container, Text} from "pixi.js";
import {ActionData, StatesType} from "./types";

export interface ITile {
    readonly tileSize: number
    readonly textures: object
    readonly x: number
    readonly y: number
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
    setInteractive: (interactive: boolean) => void
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
    tiles: ITile[][]
    create: () => Container
    restart: () => void
    decreaseTilesLeft: (isLose: boolean) => void
    getRandomTile: () => any
    setMines: () => void
    updateSurroundingTiles: (tile) => void
}

export interface ICounter extends ISubscriber {
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
    continue: () => void
    start: () => void
}

export interface IMinesCounter extends ICounter {
    update: (count: number) => void
    format: (count: number) => string
    getFrameIndex: (formatCount: string) => Array<number>
}

export interface ISmile extends ISubscriber {
    readonly tileSize: number
    readonly textures: object
    readonly fieldWidth: number
    smile: AnimatedSprite
    create: () => AnimatedSprite
    restart: () => void
    setInitFrame: () => void
    setWinFrame: () => void
    setLoseFrame: () => void
}

export interface IButton {
    readonly width: number
    readonly height: number
    readonly text: string
    readonly posX: number
    readonly posY: number
    readonly fontSize: number
    readonly anchorY: number
    button: Text
    create: () => Container
    setText: () => Text
}

export interface IPauseButton {
    set: (pauseMenuContainer: Container) => Container
}

export interface IExit {
    set: (pauseMenuContainer: Container, startGameButtonContainer: Container) => Container
}

export interface IStart {
    set: () => Container
}

export interface IMediator {
    subscribers: object
    register: (subscriber: ITimer, name: string) => void
    notify: (data: ActionData) => void
}

export interface ISubscriber {
    mediator: IMediator | null
    dispatch: (action: string) => void
    sendAction: (data: ActionData) => void
    setMediator: (mediator: IMediator) => void
}
