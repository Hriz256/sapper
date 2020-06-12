import {Timer} from "./counter/timer";
import {MinesCounter} from "./counter/minesCounter";
import {Smile} from "./smileBtn";
import {ConfigType} from "../../typing/types";
import {LoaderResource} from "pixi.js";
import {IField, IMinesCounter, ISmile, ITimer} from "../../typing/interfaces";

const createHeader = (config: ConfigType, resources: Partial<Record<string, LoaderResource>>, field: IField): [ITimer, IMinesCounter, ISmile] => {
    const timer = new Timer({
        textures: resources.timeSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        anchorX: 1,
        posX: (config.tileSize * 0.7 * 2 + config.tileSize * config.fieldWidth) - config.tileSize * 0.9,
    });

    const minesCount = new MinesCounter({
        textures: resources.timeSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        anchorX: 0,
        posX: config.tileSize * 0.7 + config.tileSize * 0.1,
    });

    const smile = new Smile({
        textures: resources.smileSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        field,
        timer,
        minesCount
    });

    return [timer, minesCount, smile];
};

export {createHeader};
