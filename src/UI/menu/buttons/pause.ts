import {Button} from "./button";
import {IPauseButton} from "../../../typing/interfaces";
import {Container} from "pixi.js";

class PauseButton extends Button implements IPauseButton {
    set(pauseMenuContainer: Container): Container {
        const container = this.create();

        this.button.on('pointerup', () => {
            pauseMenuContainer.visible = !pauseMenuContainer.visible;
            console.log(1)
            this.sendAction({action: pauseMenuContainer.visible ? 'stop' : 'continue', to: 'timer'});
            this.sendAction({action: 'toggleTilesInteractive', to: 'field', value: !pauseMenuContainer.visible});
        });

        return container;
    }
}

export {PauseButton};
