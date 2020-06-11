import {Application, LoaderResource, Container} from 'pixi.js'
import {createFrame} from "../frame/frame";
import {ConfigType} from "../types";
import {Field} from "../board/board";
import {Smile, Timer} from "../menu/menu"

const config: ConfigType = {
    tileSize: 40,
    fieldWidth: 9,
    fieldHeight: 9,
    mineQuantity: 10
};

const createScene = (app: Application, resources: Partial<Record<string, LoaderResource>>): void => {
    const mainContainer = new Container();

    const field = new Field({
        textures: {
            ...resources.numbersSheet.textures,
            ...resources.minesSheet.textures,
            ...resources.tilesSheet.textures
        },
        tileSize: config.tileSize,
        fieldHeight: config.fieldHeight,
        fieldWidth: config.fieldWidth,
        mineQuantity: config.mineQuantity
    });

    const timer = new Timer({
        textures: resources.timeSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth
    });

    const timerContainer = timer.create();

    const smile = new Smile({
        textures: resources.smileSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        // field,
        // timer
    });

    const smileButton = smile.create();

    const frameContainer = createFrame({
        textures: resources.wallsSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        fieldHeight: config.fieldHeight
    });

    const fieldContainer = field.create();

    Array.from([frameContainer, fieldContainer, timerContainer, smileButton], container => {
        mainContainer.addChild(container);
    });

    app.stage.addChild(mainContainer);
    app.ticker.add(() => timer.update());

    // console.log(app.stage, mainContainer.width, app.stage.height / mainContainer.height)

    // mainContainer.scale.set(app.stage.width / mainContainer.width, app.stage.height / mainContainer.height);
};

export {createScene};
