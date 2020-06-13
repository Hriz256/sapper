import {Button} from "./button";
import {IExit} from "../../../typing/interfaces";
import {Container} from "pixi.js";

class Exit extends Button implements IExit {
    set(pauseMenuContainer: Container, startGameButtonContainer: Container): Container {
        const container = this.create();

        this.button.on('pointerup', () => {
            pauseMenuContainer.visible = !pauseMenuContainer.visible;
            startGameButtonContainer.visible = !startGameButtonContainer.visible;
        });

        return container;
    }
}

export {Exit};
