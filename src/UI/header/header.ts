import {Timer} from "./counter/timer";
import {MinesCounter} from "./counter/minesCounter";
import {Smile} from "./smileBtn";
import {ConfigType} from "../../typing/types";
import {LoaderResource, Container} from "pixi.js";
import {mediator} from "../../logic/mediator";
import {ITimer} from "../../typing/interfaces";

const createHeader = (config: ConfigType, resources: Partial<Record<string, LoaderResource>>): {headerContainer: Container, timer: ITimer} => {
    const headerContainer = new Container();

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
        mineQuantity: config.mineQuantity
    });

    const timerContainer: Container = timer.create();
    const minesCountContainer: Container = minesCount.create();
    const smileContainer = smile.create();

    mediator.register(timer, 'timer');
    mediator.register(minesCount, 'minesCount');
    mediator.register(smile, 'smile');

    headerContainer.addChild(timerContainer, minesCountContainer, smileContainer);

    return {headerContainer, timer};
};

export {createHeader};
