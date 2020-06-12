import {Application, LoaderResource, Container} from 'pixi.js'
import {createFrame} from "./frame";
import {ConfigType} from "../typing/types";
import {Field} from "./field";
import {createHeader} from "./header/header";

const config: ConfigType = {
    tileSize: 40,
    fieldWidth: 9,
    fieldHeight: 9,
    mineQuantity: 10
};

const centerContainer = (app: Application, container: Container): void => {
    container.position.x = app.view.width / 2;
    container.position.y = app.view.height / 2;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
};

const resize = (app: Application, container: Container): void => {
    app.view.width = window.innerWidth;
    app.view.height = window.innerHeight;

    centerContainer(app, container)
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

    const [timer, minesCount, smile] = createHeader(config, resources, field);

    const timerContainer: Container = timer.create();
    const minesCountContainer: Container = minesCount.create();
    const smileContainer = smile.create();

    const frameContainer: Container = createFrame({
        textures: resources.wallsSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        fieldHeight: config.fieldHeight
    });

    const fieldContainer = field.create(timer, minesCount, smile);

    Array.from([frameContainer, fieldContainer, timerContainer, minesCountContainer, smileContainer], container => {
        mainContainer.addChild(container);
    });

    app.stage.addChild(mainContainer);
    app.ticker.add(() => timer.update());

    centerContainer(app, mainContainer);

    window.addEventListener('resize', () => resize(app, mainContainer))
};

export {createScene};
