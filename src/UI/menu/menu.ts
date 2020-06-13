import {ConfigType} from "../../typing/types";
import {Container} from "pixi.js";
import {PauseButton} from "./buttons/pause";
import {Exit} from "./buttons/exit";
import {Start} from "./buttons/start";
import {mediator} from "../../logic/mediator";

const createMenu = (config: ConfigType) => {
    const menuContainer = new Container();
    const pauseMenuContainer = new Container();

    const pauseButton = new PauseButton({
        width: config.tileSize * config.fieldWidth + config.tileSize * 2 * 0.7,
        height: config.tileSize,
        text: 'ПАУЗА',
        fontSize: 20,
        posX: 0,
        posY: -config.tileSize,
        anchorY: 0.5,
        bgVisibility: false
    });

    const continueGameButton = new PauseButton({
        width: config.tileSize * config.fieldWidth,
        height: config.tileSize,
        text: 'ПРОДОЛЖИТЬ ИГРУ',
        fontSize: 16,
        posX: config.tileSize * 0.7,
        posY: config.tileSize * 0.7,
        anchorY: 0.6,
    });

    const exitToMenuButton = new Exit({
        width: config.tileSize * config.fieldWidth,
        height: config.tileSize,
        text: 'ВЫХОД ИЗ ИГРЫ',
        fontSize: 16,
        posX: config.tileSize * 0.7,
        posY: config.tileSize * 0.7 + config.tileSize,
        anchorY: 0.6
    });

    const startGameButton = new Start({
        width: config.tileSize * config.fieldWidth,
        height: config.tileSize * 0.7 + config.tileSize * (config.fieldHeight + 2),
        text: 'НАЧАТЬ ИГРУ',
        fontSize: 24,
        posX: config.tileSize * 0.7,
        posY: config.tileSize * 0.7,
        anchorY: 0.5
    });

    mediator.register(pauseButton, 'pauseButton');
    mediator.register(continueGameButton, 'continueGameButton');
    mediator.register(startGameButton, 'startGameButton');


    const startGameButtonContainer = startGameButton.set();
    const pauseButtonContainer = pauseButton.set(pauseMenuContainer);
    const continueButtonContainer = continueGameButton.set(pauseMenuContainer);
    const exitToMenuButtonContainer = exitToMenuButton.set(pauseMenuContainer, startGameButtonContainer);

    pauseMenuContainer.visible = false;
    startGameButtonContainer.visible = false;

    pauseMenuContainer.addChild(continueButtonContainer, exitToMenuButtonContainer);
    menuContainer.addChild(pauseMenuContainer, pauseButtonContainer, startGameButtonContainer);

    return menuContainer;
};

export {createMenu};
