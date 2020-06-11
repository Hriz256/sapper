import {Application} from 'pixi.js'
import {createScene} from "./scene/scene";

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
        // .add('numbsBg', 'assets/nums_background.svg')
        .load(({resources}): void => createScene(app, resources));

    app.start();
    //
    // window.addEventListener('resize', () => {
    //     app.stage.width = window.innerWidth;
    //     app.stage.height = window.innerHeight;
    // })
};

createApp();

document.addEventListener('contextmenu', e => e.preventDefault());

