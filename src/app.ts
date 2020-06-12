import {Application} from 'pixi.js'
import {createScene} from "./UI/scene";

const createApp = (): void => {
    const app = new Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
    });

    document.body.append(app.view);

    app.stage.interactive = true;

    app.loader
        .add('timeSheet', 'assets/time.json')
        .add('tilesSheet', 'assets/tiles.json')
        .add('minesSheet', 'assets/mines.json')
        .add('smileSheet', 'assets/smile.json')
        .add('numbersSheet', 'assets/numbers.json')
        .add('wallsSheet', 'assets/walls.json')
        .load(({resources}): void => createScene(app, resources));

    app.start();
};

createApp();

document.addEventListener('contextmenu', e => e.preventDefault());

