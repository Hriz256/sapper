import * as PIXI from 'pixi.js';
import {Field} from "./board";
import {createFrame} from "./frame";
import {createSmile, Timer} from "./menu";

const config = {
    tileSize: 40,
    fieldWidth: 9,
    fieldHeight: 9,
    mineQuantity: 10
};

const createObject = app => {
    const mainContainer = new PIXI.Container();

    const field = new Field({
        tileSize: config.tileSize,
        fieldHeight: config.fieldHeight,
        fieldWidth: config.fieldWidth,
        mineQuantity: config.mineQuantity
    });

    const timer = new Timer({tileSize: config.tileSize, fieldWidth: config.fieldWidth});
    timer.create();

    const fieldContainer = field.create(timer);
    const frameContainer = createFrame(config);
    const smile = createSmile({tileSize: config.tileSize, fieldWidth: config.fieldWidth});

    mainContainer.addChild(frameContainer);
    mainContainer.addChild(fieldContainer);
    mainContainer.addChild(smile);
    mainContainer.addChild(timer.getContainer());

    app.stage.addChild(mainContainer);
    app.ticker.add(() => timer.update());
};

const createScene = async () => {
    const app = new PIXI.Application({
        width: 800, height: 800, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
    });

    document.body.append(app.view);

    app.stage.interactive = true;

    await new Promise(resolve => {
        app.loader
            .add('timeSheet', 'assets/time.json')
            .add('tilesSheet', 'assets/tiles.json')
            .add('minesSheet', 'assets/mines.json')
            .add('smileSheet', 'assets/smile.json')
            .add('numbersSheet', 'assets/numbers.json')
            .load(resolve);
    });

    createObject(app);

    app.start();
};

createScene();

document.addEventListener('contextmenu', e => e.preventDefault());

