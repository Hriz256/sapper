import {Button} from "./button";
import {IExit} from "../../../typing/interfaces";
import {Container} from "pixi.js";

class Exit extends Button implements IExit {
    set(pauseMenuContainer: Container, startGameButtonContainer: Container): Container {
        const container = this.create();

        this.button.on('pointerup', () => {
            pauseMenuContainer.visible = !pauseMenuContainer.visible; // Скрываем контейнер паузы
            startGameButtonContainer.visible = !startGameButtonContainer.visible; // Показыем контейнер с кнопкой начать игру
        });

        return container;
    }
}

export {Exit};
